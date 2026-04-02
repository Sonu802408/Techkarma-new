const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const outDir = path.join(__dirname, 'public', 'pdfs');

if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

async function generatePDF(url, savePath) {
    console.log(`Launching browser to fetch ${url}...`);
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });

    try {
        console.log("Navigating to " + url);
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

        // IMPORTANT: force screen media type so it doesn't use print CSS which hides content
        await page.emulateMediaType('screen');

        // Scroll slowly to trigger lazy-loaded images/content
        console.log("Scrolling to trigger lazy loads...");
        await page.evaluate(async () => {
            await new Promise((resolve) => {
                let totalHeight = 0;
                const distance = 100;
                const timer = setInterval(() => {
                    const scrollHeight = document.body.scrollHeight;
                    window.scrollBy(0, distance);
                    totalHeight += distance;

                    if (totalHeight >= scrollHeight) {
                        clearInterval(timer);
                        resolve();
                    }
                }, 100);
            });
        });

        // Wait for any final images/iframes
        await new Promise(r => setTimeout(r, 2000));

        // Hide unneeded elements
        console.log("Injecting CSS to hide UI elements...");
        await page.evaluate(() => {
            const selectorsToHide = [
                'header', 'footer', '.sidebar', '.widget-area', '.ast-footer-wrapper',
                '.ast-header-wrap', '.entry-meta', '.post-navigation', '.comments-area',
                '.sharedaddy', '.share-buttons', 'nav', '#secondary', '.ast-above-header-wrap',
                '.sidebar-main', '.adsbygoogle', 'ins', '.social-share'
            ];
            selectorsToHide.forEach(sel => {
                const els = document.querySelectorAll(sel);
                els.forEach(e => e.style.display = 'none');
            });

            const primary = document.querySelector('#primary');
            if (primary) {
                primary.style.width = '100%';
                primary.style.float = 'none';
                primary.style.margin = '0';
                primary.style.padding = '0';
            }

            const main = document.querySelector('main');
            if (main) {
                main.style.margin = '0';
                main.style.padding = '40px';
            }

            // Ensure images are visible
            const images = document.querySelectorAll('img');
            images.forEach(img => {
                img.style.maxWidth = '100%';
                img.style.height = 'auto';
            });
        });

        console.log(`Saving PDF to ${savePath}...`);
        await page.pdf({
            path: savePath,
            format: 'A4',
            printBackground: true,
            margin: { top: '30px', bottom: '30px', left: '30px', right: '30px' }
        });
        console.log(`Successfully generated: ${savePath}`);

    } catch (err) {
        console.error(`Error generating PDF: ${err.message}`);
    } finally {
        await browser.close();
    }
}

async function run() {
    const targetUrl = "https://notesstreet.in/2020/05/class-10-science-notes-in-hindi-chapter_17.html";
    const savePath = path.join(outDir, "class10-hindi-science-ch4.pdf");
    await generatePDF(targetUrl, savePath);
}

run().catch(console.error);
