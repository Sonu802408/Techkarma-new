// Tech Karma Classes - Official NCERT Textbooks & Chapter PDFs Directory
// Base PDF URL: https://ncert.nic.in/textbook/pdf/{bookCode}{chapterIndex2Digit}.pdf
// Base Portal URL: https://ncert.nic.in/textbook.php?{bookCode}={chapterIndex}-{totalChapters}

import { classesData, getSubjectName, getChapterName } from './classesData.js';
import pdfManifest from './pdfManifest.json';

// Map subjects and parts to official 5-letter NCERT codes
export const ncertSubjectCodes = {
    12: {
        'Physics': {
            en: [
                { code: 'leph1', chapters: 8, title: 'Physics - Part I' },
                { code: 'leph2', chapters: 6, title: 'Physics - Part II' }
            ],
            hi: [
                { code: 'lhph1', chapters: 8, title: 'भौतिकी - भाग I' },
                { code: 'lhph2', chapters: 6, title: 'भौतिकी - भाग II' }
            ]
        },
        'Chemistry': {
            en: [
                { code: 'lech1', chapters: 5, title: 'Chemistry - Part I' },
                { code: 'lech2', chapters: 5, title: 'Chemistry - Part II' }
            ],
            hi: [
                { code: 'lhch1', chapters: 5, title: 'रसायन विज्ञान - भाग I' },
                { code: 'lhch2', chapters: 5, title: 'रसायन विज्ञान - भाग II' }
            ]
        },
        'Mathematics': {
            en: [
                { code: 'lemh1', chapters: 6, title: 'Mathematics - Part I' },
                { code: 'lemh2', chapters: 7, title: 'Mathematics - Part II' }
            ],
            hi: [
                { code: 'lhmh1', chapters: 6, title: 'गणित - भाग I' },
                { code: 'lhmh2', chapters: 7, title: 'गणित - भाग II' }
            ]
        },
        'Biology': {
            en: [{ code: 'lebo1', chapters: 13, title: 'Biology' }],
            hi: [{ code: 'lhbo1', chapters: 13, title: 'जीव विज्ञान' }]
        },
        'Computer Science': {
            en: [{ code: 'lecs1', chapters: 8, title: 'Computer Science (Python)' }]
        },
        'Accountancy': {
            en: [
                { code: 'leac1', chapters: 5, title: 'Accountancy - Part I' },
                { code: 'leac2', chapters: 6, title: 'Accountancy - Part II' }
            ],
            hi: [
                { code: 'lhac1', chapters: 5, title: 'लेखाशास्त्र - भाग I' },
                { code: 'lhac2', chapters: 6, title: 'लेखाशास्त्र - भाग II' }
            ]
        },
        'Business Studies': {
            en: [
                { code: 'lebs1', chapters: 8, title: 'Business Studies - Part I' },
                { code: 'lebs2', chapters: 4, title: 'Business Studies - Part II' }
            ],
            hi: [
                { code: 'lhbs1', chapters: 8, title: 'व्यवसाय अध्ययन - भाग I' },
                { code: 'lhbs2', chapters: 4, title: 'व्यवसाय अध्ययन - भाग II' }
            ]
        },
        'Economics': {
            en: [
                { code: 'leec1', chapters: 6, title: 'Introductory Macroeconomics' },
                { code: 'leec2', chapters: 8, title: 'Indian Economic Development' }
            ],
            hi: [
                { code: 'lhec1', chapters: 6, title: 'समष्टि अर्थशास्त्र एक परिचय' },
                { code: 'lhec2', chapters: 8, title: 'भारतीय अर्थव्यवस्था का विकास' }
            ]
        },
        'History': {
            en: [
                { code: 'lehs1', chapters: 4, title: 'Themes in Indian History - Part I' },
                { code: 'lehs2', chapters: 4, title: 'Themes in Indian History - Part II' },
                { code: 'lehs3', chapters: 4, title: 'Themes in Indian History - Part III' }
            ],
            hi: [
                { code: 'lhhs1', chapters: 4, title: 'भारतीय इतिहास के कुछ विषय - भाग I' },
                { code: 'lhhs2', chapters: 4, title: 'भारतीय इतिहास के कुछ विषय - भाग II' },
                { code: 'lhhs3', chapters: 4, title: 'भारतीय इतिहास के कुछ विषय - भाग III' }
            ]
        },
        'Geography': {
            en: [
                { code: 'legy1', chapters: 8, title: 'Fundamentals of Human Geography' },
                { code: 'legy2', chapters: 9, title: 'India - People and Economy' }
            ],
            hi: [
                { code: 'lhgy1', chapters: 8, title: 'मानव भूगोल के मूल सिद्धांत' },
                { code: 'lhgy2', chapters: 9, title: 'भारत: लोग और अर्थव्यवस्था' }
            ]
        },
        'Political Science': {
            en: [
                { code: 'leps1', chapters: 7, title: 'Contemporary World Politics' },
                { code: 'leps2', chapters: 8, title: 'Politics in India Since Independence' }
            ],
            hi: [
                { code: 'lhps1', chapters: 7, title: 'समकालीन विश्व राजनीति' },
                { code: 'lhps2', chapters: 8, title: 'स्वतंत्र भारत में राजनीति' }
            ]
        },
        'Sociology': {
            en: [
                { code: 'lesy1', chapters: 6, title: 'Indian Society' },
                { code: 'lesy2', chapters: 5, title: 'Social Change and Development in India' }
            ],
            hi: [
                { code: 'lhsy1', chapters: 6, title: 'भारतीय समाज' },
                { code: 'lhsy2', chapters: 5, title: 'भारत में सामाजिक परिवर्तन एवं विकास' }
            ]
        },
        'English': {
            en: [
                { code: 'lefl1', chapters: 14, title: 'Flamingo' },
                { code: 'levi1', chapters: 8, title: 'Vistas' }
            ]
        },
        'Hindi': {
            hi: [
                { code: 'lhat1', chapters: 14, title: 'आरोह भाग 2' },
                { code: 'lhan1', chapters: 14, title: 'अंतरा भाग 2' },
                { code: 'lhvt1', chapters: 4, title: 'वितान भाग 2' }
            ]
        },
        'Sanskrit': {
            hi: [
                { code: 'lhsk1', chapters: 10, title: 'भास्वती भाग 2' },
                { code: 'lhsh1', chapters: 12, title: 'शाश्वती भाग 2' }
            ]
        }
    },
    11: {
        'Physics': {
            en: [
                { code: 'keph1', chapters: 7, title: 'Physics - Part I' },
                { code: 'keph2', chapters: 7, title: 'Physics - Part II' }
            ],
            hi: [
                { code: 'khph1', chapters: 7, title: 'भौतिकी - भाग I' },
                { code: 'khph2', chapters: 7, title: 'भौतिकी - भाग II' }
            ]
        },
        'Chemistry': {
            en: [
                { code: 'kech1', chapters: 5, title: 'Chemistry - Part I' },
                { code: 'kech2', chapters: 4, title: 'Chemistry - Part II' }
            ],
            hi: [
                { code: 'khch1', chapters: 5, title: 'रसायन विज्ञान - भाग I' },
                { code: 'khch2', chapters: 4, title: 'रसायन विज्ञान - भाग II' }
            ]
        },
        'Mathematics': {
            en: [{ code: 'kemh1', chapters: 14, title: 'Mathematics' }],
            hi: [{ code: 'khmh1', chapters: 14, title: 'गणित' }]
        },
        'Biology': {
            en: [{ code: 'kebo1', chapters: 19, title: 'Biology' }],
            hi: [{ code: 'khbo1', chapters: 19, title: 'जीव विज्ञान' }]
        },
        'Computer Science': {
            en: [{ code: 'kecs1', chapters: 11, title: 'Computer Science (Python)' }]
        },
        'Accountancy': {
            en: [
                { code: 'keac1', chapters: 7, title: 'Financial Accounting - Part I' },
                { code: 'keac2', chapters: 4, title: 'Financial Accounting - Part II' }
            ],
            hi: [
                { code: 'khac1', chapters: 7, title: 'वित्तीय लेखांकन - भाग I' },
                { code: 'khac2', chapters: 4, title: 'वित्तीय लेखांकन - भाग II' }
            ]
        },
        'Business Studies': {
            en: [{ code: 'kebs1', chapters: 11, title: 'Business Studies' }],
            hi: [{ code: 'khbs1', chapters: 11, title: 'व्यवसाय अध्ययन' }]
        },
        'Economics': {
            en: [
                { code: 'kest1', chapters: 8, title: 'Statistics for Economics' },
                { code: 'keec1', chapters: 6, title: 'Introductory Microeconomics' }
            ],
            hi: [
                { code: 'khst1', chapters: 8, title: 'सांख्यिकी' },
                { code: 'khec1', chapters: 6, title: 'व्यष्टि अर्थशास्त्र एक परिचय' }
            ]
        },
        'History': {
            en: [{ code: 'kehs1', chapters: 7, title: 'Themes in World History' }],
            hi: [{ code: 'khhs1', chapters: 7, title: 'विश्व इतिहास के कुछ विषय' }]
        },
        'Geography': {
            en: [
                { code: 'kegy1', chapters: 14, title: 'Fundamentals of Physical Geography' },
                { code: 'kegy2', chapters: 6, title: 'India - Physical Environment' }
            ],
            hi: [
                { code: 'khgy1', chapters: 14, title: 'भौतिक भूगोल के मूल सिद्धांत' },
                { code: 'khgy2', chapters: 6, title: 'भारत: भौतिक पर्यावरण' }
            ]
        },
        'Political Science': {
            en: [
                { code: 'keps1', chapters: 10, title: 'Indian Constitution at Work' },
                { code: 'keps2', chapters: 8, title: 'Political Theory' }
            ],
            hi: [
                { code: 'khps1', chapters: 10, title: 'भारत का संविधान: सिद्धांत और व्यवहार' },
                { code: 'khps2', chapters: 8, title: 'राजनीतिक सिद्धांत' }
            ]
        },
        'Sociology': {
            en: [
                { code: 'kesy1', chapters: 5, title: 'Introducing Sociology' },
                { code: 'kesy2', chapters: 5, title: 'Understanding Society' }
            ],
            hi: [
                { code: 'khsy1', chapters: 5, title: 'समाजशास्त्र परिचय' },
                { code: 'khsy2', chapters: 5, title: 'समाज का बोध' }
            ]
        },
        'English': {
            en: [
                { code: 'kehb1', chapters: 8, title: 'Hornbill' },
                { code: 'kess1', chapters: 5, title: 'Snapshots' }
            ]
        },
        'Hindi': {
            hi: [
                { code: 'khat1', chapters: 14, title: 'आरोह भाग 1' },
                { code: 'khan1', chapters: 16, title: 'अंतरा भाग 1' },
                { code: 'khvt1', chapters: 4, title: 'वितान भाग 1' }
            ]
        },
        'Sanskrit': {
            hi: [
                { code: 'khsk1', chapters: 10, title: 'भास्वती भाग 1' },
                { code: 'khsh1', chapters: 12, title: 'शाश्वती भाग 1' }
            ]
        }
    },
    10: {
        'Math': {
            en: [{ code: 'jemh1', chapters: 14, title: 'Mathematics' }],
            hi: [{ code: 'jhmh1', chapters: 14, title: 'गणित' }]
        },
        'Mathematics': {
            en: [{ code: 'jemh1', chapters: 14, title: 'Mathematics' }],
            hi: [{ code: 'jhmh1', chapters: 14, title: 'गणित' }]
        },
        'Science': {
            en: [{ code: 'jesc1', chapters: 13, title: 'Science' }],
            hi: [{ code: 'jhsc1', chapters: 13, title: 'विज्ञान' }]
        },
        'Social Studies (SST)': {
            en: [
                { code: 'jess3', chapters: 5, title: 'India and Contemporary World II (History)' },
                { code: 'jess1', chapters: 7, title: 'Contemporary India II (Geography)' },
                { code: 'jess4', chapters: 5, title: 'Democratic Politics II (Civics)' },
                { code: 'jess2', chapters: 5, title: 'Understanding Economic Development' }
            ],
            hi: [
                { code: 'jhss3', chapters: 5, title: 'भारत और समकालीन विश्व II (इतिहास)' },
                { code: 'jhss1', chapters: 7, title: 'समकालीन भारत II (भूगोल)' },
                { code: 'jhss4', chapters: 5, title: 'लोकतांत्रिक राजनीति II (नागरिक शास्त्र)' },
                { code: 'jhss2', chapters: 5, title: 'आर्थिक विकास की समझ' }
            ]
        },
        'English': {
            en: [
                { code: 'jeff1', chapters: 9, title: 'First Flight' },
                { code: 'jefp1', chapters: 9, title: 'Footprints without Feet' }
            ]
        },
        'Hindi': {
            hi: [
                { code: 'jhks1', chapters: 10, title: 'क्षितिज भाग 2' },
                { code: 'jhkr1', chapters: 3, title: 'कृतिका भाग 2' }
            ]
        },
        'Sanskrit': {
            hi: [{ code: 'jhsk1', chapters: 10, title: 'शेमुषी भाग 2' }]
        }
    },
    9: {
        'Math': {
            en: [{ code: 'iemh1', chapters: 12, title: 'Mathematics' }],
            hi: [{ code: 'ihmh1', chapters: 12, title: 'गणित' }]
        },
        'Mathematics': {
            en: [{ code: 'iemh1', chapters: 12, title: 'Mathematics' }],
            hi: [{ code: 'ihmh1', chapters: 12, title: 'गणित' }]
        },
        'Science': {
            en: [{ code: 'iesc1', chapters: 12, title: 'Science' }],
            hi: [{ code: 'ihsc1', chapters: 12, title: 'विज्ञान' }]
        },
        'Social Studies (SST)': {
            en: [
                { code: 'iess3', chapters: 5, title: 'India and Contemporary World I (History)' },
                { code: 'iess1', chapters: 6, title: 'Contemporary India I (Geography)' },
                { code: 'iess4', chapters: 5, title: 'Democratic Politics I (Civics)' },
                { code: 'iess2', chapters: 4, title: 'Economics' }
            ],
            hi: [
                { code: 'ihss3', chapters: 5, title: 'भारत और समकालीन विश्व I (इतिहास)' },
                { code: 'ihss1', chapters: 6, title: 'समकालीन भारत I (भूगोल)' },
                { code: 'ihss4', chapters: 5, title: 'लोकतांत्रिक राजनीति I (नागरिक शास्त्र)' },
                { code: 'ihss2', chapters: 4, title: 'अर्थशास्त्र' }
            ]
        },
        'English': {
            en: [
                { code: 'iebe1', chapters: 9, title: 'Beehive' },
                { code: 'iemo1', chapters: 9, title: 'Moments' }
            ]
        },
        'Hindi': {
            hi: [{ code: 'ihks1', chapters: 10, title: 'क्षितिज भाग 1' }]
        },
        'Sanskrit': {
            hi: [{ code: 'ihsk1', chapters: 10, title: 'शेमुषी भाग 1' }]
        }
    },
    8: {
        'Math': {
            en: [{ code: 'hemh1', chapters: 13, title: 'Mathematics' }],
            hi: [{ code: 'hhmh1', chapters: 13, title: 'गणित' }]
        },
        'Mathematics': {
            en: [{ code: 'hemh1', chapters: 13, title: 'Mathematics' }],
            hi: [{ code: 'hhmh1', chapters: 13, title: 'गणित' }]
        },
        'Science': {
            en: [{ code: 'hesc1', chapters: 13, title: 'Science' }],
            hi: [{ code: 'hhsc1', chapters: 13, title: 'विज्ञान' }]
        },
        'Social Studies (SST)': {
            en: [
                { code: 'hess1', chapters: 8, title: 'Our Pasts - III (History)' },
                { code: 'hess2', chapters: 5, title: 'Resources and Development' },
                { code: 'hess3', chapters: 8, title: 'Social and Political Life - III' }
            ],
            hi: [
                { code: 'hhss1', chapters: 8, title: 'हमारे अतीत - III (इतिहास)' },
                { code: 'hhss2', chapters: 5, title: 'संसाधन एवं विकास' },
                { code: 'hhss3', chapters: 8, title: 'सामाजिक एवं राजनीतिक जीवन - III' }
            ]
        },
        'English': {
            en: [{ code: 'hehd1', chapters: 8, title: 'Honeydew' }]
        },
        'Hindi': {
            hi: [{ code: 'hhvs1', chapters: 13, title: 'वसंत भाग 3' }]
        },
        'Sanskrit': {
            hi: [{ code: 'hhsk1', chapters: 14, title: 'रुचिरा भाग 3' }]
        }
    },
    7: {
        'Math': {
            en: [{ code: 'gemh1', chapters: 13, title: 'Mathematics' }],
            hi: [{ code: 'ghmh1', chapters: 13, title: 'गणित' }]
        },
        'Mathematics': {
            en: [{ code: 'gemh1', chapters: 13, title: 'Mathematics' }],
            hi: [{ code: 'ghmh1', chapters: 13, title: 'गणित' }]
        },
        'Science': {
            en: [{ code: 'gesc1', chapters: 13, title: 'Science' }],
            hi: [{ code: 'ghsc1', chapters: 13, title: 'विज्ञान' }]
        },
        'Social Studies (SST)': {
            en: [
                { code: 'gess1', chapters: 8, title: 'Our Pasts - II (History)' },
                { code: 'gess2', chapters: 7, title: 'Our Environment' },
                { code: 'gess3', chapters: 8, title: 'Social and Political Life - II' }
            ],
            hi: [
                { code: 'ghss1', chapters: 8, title: 'हमारे अतीत - II (इतिहास)' },
                { code: 'ghss2', chapters: 7, title: 'हमारा पर्यावरण' },
                { code: 'ghss3', chapters: 8, title: 'सामाजिक एवं राजनीतिक जीवन - II' }
            ]
        },
        'English': {
            en: [{ code: 'gehc1', chapters: 8, title: 'Honeycomb' }]
        },
        'Hindi': {
            hi: [{ code: 'ghvs1', chapters: 13, title: 'वसंत भाग 2' }]
        },
        'Sanskrit': {
            hi: [{ code: 'ghsk1', chapters: 13, title: 'रुचिरा भाग 2' }]
        }
    },
    6: {
        'Math': {
            en: [{ code: 'femh1', chapters: 10, title: 'Ganita Prakash' }],
            hi: [{ code: 'fhmh1', chapters: 10, title: 'गणित प्रकाश' }]
        },
        'Mathematics': {
            en: [{ code: 'femh1', chapters: 10, title: 'Ganita Prakash' }],
            hi: [{ code: 'fhmh1', chapters: 10, title: 'गणित प्रकाश' }]
        },
        'Science': {
            en: [{ code: 'fesc1', chapters: 12, title: 'Curiosity (Science)' }],
            hi: [{ code: 'fhsc1', chapters: 12, title: 'जिज्ञासा (विज्ञान)' }]
        },
        'Social Studies (SST)': {
            en: [{ code: 'fess1', chapters: 12, title: 'Exploring Society: India and Beyond' }],
            hi: [{ code: 'fhss1', chapters: 12, title: 'समाज का अध्ययन' }]
        },
        'English': {
            en: [{ code: 'feen1', chapters: 5, title: 'Poorvi' }]
        },
        'Hindi': {
            hi: [{ code: 'fhhn1', chapters: 10, title: 'मल्हार' }]
        },
        'Sanskrit': {
            hi: [{ code: 'fhsk1', chapters: 10, title: 'दीपकम' }]
        }
    }
};

