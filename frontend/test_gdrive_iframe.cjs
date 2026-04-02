const puppeteer = require('puppeteer');

async function test() {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    console.log("Navigating...");
    await page.goto("https://notesstreet.in/2022/06/class-11-physics-notes-chapter-2-units-and-measurement.html", { waitUntil: 'networkidle2' });

    console.log("Evaluating iframe...");
    const iframeSrcs = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('iframe')).map(i => i.src);
    });
    console.log("Iframe sources:", iframeSrcs);

    await browser.close();
}

test();
