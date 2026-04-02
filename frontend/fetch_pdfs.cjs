const fs = require('fs');
const path = require('path');
const https = require('https');

const hindiLinks = {
    1: "https://notesstreet.in/2021/10/class-8-science-notes-chapter-1-%e0%a4%ab%e0%a4%b8%e0%a4%b2-%e0%a4%89%e0%a4%a4%e0%a5%8d%e0%a4%aa%e0%a4%be%e0%a4%a6%e0%a4%a8-%e0%a4%8f%e0%a4%b5%e0%a4%82-%e0%a4%aa%e0%a5%8d%e0%a4%b0%e0%a4%ac.html",
    2: "https://notesstreet.in/2022/10/class-8-science-notes-chapter-2-%e0%a4%b8%e0%a5%82%e0%a4%95%e0%a5%8d%e0%a4%b7%e0%a5%8d%e0%a4%ae%e0%a4%9c%e0%a5%80%e0%a4%b5-%e0%a4%ae%e0%a4%bf%e0%a4%a4%e0%a5%8d%e0%a4%b0-%e0%a4%8f%e0%a4%b5.html",
    3: "https://notesstreet.in/2023/03/class-8-science-notes-chapter-3-%e0%a4%b8%e0%a4%82%e0%a4%b6%e0%a5%8d%e0%a4%b2%e0%a5%87%e0%a4%b7%e0%a4%bf%e0%a4%a4-%e0%a4%b0%e0%a5%87%e0%a4%b6%e0%a5%87-%e0%a4%94%e0%a4%b0-%e0%a4%aa%e0%a5%8d.html",
    4: "https://notesstreet.in/2022/10/class-8-science-notes-chapter-4-%e0%a4%aa%e0%a4%a6%e0%a4%be%e0%a4%b0%e0%a5%8d%e0%a4%a5-%e0%a4%a7%e0%a4%be%e0%a4%a4%e0%a5%81-%e0%a4%94%e0%a4%b0-%e0%a4%85%e0%a4%a7%e0%a4%be%e0%a4%a4%e0%a5%81.html",
    5: "https://notesstreet.in/2022/10/class-8-science-notes-chapter-5-%e0%a4%95%e0%a5%8b%e0%a4%af%e0%a4%b2%e0%a4%be-%e0%a4%94%e0%a4%b0-%e0%a4%aa%e0%a5%87%e0%a4%9f%e0%a5%8d%e0%a4%b0%e0%a5%8b%e0%a4%b2%e0%a4%bf%e0%a4%af%e0%a4%ae.html",
    6: "https://notesstreet.in/2021/10/class-8-science-notes-chapter-6-%e0%a4%a6%e0%a4%b9%e0%a4%a8-%e0%a4%94%e0%a4%b0-%e0%a4%9c%e0%a5%8d%e0%a4%b5%e0%a4%be%e0%a4%b2%e0%a4%be.html",
    7: "https://notesstreet.in/2022/12/class-8-science-notes-chapter-7-%e0%a4%aa%e0%a5%8c%e0%a4%a7%e0%a5%87-%e0%a4%8f%e0%a4%b5%e0%a4%82-%e0%a4%9c%e0%a4%82%e0%a4%a4%e0%a5%81%e0%a4%93%e0%a4%82-%e0%a4%95%e0%a4%be-%e0%a4%b8%e0%a4%82.html",
    8: "https://notesstreet.in/2023/03/class-8-science-notes-ch-8-%e0%a4%95%e0%a5%8b%e0%a4%b6%e0%a4%bf%e0%a4%95%e0%a4%be-%e0%a4%b8%e0%a4%82%e0%a4%b0%e0%a4%9a%e0%a4%a8%e0%a4%be-%e0%a4%8f%e0%a4%b5%e0%a4%82-%e0%a4%aa%e0%a5%8d.html",
    9: "https://notesstreet.in/2023/03/class-8-science-notes-chapter-9-%e0%a4%9c%e0%a4%82%e0%a4%a4%e0%a5%81%e0%a4%93%e0%a4%82-%e0%a4%ae%e0%a5%87%e0%a4%82-%e0%a4%9c%e0%a4%a8%e0%a4%a8.html",
    10: "https://notesstreet.in/2023/04/class-8-science-notes-chapter-10-%e0%a4%95%e0%a4%bf%e0%a4%b6%e0%a5%8b%e0%a4%b0%e0%a4%be%e0%a4%b5%e0%a4%b8%e0%a5%8d%e0%a4%a5%e0%a4%be-%e0%a4%95%e0%a5%80-%e0%a4%93%e0%a4%b0.html",
    11: "https://notesstreet.in/2023/04/class-8-science-notes-chapter-11-%e0%a4%ac%e0%a4%b2-%e0%a4%a4%e0%a4%a5%e0%a4%be-%e0%a4%a6%e0%a4%be%e0%a4%ac.html",
    12: "https://notesstreet.in/2023/09/class-8-science-notes-chapter-12-%e0%a4%98%e0%a4%b0%e0%a5%8d%e0%a4%b7%e0%a4%a3.html",
    13: "https://notesstreet.in/2023/09/class-8-science-notes-chapter-13-%e0%a4%a7%e0%a5%8d%e0%a4%b5%e0%a4%a8%e0%a4%bf.html",
};