// Helper: Format 2-digit chapter index
export const format2Digit = (num) => String(num).padStart(2, '0');

// Comprehensive subject finder with alias normalization
export const findSubjectEntry = (cls, subject) => {
    if (!ncertSubjectCodes[cls]) return null;
    if (ncertSubjectCodes[cls][subject]) return ncertSubjectCodes[cls][subject];

    const s = (subject || '').toLowerCase().trim();
    if (!s) return null;

    // Direct case-insensitive key search
    for (const [key, val] of Object.entries(ncertSubjectCodes[cls])) {
        if (key.toLowerCase().trim() === s) return val;
    }

    // Alias matches
    if (s === 'math' || s === 'mathematics' || s === 'maths' || s.startsWith('math')) {
        return ncertSubjectCodes[cls]['Mathematics'] || ncertSubjectCodes[cls]['Math'];
    }
    if (s.includes('social') || s.includes('sst') || s === 'social studies') {
        return ncertSubjectCodes[cls]['Social Studies (SST)'];
    }
    if (s.includes('computer') || s.includes('python') || s === 'cs') {
        return ncertSubjectCodes[cls]['Computer Science'];
    }
    if (s.includes('business') || s === 'bst') {
        return ncertSubjectCodes[cls]['Business Studies'];
    }
    if (s.includes('physic')) return ncertSubjectCodes[cls]['Physics'];
    if (s.includes('chemist')) return ncertSubjectCodes[cls]['Chemistry'];
    if (s.includes('bio')) return ncertSubjectCodes[cls]['Biology'];
    if (s.includes('account')) return ncertSubjectCodes[cls]['Accountancy'];
    if (s.includes('econom')) return ncertSubjectCodes[cls]['Economics'];
    if (s.includes('histor')) return ncertSubjectCodes[cls]['History'];
    if (s.includes('geograph')) return ncertSubjectCodes[cls]['Geography'];
    if (s.includes('politic')) return ncertSubjectCodes[cls]['Political Science'];
    if (s.includes('sociolog')) return ncertSubjectCodes[cls]['Sociology'];
    if (s.includes('english')) return ncertSubjectCodes[cls]['English'];
    if (s.includes('hindi')) return ncertSubjectCodes[cls]['Hindi'];
    if (s.includes('sanskrit')) return ncertSubjectCodes[cls]['Sanskrit'];
    if (s.includes('science')) return ncertSubjectCodes[cls]['Science'];

    return null;
};

