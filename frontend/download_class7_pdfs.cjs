const puppeteer = require('puppeteer');
const fs = require('fs');
const https = require('https');
const path = require('path');

const linksData = JSON.parse(fs.readFileSync('class7_links.json', 'utf8'));

// Helper to download a direct file
function downloadFile(url, destPath) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(destPath);
        https.get(url, (response) => {
            if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                // handle redirect
                return downloadFile(response.headers.location, destPath).then(resolve).catch(reject);
            }
            if (response.statusCode !== 200) {
                return reject(new Error(`Failed to download: status ${response.statusCode}`));
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (err) => {
            fs.unlink(destPath, () => { });
            reject(err);
        });
    });
}

function organizeChapters(subjectData) {
    // Organizes the flat list into exactly what we need
    const structured = {};
    for (let [contentType, chaptersList] of Object.entries(subjectData)) {
        structured[contentType] = { hindi: [], english: [] };

        let hindiCount = 1;
        let englishCount = 1;

        for (let ch of chaptersList) {
            // attempt to extract chapter number from url or text if available
            let chNum = 0;
            const match = ch.url.match(/chapter[-_]?0?(\d+)/i) || ch.url.match(/ch[-_]?0?(\d+)/i);
            if (match) {
                chNum = parseInt(match[1]);
            }

            if (ch.medium === 'hindi') {
                structured[contentType].hindi.push({ ...ch, expectedNum: chNum || hindiCount });
                hindiCount++;
            } else {
                structured[contentType].english.push({ ...ch, expectedNum: chNum || englishCount });
                englishCount++;
            }
        }

        // Sort by expectedNum so ch1 comes before ch2. This helps when pages output links out of order
        structured[contentType].hindi.sort((a, b) => a.expectedNum - b.expectedNum);
        structured[contentType].english.sort((a, b) => a.expectedNum - b.expectedNum);
    }
    return structured;
}

async function run() {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security'],
        headless: 'new'
    });

    // Create base dir if not exist
    const pdfDir = path.join(__dirname, 'public', 'pdfs');
    if (!fs.existsSync(pdfDir)) {
        fs.mkdirSync(pdfDir, { recursive: true });
    }

    for (let [subject, types] of Object.entries(linksData)) {
        console.log(`\n========= Processing Subject: ${subject} =========`);
        const structured = organizeChapters(types);

        for (let [contentType, mediums] of Object.entries(structured)) {
            for (let [medium, chapters] of Object.entries(mediums)) {
                // We'll iterate through up to 20 or all available
                let indexCounter = 1;
                for (let ch of chapters) {
                    // Force the file naming: if it's "notes", format is class7-medium-subject-chX.pdf
                    // Otherwise: class7-medium-subject-contentType-chX.pdf
                    let filename = `class7-${medium}-${subject}-ch${indexCounter}.pdf`;
                    if (contentType !== 'notes') {
                        filename = `class7-${medium}-${subject}-${contentType}-ch${indexCounter}.pdf`;
                    }

                    const destPath = path.join(pdfDir, filename);
                    if (fs.existsSync(destPath)) {
                        console.log(`[SKIP] ${filename} already exists.`);
                        indexCounter++;
                        continue;
                    }

                    console.log(`[TARGET] ${filename} from ${ch.url}`);
                    const page = await browser.newPage();

                    try {
                        let actualPdfUrl = null;

                        // We will listen for network requests to catch iframes or dflip PDFs
                        page.on('response', async (response) => {
                            const url = response.url();
                            if (url.endsWith('.pdf')) {
                                actualPdfUrl = url;
                            }
                        });

                        await page.goto(ch.url, { waitUntil: 'networkidle2', timeout: 30000 });

                        // Let's also parse the DOM for dflip source or iframe src
                        const foundInDom = await page.evaluate(() => {
                            // check iframes
                            const iframes = Array.from(document.querySelectorAll('iframe'));
                            for (let iframe of iframes) {
                                if (iframe.src && iframe.src.includes('.pdf')) return iframe.src;
                            }
                            // check dflip
                            const df = document.querySelector('.dFlip-pdf, [source]');
                            if (df) {
                                const src = df.getAttribute('source');
                                if (src && src.endsWith('.pdf')) return src;
                            }
                            // check pdf-embedder
                            const pe = document.querySelector('.pdfemb-viewer');
                            if (pe) {
                                const src = pe.getAttribute('data-pdf-url');
                                if (src && src.endsWith('.pdf')) return src;
                            }

                            // check a tag that links directly to a pdf
                            const anchors = Array.from(document.querySelectorAll('a'));
                            for (let a of anchors) {
                                if (a.href && a.href.endsWith('.pdf') && !a.href.includes('whatsapp') && !a.href.includes('telegram')) return a.href;
                            }

                            return null;
                        });

                        if (foundInDom) {
                            actualPdfUrl = foundInDom;
                        }

                        if (actualPdfUrl) {
                            console.log(`   -> Found Real PDF Link: ${actualPdfUrl}`);
                            // Download directly
                            try {
                                await downloadFile(actualPdfUrl, destPath);
                                console.log(`   -> Downloaded OK.`);
                            } catch (dErr) {
                                console.log(`   -> Download failed (${dErr.message}), falling back to PDF generation...`);
                                await page.pdf({ path: destPath, format: 'A4', printBackground: true, margin: { top: '10mm', bottom: '10mm', left: '10mm', right: '10mm' } });
                            }
                        } else {
                            console.log(`   -> No direct PDF found. Generating PDF from layout...`);
                            // We should remove headers, footers, sidebars so the printed PDF looks like a clean note
                            await page.evaluate(() => {
                                const selectorsToRemove = [
                                    '.site-header', '.site-footer', '.widget-area', '#secondary',
                                    '.share-buttons', '.comments-area', '.nav-links', '.cat-links',
                                    '.entry-footer', '.ad-container', 'iframe[src*="youtube"]',
                                    '.social-share', 'header', 'footer', '#sidebar'
                                ];
                                selectorsToRemove.forEach(sel => {
                                    document.querySelectorAll(sel).forEach(el => el.remove());
                                });
                                // Set content width to 100%
                                const primary = document.querySelector('#primary');
                                if (primary) {
                                    primary.style.width = '100%';
                                    primary.style.float = 'none';
                                }
                            });

                            await page.pdf({ path: destPath, format: 'A4', printBackground: true, margin: { top: '20mm', bottom: '20mm', left: '15mm', right: '15mm' } });
                            console.log(`   -> Generated OK.`);
                        }
                    } catch (err) {
                        console.log(`   -> ERR: ${err.message}`);
                    } finally {
                        await page.close();
                    }

                    indexCounter++;
                }
            }
        }
    }

    console.log("All done.");
    await browser.close();
}

run().catch(console.error);
