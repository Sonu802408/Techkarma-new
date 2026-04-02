const https = require('https');
const cheerio = require('cheerio');
const fs = require('fs');

const mainUrl = 'https://notesstreet.in/2022/06/ncert-class-9-social-science-notes.html';

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

function getChapterLinks(html) {
    const $ = cheerio.load(html);
    const links = [];
    const set = new Set();
    
    // Attempt standard entry-content links
    $('.entry-content a').each((i, el) => {
        const href = $(el).attr('href');
        if (href && href.includes('class-9') && !href.includes('syllabus') && !href.includes('mcq') && !href.includes('solution') && !href.includes('science-notes')) {
            if (!set.has(href)) {
                set.add(href);
                links.push(href);
            }
        }
    });

    return links;
}

async function run() {
    console.log(`Fetching main Class 9 SST index at ${mainUrl}...`);
    const mainHtml = await httpsGet(mainUrl);
    const $ = cheerio.load(mainHtml);
    
    // Find the 8 main category links
    let hindiHistory, hindiGeo, hindiCivics, hindiEcon;
    let engHistory, engGeo, engCivics, engEcon;

    $('.entry-content a').each((i, el) => {
        const text = $(el).text().toLowerCase();
        const href = $(el).attr('href');
        if (!href) return;
        
        if (text.includes('इतिहास') || text.includes('history notes in hindi')) hindiHistory = href;
        if (text.includes('भूगोल') || text.includes('geography notes in hindi')) hindiGeo = href;
        if (text.includes('राजनीति') || text.includes('civics notes in hindi') || text.includes('political')) hindiCivics = href;
        if (text.includes('अर्थशास्त्र') || text.includes('economics notes in hindi')) hindiEcon = href;

        if (text.includes('history notes in english')) engHistory = href;
        if (text.includes('geography notes in english')) engGeo = href;
        if (text.includes('civics notes in english')) engCivics = href;
        if (text.includes('economics notes in english')) engEcon = href;
    });

    console.log("Discovered Index Links:");
    console.log({ hindiHistory, hindiGeo, hindiCivics, hindiEcon, engHistory, engGeo, engCivics, engEcon });

    // Ensure we found them all
    if (!hindiHistory || !engHistory) {
      console.error("Failed to find some basic links");
    }

    const categories = [
        { name: 'hindi_history', url: hindiHistory },
        { name: 'hindi_geography', url: hindiGeo },
        { name: 'hindi_civics', url: hindiCivics },
        { name: 'hindi_economics', url: hindiEcon },
        { name: 'english_history', url: engHistory },
        { name: 'english_geography', url: engGeo },
        { name: 'english_civics', url: engCivics },
        { name: 'english_economics', url: engEcon }
    ];

    const results = {};

    for (const cat of categories) {
        if (!cat.url) continue;
        console.log(`Fetching chapters for ${cat.name} from ${cat.url}...`);
        try {
            const html = await httpsGet(cat.url);
            const chLinks = getChapterLinks(html);
            // Optionally filter out category index if it snuck in
            results[cat.name] = chLinks.filter(l => !l.includes('category/'));
            console.log(` -> Found ${results[cat.name].length} links`);
        } catch(e) {
            console.error(`Failed ${cat.name}: ${e.message}`);
        }
    }

    // Now organize them sequentially!
    const hindiSST = [
        ...(results.hindi_history || []),
        ...(results.hindi_geography || []),
        ...(results.hindi_civics || []),
        ...(results.hindi_economics || [])
    ];

    const englishSST = [
        ...(results.english_history || []),
        ...(results.english_geography || []),
        ...(results.english_civics || []),
        ...(results.english_economics || [])
    ];

    fs.writeFileSync('class9_sst_hindi_links.json', JSON.stringify(hindiSST, null, 2));
    fs.writeFileSync('class9_sst_english_links.json', JSON.stringify(englishSST, null, 2));
    
    console.log(`\nAggregated Hindi SST: ${hindiSST.length} chapters`);
    console.log(`Aggregated English SST: ${englishSST.length} chapters`);
}

run();
