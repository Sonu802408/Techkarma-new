async function check() {
  const res = await fetch('https://ncert.nic.in/textbook.php?femh1=1-10', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  });
  const html = await res.text();
  console.log('HTML Length:', html.length);
  // find iframes or links or scripts
  const lines = html.split('\n').filter(l => l.includes('.pdf') || l.includes('iframe') || l.includes('femh1'));
  console.log('Lines found:', lines.slice(0, 20));
}

check().catch(console.error);
