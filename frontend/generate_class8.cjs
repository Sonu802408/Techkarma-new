const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const outDir = path.join(__dirname, 'public', 'pdfs');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

// Manual mapping of Class 8 notes based on typical notesstreet structure
// or we can just fetch the links directly from the URLs.
const subjects = [
    {
        name: 'math',
        url: 'https://notesstreet.in/2022/06/class-8-math.html',
        prefix: 'class8-english-math' // By default English, we will adjust for Hindi if URLs are found
    },
    {
        name: 'science',
        url: 'https://notesstreet.in/2022/06/class-8-science.html',
        prefix: 'class8-english-science'
    },
    {
        name: 'sst',
        url: 'https://notesstreet.in/2022/06/class-8-social-science.html',
        prefix: 'class8-english-social-studies-(sst)'
    }
];

async function run() {
    console.log("Launching browser...");
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });

    for (const subject of subjects) {
        console.log(`\nNavigating to ${subject.name} main page: ${subject.url}`);

        try {
            await page.goto(subject.url, { waitUntil: 'networkidle2', timeout: 60000 });
        } catch (e) {
            console.error(`Failed to load ${subject.url}: ${e.message}`);
            continue;
        }

        // Extract chapter links from the main subject page
        const chapterLinks = await page.evaluate(() => {
            const links = [];
            // Notesstreet usually lists chapters with "Chapter 1", "Chapter 2" etc in standard links
            const anchorTags = Array.from(document.querySelectorAll('a'));

            for (const a of anchorTags) {
                const text = a.innerText.toLowerCase();
                const href = a.href;

                // We want to capture links that look like chapter notes
                if (href.includes('notesstreet.in') && text.includes('chapter') && (text.includes('notes') || href.includes('notes'))) {
                    // Try to extract chapter number
                    const match = text.match(/chapter\s*[-–]?\s*(\d+)/i) || href.match(/chapter[-_](\d+)/i);
                    const chNum = match ? parseInt(match[1]) : null;

                    if (chNum) {
                        // Check if Hindi Medium
                        const isHindi = text.includes('hindi') || /[\u0900-\u097F]/.test(text) || href.includes('hindi');

                        links.push({
                            title: text,
                            url: href,
                            chapter: chNum,
                            isHindi: isHindi
                        });
                    }
                }
            }
            return links;
        });

        console.log(`Found ${chapterLinks.length} raw chapter links for ${subject.name}`);

        // Deduplicate by chapter and medium
        const uniqueLinks = {};
        for (const link of chapterLinks) {
            const key = `${link.isHindi ? 'hindi' : 'english'}-${link.chapter}`;
            if (!uniqueLinks[key]) {
                uniqueLinks[key] = link;
            }
        }

        const finalLinks = Object.values(uniqueLinks);
        console.log(`Deduplicated to ${finalLinks.length} unique chapters`);

        // Process each chapter
        for (const link of finalLinks) {
            const mediumPrefix = link.isHindi ? 'hindi' : 'english';
            let subjectStr = subject.name;
            if (subject.name === 'sst') subjectStr = 'socialstudies';

            const fileName = `class8-${mediumPrefix}-${subjectStr}-subjective-ch${link.chapter}.pdf`;
            const savePath = path.join(outDir, fileName);

            // Skip if already exists
            if (fs.existsSync(savePath)) {
                console.log(`Skipping existing: ${fileName}`);
                continue;
            }

            console.log(`Downloading Ch ${link.chapter} (${mediumPrefix}): ${link.url}`);

            try {
                await page.goto(link.url, { waitUntil: 'networkidle2', timeout: 60000 });
                await page.emulateMediaType('screen');

                // Custom script to extract the actual PDF from Google Drive iframe
                const pdfSaved = await extractAndSaveGoogleDrivePdf(page, savePath);

                if (!pdfSaved) {
                    // Fallback to page PDF 
                    // Hide UI elements
                    await page.evaluate(() => {
                        const selectorsToHide = [
                            'header', 'footer', '.sidebar', '.widget-area', '.ast-footer-wrapper',
                            '.ast-header-wrap', '.entry-meta', '.post-navigation', '.comments-area',
                            '.sharedaddy', '.share-buttons', 'nav', '#secondary', '.ast-above-header-wrap',
                            '.sidebar-main'
                        ];
                        selectorsToHide.forEach(sel => {
                            const els = document.querySelectorAll(sel);
                            els.forEach(e => { if (e) e.style.display = 'none'; });
                        });

                        const primary = document.querySelector('#primary');
                        if (primary) {
                            primary.style.width = '100%';
                            primary.style.float = 'none';
                        }
                        const main = document.querySelector('main');
                        if (main) {
                            main.style.margin = '0';
                            main.style.padding = '20px';
                        }
                    });

                    await page.pdf({
                        path: savePath,
                        format: 'A4',
                        printBackground: true,
                        margin: { top: '20px', bottom: '20px', left: '20px', right: '20px' }
                    });
                    console.log(`Saved page as PDF: ${fileName}`);
                }
            } catch (e) {
                console.error(`Error processing ${fileName}: ${e.message}`);
            }
        }
    }

    await browser.close();
    console.log("Done scraping Class 8!");
}

async function extractAndSaveGoogleDrivePdf(page, savePath) {
    // If NotesStreet embeds GDrive PDFs, they are in an iframe
    try {
        const hasIframe = await page.evaluate(() => {
            const iframes = Array.from(document.querySelectorAll('iframe'));
            for (const iframe of iframes) {
                if (iframe.src && iframe.src.includes('drive.google.com/file')) {
                    return iframe.src;
                }
            }
            return null;
        });

        if (hasIframe) {
            console.log(`Found Google Drive iframe: ${hasIframe}`);
            // Usually drive.google.com/file/d/ID/preview
            // We can't easily download it directly via puppeteer because of GDrive protections, 
            // but we can try to fetch the export link.
            const urlParts = hasIframe.match(/file\/d\/([a-zA-Z0-9_-]+)/);
            if (urlParts && urlParts[1]) {
                const fileId = urlParts[1];
                const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
                console.log(`Attempting to download from ${downloadUrl}`);

                // Use a separate page or fetch to download
                const https = require('https');
                const fileStream = fs.createWriteStream(savePath);

                await new Promise((resolve, reject) => {
                    https.get(downloadUrl, (response) => {
                        // Handle redirects
                        if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                            https.get(response.headers.location, (res) => {
                                res.pipe(fileStream);
                                res.on('end', () => resolve());
                                res.on('error', reject);
                            }).on('error', reject);
                        } else {
                            response.pipe(fileStream);
                            response.on('end', () => resolve());
                            response.on('error', reject);
                        }
                    }).on('error', reject);
                });
                console.log("Successfully downloaded Google Drive PDF");
                return true;
            }
        }
    } catch (e) {
        console.error("Error checking for Google Drive iframe:", e.message);
    }
    return false;
}

run().catch(console.error);
