import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
    
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
    await new Promise(r => setTimeout(r, 500));
    
    // Click Tab "Notes"
    await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const notesBtn = btns.find(b => b.textContent.includes('Notes'));
        if(notesBtn) notesBtn.click();
    });
    await new Promise(r => setTimeout(r, 1000));
    
    let titles = await page.$$eval('.resource-card-title', els => els.map(e => e.textContent.trim()));
    console.log(`First Load - Found ${titles.length} cards. Titles:`, titles.slice(0, 3));
    
    // Navigate Back and Forth (the bug says "revisit")
    console.log("Navigating to Home...");
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
    
    console.log("Navigating back to Class 10...");
    await page.goto('http://localhost:5173/classes/10', { waitUntil: 'networkidle0' });
    
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
    await new Promise(r => setTimeout(r, 500));
    
    await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const notesBtn = btns.find(b => b.textContent.includes('Notes'));
        if(notesBtn) notesBtn.click();
    });
    await new Promise(r => setTimeout(r, 1000));
    
    let titles2 = await page.$$eval('.resource-card-title', els => els.map(e => e.textContent.trim()));
    console.log(`Second Load - Found ${titles2.length} cards. Titles:`, titles2.slice(0, 3));
    
    await browser.close();
})();
