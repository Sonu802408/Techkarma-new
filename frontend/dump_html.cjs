const https = require('https');
const fs = require('fs');

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
async function run() {
    const html = await fetchPageHtml("https://notesstreet.in/2020/05/class-10-science-notes-in-hindi-chapter_17.html");
    fs.writeFileSync('page.html', html);
    console.log("Written to page.html");
}
run();
