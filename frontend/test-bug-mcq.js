import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    console.log("=== TEST A: First load MCQs ===");
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
    await new Promise(r => setTimeout(r, 1000));
    
    // Click MCQs
    await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('.tab-btn'));
        const mcqBtn = btns.find(b => b.textContent.includes('MCQs'));
        if(mcqBtn) mcqBtn.click();
    });
    await new Promise(r => setTimeout(r, 1000));
    
    let mcqText = await page.$$eval('.mcq-question', els => els.map(e => e.textContent.trim()));
    console.log(`First Load - Found ${mcqText.length} MCQs.`);
    
    console.log("=== TEST B: Second load MCQs ===");
    // Switch to Notes
    await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('.tab-btn'));
        const notesBtn = btns.find(b => b.textContent.includes('Notes'));
        if(notesBtn) notesBtn.click();
    });
    await new Promise(r => setTimeout(r, 1000));
    
    // Switch back to MCQs
    await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('.tab-btn'));
        const mcqBtn = btns.find(b => b.textContent.includes('MCQs'));
        if(mcqBtn) mcqBtn.click();
    });
    await new Promise(r => setTimeout(r, 1000));
    
    let mcqText2 = await page.$$eval('.mcq-question', els => els.map(e => e.textContent.trim()));
    console.log(`Second Load - Found ${mcqText2.length} MCQs.`);
    
    await browser.close();
})();
