const cheerio = require('cheerio');
const fs = require('fs');
const html = fs.readFileSync('chapter1_raw.html', 'utf8');
const $ = cheerio.load(html);
fs.writeFileSync('chapter3_content.html', $('.entry-content').html() || 'NOT FOUND');
