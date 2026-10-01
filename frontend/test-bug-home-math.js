import puppeteer from 'puppeteer';
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 1000 });
    
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
    
    // Click Class 10
    await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('.edtech-class-card'));
        const btn = btns.find(b => b.textContent.includes('Class 10'));
        if(btn) btn.click();
    });
    await new Promise(r => setTimeout(r, 500));
    
    // Click English Medium
    await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const engBtn = btns.find(b => b.textContent.includes('English Medium'));
        if(engBtn) engBtn.click();
    });
    await new Promise(r => setTimeout(r, 500));
    
    // Click Science
    await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const sciBtn = btns.find(b => b.textContent.includes('Science'));
        if(sciBtn) sciBtn.click();
    });
    await new Promise(r => setTimeout(r, 1000));
    
    // Click Notes
    await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('.tab-btn'));
        const notesBtn = btns.find(b => b.textContent.includes('Notes'));
        if(notesBtn) notesBtn.click();
    });
    await new Promise(r => setTimeout(r, 1000));
    
    let titles = await page.$$eval('.resource-card-title', els => els.map(e => e.textContent.trim()));
    console.log(`First Load (Science) - Found ${titles.length} cards.`);
    
    // Now click Math!
    await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const mathBtn = btns.find(b => b.textContent.includes('Math'));
        if(mathBtn) mathBtn.click();
    });
    await new Promise(r => setTimeout(r, 1000));
    
    // Click Notes
    await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('.tab-btn'));
        const notesBtn = btns.find(b => b.textContent.includes('Notes'));
        if(notesBtn) notesBtn.click();
    });
    await new Promise(r => setTimeout(r, 1000));
    
    let titles2 = await page.$$eval('.resource-card-title', els => els.map(e => e.textContent.trim()));
    console.log(`Second Load (Math) - Found ${titles2.length} cards.`);
    
    await browser.close();
})();
