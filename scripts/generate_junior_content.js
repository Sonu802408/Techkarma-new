// Script to generate high quality junior curriculum engine for classes 6, 7, 8
const fs = require('fs');
const path = require('path');

const outputPath = path.resolve(__dirname, '../frontend/src/data/educationalContent/juniorCurriculumEngine.js');

console.log("Generating Junior Curriculum Engine at:", outputPath);

// Let's create the engine generator script
const generatorCode = `
import { getSubjectName, getChapterName } from '../classesData.js';
import { class6SubjectData } from './class6_curriculum_data.js';
import { class7SubjectData } from './class7_curriculum_data.js';
import { class8SubjectData } from './class8_curriculum_data.js';

export const isJuniorClass = (cls) => {
    const n = parseInt(cls, 10);
    return n === 6 || n === 7 || n === 8;
};

export const getJuniorEducationalContent = ({ classNum, medium, subject, chapterIndex = 0, chapterName, contentType }) => {
    const cls = parseInt(classNum, 10);
    const med = (medium || 'English').toLowerCase() === 'hindi' ? 'Hindi' : 'English';
    const isHindi = med === 'Hindi';
    const chIdx = typeof chapterIndex === 'number' ? chapterIndex : 0;
    const chNum = chIdx + 1;

    let classDataMap = null;
    if (cls === 6) classDataMap = class6SubjectData;
    else if (cls === 7) classDataMap = class7SubjectData;
    else if (cls === 8) classDataMap = class8SubjectData;

    if (!classDataMap) return null;

    // Normalize subject key
    const sLower = (subject || '').toLowerCase();
    let subKey = 'Science';
    if (sLower.includes('math')) subKey = 'Math';
    else if (sLower.includes('social') || sLower.includes('sst')) subKey = 'Social Studies (SST)';
    else if (sLower.includes('english')) subKey = 'English';
    else if (sLower.includes('hindi')) subKey = 'Hindi';
    else if (sLower.includes('sanskrit')) subKey = 'Sanskrit';
    else if (sLower.includes('science')) subKey = 'Science';

    const subjectContent = classDataMap[med]?.[subKey];
    if (!subjectContent) return null;

    // Get chapter content (by 1-based index or modulo wrap)
    const chContent = subjectContent[chNum] || subjectContent[((chIdx) % Object.keys(subjectContent).length) + 1];
    if (!chContent) return null;

    const resolvedChapterTitle = chapterName || (isHindi ? getChapterName(cls, subKey, '', chIdx, 'Hindi') : getChapterName(cls, subKey, '', chIdx, 'English')) || chContent.chapterName;

    return {
        ...chContent,
        chapterName: resolvedChapterTitle,
        notes: {
            ...chContent.notes,
            chapterTitle: resolvedChapterTitle,
            classNum: cls,
            subject: subKey,
            medium: med
        }
    };
};
`;

console.log("Generator skeleton prepared.");
