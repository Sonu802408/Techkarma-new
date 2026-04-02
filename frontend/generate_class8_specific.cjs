const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const https = require('https');

const outDir = path.join(__dirname, 'public', 'pdfs');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

const subjectsPages = [
    {
        name: 'science',
        url: 'https://notesstreet.in/2022/06/ncert-class-8-science-notes.html'
    },
    {
        name: 'socialstudies',
        url: 'https://notesstreet.in/2022/06/ncert-class-8-social-science-notes.html'
    }
];

const directLinks = [
    {
        name: 'math',
        url: 'https://notesstreet.in/2023/08/class-8-math-chapter-01-%e0%a4%aa%e0%a4%b0%e0%a4%bf%e0%a4%ae%e0%a5%87%e0%a4%af-%e0%a4%b8%e0%a4%82%e0%a4%96%e0%a5%8d%e0%a4%af%e0%a4%be%e0%a4%8f%e0%a4%81.html',
        chapter: 1,
        isHindi: true
    }
];

async function extractAndSaveGoogleDrivePdf(page, savePath) {
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
            const urlParts = hasIframe.match(/file\/d\/([a-zA-Z0-9_-]+)/);
            if (urlParts && urlParts[1]) {
                const fileId = urlParts[1];
                const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
                console.log(`Attempting to download from ${downloadUrl}`);

                const fileStream = fs.createWriteStream(savePath);
                await new Promise((resolve, reject) => {
                    https.get(downloadUrl, (response) => {
                        if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                            https.get(response.headers.location, (res) => {
                                res.pipe(fileStream);
                                res.on('end', resolve);
                                res.on('error', reject);
                            }).on('error', reject);
                        } else {
                            response.pipe(fileStream);
                            response.on('end', resolve);
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

async function run() {
    console.log("Launching browser...");
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });

    let finalLinksToDownload = [...directLinks];

    // Collect info from subject pages
    for (const basePage of subjectsPages) {
        console.log(`\nNavigating to ${basePage.name} main page: ${basePage.url}`);
        try {
            await page.goto(basePage.url, { waitUntil: 'networkidle2', timeout: 60000 });
        } catch (e) {
            console.error(`Failed to load ${basePage.url}: ${e.message}`);
            continue;
        }

        const chapterLinks = await page.evaluate(() => {
            const links = [];
            const anchorTags = Array.from(document.querySelectorAll('a'));

            for (const a of anchorTags) {
                const text = a.innerText.toLowerCase();
                const href = a.href;

                if (href.includes('notesstreet.in') && (text.includes('chapter') || text.match(/ch\s*-?\s*\d+/i) || href.includes('chapter') || href.match(/ch[-_]?\d+/i))) {
                    const match = text.match(/(?:chapter|ch)\s*[-–]?\s*(\d+)/i) || href.match(/(?:chapter|ch)[-_]?(\d+)/i);
                    const chNum = match ? parseInt(match[1]) : null;

                    if (chNum) {
                        const isHindi = text.includes('hindi') || /[\u0900-\u097F]/.test(text) || href.includes('in-hindi') || href.includes('%');
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

        console.log(`Found ${chapterLinks.length} raw links for ${basePage.name}`);
        
        const uniqueLinks = {};
        for (const link of chapterLinks) {
            const key = `${link.isHindi ? 'hindi' : 'english'}-${link.chapter}`;
            if (!uniqueLinks[key]) {
                uniqueLinks[key] = { ...link, name: basePage.name };
            }
        }
        
        finalLinksToDownload.push(...Object.values(uniqueLinks));
    }

    // Now process all collected links
    console.log(`Total links to download: ${finalLinksToDownload.length}`);

    // Track downloaded files to update manifest later
    const downloadedFiles = [];

    for (const link of finalLinksToDownload) {
        const mediumPrefix = link.isHindi ? 'hindi' : 'english';
        const fileName = `class8-${mediumPrefix}-${link.name}-ch${link.chapter}.pdf`;
        const savePath = path.join(outDir, fileName);
        
        // Add to our list regardless of if it's already there (we want to update manifest)
        downloadedFiles.push(fileName);

        if (fs.existsSync(savePath)) {
            console.log(`Skipping existing: ${fileName}`);
            continue;
        }

        console.log(`\nDownloading ${fileName} from: ${link.url}`);
        try {
            await page.goto(link.url, { waitUntil: 'networkidle2', timeout: 60000 });
            await page.emulateMediaType('screen');

            const pdfSaved = await extractAndSaveGoogleDrivePdf(page, savePath);

            if (!pdfSaved) {
                await page.evaluate(() => {
                    const selectorsToHide = [
                        'header', 'footer', '.sidebar', '.widget-area', '.ast-footer-wrapper',
                        '.ast-header-wrap', '.entry-meta', '.post-navigation', '.comments-area',
                        '.sharedaddy', '.share-buttons', 'nav', '#secondary', '.ast-above-header-wrap',
                        '.sidebar-main', '.navbar'
                    ];
                    selectorsToHide.forEach(sel => {
                        document.querySelectorAll(sel).forEach(e => { if (e) e.style.display = 'none'; });
                    });
                    const primary = document.querySelector('#primary');
                    if (primary) { primary.style.width = '100%'; primary.style.float = 'none'; }
                    const main = document.querySelector('main');
                    if (main) { main.style.margin = '0'; main.style.padding = '20px'; }
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

    await browser.close();
    
    // Output the manifest info
    const manifestPath = path.join(__dirname, 'src', 'data', 'pdfManifest.json');
    if (fs.existsSync(manifestPath)) {
        const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
        let added = 0;
        for (const file of downloadedFiles) {
            if (!manifest.includes(file)) {
                manifest.push(file);
                added++;
            }
        }
        if (added > 0) {
            fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
            console.log(`Added ${added} new entries to pdfManifest.json`);
        } else {
            console.log(`No new entries to add to pdfManifest.json`);
        }
    }

    console.log("Done scraping new Class 8 notes!");
}

run().catch(console.error);