const englishLinks = {
    1: "https://notesstreet.in/2022/08/class-8-science-notes-chapter-1-crop-production-and-management.html",
    3: "https://notesstreet.in/2022/08/class-8-science-notes-chapter-3-synthetic-fibres-and-plastics.html",
    4: "https://notesstreet.in/2022/08/class-8-science-notes-chapter-4-materials-metals-and-non-metals.html",
    5: "https://notesstreet.in/2022/08/class-8-science-notes-chapter-5-coal-and-petroleum.html",
    6: "https://notesstreet.in/2022/08/class-8-science-notes-chapter-6-combustionand-flame.html",
    7: "https://notesstreet.in/2022/08/class-8-science-notes-chapter-7-conservation-of-plants-and-animals.html",
    11: "https://notesstreet.in/2022/08/class-8-science-notes-chapter-11-force-and-pressure.html",
    12: "https://notesstreet.in/2022/08/class-8-science-notes-chapter-12-friction.html",
    13: "https://notesstreet.in/2022/08/class-8-science-notes-chapter-13-sound.html",
    14: "https://notesstreet.in/2022/08/class-8-science-notes-chapter-14-chemical-effects-of-electric-current.html",
    15: "https://notesstreet.in/2022/08/class-8-science-notes-chapter-15-some-natural-phenomena.html",
    16: "https://notesstreet.in/2022/08/class-8-science-notes-chapter-16-light.html",
    17: "https://notesstreet.in/2022/08/class-8-science-notes-chapter-17-stars-and-the-solar-system.html"
};

const outDir = path.join(__dirname, 'public', 'pdfs');

function downloadFile(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        const req = https.get(url, (res) => {
            if (res.statusCode !== 200) {
                reject(new Error(`Failed to download: ${res.statusCode} ${res.statusMessage}`));
                return;
            }
            res.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => reject(err));
        });

        // Timeout
        req.setTimeout(15000, () => {
            req.abort();
            reject(new Error('Download timeout'));
        });
    });
}

function fetchPageHtml(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode !== 200) {
                if (res.statusCode === 301 || res.statusCode === 302) {
                    return resolve(fetchPageHtml(res.headers.location));
                }
                reject(new Error(`Bad status: ${res.statusCode}`));
                return;
            }
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', err => reject(err));
    });
}

async function processLinks(links, prefix) {
    for (const [ch, url] of Object.entries(links)) {
        try {
            console.log(`Processing Chapter ${ch}... ` + url);
            const html = await fetchPageHtml(url);
            const pdfMatch = html.match(/https:\/\/notesstreet\.in\/wp-content\/uploads\/[0-9]{4}\/[0-9]{2}\/[^"'>]+\.pdf/i);
            if (pdfMatch) {
                const pdfUrl = pdfMatch[0];
                console.log(`Found PDF link: ${pdfUrl}`);
                const savePath = path.join(outDir, `${prefix}-ch${ch}.pdf`);
                console.log(`Downloading to ${savePath}...`);
                await downloadFile(pdfUrl, savePath);
                console.log(`Success: ${prefix} Chapter ${ch}`);
            } else {
                console.log(`No PDF link found for Chapter ${ch}`);
            }
        } catch (e) {
            console.error(`Error on Chapter ${ch}:`, e.message);
        }
    }
}

async function run() {
    await processLinks(hindiLinks, 'class8-hindi-science');
    await processLinks(englishLinks, 'class8-english-science');
    console.log("Done");
}

run();
