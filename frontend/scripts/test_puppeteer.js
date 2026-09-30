import puppeteer from 'puppeteer';

async function testPuppeteer() {
    try {
        console.log('Launching puppeteer...');
        const browser = await puppeteer.launch({
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
        await page.setContent(`
            <html>
                <body style="font-family: Arial; padding: 40px;">
                    <h1 style="color: #4f46e5;">Tech Karma Classes — Test PDF</h1>
                    <p>Testing PDF generation pipeline.</p>
                </body>
            </html>
        `);
        const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
        await browser.close();
        console.log('Puppeteer generated PDF successfully! Size:', pdfBuffer.length);
        return true;
    } catch (e) {
        console.error('Puppeteer error:', e.message);
        return false;
    }
}

testPuppeteer();