// Get Chapter-wise list for selected Class, Subject, Medium & Stream
export const getNcertChapters = ({ classNum, subject, medium, stream }) => {
    const cls = parseInt(classNum, 10);
    const medKey = (medium || 'English').toLowerCase() === 'hindi' ? 'hi' : 'en';

    const subjectEntry = findSubjectEntry(cls, subject);

    // Fallback: If requested language medium not defined for subject (e.g. Hindi/Sanskrit textbook when medium=English, or English/CS when medium=Hindi), fallback to the available language parts
    const parts = (medKey === 'hi' 
        ? (subjectEntry?.hi || subjectEntry?.en) 
        : (subjectEntry?.en || subjectEntry?.hi)) || [];

    // Get syllabus chapters array from classesData if available
    let rawSyllabusChapters = [];
    if (cls >= 11) {
        rawSyllabusChapters = classesData[cls]?.mediums?.[medium]?.streams?.[stream]?.subjects?.[subject]?.['notes'] ||
            classesData[cls]?.mediums?.['English']?.streams?.[stream]?.subjects?.[subject]?.['notes'] || [];
    } else {
        rawSyllabusChapters = classesData[cls]?.mediums?.[medium]?.subjects?.[subject]?.['notes'] ||
            classesData[cls]?.mediums?.['English']?.subjects?.[subject]?.['notes'] || [];
    }

    if (parts.length === 0) {
        // Fallback for subjects without configured NCERT book code
        return rawSyllabusChapters.map((chName, idx) => {
            const chNum = idx + 1;
            const translatedTitle = getChapterName(cls, subject, chName, idx, medium);
            return {
                chapterNumber: chNum,
                title: translatedTitle,
                bookTitle: `NCERT ${getSubjectName(subject, medium)}`,
                bookCode: 'NCERT',
                partTitle: '',
                pdfUrl: `https://ncert.nic.in/textbook.php`,
                portalUrl: `https://ncert.nic.in/textbook.php`,
                status: 'unavailable'
            };
        });
    }

    const result = [];
    let globalChapterIndex = 0;

    parts.forEach((part) => {
        for (let chInPart = 1; chInPart <= part.chapters; chInPart++) {
            globalChapterIndex++;
            const chNum = globalChapterIndex;
            const syllabusTitle = rawSyllabusChapters[chNum - 1] || `${part.title} - Chapter ${chInPart}`;
            const translatedTitle = getChapterName(cls, subject, syllabusTitle, chNum - 1, medium);

            const directPdfUrl = `https://ncert.nic.in/textbook/pdf/${part.code}${format2Digit(chInPart)}.pdf`;
            const portalUrl = `https://ncert.nic.in/textbook.php?${part.code}=${chInPart}-${part.chapters}`;

            result.push({
                chapterNumber: chNum,
                chapterInPart: chInPart,
                title: translatedTitle,
                bookTitle: part.title || `NCERT ${getSubjectName(subject, medium)}`,
                bookCode: part.code,
                partTitle: parts.length > 1 ? part.title : '',
                pdfUrl: directPdfUrl,
                portalUrl: portalUrl,
                totalChaptersInPart: part.chapters,
                status: 'active'
            });
        }
    });

    return result;
};

