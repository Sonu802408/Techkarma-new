const https = require('https');
const fs = require('fs');

https.get('https://notesstreet.in/2023/08/ncert-notes-for-class-10-%e0%a4%87%e0%a4%a4%e0%a4%bf%e0%a4%b9%e0%a4%be%e0%a4%b8-ch-03-%e0%a4%ad%e0%a5%82%e0%a4%ae%e0%a4%82%e0%a4%a1%e0%a4%b2%e0%a5%80%e0%a4%95%e0%a5%83%e0%a4%a4-%e0%a4%b5%e0%a4%bf.html', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        fs.writeFileSync('chapter1_raw.html', data);
        console.log("Written raw HTML");
    });
});
