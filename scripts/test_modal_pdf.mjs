import puppeteer from '../frontend/node_modules/puppeteer/lib/esm/puppeteer/puppeteer.js';

async function testModal() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  // Load a page with an iframe pointing to /api/ncert-books/pdf/jemh1/1
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });

  // Open iframe directly to test
  const res = await page.goto('http://localhost:5173/api/ncert-books/pdf/jemh1/1', { waitUntil: 'networkidle2' });
  console.log('Status code:', res.status());
  console.log('Headers:', res.headers());
  
  await page.screenshot({ path: 'scripts/direct_pdf_view.png' });
  console.log('Screenshot saved to scripts/direct_pdf_view.png');

  await browser.close();
}

testModal().catch(console.error);
