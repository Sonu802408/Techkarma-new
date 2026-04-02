const fs = require('fs');
const path = require('path');

const pdfDir = path.join(__dirname, 'public', 'pdfs');
if (!fs.existsSync(pdfDir)) {
    console.log("No pdf dir found.");
    process.exit(1);
}

const files = fs.readdirSync(pdfDir).filter(f => f.endsWith('.pdf'));
const manifestPath = path.join(__dirname, 'src', 'data', 'pdfManifest.json');

fs.writeFileSync(manifestPath, JSON.stringify(files, null, 2));
console.log(`Generated manifest with ${files.length} PDFs at ${manifestPath}`);
