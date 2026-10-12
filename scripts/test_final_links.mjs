import puppeteer from '../frontend/node_modules/puppeteer/lib/esm/puppeteer/puppeteer.js';

async function testLinks() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  await page.goto('http://localhost:5173/classes/10', { waitUntil: 'networkidle2' });

  const cards = await page.$$eval('.resource-card', els => els.slice(0, 3).map(e => {
    const title = e.querySelector('.resource-card-title')?.innerText || '';
    const btns = Array.from(e.querySelectorAll('a, button')).map(b => ({
      text: b.innerText.replace(/\s+/g, ' ').trim(),
      href: b.getAttribute('href') || ''
    }));
    return { title, btns };
  }));

  console.log('Sample Class 10 cards and links:', JSON.stringify(cards, null, 2));

  // Test fetch to backend download endpoint
  const res = await fetch('http://localhost:5000/api/ncert-books/pdf/jemh1/1?download=1');
  console.log('Download endpoint status:', res.status);
  console.log('Content-Disposition:', res.headers.get('content-disposition'));
  console.log('Content-Type:', res.headers.get('content-type'));

  await browser.close();
}

testLinks().catch(console.error);
