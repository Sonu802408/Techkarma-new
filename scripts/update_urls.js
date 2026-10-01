const fs = require('fs');
const path = require('path');

const srcDir = path.resolve('../frontend/src');

function walkAndReplace(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            walkAndReplace(filePath);
        } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
            let content = fs.readFileSync(filePath, 'utf8');
            const originalContent = content;
            
            // Replace '/pdfs/' with Cloudinary base URL
            content = content.replace(/\/pdfs\//g, 'https://res.cloudinary.com/dtcuvept/image/upload/pdfs/');
            
            if (content !== originalContent) {
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`Updated: ${filePath}`);
            }
        }
    }
}

walkAndReplace(srcDir);
console.log("Done updating frontend URLs.");
