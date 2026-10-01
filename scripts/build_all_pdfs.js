const fs = require('fs');
const path = require('path');
const puppeteer = require('../frontend/node_modules/puppeteer');

const vol1_c = require('./vol1_c');
const vol2_cpp = require('./vol2_cpp');
const vol3_java = require('./vol3_java');
const vol4_html = require('./vol4_html');
const vol5_css = require('./vol5_css');
const vol6_js = require('./vol6_js');
const vol7_ai = require('./vol7_ai');
const vol8_cloud = require('./vol8_cloud');
const vol9_cyber = require('./vol9_cyber');
const vol10_ds = require('./vol10_ds');

const pdfOutputDir = path.join(__dirname, '../frontend/public/pdfs');

if (!fs.existsSync(pdfOutputDir)) {
    fs.mkdirSync(pdfOutputDir, { recursive: true });
}

const volumes = [
    { name: 'C_Programming_Complete_Handwritten_Notes.pdf', html: vol1_c() },
    { name: 'CPP_Programming_Complete_Handwritten_Notes.pdf', html: vol2_cpp() },
    { name: 'Java_Programming_Complete_Handwritten_Notes.pdf', html: vol3_java() },
    { name: 'HTML_Complete_Handwritten_Notes.pdf', html: vol4_html() },
    { name: 'CSS_Complete_Handwritten_Notes.pdf', html: vol5_css() },
    { name: 'JavaScript_Complete_Handwritten_Notes.pdf', html: vol6_js() },
    { name: 'AI_Complete_Handwritten_Notes.pdf', html: vol7_ai() },
    { name: 'Cloud_Computing_Complete_Handwritten_Notes.pdf', html: vol8_cloud() },
    { name: 'Cyber_Security_Complete_Handwritten_Notes.pdf', html: vol9_cyber() },
    { name: 'Data_Science_Complete_Handwritten_Notes.pdf', html: vol10_ds() }
];

async function generateAllPDFs() {
    console.log("🚀 Starting PDF Compilation with Puppeteer...");
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    for (let i = 0; i < volumes.length; i++) {
        const vol = volumes[i];
        const targetPath = path.join(pdfOutputDir, vol.name);
        console.log(`\n⏳ Generating Volume ${i + 1}/${volumes.length}: ${vol.name}...`);

        const page = await browser.newPage();
        await page.setContent(vol.html, { waitUntil: 'networkidle0' });

        await page.pdf({
            path: targetPath,
            format: 'A4',
            printBackground: true,
            margin: {
                top: '15mm',
                bottom: '15mm',
                left: '12mm',
                right: '12mm'
            }
        });

        await page.close();
        const stats = fs.statSync(targetPath);
        console.log(`✅ Volume ${i + 1} generated successfully: ${(stats.size / 1024).toFixed(1)} KB`);
    }

    await browser.close();
    console.log("\n🎉 ALL 6 HANDWRITTEN CSE NOTES VOLUMES GENERATED SUCCESSFULLY!");
}

generateAllPDFs().catch(err => {
    console.error("❌ Error generating PDFs:", err);
    process.exit(1);
});
