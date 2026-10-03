const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Public Base URL of your Cloudflare R2 bucket (e.g., https://pub-xxxxxx.r2.dev/pdfs/)
const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL || 'https://pub-yourbucketid.r2.dev/pdfs/';

const srcDir = path.resolve(__dirname, '../frontend/src');

function walkAndReplace(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            walkAndReplace(filePath);
        } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
            let content = fs.readFileSync(filePath, 'utf8');
            const originalContent = content;

            // Replace Cloudinary URLs with Cloudflare R2 public URL
            content = content.replace(/https:\/\/res\.cloudinary\.com\/[a-zA-Z0-9_-]+\/image\/upload\/(v\d+\/)?pdfs\//g, R2_PUBLIC_URL.endsWith('/') ? R2_PUBLIC_URL : R2_PUBLIC_URL + '/');

            if (content !== originalContent) {
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`Updated URLs in: ${path.relative(srcDir, filePath)}`);
            }
        }
    }
}

console.log(`Updating frontend PDF links to Cloudflare R2: ${R2_PUBLIC_URL}`);
walkAndReplace(srcDir);
console.log("Finished updating frontend links!");
