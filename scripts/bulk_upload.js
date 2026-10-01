const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

cloudinary.config({ 
    cloud_name: 'dtcuvept', 
    api_key: '353276179649669', 
    api_secret: 's3Ugb7e7AEDGc2RDpgFKEGcExpA' 
});

const pdfsDir = path.resolve('../frontend/public/pdfs');
const trackingFile = path.join(__dirname, 'uploaded_tracker.json');

let uploaded = {};
if (fs.existsSync(trackingFile)) {
    uploaded = JSON.parse(fs.readFileSync(trackingFile, 'utf8'));
}

function saveTracker() {
    fs.writeFileSync(trackingFile, JSON.stringify(uploaded, null, 2));
}

async function uploadFile(filePath, fileName) {
    if (uploaded[fileName]) return true;

    try {
        const publicId = `pdfs/${fileName.replace('.pdf', '')}`;
        await cloudinary.uploader.upload(filePath, {
            resource_type: 'image',
            public_id: publicId,
            overwrite: true
        });
        uploaded[fileName] = true;
        return true;
    } catch (error) {
        console.error(`[Error] ${fileName}: ${error.message}`);
        return false;
    }
}

async function runBulkUpload() {
    const files = fs.readdirSync(pdfsDir).filter(f => f.endsWith('.pdf'));
    console.log(`Found ${files.length} PDFs.`);
    
    const pending = files.filter(f => !uploaded[f]);
    console.log(`${pending.length} PDFs pending upload.`);

    const CONCURRENCY = 10;
    
    for (let i = 0; i < pending.length; i += CONCURRENCY) {
        const batch = pending.slice(i, i + CONCURRENCY);
        const promises = batch.map(file => {
            const filePath = path.join(pdfsDir, file);
            return uploadFile(filePath, file);
        });
        
        await Promise.all(promises);
        saveTracker();
        console.log(`Progress: ${Math.min(i + CONCURRENCY, pending.length)} / ${pending.length} uploaded...`);
    }
    
    console.log("All uploads complete!");
}

runBulkUpload();
