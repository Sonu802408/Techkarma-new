async function check() {
  const res = await fetch('https://ncert.nic.in/textbook.php?femh1=1-10', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  });
  const html = await res.text();
  const idx = html.indexOf('omyFrame.src');
  if (idx !== -1) {
    console.log(html.slice(Math.max(0, idx - 800), idx + 800));
  } else {
    console.log('omyFrame.src not found');
  }
}

check().catch(console.error);
