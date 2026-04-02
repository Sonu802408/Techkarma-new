const fs = require('fs');
const path = require('path');

const manifestPath = path.join(__dirname, 'src', 'data', 'pdfManifest.json');
const filesToAdd = [];

// 20 Hindi SST chapters
for (let i = 1; i <= 20; i++) {
    filesToAdd.push(`class9-hindi-socialstudies-ch${i}.pdf`);
}
// 20 English SST chapters
for (let i = 1; i <= 20; i++) {
    filesToAdd.push(`class9-english-socialstudies-ch${i}.pdf`);
}

try {
    let manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    
    let addedCount = 0;
    for (const file of filesToAdd) {
        if (!manifest.includes(file)) {
            manifest.push(file);
            addedCount++;
        }
    }

    // Sort alphabetically naturally!
    manifest.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    
    console.log(`Successfully added ${addedCount} new Class 9 entries to pdfManifest.json!`);
} catch (err) {
    console.error(`Failed to update manifest: ${err.message}`);
}
