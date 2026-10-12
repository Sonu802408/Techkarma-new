import puppeteer from '../frontend/node_modules/puppeteer/lib/esm/puppeteer/puppeteer.js';

async function testIframe() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  // Set content with iframe to our backend streaming endpoint
  await page.setContent(`
    <html>
      <body>
        <h1>Testing Streamed PDF in Iframe</h1>
        <iframe id="pdfFrame" src="http://localhost:5173/api/ncert-books/pdf/jemh1/1" width="800" height="600"></iframe>
      </body>
    </html>
  `);

  await new Promise(r => setTimeout(r, 3000));

  const frameUrl = await page.$eval('#pdfFrame', f => f.contentWindow ? f.contentWindow.location.href : f.src);
  console.log('Iframe final URL:', frameUrl);

  const res = await fetch('http://localhost:5173/api/ncert-books/pdf/jemh1/1');
  console.log('Fetch status via Vite:', res.status);
  console.log('Fetch content-type:', res.headers.get('content-type'));
  console.log('Fetch byte size:', (await res.arrayBuffer()).byteLength);

  await browser.close();
}

testIframe().catch(console.error);
