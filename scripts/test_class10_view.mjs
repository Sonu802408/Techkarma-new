import puppeteer from 'puppeteer';

async function test() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  console.log('Navigating to http://localhost:5173/classes/10 ...');
  await page.goto('http://localhost:5173/classes/10', { waitUntil: 'networkidle2' });

  // Take screenshot of initial state
  await page.screenshot({ path: 'scripts/class10_initial.png' });
  console.log('Saved class10_initial.png');

  // Check what buttons exist
  const buttons = await page.$$eval('button', btns => btns.map(b => b.innerText.trim()).filter(Boolean));
  console.log('Buttons on page:', buttons);

  await browser.close();
}

test().catch(console.error);
