import puppeteer from 'puppeteer';
import fs from 'fs';

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
    
    console.log("=== TEST B: Second load (Navigation back and forth) ===");
    // Click another tab
    await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const mcqBtn = btns.find(b => b.textContent.includes('MCQs'));
        if(mcqBtn) mcqBtn.click();
    });
    await new Promise(r => setTimeout(r, 1000));
    
    // Click Notes again
    await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const notesBtn = btns.find(b => b.textContent.includes('Notes'));
        if(notesBtn) notesBtn.click();
    });
    await new Promise(r => setTimeout(r, 1000));
    
    titles = await page.$$eval('.resource-card-title', els => els.map(e => e.textContent.trim()));
    console.log(`Second Load - Found ${titles.length} cards. Titles:`, titles.slice(0, 3));
    
    let bodyText = await page.$eval('body', el => el.innerText);
    if(titles.length === 0) {
        console.log("Body text contains 'No dynamic Notes': ", bodyText.includes('No dynamic Notes'));
    }

    await browser.close();
})();
