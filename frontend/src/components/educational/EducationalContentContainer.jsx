import React, { useState, useEffect } from 'react';
import { getEducationalContent } from '../../data/educationalContent/index.js';
import McqViewer from './McqViewer.jsx';
import OnlineTestRunner from './OnlineTestRunner.jsx';
import NcertSolutionsViewer from './NcertSolutionsViewer.jsx';
import SubjectiveViewer from './SubjectiveViewer.jsx';
import SamplePaperViewer from './SamplePaperViewer.jsx';
import PyqViewer from './PyqViewer.jsx';
import VideoLecturesViewer from './VideoLecturesViewer.jsx';
import { Layers } from 'lucide-react';
import { resolveClassPdfUrl } from '../../data/ncertBooksData.js';
import { getLocalMaterials } from '../../services/materialsService.js';

const EducationalContentContainer = ({
    activeClass,
    activeMedium = 'English',
    activeSubject,
    activeStream = '',
    activeContent,
    chapters = [],
    initialChapterIndex = 0
}) => {
    const [selectedChapterIdx, setSelectedChapterIdx] = useState(initialChapterIndex || 0);
    const [customMaterials, setCustomMaterials] = useState(() => getLocalMaterials());

    useEffect(() => {
        const handleUpdate = () => setCustomMaterials(getLocalMaterials());
        window.addEventListener('techkarma_materials_updated', handleUpdate);
        return () => window.removeEventListener('techkarma_materials_updated', handleUpdate);
    }, []);

    const currentChapterName = chapters[selectedChapterIdx] || `Chapter ${selectedChapterIdx + 1}`;

    const contentData = getEducationalContent({
        classNum: activeClass,
        medium: activeMedium,
        subject: activeSubject,
        chapterIndex: selectedChapterIdx,
        chapterName: currentChapterName,
        stream: activeStream,
        contentType: activeContent
    });

    // Custom MCQs for this class and subject
    const customMcqs = customMaterials.filter(m => 
        m.type === 'MCQ' && 
        m.classNumber === activeClass?.toString() &&
        (!activeSubject || m.subjectName?.toLowerCase().includes(activeSubject.toLowerCase()) || activeSubject.toLowerCase().includes(m.subjectName?.toLowerCase()))
    );

    let mergedMcqs = contentData?.mcqs || contentData;
    if (customMcqs.length > 0 && mergedMcqs?.questions) {
        const mappedCustom = customMcqs.map((cm, idx) => ({
            id: cm._id || cm.id || `custom-mcq-${idx}`,
            question: cm.mcqData?.question || cm.title,
            options: cm.mcqData?.options || ['Option A', 'Option B', 'Option C', 'Option D'],
            correctAnswer: cm.mcqData?.correctAnswer === 'A' ? 0 : cm.mcqData?.correctAnswer === 'B' ? 1 : cm.mcqData?.correctAnswer === 'C' ? 2 : 3,
            explanation: cm.mcqData?.explanation || 'Added by Tech Karma Classes Admin.'
        }));
        mergedMcqs = {
            ...mergedMcqs,
            questions: [...mappedCustom, ...mergedMcqs.questions]
        };
    }

    // Custom Videos for this class and subject
    const customVideos = customMaterials.filter(m => 
        m.type === 'Video' && 
        m.classNumber === activeClass?.toString() &&
        (!activeSubject || m.subjectName?.toLowerCase().includes(activeSubject.toLowerCase()) || activeSubject.toLowerCase().includes(m.subjectName?.toLowerCase()))
    );

    let mergedVideos = contentData?.videoLectures || contentData;
    if (customVideos.length > 0 && mergedVideos?.lectures) {
        const mappedVideos = customVideos.map((cv, idx) => {
            let ytEmbed = cv.videoUrl || '';
            if (ytEmbed.includes('watch?v=')) {
                ytEmbed = ytEmbed.replace('watch?v=', 'embed/');
            }
            return {
                id: cv._id || cv.id || `custom-video-${idx}`,
                title: cv.title,
                instructor: cv.faculty || 'Tech Karma Classes',
                duration: cv.duration || '35 mins',
                embedUrl: ytEmbed,
                topicsCovered: [cv.chapterName || 'All Chapters', cv.title],
                facultyNotes: `Tech Karma Classes Faculty Video for Class ${activeClass} ${activeSubject}`
            };
        });
        mergedVideos = {
            ...mergedVideos,
            lectures: [...mappedVideos, ...mergedVideos.lectures]
        };
    }

    const pdfUrl = resolveClassPdfUrl(activeClass, activeSubject, activeMedium, activeContent, selectedChapterIdx, activeStream)
        || resolveClassPdfUrl(activeClass, activeSubject, activeMedium, 'notes', selectedChapterIdx, activeStream);

    const officialSamplePdf = activeClass === 10
        ? 'https://cbseacademic.nic.in/SQP_CLASSX_2025-26.html'
        : activeClass === 12
            ? 'https://cbseacademic.nic.in/sqp_classxii_2025-26.html'
            : 'https://cbseacademic.nic.in/';

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {chapters.length > 1 && (
                <div className="chapter-selector-bar">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <Layers size={18} color="var(--primary-color)" />
                        <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                            {activeMedium === 'Hindi' ? 'अध्याय चुनें:' : 'Select Chapter:'}
                        </span>
                    </div>

                    <select
                        value={selectedChapterIdx}
                        onChange={(e) => setSelectedChapterIdx(parseInt(e.target.value, 10))}
                        style={{
                            padding: '0.6rem 1.2rem',
                            borderRadius: '8px',
                            background: 'var(--bg-primary)',
                            border: '1px solid var(--border-color)',
                            color: 'var(--text-primary)',
                            fontSize: '0.92rem',
                            fontWeight: 600,
                            outline: 'none',
                            cursor: 'pointer',
                            minWidth: '240px',
                            maxWidth: '100%'
                        }}
                    >
                        {chapters.map((ch, idx) => (
                            <option key={idx} value={idx}>
                                {activeMedium === 'Hindi' ? 'अध्याय' : 'Chapter'} {idx + 1}: {ch}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {activeContent === 'mcqs' && (
                <McqViewer
                    mcqs={mergedMcqs}
                    chapterTitle={`Chapter ${selectedChapterIdx + 1}: ${currentChapterName}`}
                    activeMedium={activeMedium}
                    pdfUrl={pdfUrl}
                />
            )}

            {activeContent === 'online-test' && (
                <OnlineTestRunner
                    testData={contentData?.onlineTest || contentData}
                    chapterTitle={`Chapter ${selectedChapterIdx + 1}: ${currentChapterName}`}
                    activeMedium={activeMedium}
                />
            )}

            {activeContent === 'ncert-solution' && (
                <NcertSolutionsViewer
                    solutionsData={contentData?.ncertSolutions || contentData}
                    chapterTitle={`Chapter ${selectedChapterIdx + 1}: ${currentChapterName}`}
                    activeMedium={activeMedium}
                    pdfUrl={pdfUrl}
                />
            )}

            {activeContent === 'subjective' && (
                <SubjectiveViewer
                    subjectiveData={contentData?.subjective || contentData}
                    chapterTitle={`Chapter ${selectedChapterIdx + 1}: ${currentChapterName}`}
                    activeMedium={activeMedium}
                    pdfUrl={pdfUrl}
                />
            )}

            {activeContent === 'sample-paper' && (
                <SamplePaperViewer
                    paperData={contentData?.samplePapers || contentData}
                    chapterTitle={`Chapter ${selectedChapterIdx + 1}: ${currentChapterName}`}
                    activeMedium={activeMedium}
                    pdfUrl={pdfUrl}
                    officialSamplePdf={officialSamplePdf}
                />
            )}

            {activeContent === 'pyq' && (
                <PyqViewer
                    pyqData={contentData?.pyqs || contentData}
                    chapterTitle={`Chapter ${selectedChapterIdx + 1}: ${currentChapterName}`}
                    activeMedium={activeMedium}
                    pdfUrl={pdfUrl}
                />
            )}

            {activeContent === 'video-lecture' && (
                <VideoLecturesViewer
                    videoData={mergedVideos}
                    chapterTitle={`Chapter ${selectedChapterIdx + 1}: ${currentChapterName}`}
                    activeMedium={activeMedium}
                />
            )}

        </div>
    );
};

export default EducationalContentContainer;


