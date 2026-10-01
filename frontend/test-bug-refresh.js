import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    console.log("=== TEST A: First load ===");
    await page.goto('http://localhost:5173/classes/10', { waitUntil: 'networkidle0' });
    
    // Click Medium "English"
    await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const engBtn = btns.find(b => b.textContent.includes('English Medium'));
        if(engBtn) engBtn.click();
    });
    await new Promise(r => setTimeout(r, 500));
    
    // Click Subject "Science"
    await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const sciBtn = btns.find(b => b.textContent === 'Science');
        if(sciBtn) sciBtn.click();
    });
    await new Promise(r => setTimeout(r, 1000));
    
    let titles = await page.$$eval('.resource-card-title', els => els.map(e => e.textContent.trim()));
    console.log(`First Load - Found ${titles.length} cards.`);
    
    console.log("=== TEST B: Second load (Refresh) ===");
    await page.reload({ waitUntil: 'networkidle0' });
    
    // Have to click again because state is reset
    await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const engBtn = btns.find(b => b.textContent.includes('English Medium'));
        if(engBtn) engBtn.click();
    });
    await new Promise(r => setTimeout(r, 500));
    
    await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const sciBtn = btns.find(b => b.textContent === 'Science');
        if(sciBtn) sciBtn.click();
    });
    await new Promise(r => setTimeout(r, 1000));
    
    let titles2 = await page.$$eval('.resource-card-title', els => els.map(e => e.textContent.trim()));
    console.log(`Second Load - Found ${titles2.length} cards.`);
    
    await browser.close();
})();
