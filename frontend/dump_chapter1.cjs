const puppeteer = require('puppeteer');
const fs = require('fs');

async function run() {
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64)');
    await page.goto('https://notesstreet.in/2022/09/class-10-sst-history-notes-ch-1-%e0%a4%af%e0%a5%82%e0%a4%b0%e0%a5%8b%e0%a4%aa-%e0%a4%ae%e0%a5%87%e0%a4%82-%e0%a4%b0%e0%a4%be%e0%a4%b7%e0%a5%8d%e0%a4%9f%e0%a5%8d%e0%a4%b0%e0%a4%b5%e0%a4%be%e0%a4%a6.html', { waitUntil: 'networkidle2' });
    const html = await page.content();
    fs.writeFileSync('chapter1.html', html);
    await browser.close();
    console.log('Chapter 1 HTML written');
}
run();
