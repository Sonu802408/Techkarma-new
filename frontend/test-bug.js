import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Test A: First load
    console.log("=== TEST A: First load ===");
    await page.goto('http://localhost:5173/class/10', { waitUntil: 'networkidle2' });
    
    // Wait for cards to load
    await new Promise(r => setTimeout(r, 2000));
    
    // Print titles of resource cards
    let titles = await page.$$eval('.resource-card-title', els => els.map(e => e.textContent.trim()));
    console.log(`Found ${titles.length} cards. Titles:`, titles.slice(0, 3));
    
    // Test B: Second load (refresh)
    console.log("=== TEST B: Second load (refresh) ===");
    await page.reload({ waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 2000));
    
    titles = await page.$$eval('.resource-card-title', els => els.map(e => e.textContent.trim()));
    console.log(`Found ${titles.length} cards. Titles:`, titles.slice(0, 3));
    
    // Check if error boundary fired or anything
    let bodyText = await page.$eval('body', el => el.innerText);
    if(titles.length === 0) {
        console.log("Body text contains 'No chapters': ", bodyText.includes('No chapters'));
    }

    await browser.close();
})();
