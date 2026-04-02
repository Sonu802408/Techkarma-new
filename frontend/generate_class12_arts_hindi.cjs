const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const outDir = path.join(__dirname, 'public', 'pdfs');

const config = [
    {
        subject: 'history',
        linksFile: 'class12_history_links.json',
        sliceStart: 1
    },
    {
        subject: 'geography',
        linksFile: 'class12_geography_links.json',
        sliceStart: 1
    },
    {
        subject: 'politicalscience',
        linksFile: 'class12_politicalscience_links.json',
        sliceStart: 1
    }
];

const delay = ms => new Promise(res => setTimeout(res, ms));

async function generatePDFs() {
    console.log('Starting puppeteer to generate Class 12 Arts PDFs...');
    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 1600 });
    
    const PREMIUM_CSS = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap');
            
            :root {
                --primary: #4f46e5;
                --primary-light: #e0e7ff;
                --text-main: #1e293b;
                --text-muted: #475569;
                --bg-main: #ffffff;
                --bg-alt: #f8fafc;
                --accent: #f59e0b;
                --danger: #ef4444;
                --success: #10b981;
                --border: #e2e8f0;
            }

            body {
                font-family: 'Poppins', 'Noto Sans Devanagari', sans-serif;
                color: var(--text-main);
                background-color: var(--bg-main);
                line-height: 1.8;
                padding: 40px;
                margin: 0;
                font-size: 16px;
            }

            .premium-container {
                max-width: 900px;
                margin: 0 auto;
                background: #fff;
            }

            h1 {
                font-size: 2.2rem;
                color: var(--primary);
                text-align: center;
                margin-bottom: 2rem;
                padding-bottom: 1rem;
                border-bottom: 3px solid var(--primary-light);
                font-weight: 700;
            }

            h2 {
                font-size: 1.8rem;
                color: #0f172a;
                margin-top: 2.5rem;
                margin-bottom: 1rem;
                padding: 0.5rem 1rem;
                background: var(--bg-alt);
                border-left: 5px solid var(--primary);
                border-radius: 4px;
                font-weight: 600;
            }

            h3 {
                font-size: 1.4rem;
                color: var(--primary);
                margin-top: 1.5rem;
                margin-bottom: 0.75rem;
                font-weight: 600;
            }

            p {
                margin-bottom: 1.2rem;
                text-align: justify;
            }

            ul, ol {
                margin-bottom: 1.5rem;
                padding-left: 2rem;
            }

            li {
                margin-bottom: 0.5rem;
            }

            strong, b {
                color: var(--primary);
                font-weight: 600;
            }

            table {
                width: 100%;
                border-collapse: collapse;
                margin: 2rem 0;
                background: #fff;
                box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            }

            th {
                background: var(--primary);
                color: white;
                font-weight: 600;
                padding: 12px 15px;
                text-align: left;
            }

            td {
                padding: 12px 15px;
                border: 1px solid var(--border);
            }

            tr:nth-of-type(even) {
                background: var(--bg-alt);
            }

            .page-break {
                page-break-before: always;
            }
        </style>
    `;

    for (const subConfig of config) {
        if (!fs.existsSync(subConfig.linksFile)) {
            console.warn(`File ${subConfig.linksFile} not found!`);
            continue;
        }

        const allLinks = JSON.parse(fs.readFileSync(subConfig.linksFile, 'utf8'));
        const chapters = allLinks.slice(subConfig.sliceStart);

        console.log(`\nFound ${chapters.length} chapters for ${subConfig.subject}. Processing sequentially...`);

        for (let idx = 0; idx < chapters.length; idx++) {
            const url = chapters[idx];
            const chNum = idx + 1;
            const pdfFilename = `class12-hindi-${subConfig.subject}-ch${chNum}.pdf`;
            const destPath = path.join(outDir, pdfFilename);

            if (fs.existsSync(destPath) && fs.statSync(destPath).size > 10000) {
                console.log(`    [Already exists] Skipping ${pdfFilename}...`);
                continue;
            }

            console.log(`[${subConfig.subject} Ch${chNum}] -> ${url}`);
            
            try {
                await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
                await delay(2000); 

                const extractedHtml = await page.evaluate(() => {
                    const contentNode = document.querySelector('.entry-content') || document.querySelector('article') || document.querySelector('.post-content') || document.body;
                    
                    const noiseSelectors = [
                        '.sharedaddy', 'div[id^="taboola"]', '.code-block', 'ins.adsbygoogle',
                        '.crp_related', '.nav-links', '#comments', '.sidebar', 'header', 'footer',
                        'iframe' 
                    ];
                    
                    noiseSelectors.forEach(sel => {
                        const nodes = contentNode.querySelectorAll(sel);
                        nodes.forEach(n => n.remove());
                    });

                    return contentNode.innerHTML;
                });

                const pageTitle = await page.title();
                const cleanTitle = pageTitle.split('|')[0].replace(/NCERT Notes for Class 12/g, '').replace(/Notes/g, '').trim();

                const finalHtml = `
                    <!DOCTYPE html>
                    <html lang="hi">
                    <head>
                        <meta charset="UTF-8">
                        ${PREMIUM_CSS}
                    </head>
                    <body>
                        <div class="premium-container">
                            <h1>${cleanTitle}</h1>
                            ${extractedHtml}
                        </div>
                    </body>
                    </html>
                `;

                await page.setContent(finalHtml, { waitUntil: 'domcontentloaded' });
                await delay(500);

                await page.pdf({
                    path: destPath,
                    format: 'A4',
                    printBackground: true,
                    margin: { top: '30px', bottom: '50px', left: '30px', right: '30px' },
                    displayHeaderFooter: true,
                    headerTemplate: '<div></div>',
                    footerTemplate: `
                        <div style="width: 100%; font-size: 10px; color: #64748b; padding: 0 30px; display: flex; justify-content: space-between; font-family: sans-serif;">
                            <span>Tech Karma Classes (Class 12 Arts)</span>
                            <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
                        </div>
                    `
                });
                
                console.log(`    -> PDF successfully saved: ${pdfFilename}`);
            } catch (err) {
                console.error(`    -> Error processing ${url}: ${err.message}`);
                // Simple soft reload/retry delay on 503 type errors
                await delay(2000);
            }
        }
    }

    console.log('\nAll PDFs generated successfully!');
    await browser.close();
}

generatePDFs().catch(console.error);
