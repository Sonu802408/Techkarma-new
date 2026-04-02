const fs = require('fs');
const https = require('https');
const path = require('path');
const cheerio = require('cheerio');

const links = JSON.parse(fs.readFileSync('sst_hindi_links.json', 'utf8'));
const pdfDir = path.join(__dirname, 'public', 'pdfs');
if (!fs.existsSync(pdfDir)) fs.mkdirSync(pdfDir, { recursive: true });

function httpsGet(url) {
    return new Promise((resolve, reject) => {
        https.get(encodeURI(decodeURI(url)), (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                let redir = res.headers.location;
                if(redir.startsWith('/')) redir = new URL(url).origin + redir;
                return resolve(httpsGet(encodeURI(decodeURI(redir))));
            }
            if (res.statusCode !== 200) {
                return reject(new Error('Status ' + res.statusCode));
            }
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
}

function downloadDriveFile(id, destPath) {
    return new Promise((resolve, reject) => {
        const url = `https://drive.google.com/uc?export=download&id=${id}`;
        const file = fs.createWriteStream(destPath);
        
        let isDone = false;
        const timer = setTimeout(() => {
            if (!isDone) {
                file.close();
                fs.unlink(destPath, () => reject(new Error('Timeout downloading ' + id)));
            }
        }, 60000);

        const request = https.get(url, (response) => {
            if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                let redir = response.headers.location;
                if (redir.startsWith('/')) redir = 'https://drive.google.com' + redir;
                https.get(redir, (res2) => {
                    res2.pipe(file);
                    res2.on('end', () => { isDone = true; clearTimeout(timer); });
                    file.on('finish', () => file.close(() => resolve()));
                }).on('error', err => reject(err));
            } else {
                response.pipe(file);
                response.on('end', () => { isDone = true; clearTimeout(timer); });
                file.on('finish', () => file.close(() => resolve()));
            }
        }).on('error', err => {
            fs.unlink(destPath, () => reject(err));
        });
    });
}

function downloadDirectFile(url, destPath) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(destPath);
        let isDone = false;
        const timer = setTimeout(() => {
            if (!isDone) {
                file.close();
                fs.unlink(destPath, () => reject(new Error('Timeout downloading direct link')));
            }
        }, 60000);

        const makeRequest = (targetUrl) => {
            https.get(targetUrl, (response) => {
                if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                    let redir = response.headers.location;
                    if (redir.startsWith('/')) redir = new URL(targetUrl).origin + redir;
                    makeRequest(encodeURI(decodeURI(redir)));
                } else {
                    response.pipe(file);
                    response.on('end', () => { isDone = true; clearTimeout(timer); });
                    file.on('finish', () => file.close(() => resolve()));
                }
            }).on('error', err => {
                fs.unlink(destPath, () => reject(err));
            });
        };
        makeRequest(encodeURI(decodeURI(url)));
    });
}

async function run() {
    console.log(`Starting fetching for ${links.length} PDFs...`);
    for (let i = 0; i < links.length; i++) {
        const url = links[i];
        const chapterNum = i + 1;
        const destPath = path.join(pdfDir, `class10-hindi-socialstudies-ch${chapterNum}.pdf`);
        
        console.log(`[${chapterNum}/${links.length}] Processing ${url}...`);
        
        if (fs.existsSync(destPath) && fs.statSync(destPath).size > 100000) {
            console.log(`  -> Already downloaded (${fs.statSync(destPath).size} bytes). Skipping.`);
            continue;
        }

        try {
            const html = await httpsGet(url);
            const $ = cheerio.load(html);
            
            // Try PDF Embedder first
            let directPdfLink = $('a.pdfemb-viewer').attr('href');
            if (!directPdfLink) directPdfLink = $('a[href$=".pdf"]').attr('href');
            
            if (directPdfLink) {
                console.log(`  -> Found direct PDF link: ${directPdfLink}. Downloading...`);
                await downloadDirectFile(directPdfLink, destPath);
                console.log(`  -> Download complete!`);
                continue;
            }
            
            // Try Google Drive iframe fallback
            let iframeSrc = $('iframe[src*="drive.google.com"]').attr('src');
            if (iframeSrc) {
                const match = iframeSrc.match(/\/file\/d\/([a-zA-Z0-9_-]+)\//);
                if (match && match[1]) {
                    console.log(`  -> Found GDrive ID: ${match[1]}. Downloading...`);
                    await downloadDriveFile(match[1], destPath);
                    console.log(`  -> Download complete!`);
                    continue;
                }
            }
            
            console.log(`  -> No PDF link or GDrive iframe found!`);
            
        } catch (e) {
            console.error(`  -> Error:`, e.message);
        }
    }
    console.log("All done!");
}

run();
