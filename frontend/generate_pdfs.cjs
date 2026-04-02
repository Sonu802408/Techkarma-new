const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const missingLinks = {
    // English Ch 1-13 (some missing, some might not exist on notesstreet anymore, but we have 13 keys from before)
    'class8-english-science': {
        1: "https://notesstreet.in/2022/08/class-8-science-notes-chapter-1-crop-production-and-management.html",
        3: "https://notesstreet.in/2022/08/class-8-science-notes-chapter-3-synthetic-fibres-and-plastics.html",
        4: "https://notesstreet.in/2022/08/class-8-science-notes-chapter-4-materials-metals-and-non-metals.html",
        5: "https://notesstreet.in/2022/08/class-8-science-notes-chapter-5-coal-and-petroleum.html",
        6: "https://notesstreet.in/2022/08/class-8-science-notes-chapter-6-combustionand-flame.html",
        7: "https://notesstreet.in/2022/08/class-8-science-notes-chapter-7-conservation-of-plants-and-animals.html",
        11: "https://notesstreet.in/2022/08/class-8-science-notes-chapter-11-force-and-pressure.html",
        12: "https://notesstreet.in/2022/08/class-8-science-notes-chapter-12-friction.html",
        13: "https://notesstreet.in/2022/08/class-8-science-notes-chapter-13-sound.html",
        14: "https://notesstreet.in/2022/08/class-8-science-notes-chapter-14-chemical-effects-of-electric-current.html",
        15: "https://notesstreet.in/2022/08/class-8-science-notes-chapter-15-some-natural-phenomena.html",
        16: "https://notesstreet.in/2022/08/class-8-science-notes-chapter-16-light.html",
        17: "https://notesstreet.in/2022/08/class-8-science-notes-chapter-17-stars-and-the-solar-system.html"
    },
    // Hindi Ch 12, 13
    'class8-hindi-science': {
        12: "https://notesstreet.in/2023/09/class-8-science-notes-chapter-12-%e0%a4%98%e0%a4%b0%e0%a5%8d%e0%a4%b7%e0%a4%a3.html",
        13: "https://notesstreet.in/2023/09/class-8-science-notes-chapter-13-%e0%a4%a7%e0%a5%8d%e0%a4%b5%e0%a4%a8%e0%a4%bf.html"
    }
};

const mapEnglishChapters = {
    1: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 11: 7, 12: 8, 13: 9, 14: 10, 15: 11, 16: 12, 17: 13
};

const outDir = path.join(__dirname, 'public', 'pdfs');

async function processLinks() {
    console.log("Launching browser...");
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });
    const page = await browser.newPage();

    // Set viewport and user agent
    await page.setViewport({ width: 1200, height: 800 });
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');

    for (const [prefix, chapters] of Object.entries(missingLinks)) {
        for (const [originalCh, url] of Object.entries(chapters)) {
            // map english chapters to 1-13 since the original keys are from notesstreet URL structure
            let ch = originalCh;
            if (prefix === 'class8-english-science') {
                ch = mapEnglishChapters[originalCh];
                if (!ch) continue;
            }

            console.log(`Processing ${prefix} Chapter ${ch}... ` + url);
            try {
                await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

                // Hide header/footer/sidebar/ads so the PDF looks like pure notes
                await page.evaluate(() => {
                    const selectorsToHide = [
                        'header', 'footer', '.sidebar', '.widget-area', '.ast-footer-wrapper',
                        '.ast-header-wrap', '.entry-meta', '.post-navigation', '.comments-area',
                        '.sharedaddy', '.share-buttons', 'nav', '#secondary', '.ast-above-header-wrap'
                    ];
                    selectorsToHide.forEach(sel => {
                        const els = document.querySelectorAll(sel);
                        els.forEach(e => e.style.display = 'none');
                    });

                    // Adjust main content area to full width
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

                    document.body.style.background = '#white';
                });

                const savePath = path.join(outDir, `${prefix}-ch${ch}.pdf`);
                console.log(`Saving PDF to ${savePath}...`);

                await page.pdf({
                    path: savePath,
                    format: 'A4',
                    printBackground: true,
                    margin: { top: '20px', bottom: '20px', left: '20px', right: '20px' }
                });

                console.log(`Success: ${prefix} Chapter ${ch}`);
            } catch (e) {
                console.error(`Error on Chapter ${ch}:`, e.message);
            }
        }
    }

    await browser.close();
    console.log("Done");
}

processLinks();