// Books overview helper
export const getNcertBooks = ({ classNum, subject, medium, stream }) => {
    const cls = parseInt(classNum, 10);
    const medKey = (medium || 'English').toLowerCase() === 'hindi' ? 'hi' : 'en';

    const subjectEntry = findSubjectEntry(cls, subject);

    const parts = (medKey === 'hi' 
        ? (subjectEntry?.hi || subjectEntry?.en) 
        : (subjectEntry?.en || subjectEntry?.hi)) || [];

    return parts.map((p, idx) => ({
        id: `ncert-c${cls}-${p.code}`,
        class: cls,
        subject: subject,
        medium: medium || 'English',
        stream: stream || '',
        title: p.title,
        bookCode: p.code,
        totalChapters: p.chapters,
        officialUrl: `https://ncert.nic.in/textbook.php?${p.code}=0-${p.chapters}`,
        directPdfBase: `https://ncert.nic.in/textbook/pdf/${p.code}`,
        status: 'active',
        order: idx + 1,
        description: `Official NCERT textbook for Class ${cls} ${getSubjectName(subject, medium)} (${p.title}).`
    }));
};

// Chapter URL helper for official portal links
export const getNcertChapterUrl = (bookCode, chapterIndex, totalChapters = 15) => {
    const chNum = chapterIndex + 1;
    return `https://ncert.nic.in/textbook.php?${bookCode}=${chNum}-${totalChapters}`;
};

