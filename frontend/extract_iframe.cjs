const fs = require('fs');

const html = fs.readFileSync('page.html', 'utf-8');
const iframeMatch = html.match(/<iframe[^>]+src=["']([^"']+)["']/i);
if (iframeMatch) {
    console.log("Iframe source: ", iframeMatch[1]);
} else {
    console.log("No iframe found in page.html");
}

const allIframes = [...html.matchAll(/<iframe[^>]+src=["']([^"']+)["']/ig)];
console.log("All iframes:", allIframes.map(m => m[1]));
