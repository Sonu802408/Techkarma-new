const fs = require('fs');
const path = require('path');

// Usage: node update_to_hf_urls.js <USERNAME/REPO_NAME>
const repoId = process.argv[2] || process.env.HF_REPO_ID;

if (!repoId) {
    console.error("Please provide repo ID: node update_to_hf_urls.js <username/repo-name>");
    process.exit(1);
}

const HF_BASE_URL = `https://huggingface.co/datasets/${repoId}/resolve/main/pdfs/`;
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

            // Replace Cloudinary URLs with Hugging Face resolve URLs
            content = content.replace(/https:\/\/res\.cloudinary\.com\/[a-zA-Z0-9_-]+\/image\/upload\/(v\d+\/)?pdfs\//g, HF_BASE_URL);

            if (content !== originalContent) {
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`Updated URLs in: ${path.relative(srcDir, filePath)}`);
            }
        }
    }
}

console.log(`Updating frontend PDF URLs to Hugging Face: ${HF_BASE_URL}`);
walkAndReplace(srcDir);
console.log("Frontend links updated successfully!");