// Helper: Get direct NCERT PDF link for any chapter number or index
export const getDirectNcertChapterPdf = (classNum, subject, medium, chapterNumOrIndex, stream = '') => {
    const chapters = getNcertChapters({ classNum, subject, medium, stream });
    if (!chapters || chapters.length === 0) return null;

    if (typeof chapterNumOrIndex === 'number') {
        // 1-based index (e.g. Chapter 1 => chapters[0])
        if (chapterNumOrIndex >= 1 && chapterNumOrIndex <= chapters.length) {
            const ch = chapters[chapterNumOrIndex - 1];
            if (ch && ch.status === 'active') return ch.pdfUrl;
        }
        // 0-based index
        if (chapterNumOrIndex >= 0 && chapterNumOrIndex < chapters.length) {
            const ch = chapters[chapterNumOrIndex];
            if (ch && ch.status === 'active') return ch.pdfUrl;
        }
    }
    return chapters[0]?.pdfUrl || null;
};

export const resolveClassPdfUrl = (classNum, subject, medium, contentType, chapterIndex, stream = '') => {
    const cls = parseInt(classNum, 10);
    const med = (medium || 'English').toLowerCase();
    const chNum = chapterIndex + 1;
    const subLower = (subject || '').toLowerCase();

    const manifestSet = new Set(pdfManifest || []);

    const subCandidates = [];
    if (subLower.includes('social') || subLower.includes('sst')) {
        subCandidates.push('socialstudies', 'social-studies-sst', 'social');
    } else if (subLower.includes('math')) {
        subCandidates.push('math', 'mathematics');
    } else if (subLower.includes('computer')) {
        subCandidates.push('computerscience', 'computer');
    } else if (subLower.includes('business')) {
        subCandidates.push('businessstudies', 'business');
    } else if (subLower.includes('political')) {
        subCandidates.push('politicalscience', 'political');
    } else {
        subCandidates.push(subLower.replace(/[^a-z0-9]/gi, ''));
    }

    const typeCandidates = [];
    if (contentType === 'notes') {
        typeCandidates.push('', 'notes');
    } else if (contentType === 'books' || contentType === 'ncert-books') {
        typeCandidates.push('books', '', 'books-ch');
    } else {
        typeCandidates.push(contentType, `${contentType}-ch`, '');
    }

    for (const subCandidate of subCandidates) {
        for (const typeCandidate of typeCandidates) {
            const infix = typeCandidate ? `-${typeCandidate}` : '';
            const filename = `class${cls}-${med}-${subCandidate}${infix}-ch${chNum}.pdf`;
            if (manifestSet.has(filename)) {
                return `/pdfs/${filename}`;
            }
        }
    }

    const prefix = `class${cls}-${med}-${subCandidates[0]}`;
    const chSuffix = `-ch${chNum}.pdf`;
    for (const file of pdfManifest || []) {
        if (file.startsWith(prefix) && file.endsWith(chSuffix)) {
            return `/pdfs/${file}`;
        }
    }

    return getDirectNcertChapterPdf(classNum, subject, medium, chNum, stream);
};

export const ncertBooksData = [];
// Populate flat list for Admin Dashboard
Object.entries(ncertSubjectCodes).forEach(([clsStr, subMap]) => {
    const cls = parseInt(clsStr, 10);
    Object.entries(subMap).forEach(([sub, medObj]) => {
        ['en', 'hi'].forEach(lang => {
            if (medObj[lang]) {
                medObj[lang].forEach((part, pIdx) => {
                    ncertBooksData.push({
                        id: `ncert-c${cls}-${part.code}`,
                        class: cls,
                        subject: sub,
                        medium: lang === 'hi' ? 'Hindi' : 'English',
                        stream: cls >= 11 ? (['Physics', 'Chemistry', 'Biology'].includes(sub) ? 'science' : (['Accountancy', 'Business Studies'].includes(sub) ? 'commerce' : 'arts')) : '',
                        title: part.title,
                        bookCode: part.code,
                        totalChapters: part.chapters,
                        officialUrl: `https://ncert.nic.in/textbook.php?${part.code}=0-${part.chapters}`,
                        status: 'active',
                        order: pIdx + 1
                    });
                });
            }
        });
    });
});

export default ncertBooksData;

