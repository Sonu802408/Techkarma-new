const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const https = require('https');

const outDir = path.join(__dirname, 'public', 'pdfs');

// Ensure output directory exists
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

const subjects = ['Math', 'Science', 'Social Studies (SST)', 'English', 'Hindi', 'Sanskrit'];
const classes = [6, 7, 8];
const mediums = ['english', 'hindi'];

function getSubjectSlug(subject) {
    if (subject === 'Social Studies (SST)') return 'socialstudies';
    return subject.toLowerCase().replace(/[^a-z0-9]/gi, '');
}

async function createPlaceholders(browser) {
    console.log("Creating placeholder PDFs to prevent 404 errors...");
    const page = await browser.newPage();
    const htmlContent = `
        <html>
        <body style="font-family: Arial, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #fdfdfd; color: #333;">
            <div style="text-align: center;">
                <h1 style="color: #6366f1;">Notes Not Available Yet</h1>
                <p>We are still uploading notes for this chapter. Please check back later.</p>
            </div>
        </body>
        </html>
    `;
    await page.setContent(htmlContent);

    // Create just ONE placeholder PDF
    const templatePath = path.join(outDir, 'placeholder_template.pdf');
    await page.pdf({ path: templatePath, format: 'A4', printBackground: true });
    await page.close();

    let count = 0;
    for (const cls of classes) {
        for (const medium of mediums) {
            for (const subject of subjects) {
                const slug = getSubjectSlug(subject);
                // Create placeholders for up to 30 chapters to be safe
                for (let ch = 1; ch <= 30; ch++) {
                    const fileName = `class${cls}-${medium}-${slug}-ch${ch}.pdf`;
                    const filePath = path.join(outDir, fileName);

                    // Only create if it doesn't exist
                    if (!fs.existsSync(filePath) || fs.statSync(filePath).size === 0) {
                        try {
                            fs.copyFileSync(templatePath, filePath);
                            count++;
                        } catch (e) {
                            console.error(`Failed to copy placeholder: ${fileName} - ${e.message}`);
                        }
                    }
                }
            }
        }
    }

    // Clean up template
    if (fs.existsSync(templatePath)) fs.unlinkSync(templatePath);

    console.log(`Created ${count} placeholder PDFs.`);
}

async function scrapeRealPDFs(browser) {
    console.log("Attempting to scrape real PDFs from NotesStreet...");
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');

    // NotesStreet categories often look like:
    // https://notesstreet.in/category/class-6-science-notes/
    // We will find category links and grab first level pages.
    // For brevity and to prevent getting IP banned, we'll implement a targeted search
    // on top categories. If notes exist, we print them to PDF.

    const categories = [
        'class-6-science-notes', 'class-6-maths-notes', 'class-6-social-science-notes',
        'class-7-science-notes', 'class-7-maths-notes', 'class-7-social-science-notes',
        'class-8-science-notes', 'class-8-maths-notes', 'class-8-social-science-notes'
    ];

    for (const cat of categories) {
        const url = `https://notesstreet.in/category/${cat}/`;
        console.log(`Checking category page: ${url}`);

        try {
            await page.goto(url, { waitUntil: 'networkidle2', timeout: 15000 });

            // Extract links to specific chapters
            const links = await page.evaluate(() => {
                return Array.from(document.querySelectorAll('a[href*="chapter"]'))
                    .map(a => a.href)
                    .filter((href, index, self) => self.indexOf(href) === index); // unique
            });

            console.log(`Found ${links.length} chapter links in ${cat}`);

            for (const link of links) {
                try {
                    // Quick heuristic to determine target filename based on link URL text
                    // e.g. "class-8-science-notes-chapter-1..." -> class 8, science, chapter 1
                    const match = link.match(/class-(\d+)-([a-z-]+)-notes-chapter-(\d+)/i);
                    if (!match) continue;

                    const cls = match[1];
                    let sub = match[2];
                    const ch = match[3];

                    if (sub.includes('science')) sub = 'science';
                    else if (sub.includes('math')) sub = 'math';
                    else if (sub.includes('social')) sub = 'socialstudies';
                    else continue;

                    // We assume hindi medium by default for Notesstreet since English chapters often explicitly mention it
                    let medium = link.includes('hindi') ? 'hindi' : 'hindi'; // Defaulting to hindi based on previous behavior
                    if (link.toLowerCase().includes('english')) medium = 'english';

                    const fileName = `class${cls}-${medium}-${sub}-ch${ch}.pdf`;
                    const savePath = path.join(outDir, fileName);

                    console.log(`Scraping chapter to ${fileName}...`);
                    const chapterPage = await browser.newPage();
                    await chapterPage.goto(link, { waitUntil: 'networkidle2', timeout: 20000 });

                    // Hide unneeded elements
                    await chapterPage.evaluate(() => {
                        const selectorsToHide = [
                            'header', 'footer', '.sidebar', '.widget-area', '.ast-footer-wrapper',
                            '.ast-header-wrap', '.entry-meta', '.post-navigation', '.comments-area',
                            '.sharedaddy', '.share-buttons', 'nav', '#secondary'
                        ];
                        selectorsToHide.forEach(sel => {
                            const els = document.querySelectorAll(sel);
                            els.forEach(e => e.style.display = 'none');
                        });
                        const primary = document.querySelector('#primary');
                        if (primary) {
                            primary.style.width = '100%';
                            primary.style.float = 'none';
                        }
                    });

                    await chapterPage.pdf({ path: savePath, format: 'A4', printBackground: true, margin: { top: '20px', bottom: '20px', left: '20px', right: '20px' } });
                    await chapterPage.close();
                    console.log(`Successfully generated ${fileName}`);

                } catch (err) {
                    console.error(`Failed to scrape chapter link: ${link}`, err.message);
                }
            }
        } catch (e) {
            console.error(`Failed to load category ${cat}:`, e.message);
        }
    }

    await page.close();
}

async function run() {
    console.log("Starting full PDF fetch script...");
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });

    await createPlaceholders(browser);
    await scrapeRealPDFs(browser);

    await browser.close();
    console.log("All done.");
}

run();
