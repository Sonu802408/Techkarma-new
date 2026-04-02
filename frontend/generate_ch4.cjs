const puppeteer = require('puppeteer');
const path = require('path');

const outDir = path.join(__dirname, 'public', 'pdfs');

async function processLink(url, savePaths) {
    console.log("Launching browser...");
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });

    console.log("Navigating to " + url);
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

    // IMPORTANT: force screen media type so it doesn't use print CSS which hides content
    await page.emulateMediaType('screen');

    // Scroll slowly to trigger lazy-loaded images
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if (totalHeight >= scrollHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });

    // Wait a bit more for the final images to load
    await new Promise(r => setTimeout(r, 2000));

    await page.evaluate(() => {
        const selectorsToHide = [
            'header', 'footer', '.sidebar', '.widget-area', '.ast-footer-wrapper',
            '.ast-header-wrap', '.entry-meta', '.post-navigation', '.comments-area',
            '.sharedaddy', '.share-buttons', 'nav', '#secondary', '.ast-above-header-wrap',
            '.sidebar-main'
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
        const main = document.querySelector('main');
        if (main) {
            main.style.margin = '0';
            main.style.padding = '20px';
        }
    });

    for (const savePath of savePaths) {
        console.log(`Saving PDF to ${savePath}...`);
        await page.pdf({
            path: savePath,
            format: 'A4',
            printBackground: true,
            margin: { top: '20px', bottom: '20px', left: '20px', right: '20px' }
        });
        console.log(`Success: ${savePath}`);
    }

    await browser.close();
}

async function run() {
    const targetUrl = "https://notesstreet.in/2020/05/class-10-science-notes-in-hindi-chapter_17.html";
    await processLink(targetUrl, [
        path.join(outDir, "class10-hindi-science-ch4.pdf")
    ]);
}

run().catch(console.error);
