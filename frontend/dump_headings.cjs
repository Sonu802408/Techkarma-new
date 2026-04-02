const cheerio = require('cheerio');
const fs = require('fs');
const html = fs.readFileSync('page_puppeteer.html', 'utf8');
const $ = cheerio.load(html);

const headings = [];
$('h1, h2, h3').each((i, el) => {
    headings.push("TAG: " + $(el).prop('tagName') + " TEXT: " + $(el).text().trim());
});

fs.writeFileSync('headings.json', JSON.stringify(headings, null, 2));
console.log("Headings written to headings.json");
