const fs = require('fs');
const html = fs.readFileSync('page_puppeteer.html', 'utf8');
const searchString = "NCERT Class 10 History Notes In Hindi";
const idx = html.indexOf(searchString);
if (idx > -1) {
    fs.writeFileSync('context.html', html.substring(idx - 200, idx + 2000));
    console.log("Wrote context");
} else {
    console.log("Not found at all");
}
