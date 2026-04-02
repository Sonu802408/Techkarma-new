const fs = require('fs');
const https = require('https');
const path = require('path');

async function fetchPageHtml(url) {
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

function downloadFile(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        const req = https.get(url, (res) => {
            if (res.statusCode !== 200) {
                if (res.statusCode === 301 || res.statusCode === 302) {
                    return resolve(downloadFile(res.headers.location, dest));
                }
                reject(new Error(`Failed to download: ${res.statusCode}`));
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
    });
}

async function run() {
    const url = "https://notesstreet.in/2020/05/class-10-science-notes-in-hindi-chapter_17.html";
    const html = await fetchPageHtml(url);
    const pdfMatches = [...html.matchAll(/https:\/\/notesstreet\.in\/wp-content\/uploads\/[0-9]{4}\/[0-9]{2}\/[^"'>]+\.pdf/ig)];
    console.log("Found PDFs:", pdfMatches.map(m => m[0]));

    // There might be a google drive link or direct pdf links. Let's see what we find first.
    if (pdfMatches.length === 0) {
        // Let's check for iframe
        const iframeMatch = html.match(/<iframe[^>]+src="([^"]+)"/i);
        if (iframeMatch) {
            console.log("Found iframe:", iframeMatch[1]);
        }
    }
}
run();
