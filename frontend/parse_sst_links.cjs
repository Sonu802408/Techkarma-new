const cheerio = require('cheerio');
const fs = require('fs');

const html = fs.readFileSync('page_puppeteer.html', 'utf8');
const $ = cheerio.load(html);

function getLinks(id) {
    const header = $(`#${id}`).closest('h2');
    if (!header.length) return [];
    
    // Find the next table
    let elem = header.next();
    while (elem.length && !elem.is('table') && !elem.find('table').length && !elem.is('h2')) {
        elem = elem.next();
    }
    
    const table = elem.is('table') ? elem : elem.find('table').length ? elem.find('table') : elem.find('figure').find('table');
    const links = [];
    table.find('a').each((i, a) => {
        const href = $(a).attr('href');
        if (href && href.includes('notesstreet.in')) links.push(href);
    });
    return links;
}

const history = getLinks('NCERT_Class_10_History_Notes_In_Hindi');
const geography = getLinks('NCERT_Class_10_Geography_Notes_In_Hindi');
const polsc = getLinks('NCERT_Class_10_Political_Science_Notes_In_Hindi');
const eco = getLinks('NCERT_Class_10_Economics_Notes_In_Hindi');

const all = [...history, ...geography, ...polsc, ...eco];
console.log(`H: ${history.length}, G: ${geography.length}, P: ${polsc.length}, E: ${eco.length}, Total: ${all.length}`);
fs.writeFileSync('sst_hindi_links.json', JSON.stringify(all, null, 2));
