const fs = require('fs');
const path = require('path');

const manifestPath = path.join(__dirname, 'src', 'data', 'pdfManifest.json');
const filesToAdd = [];

// 12 History chapters
for (let i = 1; i <= 12; i++) {
    filesToAdd.push(`class12-hindi-history-ch${i}.pdf`);
}
// 18 Geography chapters
for (let i = 1; i <= 18; i++) {
    filesToAdd.push(`class12-hindi-geography-ch${i}.pdf`);
}
// 16 Political Science chapters
for (let i = 1; i <= 16; i++) {
    filesToAdd.push(`class12-hindi-politicalscience-ch${i}.pdf`);
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
    
    console.log(`Successfully added ${addedCount} new Class 12 entries to pdfManifest.json!`);
} catch (err) {
    console.error(`Failed to update manifest: ${err.message}`);
}
