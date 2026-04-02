const puppeteer = require('puppeteer');
const fs = require('fs');

async function run() {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.goto('https://notesstreet.in/2022/06/ncert-class-10-social-science-notes.html', { waitUntil: 'networkidle2' });
    
    // Save the page html just in case we want to debug
    const html = await page.content();
    fs.writeFileSync('page_puppeteer.html', html);
    
    const links = await page.evaluate(() => {
        const results = { history: [], geography: [], polsc: [], eco: [] };
        let currentSection = '';
        
        const elements = document.querySelectorAll('h2, h3, h4, a');
        for (let el of elements) {
            const text = el.innerText || el.textContent || '';
            
            if (el.tagName.startsWith('H')) {
                const lowerText = text.toLowerCase();
                if (lowerText.includes('history notes in hindi')) currentSection = 'history';
                else if (lowerText.includes('geography notes in hindi')) currentSection = 'geography';
                else if (lowerText.includes('political science notes in hindi')) currentSection = 'polsc';
                else if (lowerText.includes('economics notes in hindi')) currentSection = 'eco';
                else if (lowerText.includes('in english')) currentSection = 'stop';
            } 
            else if (el.tagName === 'A' && currentSection && currentSection !== 'stop') {
                const href = el.href;
                const lowerText = text.toLowerCase();
                if ((lowerText.includes('chapter') || text.includes('अध्याय')) && href) {
                    // Check if we haven't already added this exact URL
                    if (!results[currentSection].includes(href)) {
                        results[currentSection].push(href);
                    }
                }
            }
        }
        return results;
    });

    console.log("History:", links.history.length);
    console.log("Geography:", links.geography.length);
    console.log("PolSc:", links.polsc.length);
    console.log("Eco:", links.eco.length);
    
    const all = [...links.history, ...links.geography, ...links.polsc, ...links.eco];
    fs.writeFileSync('sst_hindi_links.json', JSON.stringify(all, null, 2));
    await browser.close();
}
run();
