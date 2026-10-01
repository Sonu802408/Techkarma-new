const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configure Cloudinary
cloudinary.config({ 
    cloud_name: 'dtcuvept', 
    api_key: '353276179649669', 
    api_secret: 's3Ugb7e7AEDGc2RDpgFKEGcExpA' 
});

const pdfsDir = path.join(__dirname, '../frontend/public/pdfs');

async function uploadFile(filePath, fileName) {
    try {
        const publicId = `pdfs/${fileName.replace('.pdf', '')}`;
        // Upload the PDF
        const result = await cloudinary.uploader.upload(filePath, {
            resource_type: 'image',
            public_id: publicId,
            overwrite: true
        });
        console.log(`Success: ${fileName} -> ${result.secure_url}`);
        return result.secure_url;
    } catch (error) {
        console.error(`Error uploading ${fileName}:`, error.message);
        return null;
    }
}

async function runTest() {
    const files = fs.readdirSync(pdfsDir).filter(f => f.endsWith('.pdf'));
    if (files.length === 0) {
        console.log("No PDFs found!");
        return;
    }
    
    // Test with the first file
    const testFile = files[0];
    console.log(`Testing upload with: ${testFile}`);
    const filePath = path.join(pdfsDir, testFile);
    
    await uploadFile(filePath, testFile);
}

runTest();
