const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const https = require('https');
const cheerio = require('cheerio');

const outDir = path.join(__dirname, 'public', 'pdfs');

function httpsGet(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                return resolve(httpsGet(res.headers.location));
            }
            let data = '';
            res.setEncoding('utf8');
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
}

const delay = ms => new Promise(res => setTimeout(res, ms));

async function generatePDFs() {
    console.log('Fetching main Class 9 SST index...');
    const mainHtml = await httpsGet('https://notesstreet.in/2022/06/ncert-class-9-social-science-notes.html');
    const $ = cheerio.load(mainHtml);
    
    const links = [];
    const set = new Set();
    
    $('.entry-content a').each((i, el) => {
        const href = $(el).attr('href');
        if (href && href.includes('class-9') && !href.includes('category') && !href.includes('science-notes-in') && !href.includes('math-notes') && !href.includes('mcq') && !href.includes('solution') && !href.includes('mcqs') && !href.includes('bihar-board')) {
            if (!set.has(href)) {
                set.add(href);
                links.push(href);
            }
        }
    });

    const isHindi = url => url.includes('%');

    const hindiHistory = links.filter(l => l.includes('-history-') && isHindi(l));
    const hindiGeo = links.filter(l => l.includes('-geography-') && isHindi(l));
    const hindiCivics = links.filter(l => l.includes('-political-science-') && isHindi(l));
    const hindiEcon = links.filter(l => (l.includes('-economics-') || l.includes('palampur')) && isHindi(l));

    const engHistory = links.filter(l => l.includes('-history-') && !isHindi(l));
    const engGeo = links.filter(l => l.includes('-geography-') && !isHindi(l));
    const engCivics = links.filter(l => l.includes('-political-science-') && !isHindi(l));
    const engEcon = links.filter(l => (l.includes('-economics-') || l.includes('palampur')) && !isHindi(l));

    const hindiList = [...hindiHistory, ...hindiGeo, ...hindiCivics, ...hindiEcon];
    const englishList = [...engHistory, ...engGeo, ...engCivics, ...engEcon];

    console.log(`Discovered ${hindiList.length} Hindi chapters and ${englishList.length} English chapters!`);
    
    fs.writeFileSync('class9_sst_hindi_links.json', JSON.stringify(hindiList, null, 2));
    fs.writeFileSync('class9_sst_english_links.json', JSON.stringify(englishList, null, 2));

    const queues = [
        { name: 'class9-hindi-socialstudies', items: hindiList },
        { name: 'class9-english-socialstudies', items: englishList }
    ];

    console.log('Starting puppeteer to generate PDFs...');
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

            th, td {
                padding: 12px 15px;
                border: 1px solid var(--border);
            }
            
            th {
                background: var(--primary);
                color: white;
                font-weight: 600;
                text-align: left;
            }

            tr:nth-of-type(even) {
                background: var(--bg-alt);
            }
        </style>
    `;

    for (const queue of queues) {
        console.log(`\nProcessing ${queue.name} (${queue.items.length} chapters)...`);
        
        for (let idx = 0; idx < queue.items.length; idx++) {
            const url = queue.items[idx];
            const chNum = idx + 1;
            const pdfFilename = `${queue.name}-ch${chNum}.pdf`;
            const destPath = path.join(outDir, pdfFilename);

            if (fs.existsSync(destPath) && fs.statSync(destPath).size > 10000) {
                console.log(`    [Already exists] Skipping ${pdfFilename}...`);
                continue;
            }

            console.log(`[Ch${chNum}] -> ${url}`);
            
            try {
                await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
                await delay(2000); 

                const extractedHtml = await page.evaluate(() => {
                    const contentNode = document.querySelector('.entry-content') || document.querySelector('article') || document.body;
                    
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
                const cleanTitle = pageTitle.split('|')[0].replace(/NCERT Notes for Class 9/g, '').replace(/Class 9 SST/g, '').replace(/Notes/g, '').replace(/In English/g, '').replace(/In Hindi/g, '').trim();

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
                            <span>Tech Karma Classes (Class 9)</span>
                            <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
                        </div>
                    `
                });
                
                console.log(`    -> PDF successfully saved: ${pdfFilename}`);
            } catch (err) {
                console.error(`    -> Error processing ${url}: ${err.message}`);
                await delay(2000);
            }
        }
    }

    console.log('\nAll Class 9 PDFs generated successfully!');
    await browser.close();
}

generatePDFs().catch(console.error);
