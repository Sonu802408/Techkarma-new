import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const manifest = JSON.parse(fs.readFileSync('./frontend/src/data/pdfManifest.json', 'utf8'));

async function testAll() {
    const { classesData } = await import('../frontend/src/data/classesData.js');
    const { getNcertChapters } = await import('../frontend/src/data/ncertBooksData.js');
    const allClasses = [...classesData.junior.classes, ...classesData.senior.classes];
    let totalChecks = 0;
    let emptyChapters = [];
    let validChapters = 0;
    let sampleResults = [];

    for (const cls of allClasses) {
        const mediums = Object.keys(classesData[cls]?.mediums || {});
        for (const med of mediums) {
            if (cls < 11) {
                const subjects = Object.keys(classesData[cls]?.mediums?.[med]?.subjects || {});
                for (const sub of subjects) {
                    totalChecks++;
                    const chapters = getNcertChapters({ classNum: cls, subject: sub, medium: med });
                    if (!chapters || chapters.length === 0) {
                        emptyChapters.push({ cls, med, sub });
                    } else {
                        validChapters += chapters.length;
                        if (sampleResults.length < 5) {
                            sampleResults.push({ cls, med, sub, firstCh: chapters[0] });
                        }
                    }
                }
            } else {
                const streams = Object.keys(classesData[cls]?.mediums?.[med]?.streams || {});
                for (const str of streams) {
                    const subjects = Object.keys(classesData[cls]?.mediums?.[med]?.streams?.[str]?.subjects || {});
                    for (const sub of subjects) {
                        totalChecks++;
                        const chapters = getNcertChapters({ classNum: cls, subject: sub, medium: med, stream: str });
                        if (!chapters || chapters.length === 0) {
                            emptyChapters.push({ cls, med, str, sub });
                        } else {
                            validChapters += chapters.length;
                            if (sampleResults.length < 10) {
                                sampleResults.push({ cls, med, str, sub, firstCh: chapters[0] });
                            }
                        }
                    }
                }
            }
        }
    }
    console.log('Total subject carts tested:', totalChecks);
    console.log('Valid chapters generated:', validChapters);
    console.log('Empty chapters count:', emptyChapters.length);
    if (emptyChapters.length > 0) {
        console.log('Empty chapters:', JSON.stringify(emptyChapters, null, 2));
    }
    console.log('Sample chapters:', JSON.stringify(sampleResults.slice(0, 3), null, 2));
}

testAll().catch(console.error);
