import fs from 'fs';

async function parseBookCodes() {
  const res = await fetch('https://ncert.nic.in/textbook.php', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  });
  const html = await res.text();
  fs.writeFileSync('scripts/ncert_portal.html', html);
  console.log('Saved ncert_portal.html, length:', html.length);

  // Search for arrays or options in javascript
  // e.g. class VI books
  const lines = html.split('\n');
  const relevantLines = lines.filter(l => l.includes('class VI') || l.includes('class 6') || l.includes('Ganita') || l.includes('Curiosity') || l.includes('femh') || l.includes('fema'));
  console.log('Relevant lines:', relevantLines.slice(0, 10));
}

parseBookCodes().catch(console.error);
