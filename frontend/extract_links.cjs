const puppeteer = require('puppeteer');

async function extractLinks() {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });
    const page = await browser.newPage();
    await page.goto("https://notesstreet.in/2020/05/class-10-science-notes-in-hindi-chapter_17.html", { waitUntil: 'networkidle2' });

    // get all links with their text
    const links = await page.evaluate(() => {
        const anchors = Array.from(document.querySelectorAll('a'));
        return anchors.map(a => ({ text: a.innerText, href: a.href }));
    });

    links.forEach(l => {
        if (l.text.toLowerCase().includes('chapter') || l.text.toLowerCase().includes('pdf') || l.text.toLowerCase().includes('download')) {
            console.log(l.text.replace(/\n/g, ' ') + " -> " + l.href);
        }
    });

    await browser.close();
}

extractLinks().catch(console.error);
