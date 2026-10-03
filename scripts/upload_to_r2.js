const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Cloudflare R2 Credentials
const ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const BUCKET_NAME = process.env.R2_BUCKET_NAME;

if (!ACCOUNT_ID || !ACCESS_KEY_ID || !SECRET_ACCESS_KEY || !BUCKET_NAME) {
    console.error("ERROR: Missing Cloudflare R2 credentials in environment variables or .env file!");
    console.error("Required: R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME");
    process.exit(1);
}

const s3Client = new S3Client({
    region: 'auto',
    endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: ACCESS_KEY_ID,
        secretAccessKey: SECRET_ACCESS_KEY,
    },
});

const pdfsDir = path.resolve(__dirname, '../frontend/public/pdfs');
const trackingFile = path.join(__dirname, 'r2_uploaded_tracker.json');

let uploaded = {};
if (fs.existsSync(trackingFile)) {
    try {
        uploaded = JSON.parse(fs.readFileSync(trackingFile, 'utf8'));
    } catch (e) {
        uploaded = {};
    }
}

function saveTracker() {
    fs.writeFileSync(trackingFile, JSON.stringify(uploaded, null, 2));
}

async function uploadFile(filePath, fileName) {
    if (uploaded[fileName]) return true;

    try {
        const fileStream = fs.createReadStream(filePath);
        const key = `pdfs/${fileName}`;

        const command = new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: key,
            Body: fileStream,
            ContentType: 'application/pdf',
        });

        await s3Client.send(command);
        uploaded[fileName] = true;
        console.log(`[Success] Uploaded: ${fileName}`);
        return true;
    } catch (error) {
        console.error(`[Error] Failed ${fileName}: ${error.message}`);
        return false;
    }
}

async function runBulkUpload() {
    if (!fs.existsSync(pdfsDir)) {
        console.error(`Directory not found: ${pdfsDir}`);
        return;
    }

    const files = fs.readdirSync(pdfsDir).filter(f => f.toLowerCase().endsWith('.pdf'));
    console.log(`Total PDFs found: ${files.length}`);

    const pending = files.filter(f => !uploaded[f]);
    console.log(`${pending.length} PDFs pending upload.`);

    const CONCURRENCY = 15; // Parallel uploads for high speed

    for (let i = 0; i < pending.length; i += CONCURRENCY) {
        const batch = pending.slice(i, i + CONCURRENCY);
        const promises = batch.map(file => {
            const filePath = path.join(pdfsDir, file);
            return uploadFile(filePath, file);
        });

        await Promise.all(promises);
        saveTracker();
        console.log(`--- Progress: ${Math.min(i + CONCURRENCY, pending.length)} / ${pending.length} uploaded ---`);
    }

    console.log("All PDF uploads to Cloudflare R2 finished successfully!");
}

runBulkUpload();
