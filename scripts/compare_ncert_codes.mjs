import fs from 'fs';

async function compareCodes() {
  const portalData = JSON.parse(fs.readFileSync('scripts/parsed_ncert_books.json', 'utf8'));
  const { ncertSubjectCodes } = await import('../frontend/src/data/ncertBooksData.js');

  const mismatches = [];
  const matches = [];

  for (const cls of [6, 7, 8, 9, 10, 11, 12]) {
    const clsCodes = ncertSubjectCodes[cls];
    if (!clsCodes) {
      console.log(`Class ${cls} missing entirely in ncertSubjectCodes!`);
      continue;
    }

    for (const [subj, langMap] of Object.entries(clsCodes)) {
      for (const lang of ['en', 'hi']) {
        const parts = langMap[lang] || [];
        for (const p of parts) {
          // Check if p.code exists anywhere in portalData[cls]
          let found = false;
          let foundInSubj = '';
          const portalCls = portalData[cls] || {};
          for (const [pSubj, bookList] of Object.entries(portalCls)) {
            for (const b of bookList) {
              if (b.code === p.code) {
                found = true;
                foundInSubj = pSubj;
                break;
              }
            }
            if (found) break;
          }

          if (found) {
            matches.push({ cls, subj, lang, title: p.title, code: p.code, portalSubj: foundInSubj });
          } else {
            mismatches.push({ cls, subj, lang, title: p.title, code: p.code });
          }
        }
      }
    }
  }

  console.log(`Total matched codes: ${matches.length}`);
  console.log(`Total mismatched/unverified codes: ${mismatches.length}`);
  if (mismatches.length > 0) {
    console.log('Mismatched codes:', JSON.stringify(mismatches, null, 2));
  }
}

compareCodes().catch(console.error);
