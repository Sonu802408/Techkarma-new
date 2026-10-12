import puppeteer from '../frontend/node_modules/puppeteer/lib/esm/puppeteer/puppeteer.js';

async function run() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  console.log('Navigating to http://localhost:5173/classes/10 ...');
  await page.goto('http://localhost:5173/classes/10', { waitUntil: 'networkidle2' });

  // Get all visible tab button texts
  const tabs = await page.$$eval('.tab-btn', els => els.map(e => e.innerText.replace(/\s+/g, ' ').trim()));
  console.log('Visible tabs on Class 10:', tabs);

  // Find NCERT Books tab
  const ncertTab = await page.evaluateHandle(() => {
    const btns = Array.from(document.querySelectorAll('.tab-btn'));
    return btns.find(b => b.innerText.includes('NCERT Books'));
  });

  if (ncertTab) {
    console.log('Clicking NCERT Books tab...');
    await ncertTab.click();
    await new Promise(r => setTimeout(r, 1500));

    // Get all rendered resource cards
    const cards = await page.$$eval('.resource-card', els => els.map(e => {
      const title = e.querySelector('.resource-card-title')?.innerText || '';
      const header = e.querySelector('.resource-card-header')?.innerText || '';
      const btns = Array.from(e.querySelectorAll('button, a')).map(b => ({
        text: b.innerText.trim(),
        tag: b.tagName,
        href: b.getAttribute('href') || ''
      }));
      return { header, title, btns };
    }));

    console.log('Total NCERT cards found:', cards.length);
    if (cards.length > 0) {
      console.log('Card 1:', JSON.stringify(cards[0], null, 2));
      console.log('Card 2:', JSON.stringify(cards[1], null, 2));
    } else {
      // Check if unavailable message is showing
      const unavailable = await page.evaluate(() => document.body.innerText.includes('unavailable'));
      console.log('Is unavailable message showing?:', unavailable);
    }
  } else {
    console.log('NCERT Books tab not found in DOM!');
  }

  await browser.close();
}

run().catch(console.error);
