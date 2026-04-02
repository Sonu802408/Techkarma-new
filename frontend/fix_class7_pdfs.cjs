const puppeteer = require('puppeteer');
const fs = require('fs');
const https = require('https');
const path = require('path');

const linksData = JSON.parse(fs.readFileSync('class7_links.json', 'utf8'));

function organizeChapters(subjectData) {
    const structured = {};
    for (let [contentType, chaptersList] of Object.entries(subjectData)) {
        structured[contentType] = { hindi: [], english: [] };
        let hindiCount = 1;
        let englishCount = 1;

        for (let ch of chaptersList) {
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

    const pdfDir = path.join(__dirname, 'public', 'pdfs');

    for (let [subject, types] of Object.entries(linksData)) {
        console.log(`\n========= Fixing Subject: ${subject} =========`);
        const structured = organizeChapters(types);

        for (let [contentType, mediums] of Object.entries(structured)) {
            for (let [medium, chapters] of Object.entries(mediums)) {
                let indexCounter = 1;
                for (let ch of chapters) {
                    let filename = `class7-${medium}-${subject}-ch${indexCounter}.pdf`;
                    if (contentType !== 'notes') {
                        filename = `class7-${medium}-${subject}-${contentType}-ch${indexCounter}.pdf`;
                    }

                    const destPath = path.join(pdfDir, filename);

                    // IF exists and > 40KB, it's probably fine
                    if (fs.existsSync(destPath)) {
                        const stats = fs.statSync(destPath);
                        if (stats.size > 40000) {
                            indexCounter++;
                            continue;
                        } else {
                            // Delete it to regenerate
                            fs.unlinkSync(destPath);
                        }
                    } else {
                        // Doesn't exist, we will process it
                    }

                    console.log(`[TARGET] Regenerating ${filename} from ${ch.url}`);
                    const page = await browser.newPage();

                    try {
                        await page.goto(ch.url, { waitUntil: 'networkidle2', timeout: 30000 });

                        console.log(`   -> No real PDF detected prior or size was small. Generating clean PDF...`);

                        // Force screen media type to bypass print CSS protection (the script probably listens to onbeforeprint or uses @media print)
                        await page.emulateMediaType('screen');

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

                            // Remove any JS-based print protectors that might still run
                            // The protection text was "You are not allowed to print preview this page, Thank you"
                            const allElements = document.querySelectorAll('*');
                            allElements.forEach(el => {
                                if (el.innerText && el.innerText.includes('You are not allowed')) {
                                    el.remove();
                                }
                            });
                        });

                        await page.pdf({ path: destPath, format: 'A4', printBackground: true, margin: { top: '20mm', bottom: '20mm', left: '15mm', right: '15mm' } });
                        console.log(`   -> Generated OK.`);
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

    console.log("All fixes done.");
    await browser.close();
}

run().catch(console.error);
