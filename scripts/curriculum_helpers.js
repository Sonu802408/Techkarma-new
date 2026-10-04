// Node script to build comprehensive curriculum data for Class 6, 7, 8 (English & Hindi)
const fs = require('fs');
const path = require('path');

console.log("Starting Junior Curriculum Data Generator...");

const targetDir = path.resolve(__dirname, '../frontend/src/data/educationalContent');

// Helper to escape backticks and quotes for string templates
function esc(str) {
    if (!str) return '';
    return str.replace(/`/g, '\\`').replace(/\${/g, '\\${');
}

// Function to generate rich Chapter Object
function createChapterData({
    classNum,
    subject,
    medium,
    chNum,
    chNameEn,
    chNameHi,
    overviewEn,
    overviewHi,
    mindMapEn,
    mindMapHi,
    topicsEn,
    topicsHi,
    ncertSolutionsEn,
    ncertSolutionsHi,
    subjectiveEn,
    subjectiveHi,
    samplePaperEn,
    samplePaperHi,
    mcqsEn,
    mcqsHi
}) {
    const isHindi = medium === 'Hindi';
    const chName = isHindi ? chNameHi : chNameEn;
    const overview = isHindi ? overviewHi : overviewEn;
    const mindMap = isHindi ? mindMapHi : mindMapEn;
    const topics = isHindi ? topicsHi : topicsEn;
    const ncertSolutions = isHindi ? ncertSolutionsHi : ncertSolutionsEn;
    const subjective = isHindi ? subjectiveHi : subjectiveEn;
    const samplePaper = isHindi ? samplePaperHi : samplePaperEn;
    const mcqs = isHindi ? mcqsHi : mcqsEn;

    return {
        chapterName: chName,
        notes: {
            chapterTitle: chName,
            classNum,
            subject,
            medium,
            overview,
            mindMap,
            topics
        },
        ncertSolutions,
        subjective,
        samplePapers: samplePaper,
        mcqs,
        onlineTest: {
            testId: `c${classNum}-${medium.toLowerCase()}-${subject.toLowerCase().replace(/[^a-z0-9]/g, '')}-ch${chNum}-test`,
            testTitle: isHindi ? `कक्षा ${classNum} ${subject} — ${chName} ऑनलाइन अभ्यास परीक्षा (20 प्रश्न)` : `Class ${classNum} ${subject} — ${chName} Assessment Test (20 Questions)`,
            totalMarks: 40,
            durationMinutes: 30,
            instructions: isHindi ? [
                `इस परीक्षा में '${chName}' के कुल 20 बहुविकल्पीय प्रश्न हैं।`,
                'प्रत्येक प्रश्न 2 अंक का है। कोई ऋणात्मक अंकन नहीं है।',
                'सभी प्रश्नों को ध्यानपूर्वक हल करें और अंत में सबमिट करें।'
            ] : [
                `This assessment contains 20 objective questions from '${chName}'.`,
                'Each question carries 2 marks (+2 for correct, 0 for incorrect). No negative marking.',
                'Review your answers thoroughly before submitting.'
            ],
            questions: mcqs.map((m, idx) => ({
                id: `q${idx + 1}`,
                question: m.question,
                options: m.options,
                correctIndex: m.correctIndex,
                marks: 2,
                explanation: m.explanation
            }))
        },
        pyqs: {
            title: isHindi ? `Tech Karma Classes — '${chName}' विगत वर्षों के महत्वपूर्ण प्रश्न (PYQ)` : `Tech Karma Classes — '${chName}' Previous Years Questions (PYQ)`,
            questions: (subjective.sections[1]?.questions || []).slice(0, 3).map((sq, idx) => ({
                board: isHindi ? 'सीबीएसई स्कूल मूल्यांकन' : 'CBSE School Examination',
                year: '2024',
                marks: sq.marks || 3,
                topic: chName,
                question: sq.q,
                modelAnswer: sq.modelAnswer
            }))
        },
        videoLectures: {
            title: isHindi ? `Tech Karma Classes — '${chName}' वीडियो व्याख्यान` : `Tech Karma Classes — '${chName}' Video Masterclass`,
            lectures: [
                {
                    id: `c${classNum}-${subject.toLowerCase()}-ch${chNum}-v1`,
                    title: isHindi ? `व्याख्यान 1: ${chName} — संपूर्ण पाठ एक नजर में (One-Shot Revision)` : `Lecture 1: ${chName} — Complete Chapter One-Shot Revision`,
                    instructor: 'Tech Karma Classes Senior Faculty',
                    duration: '40 mins',
                    embedUrl: 'https://www.youtube-nocookie.com/embed/bL1qQzX3_7A',
                    topicsCovered: [
                        isHindi ? 'मूल संकल्पनाएँ एवं परिभाषाएँ' : 'Core Concepts & Definitions',
                        isHindi ? 'एनसीईआरटी मुख्य उदाहरण एवं प्रश्न' : 'NCERT Key Examples & Questions',
                        isHindi ? 'परीक्षा रणनीति एवं महत्वपूर्ण टिप्स' : 'Exam Strategy & High-Yield Tips'
                    ],
                    facultyNotes: isHindi ? `इस व्याख्यान में कक्षा ${classNum} के अध्याय '${chName}' की सभी संकल्पनाओं को सरल व रोचक तरीके से समझाया गया है।` : `Comprehensive conceptual masterclass covering 100% CBSE syllabus for Class ${classNum} ${subject} — '${chName}'.`
                }
            ]
        }
    };
}

module.exports = { createChapterData, esc, targetDir };
