const https = require('https');
const cheerio = require('cheerio');
const fs = require('fs');

const urls = {
    history: 'https://notesstreet.in/2022/06/ncert-class-12-history-notes.html',
    geography: 'https://notesstreet.in/2022/06/ncert-class-12-geography-notes.html',
    politicalscience: 'https://notesstreet.in/2022/06/ncert-class-12-political-science-notes.html'
};

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

function extractLinks(html, subject) {
    const $ = cheerio.load(html);
    const links = [];
    const set = new Set();
    
    $('.entry-content a').each((i, el) => {
        const href = $(el).attr('href');
        if (href && href.includes('class-12') && !href.includes('syllabus') && !href.includes('mcq') && !href.includes('solution')) {
            if (!set.has(href)) {
                set.add(href);
                links.push(href);
            }
        }
    });

    if (links.length === 0) {
        $('.entry-content a').each((i, el) => {
            const href = $(el).attr('href');
            if (href && href.includes('notesstreet.in') && href.includes('12') && (!href.includes('mcq'))) {
                 if (!set.has(href)) {
                    set.add(href);
                    links.push(href);
                }
            }
        });
    }

    fs.writeFileSync(`class12_${subject}_links.json`, JSON.stringify(links, null, 2));
    console.log(`${subject}: Found ${links.length} chapter links`);
    return links;
}

async function run() {
    for (const [subj, url] of Object.entries(urls)) {
        console.log(`Fetching ${subj} from ${url}...`);
        const html = await httpsGet(url);
        extractLinks(html, subj);
    }
}

run();
