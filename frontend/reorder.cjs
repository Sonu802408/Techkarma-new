const fs = require('fs');
let content = fs.readFileSync('src/pages/Home.jsx', 'utf8');

// Identify sections
const csSectionStart = content.indexOf('{/* COMPUTER SCIENCE & PROGRAMMING COURSES SECTION */}');
const classSectionStart = content.indexOf('{/* STEP 2: SELECT CLASS */}');
const exploreSectionStart = content.indexOf('{/* COMPUTER SCIENCE CATEGORIES SECTION */}');
const dynamicSectionStart = content.indexOf('{/* STEP 3 & 4: DYNAMIC FLOW */}');
const footerStart = content.indexOf('<footer className="footer">');

// Validate
if (csSectionStart === -1 || classSectionStart === -1 || exploreSectionStart === -1 || dynamicSectionStart === -1 || footerStart === -1) {
    console.error('Could not find one or more sections.');
    process.exit(1);
}

// Ensure exploreSection ends where dynamicSection begins (minus any spacing)
const heroSectionAndBefore = content.substring(0, csSectionStart);
const csSectionContent = content.substring(csSectionStart, classSectionStart);
const classSectionContent = content.substring(classSectionStart, exploreSectionStart);
const dynamicSectionContent = content.substring(dynamicSectionStart, footerStart);
const footerAndAfter = content.substring(footerStart);

// Assemble in new order:
// 1. Hero and before
// 2. Class Section Content
// 3. Dynamic Section Content
// 4. CS Section Content
// 5. Footer and after

// Note: We completely omit the exploreSectionContent (between exploreSectionStart and dynamicSectionStart)
const newContent = heroSectionAndBefore + classSectionContent + dynamicSectionContent + csSectionContent + footerAndAfter;

fs.writeFileSync('src/pages/Home.jsx', newContent);
console.log('Reordered successfully.');
