const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const outDir = path.join(__dirname, 'public', 'pdfs');

// Ensure output directory exists
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

// ----------------------------------------------------
// Setup configuration for subjects and classes
// ----------------------------------------------------
const classes = [9, 10, 11, 12];
const mediums = ['english', 'hindi'];

// The complete list of subjects we want to cover across 9-12
const subjects = [
    'Math', 'Science', 'Social Studies (SST)', 'English', 'Hindi', 'Sanskrit',
    'Physics', 'Chemistry', 'Biology', 'Mathematics', 'History',
    'Geography', 'Political Science', 'Economics', 'Business Studies', 'Accountancy',
    'Computer Science', 'Sociology'
];

function getSubjectSlug(subject) {
    if (subject === 'Social Studies (SST)') return 'socialstudies';
    return subject.toLowerCase().replace(/[^a-z0-9]/gi, '');
}

async function createPlaceholders(browser) {
    console.log("Creating placeholder PDFs to prevent 404 errors for Classes 9-12...");
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
    const templatePath = path.join(outDir, 'hs_placeholder_template.pdf');
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

                    // Only create if it doesn't exist or is empty
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

    console.log(`Created ${count} new placeholder PDFs for Classes 9-12.`);
}

async function scrapeRealPDFs(browser) {
    console.log("Attempting to scrape real PDFs from NotesStreet...");
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');

    // Scrape high school categories focusing on science, math, and humanities where available
    const categories = [
        'class-9-science-notes', 'class-9-maths-notes', 'class-9-social-science-notes',
        'class-10-science-notes', 'class-10-maths-notes', 'class-10-social-science-notes',
        'class-11-physics-notes', 'class-11-chemistry-notes', 'class-11-biology-notes', 'class-11-mathematics-notes', 'class-11-history-notes', 'class-11-geography-notes', 'class-11-political-science-notes', 'class-11-economics-notes',
        'class-12-physics-notes', 'class-12-chemistry-notes', 'class-12-biology-notes', 'class-12-mathematics-notes', 'class-12-history-notes', 'class-12-geography-notes', 'class-12-political-science-notes', 'class-12-economics-notes'
    ];

    for (const cat of categories) {
        const url = `https://notesstreet.in/category/${cat}/`;
        console.log(`Checking category page: ${url}`);

        try {
            await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

            // Extract links to specific chapters
            const links = await page.evaluate(() => {
                return Array.from(document.querySelectorAll('a[href*="chapter"]'))
                    .map(a => a.href)
                    .filter((href, index, self) => self.indexOf(href) === index); // unique
            });

            console.log(`Found ${links.length} chapter links in ${cat}`);

            for (const link of links) {
                try {
                    // Match generic class-{9-12}-{subject}-notes-chapter-{X}
                    const match = link.match(/class-(\d+)-([a-z-]+)-notes-chapter-(\d+)/i);
                    if (!match) continue;

                    const cls = match[1];
                    let subStr = match[2];
                    const ch = match[3];

                    // Normalize subject
                    let sub = subStr;
                    if (subStr.includes('science') && !subStr.includes('social')) sub = 'science';
                    else if (subStr.includes('math')) sub = 'math';
                    else if (subStr.includes('biology')) sub = 'biology';
                    else if (subStr.includes('physics')) sub = 'physics';
                    else if (subStr.includes('chemistry')) sub = 'chemistry';
                    else if (subStr.includes('history')) sub = 'history';
                    else if (subStr.includes('geography')) sub = 'geography';
                    else if (subStr.includes('political')) sub = 'politicalscience';
                    else if (subStr.includes('economics')) sub = 'economics';
                    else if (subStr.includes('social')) sub = 'socialstudies';

                    let medium = link.toLowerCase().includes('hindi') ? 'hindi' : 'english'; // Default to english unless hindi is specified


                    const fileName = `class${cls}-${medium}-${sub}-ch${ch}.pdf`;
                    const savePath = path.join(outDir, fileName);

                    console.log(`Scraping chapter to ${fileName}...`);
                    const chapterPage = await browser.newPage();
                    await chapterPage.goto(link, { waitUntil: 'networkidle2', timeout: 30000 });

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

                    // Emulate screen media type to bypass anti-print CSS overlay from NotesStreet
                    await chapterPage.emulateMediaType('screen');

                    await chapterPage.pdf({ path: savePath, format: 'A4', printBackground: true, margin: { top: '20px', bottom: '20px', left: '20px', right: '20px' }, timeout: 60000 });
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
    console.log("Starting High School PDF fetch script...");
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
