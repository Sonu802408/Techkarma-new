const fs = require('fs');
const path = require('path');

const manifestPath = path.join(__dirname, 'src', 'data', 'pdfManifest.json');

const filesToAdd = [];

// History 5 chapters
for (let i = 1; i <= 5; i++) {
    filesToAdd.push(`class11-hindi-history-ch${i}.pdf`);
}

// Geography 5 chapters
for (let i = 1; i <= 5; i++) {
    filesToAdd.push(`class11-hindi-geography-ch${i}.pdf`);
}

// Political Science 19 chapters
for (let i = 1; i <= 19; i++) {
    filesToAdd.push(`class11-hindi-politicalscience-ch${i}.pdf`);
}

try {
    let manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    
    // Add only items that don't exist yet
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
    
    console.log(`Successfully added ${addedCount} new Class 11 entries to pdfManifest.json!`);
} catch (err) {
    console.error(`Failed to update manifest: ${err.message}`);
}
