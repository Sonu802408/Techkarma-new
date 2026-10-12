const fs = require('fs');
const path = require('path');
const https = require('https');

const targetDir = path.join(__dirname, '..', 'frontend', 'public', 'pdfs');
if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

const chapters = [
    { ch: 1, title: 'भोजन के घटक', url: 'https://www.evidyarthi.in/wp-content/uploads/2021/12/class-6-vigyan-chapter-1-notes.pdf' },
    { ch: 2, title: 'वस्तुओं के समूह बनाना', url: 'https://www.evidyarthi.in/wp-content/uploads/2021/12/class-6-vigyan-chapter-2-notes.pdf' },
    { ch: 3, title: 'पदार्थों का पृथक्करण', url: 'https://www.evidyarthi.in/wp-content/uploads/2021/12/class-6-vigyan-chapter-3-notes.pdf' },
    { ch: 4, title: 'पौधों को जानिए', url: 'https://www.evidyarthi.in/wp-content/uploads/2021/12/class-6-vigyan-chapter-4-notes.pdf' },
    { ch: 5, title: 'शरीर में गति', url: 'https://www.evidyarthi.in/wp-content/uploads/2021/12/class-6-vigyan-chapter-5-notes.pdf' },
    { ch: 6, title: 'सजीव एवं उनका परिवेश', url: 'https://www.evidyarthi.in/wp-content/uploads/2021/12/class-6-vigyan-chapter-6-notes.pdf' },
    { ch: 7, title: 'गति एवं दूरियों के मापन', url: 'https://www.evidyarthi.in/wp-content/uploads/2021/12/class-6-vigyan-chapter-7-notes.pdf' },
    { ch: 8, title: 'प्रकाश-छायाएँ एवं परावर्तन', url: 'https://www.evidyarthi.in/wp-content/uploads/2021/12/class-6-vigyan-chapter-8-notes.pdf' },
    { ch: 9, title: 'विद्युत् एवं परिपथ', url: 'https://www.evidyarthi.in/wp-content/uploads/2021/12/class-6-vigyan-chapter-9-notes.pdf' },
    { ch: 10, title: 'चुंबकों द्वारा मनोरंजन', url: 'https://www.evidyarthi.in/wp-content/uploads/2021/12/class-6-vigyan-chapter-10-notes.pdf' },
    { ch: 11, title: 'हमारे चारों ओर वायु', url: 'https://www.evidyarthi.in/wp-content/uploads/2021/12/class-6-vigyan-chapter-11-notes.pdf' }
];

function downloadPdf(url, dest) {
    return new Promise((resolve, reject) => {
        const fileStream = fs.createWriteStream(dest);
        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'application/pdf,*/*'
            }
        };

        https.get(url, options, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                // Handle redirect
                return downloadPdf(res.headers.location, dest).then(resolve).catch(reject);
            }
            if (res.statusCode !== 200) {
                fileStream.close();
                fs.unlink(dest, () => {});
                return reject(new Error(`Failed to download ${url}: status code ${res.statusCode}`));
            }

            res.pipe(fileStream);

            fileStream.on('finish', () => {
                fileStream.close(() => {
                    const stats = fs.statSync(dest);
                    const buffer = Buffer.alloc(5);
                    const fd = fs.openSync(dest, 'r');
                    fs.readSync(fd, buffer, 0, 5, 0);
                    fs.closeSync(fd);
                    const header = buffer.toString();
                    if (!header.startsWith('%PDF')) {
                        fs.unlink(dest, () => {});
                        return reject(new Error(`File is not a valid PDF: ${header}`));
                    }
                    resolve({ size: stats.size });
                });
            });
        }).on('error', (err) => {
            fileStream.close();
            fs.unlink(dest, () => {});
            reject(err);
        });
    });
}

async function run() {
    console.log('Downloading 11 Class 6 Hindi Medium Science Chapter Notes...');
    for (const item of chapters) {
        const filename = `class6-hindi-science-ch${item.ch}.pdf`;
        const dest = path.join(targetDir, filename);
        console.log(`Downloading Ch ${item.ch}: "${item.title}" -> ${filename}...`);
        try {
            const res = await downloadPdf(item.url, dest);
            console.log(`  ✓ Successfully downloaded (${(res.size / 1024).toFixed(1)} KB)`);
        } catch (err) {
            console.error(`  ✗ Error downloading Ch ${item.ch}: ${err.message}`);
        }
    }

    // Regenerate pdfManifest.json
    console.log('\nUpdating pdfManifest.json...');
    const manifestPath = path.join(__dirname, '..', 'frontend', 'src', 'data', 'pdfManifest.json');
    let manifest = [];
    if (fs.existsSync(manifestPath)) {
        manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    }

    let addedCount = 0;
    for (const item of chapters) {
        const filename = `class6-hindi-science-ch${item.ch}.pdf`;
        if (!manifest.includes(filename)) {
            manifest.push(filename);
            addedCount++;
        }
    }

    manifest.sort();
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
    console.log(`Updated manifest with ${addedCount} new entries. Total entries: ${manifest.length}`);
}

run();
