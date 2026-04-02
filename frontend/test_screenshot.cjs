const puppeteer = require('puppeteer');
const path = require('path');

async function snapshot() {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });

    await page.goto("https://notesstreet.in/2020/05/class-10-science-notes-in-hindi-chapter_17.html", { waitUntil: 'networkidle2' });

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

    await page.screenshot({ path: 'test_puppeteer.png', fullPage: true });
    await browser.close();
}

snapshot().catch(console.error);
