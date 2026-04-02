const puppeteer = require('puppeteer');
const fs = require('fs');

const targetPages = {
    'math': {
        'notes': 'https://notesstreet.in/2022/06/ncert-class-7-math-notes.html',
        'ncert-solution': 'https://notesstreet.in/2022/06/ncert-solution-for-class-7-math.html',
        'mcqs': 'https://notesstreet.in/2022/06/ncert-class-7-math-mcqs.html',
        'books': 'https://notesstreet.in/2022/05/ncert-class-7-math-books-hindi-and-english-medium.html'
    },
    'science': {
        'notes': 'https://notesstreet.in/2022/06/ncert-class-7-science-notes.html',
        'ncert-solution': 'https://notesstreet.in/2022/06/ncert-solution-for-class-7-science.html',
        'mcqs': 'https://notesstreet.in/2022/06/ncert-class-7-science-mcqs.html',
        'books': 'https://notesstreet.in/2022/05/ncert-class-7-science-books-in-hindi-and-english.html'
    },
    'socialstudies': {
        'notes': 'https://notesstreet.in/2022/06/ncert-class-7-social-science-notes.html',
        'ncert-solution': 'https://notesstreet.in/2022/06/ncert-solution-for-class-7-social-science.html',
        'mcqs': 'https://notesstreet.in/2022/06/ncert-class-7-social-science-mcqs.html',
        'books': 'https://notesstreet.in/2022/05/ncert-class-7-social-science-books.html'
    }
};

async function run() {
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    const results = {
        'math': {},
        'science': {},
        'socialstudies': {}
    };

    for (let [subject, types] of Object.entries(targetPages)) {
        for (let [contentType, url] of Object.entries(types)) {
            console.log(`Navigating to ${subject} - ${contentType}: ${url}`);

            try {
                await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

                const chapters = await page.evaluate(() => {
                    const results = [];
                    // We will parse the page from top to bottom.
                    // When we see "English" we set medium to english. When we see "Hindi" we set medium to hindi.
                    let currentMedium = 'hindi'; // Usually hindi comes first or is the default

                    // The main content is usually inside an entry-content div or just look at all headers/links
                    const container = document.querySelector('.entry-content') || document.body;

                    // Gather all elements in the container sequentially
                    const elements = Array.from(container.querySelectorAll('h2, h3, h4, h5, a'));

                    for (let el of elements) {
                        const text = el.innerText.trim().toLowerCase();
                        if (!text) continue;

                        if (el.tagName.startsWith('H')) {
                            if (text.includes('english')) currentMedium = 'english';
                            else if (text.includes('hindi') || text.includes('हिंदी')) currentMedium = 'hindi';
                        } else if (el.tagName === 'A' && el.href) {
                            const hr = el.href.toLowerCase();
                            // If the text has "chapter" or the href has "chapter" or it matches "ch - \d"
                            if (
                                (text.includes('chapter') || text.match(/^ch\s*(-|\.)?\s*\d+/i) || text.match(/^\d+\./) || hr.includes('chapter')) &&
                                !hr.includes('#') && hr.includes('notesstreet.in') // Must be an internal link
                            ) {
                                // Sometimes the anchor text also has medium hint
                                let linkMedium = currentMedium;
                                if (text.includes('english')) linkMedium = 'english';
                                if (text.includes('hindi') || text.includes('हिंदी')) linkMedium = 'hindi';

                                results.push({
                                    medium: linkMedium,
                                    text: el.innerText.trim(),
                                    url: el.href
                                });
                            }
                        }
                    }
                    return results;
                });

                // Keep only unique URLs
                const uniqueChapters = [];
                const seenUrls = new Set();
                for (let ch of chapters) {
                    if (!seenUrls.has(ch.url)) {
                        seenUrls.add(ch.url);
                        uniqueChapters.push(ch);
                    }
                }

                results[subject][contentType] = uniqueChapters;
                console.log(`  -> Found ${uniqueChapters.length} chapters.`);
            } catch (err) {
                console.log(`  -> Failed to load or extract: ${err.message}`);
                results[subject][contentType] = [];
            }
        }
    }

    fs.writeFileSync('class7_links.json', JSON.stringify(results, null, 2));
    console.log("Done generating class7_links.json");
    await browser.close();
}

run().catch(console.error);
