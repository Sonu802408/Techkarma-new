import puppeteer from 'puppeteer';
import fs from 'fs';

if (!fs.existsSync('scratch')) {
    fs.mkdirSync('scratch');
}

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    
    console.log("Loading page...");
    await page.goto('http://localhost:5173/class/10', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: 'scratch/screenshot1.png' });
    console.log("Screenshot 1 saved.");
    
    console.log("Reloading...");
    await page.reload({ waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: 'scratch/screenshot2.png' });
    console.log("Screenshot 2 saved.");
    
    await browser.close();
})();
