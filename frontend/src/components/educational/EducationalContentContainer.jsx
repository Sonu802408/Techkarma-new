import React, { useState } from 'react';
import { getEducationalContent } from '../../data/educationalContent/index.js';
import McqViewer from './McqViewer.jsx';
import OnlineTestRunner from './OnlineTestRunner.jsx';
import NcertSolutionsViewer from './NcertSolutionsViewer.jsx';
import SubjectiveViewer from './SubjectiveViewer.jsx';
import SamplePaperViewer from './SamplePaperViewer.jsx';
import PyqViewer from './PyqViewer.jsx';
import VideoLecturesViewer from './VideoLecturesViewer.jsx';
import { Layers } from 'lucide-react';
import PdfViewerModal from '../common/PdfViewerModal.jsx';

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

    const [activePdfModal, setActivePdfModal] = useState({
        isOpen: false,
        pdfUrl: '',
        title: '',
        subtitle: '',
        badge: 'PDF',
        filename: ''
    });

    const handleOpenPdf = (url, title, subtitle, badge, filename) => {
        if (!url) return;
        setActivePdfModal({
            isOpen: true,
            pdfUrl: url,
            title: title || currentChapterName,
            subtitle: subtitle || `Class ${activeClass} • ${activeSubject} • ${activeMedium}`,
            badge: badge || 'PDF',
            filename: filename || ''
        });
    };

    const handleClosePdf = () => {
        setActivePdfModal(prev => ({ ...prev, isOpen: false }));
    };

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

    const subjectSlug = (activeSubject === 'Social Studies (SST)' ? 'socialstudies' : (activeSubject || '').toLowerCase().replace(/[^a-z0-9]/gi, ''));
    const fileName = `class${activeClass}-${(activeMedium || 'English').toLowerCase()}-${subjectSlug}-${activeContent}-ch${selectedChapterIdx + 1}.pdf`;
    const pdfUrl = `https://huggingface.co/datasets/SonuTechKarma/techkarma-pdfs/resolve/main/pdfs/${fileName}`;
    
    const sampleFileName = `cbse-class-${activeClass}-${subjectSlug}-2026.pdf`;
    const officialSamplePdf = `https://huggingface.co/datasets/SonuTechKarma/techkarma-pdfs/resolve/main/pdfs/${sampleFileName}`;

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
                    mcqs={contentData?.mcqs || contentData}
                    chapterTitle={`Chapter ${selectedChapterIdx + 1}: ${currentChapterName}`}
                    activeMedium={activeMedium}
                    pdfUrl={pdfUrl}
                    onOpenPdf={handleOpenPdf}
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
                    onOpenPdf={handleOpenPdf}
                />
            )}

            {activeContent === 'subjective' && (
                <SubjectiveViewer
                    subjectiveData={contentData?.subjective || contentData}
                    chapterTitle={`Chapter ${selectedChapterIdx + 1}: ${currentChapterName}`}
                    activeMedium={activeMedium}
                    pdfUrl={pdfUrl}
                    onOpenPdf={handleOpenPdf}
                />
            )}

            {activeContent === 'sample-paper' && (
                <SamplePaperViewer
                    paperData={contentData?.samplePapers || contentData}
                    chapterTitle={`Chapter ${selectedChapterIdx + 1}: ${currentChapterName}`}
                    activeMedium={activeMedium}
                    pdfUrl={pdfUrl}
                    officialSamplePdf={officialSamplePdf}
                    onOpenPdf={handleOpenPdf}
                />
            )}

            {activeContent === 'pyq' && (
                <PyqViewer
                    pyqData={contentData?.pyqs || contentData}
                    chapterTitle={`Chapter ${selectedChapterIdx + 1}: ${currentChapterName}`}
                    activeMedium={activeMedium}
                    pdfUrl={pdfUrl}
                    onOpenPdf={handleOpenPdf}
                />
            )}

            {activeContent === 'video-lecture' && (
                <VideoLecturesViewer
                    videoData={contentData?.videoLectures || contentData}
                    chapterTitle={`Chapter ${selectedChapterIdx + 1}: ${currentChapterName}`}
                    activeMedium={activeMedium}
                />
            )}

            {/* Embedded PDF View Mode Modal */}
            <PdfViewerModal
                isOpen={activePdfModal.isOpen}
                onClose={handleClosePdf}
                pdfUrl={activePdfModal.pdfUrl}
                title={activePdfModal.title}
                subtitle={activePdfModal.subtitle}
                badge={activePdfModal.badge}
                filename={activePdfModal.filename}
            />
        </div>
    );
};

export default EducationalContentContainer;


