const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const links = JSON.parse(fs.readFileSync('sst_hindi_links.json', 'utf8'));
const pdfDir = path.join(__dirname, 'public', 'pdfs');
if (!fs.existsSync(pdfDir)) fs.mkdirSync(pdfDir, { recursive: true });

async function run() {
    console.log(`Starting PDF generation for ${links.length} PDFs...`);
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    
    // Set a good viewport and user agent
    await page.setViewport({ width: 1200, height: 1600 });
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36');

    for (let i = 0; i < links.length; i++) {
        const url = links[i];
        const chapterNum = i + 1;
        const destPath = path.join(pdfDir, `class10-hindi-socialstudies-ch${chapterNum}.pdf`);
        
        console.log(`[${chapterNum}/${links.length}] Processing ${url}...`);
        
        // Skip if valid size PDF already exists (e.g. Chapter 1, 2)
        if (fs.existsSync(destPath) && fs.statSync(destPath).size > 100000) {
            console.log(`  -> Already downloaded (${fs.statSync(destPath).size} bytes). Skipping.`);
            continue;
        }

        try {
            await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
            
            // Extract title and content
            const data = await page.evaluate(() => {
                const titleNode = document.querySelector('.entry-title');
                const title = titleNode ? titleNode.innerText : 'Notes';
                
                const contentNode = document.querySelector('.entry-content');
                if (!contentNode) return null;
                
                // Remove junk: ads, buttons, etc.
                const ads = contentNode.querySelectorAll('.adsbygoogle, ins, script, .wp-block-buttons, .wp-block-image, iframe');
                ads.forEach(ad => ad.remove());
                
                // Get clean HTML
                return { title, html: contentNode.innerHTML };
            });

            if (!data || !data.html) {
                console.log(`  -> Could not extract content!`);
                continue;
            }

            // Construct styled HTML
            const styledHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <style>
                    body {
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                        line-height: 1.6;
                        color: #333;
                        padding: 20px;
                        max-width: 900px;
                        margin: 0 auto;
                    }
                    h1, h2, h3 { color: #2c3e50; margin-top: 1.5em; margin-bottom: 0.5em; }
                    h1.title { color: #2980b9; border-bottom: 2px solid #eee; padding-bottom: 10px; font-size: 28px; }
                    p { margin-bottom: 1em; font-size: 16px; text-align: justify; }
                    b, strong { color: #2c3e50; }
                    ul, ol { margin-bottom: 1em; padding-left: 20px; }
                    li { margin-bottom: 0.5em; }
                    span[style*="background: yellow"] { background: #fff3cd !important; padding: 2px 4px; border-radius: 3px; display: inline-block; margin-top: 10px; font-weight: bold; }
                    span[style*="background: lime"] { background: #d4edda !important; padding: 2px 4px; border-radius: 3px; display: inline-block; margin-top: 10px; font-weight: bold; color: #155724; }
                    @page { margin: 20mm; }
                </style>
            </head>
            <body>
                <h1 class="title">${data.title}</h1>
                <div class="content">
                    ${data.html}
                </div>
            </body>
            </html>
            `;

            await page.setContent(styledHtml, { waitUntil: 'networkidle0' });
            
            await page.pdf({
                path: destPath,
                format: 'A4',
                printBackground: true,
                margin: { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' },
                displayHeaderFooter: true,
                headerTemplate: '<div></div>',
                footerTemplate: '<div style="font-size: 10px; text-align: center; width: 100%;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>'
            });

            console.log(`  -> PDF Generated successfully.`);
            
        } catch (e) {
            console.error(`  -> Error:`, e.message);
        }
    }
    
    await browser.close();
    console.log("All done!");
}

run();
