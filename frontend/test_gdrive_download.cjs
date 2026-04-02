const fs = require('fs');
const https = require('https');

const fileId = '1yEjzxs6KiaKEaTa7a_FPLE23Qe27aPCa';
// A direct download link format for GDrive
const url = `https://drive.google.com/uc?export=download&id=${fileId}`;
const dest = './test_download.pdf';

const file = fs.createWriteStream(dest);

https.get(url, (response) => {
    // Check for redirects (Google Drive often redirects to a download server)
    if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        console.log("Redirected to:", response.headers.location);
        https.get(response.headers.location, (res2) => {
            res2.pipe(file);
            file.on('finish', () => {
                file.close(() => {
                    const stats = fs.statSync(dest);
                    console.log(`Download completed! Size: ${stats.size} bytes`);
                });
            });
        });
    } else {
        response.pipe(file);
        file.on('finish', () => {
            file.close(() => {
                const stats = fs.statSync(dest);
                console.log(`Download completed! Size: ${stats.size} bytes`);
            });
        });
    }
}).on('error', (err) => {
    fs.unlink(dest, () => { });
    console.error('Error:', err.message);
});
