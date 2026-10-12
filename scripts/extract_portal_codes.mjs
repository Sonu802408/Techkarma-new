import fs from 'fs';

const html = fs.readFileSync('scripts/ncert_portal.html', 'utf8');

// Regex to find class conditions and book options
// e.g. (document.test.tclass.value==X) && (document.test.tsubject.options[sind].text=="...")
// document.test.tbook.options[Y].text = "..."
// document.test.tbook.options[Y].value = "textbook.php?CODE=..."

const classMatches = html.split(/else if\s*\(\s*\(document\.test\.tclass\.value\s*==\s*(\d+)\)\s*&&\s*\(document\.test\.tsubject\.options\[sind\]\.text\s*==\s*\"([^\"]+)\"\)\)/g);

const bookMap = {};

for (let i = 1; i < classMatches.length; i += 3) {
  const cls = parseInt(classMatches[i], 10);
  const subject = classMatches[i + 1];
  const block = classMatches[i + 2];

  if (!bookMap[cls]) bookMap[cls] = {};
  if (!bookMap[cls][subject]) bookMap[cls][subject] = [];

  const optRegex = /options\[\d+\]\.text\s*=\s*\"([^\"]+)\"[\s\S]*?options\[\d+\]\.value\s*=\s*\"textbook\.php\?([a-z0-9]+)=([0-9-]+)\"/g;
  let match;
  while ((match = optRegex.exec(block)) !== null) {
    const title = match[1];
    const code = match[2];
    const range = match[3];
    if (!title.includes('Select Book Title')) {
      bookMap[cls][subject].push({ title, code, range });
    }
  }
}

fs.writeFileSync('scripts/parsed_ncert_books.json', JSON.stringify(bookMap, null, 2));
console.log('Parsed classes:', Object.keys(bookMap));
for (const cls of [6, 7, 8, 9, 10, 11, 12]) {
  if (bookMap[cls]) {
    console.log(`Class ${cls} subjects:`, Object.keys(bookMap[cls]));
  }
}
