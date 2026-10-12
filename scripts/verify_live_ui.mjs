import puppeteer from '../frontend/node_modules/puppeteer/lib/esm/puppeteer/puppeteer.js';

async function verify() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  console.log('Testing Class 10: http://localhost:5173/classes/10');
  await page.goto('http://localhost:5173/classes/10', { waitUntil: 'networkidle2' });

  // Get visible tab buttons
  const tabs = await page.$$eval('.tab-btn', els => els.map(e => e.innerText.replace(/\s+/g, ' ').trim()));
  console.log('Class 10 tabs:', tabs);

  // Get active tab
  const activeTab = await page.$eval('.tab-btn.active', el => el.innerText.replace(/\s+/g, ' ').trim()).catch(() => 'None');
  console.log('Class 10 Active tab:', activeTab);

  // Get rendered resource cards count and first 2 cards
  const cards = await page.$$eval('.resource-card', els => els.map(e => {
    const title = e.querySelector('.resource-card-title')?.innerText || '';
    const badge = e.querySelector('.resource-card-header')?.innerText.replace(/\s+/g, ' ').trim() || '';
    const btns = Array.from(e.querySelectorAll('button, a')).map(b => b.innerText.replace(/\s+/g, ' ').trim());
    return { badge, title, btns };
  }));
  console.log(`Class 10 total cards rendered: ${cards.length}`);
  console.log('First 2 cards:', JSON.stringify(cards.slice(0, 2), null, 2));

  // Test Class 6
  console.log('\nTesting Class 6: http://localhost:5173/classes/6');
  await page.goto('http://localhost:5173/classes/6', { waitUntil: 'networkidle2' });
  const c6Cards = await page.$$eval('.resource-card', els => els.map(e => {
    const title = e.querySelector('.resource-card-title')?.innerText || '';
    const badge = e.querySelector('.resource-card-header')?.innerText.replace(/\s+/g, ' ').trim() || '';
    return { badge, title };
  }));
  console.log(`Class 6 total cards rendered: ${c6Cards.length}`);
  console.log('Class 6 First 2 cards:', JSON.stringify(c6Cards.slice(0, 2), null, 2));

  // Test Class 12
  console.log('\nTesting Class 12: http://localhost:5173/classes/12');
  await page.goto('http://localhost:5173/classes/12', { waitUntil: 'networkidle2' });
  const c12Cards = await page.$$eval('.resource-card', els => els.map(e => {
    const title = e.querySelector('.resource-card-title')?.innerText || '';
    const badge = e.querySelector('.resource-card-header')?.innerText.replace(/\s+/g, ' ').trim() || '';
    return { badge, title };
  }));
  console.log(`Class 12 total cards rendered: ${c12Cards.length}`);
  console.log('Class 12 First 2 cards:', JSON.stringify(c12Cards.slice(0, 2), null, 2));

  await browser.close();
}

verify().catch(console.error);
