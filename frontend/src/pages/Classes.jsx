import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, ArrowRight, Book, FileText, CheckSquare, File, Clock, PlayCircle, Briefcase, Library, PenTool, Beaker, Atom, FlaskConical, GraduationCap, ExternalLink, ShieldCheck } from 'lucide-react';
import { classesData, getSubjectName, getChapterName } from '../data/classesData';
import pdfManifest from '../data/pdfManifest.json';
import externalBookLinks from '../data/externalBookLinks';
import { getNcertBooks, getNcertChapters, getNcertChapterUrl, getDirectNcertChapterPdf } from '../data/ncertBooksData';
import EducationalContentContainer from '../components/educational/EducationalContentContainer.jsx';
import ClassCard from '../components/ClassCard.jsx';

const Classes = () => {
    const { classId } = useParams();
    const navigate = useNavigate();
    const allClasses = [...classesData.junior.classes, ...classesData.senior.classes];

    const [activeClass, setActiveClass] = useState(null);
    // 4 Required States for Multi-Level Expansions
    const [activeMedium, setActiveMedium] = useState(null);
    const [activeStream, setActiveStream] = useState(null);
    const [activeSubject, setActiveSubject] = useState(null);
    const [activeContent, setActiveContent] = useState(null);

    // Sync activeClass with URL param
    useEffect(() => {
        if (classId) {
            const num = parseInt(classId, 10);
            if (allClasses.includes(num)) {
                setActiveClass(num);
                // Class changed from URL: reset everything deeply
                setActiveMedium(null);
                setActiveStream(null);
                setActiveSubject(null);
                setActiveContent(null);
            } else {
                navigate('/classes');
            }
        } else {
            setActiveClass(null);
            setActiveMedium(null);
            setActiveStream(null);
            setActiveSubject(null);
            setActiveContent(null);
        }
    }, [classId, navigate]);

    // Handle Class Card Click (Step 1)
    const handleClassClick = (id) => {
        setActiveClass(id);
        setActiveMedium(null);
        setActiveStream(null);
        setActiveSubject(null);
        setActiveContent(null);
        navigate(`/classes/${id}`);
    };

    // Handle Medium Click (Step 2)
    const handleMediumClick = (medium) => {
        setActiveMedium(medium);
        if (activeClass < 11) {
            setActiveStream(null);
        }
        setActiveSubject(null);
        setActiveContent(null);
    };

    // Handle Stream Click (Step 1 for Class 11/12) - Automatically bypass medium selection for Science
    const handleStreamClick = (streamId) => {
        setActiveStream(streamId);
        if (streamId === 'science') {
            setActiveMedium('English');
        } else {
            setActiveMedium(null);
        }
        setActiveSubject(null);
        setActiveContent(null);
    };

    // Handle Subject Click (Step 3 or Step 2 for Science)
    const handleSubjectClick = (subject) => {
        setActiveSubject(subject);
        setActiveContent(null);
    };

    // Handle Content Tab Click
    const handleContentClick = (contentId) => {
        setActiveContent(contentId);
    };

    // ------------- RENDER LOGIC -------------

    // Initial View: Class Grid
    if (!activeClass) {
        return (
            <div className="section container animate-fade-in-up">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Academic Classes</h1>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                        Select your class below to access detailed study materials, notes, test series, and video lectures.
                    </p>
                </div>

                <div className="class-cards-grid">
                    {allClasses.map((cls, index) => (
                        <ClassCard
                            key={cls}
                            cls={cls}
                            index={index}
                            onClick={() => handleClassClick(cls)}
                        />
                    ))}
                </div>
            </div>
        );
    }

    // Dynamic Class Detail Render

    // Derive Available Mediums safely
    const availableMediums = classesData[activeClass]?.mediums ? Object.keys(classesData[activeClass].mediums) : [];

    // Derive Available Subjects safely based on chosen medium and stream
    const availableSubjects = (activeMedium && activeClass < 11 && classesData[activeClass]?.mediums?.[activeMedium]?.subjects)
        ? Object.keys(classesData[activeClass].mediums[activeMedium].subjects)
        : (activeMedium && activeStream && activeClass >= 11 && classesData[activeClass]?.mediums?.[activeMedium]?.streams?.[activeStream]?.subjects)
            ? Object.keys(classesData[activeClass].mediums[activeMedium].streams[activeStream].subjects)
            : [];

    // Derive Specific Content / Chapters based strictly on requested logic
    const chapters = (activeClass && activeMedium && (activeClass < 11 || activeStream) && activeSubject && activeContent)
        ? (activeClass >= 11 ? classesData[activeClass]?.mediums?.[activeMedium]?.streams?.[activeStream]?.subjects?.[activeSubject]?.[activeContent] : classesData[activeClass]?.mediums?.[activeMedium]?.subjects?.[activeSubject]?.[activeContent]) || []
        : [];

    return (
        <div className="section container animate-fade-in-up" style={{ transition: 'all 0.3s ease-in-out' }}>
            <Link to="/classes" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '2rem', fontWeight: 600 }}>
                <ArrowLeft size={20} /> Back to Class Selection
            </Link>

            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>Class {activeClass} Study Materials</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>Follow the steps below to instantly access your targeted content.</p>
            </div>

            {/* STEP 1: SELECT STREAM (Class 11 & 12 Clean Horizontal Row Layout) */}
            {activeClass >= 11 && (
                <div className="glass-card animate-fade-in-up" style={{ marginBottom: '2rem', padding: '2rem', borderTop: '4px solid var(--electric-blue)' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>1. Select Stream</h3>
                    <div className="stream-selection-grid">
                        {classesData.senior.streams.map(stream => (
                            <button
                                key={stream.id}
                                onClick={() => handleStreamClick(stream.id)}
                                className={`btn ${activeStream === stream.id ? 'btn-primary' : 'btn-secondary'}`}
                                style={{
                                    width: '100%',
                                    padding: '1rem 1.5rem',
                                    fontSize: '1.1rem',
                                    fontWeight: 700,
                                    textAlign: 'center',
                                    justifyContent: 'center',
                                    background: activeStream === stream.id ? 'var(--vivid-purple)' : 'var(--bg-primary)',
                                    boxShadow: activeStream === stream.id ? 'var(--hover-shadow)' : 'none'
                                }}
                            >
                                {stream.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* STEP 2: SELECT MEDIUM (Bypassed for Class 11/12 Science) */}
            {(activeClass < 11 || (activeStream && activeStream !== 'science')) && (
                <div className="glass-card animate-fade-in-up" style={{ marginBottom: '2rem', padding: '2rem' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                        {activeClass >= 11 ? '2. Select Medium' : '1. Select Medium'}
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                        {availableMediums.map(medium => (
                            <button
                                key={medium}
                                onClick={() => handleMediumClick(medium)}
                                className={`btn ${activeMedium === medium ? 'btn-primary' : 'btn-secondary'}`}
                                style={{ width: '100%', fontSize: '1.1rem', padding: '1rem', justifyContent: 'center' }}
                            >
                                {medium} Medium
                            </button>
                        ))}
                        {availableMediums.length === 0 && <p style={{ color: 'var(--text-secondary)' }}>No mediums available for this class.</p>}
                    </div>
                </div>
            )}

            {/* STEP 3: SELECT SUBJECT (Arranged in 3 Columns Per Row) */}
            {activeMedium && (activeClass < 11 || activeStream) && (
                <div className="glass-card animate-fade-in-up" style={{ marginBottom: '2rem', padding: '2rem', borderTop: '4px solid var(--primary-color)' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                        {activeClass >= 11 ? (activeStream === 'science' ? '2. Select Subject' : '3. Select Subject') : '2. Select Subject'}
                    </h3>
                    <div className="subject-selection-grid">
                        {availableSubjects.map(sub => (
                            <button
                                key={sub}
                                onClick={() => handleSubjectClick(sub)}
                                className={`btn ${activeSubject === sub ? 'btn-primary' : 'btn-secondary'}`}
                                style={{
                                    width: '100%',
                                    padding: '1rem 1.5rem',
                                    fontSize: '1.05rem',
                                    fontWeight: 600,
                                    textAlign: 'center',
                                    justifyContent: 'center',
                                    background: activeSubject === sub ? '' : 'var(--bg-primary)',
                                    boxShadow: activeSubject === sub ? 'var(--hover-shadow)' : 'none'
                                }}
                            >
                                {getSubjectName(sub, activeMedium)}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* STEP 4: SELECT CONTENT TYPE (Arranged in 4 Columns Per Row) */}
            {activeSubject && (
                <div className="glass-card animate-fade-in-up" style={{ marginBottom: '2rem', padding: '2rem', borderTop: '4px solid var(--accent-color)' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                        {activeClass >= 11 ? (activeStream === 'science' ? '3. Select Content Type' : '4. Select Content Type') : '3. Select Content Type'}
                    </h3>
                    <div className="content-types-grid">
                        {classesData.tabs.map(tab => (
                            <button
                                key={tab.id}
                                className={`tab-btn ${activeContent === tab.id ? 'active' : ''}`}
                                onClick={() => handleContentClick(tab.id)}
                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.9rem 1.25rem', width: '100%' }}
                            >
                                {getIcon(tab.icon)} {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* STEP 5: DISPLAY DYNAMIC CHAPTERS OR NCERT BOOKS (UN-NESTED CLEAN GRID) */}
            {activeContent && (
                <div className="animate-fade-in-up" style={{ marginTop: '3rem', width: '100%' }}>
                    {/* Content Section Header */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '2rem',
                        flexWrap: 'wrap',
                        gap: '1rem',
                        paddingBottom: '1rem',
                        borderBottom: '1px solid var(--border-color)'
                    }}>
                        <div>
                            <div style={{ color: 'var(--primary-color)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.25rem' }}>
                                Class {activeClass} • {activeMedium} {activeClass >= 11 ? `• ${classesData.senior.streams.find(s => s.id === activeStream)?.label || ''}` : ''} • {getSubjectName(activeSubject, activeMedium)}
                            </div>
                            <h2 style={{ fontSize: '2rem', margin: 0, color: 'var(--text-primary)' }}>
                                {classesData.tabs.find(t => t.id === activeContent)?.label}
                            </h2>
                        </div>
                        <span style={{
                            background: activeContent === 'ncert-books' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                            color: activeContent === 'ncert-books' ? 'var(--electric-blue)' : 'var(--success-color)',
                            padding: '0.5rem 1.2rem',
                            borderRadius: '50px',
                            fontWeight: 600,
                            fontSize: '0.88rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            border: '1px solid var(--border-color)'
                        }}>
                            {activeContent === 'ncert-books' ? <ShieldCheck size={16} /> : <CheckSquare size={16} />}
                            {activeContent === 'ncert-books' ? 'Official NCERT Source' : 'CBSE 2025-26 Syllabus'}
                        </span>
                    </div>

                    {/* DEDICATED NCERT BOOKS VIEW */}
                    {activeContent === 'ncert-books' ? (
                        <div>
                            {/* NCERT Official Info Banner */}
                            <div style={{
                                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(99, 102, 241, 0.08))',
                                border: '1px solid rgba(99, 102, 241, 0.25)',
                                borderRadius: '14px',
                                padding: '1.5rem',
                                marginBottom: '2rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                flexWrap: 'wrap',
                                gap: '1rem'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{
                                        width: '46px',
                                        height: '46px',
                                        borderRadius: '12px',
                                        background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#ffffff',
                                        fontWeight: 800,
                                        fontSize: '1rem',
                                        boxShadow: '0 4px 10px rgba(59, 130, 246, 0.3)'
                                    }}>
                                        NCERT
                                    </div>
                                    <div>
                                        <h4 style={{ margin: 0, fontSize: '1.15rem', color: 'var(--text-primary)', fontWeight: 700 }}>
                                            National Council of Educational Research and Training
                                        </h4>
                                        <p style={{ margin: '0.2rem 0 0', color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                                            Official digital textbooks for CBSE Class {activeClass} • Direct chapter PDFs with NCERT portal access.
                                        </p>
                                    </div>
                                </div>
                                <a
                                    href="https://ncert.nic.in/textbook.php"
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.4rem',
                                        color: 'var(--primary-color)',
                                        fontSize: '0.88rem',
                                        fontWeight: 600,
                                        textDecoration: 'none'
                                    }}
                                >
                                    Visit Official Portal <ExternalLink size={15} />
                                </a>
                            </div>

                            {/* Standalone Horizontal Responsive Grid (3 per row Desktop, 2 Tablet, 1 Mobile) */}
                            {(() => {
                                const ncertChapters = getNcertChapters({ classNum: activeClass, subject: activeSubject, medium: activeMedium, stream: activeStream });
                                if (ncertChapters.length === 0) {
                                    return (
                                        <div style={{ padding: '4rem 2rem', textAlign: 'center', color: 'var(--text-secondary)', background: 'rgba(128,128,128,0.03)', borderRadius: '12px', border: '1px dashed var(--border-color)' }}>
                                            <BookOpen size={48} style={{ margin: '0 auto 1rem', opacity: 0.3 }} />
                                            <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>NCERT book currently unavailable. Please check again later.</h4>
                                            <p style={{ fontSize: '0.95rem', maxWidth: '500px', margin: '0 auto' }}>Official NCERT digital editions for this subject/medium are being updated according to the latest CBSE guidelines.</p>
                                        </div>
                                    );
                                }

                                return (
                                    <div className="resource-cards-grid">
                                        {ncertChapters.map((ch, idx) => {
                                            const isAvailable = ch.status === 'active';
                                            return (
                                                <div
                                                    key={idx}
                                                    className="resource-card animate-fade-in-up"
                                                >
                                                    <div>
                                                        <div className="resource-card-header">
                                                            <div className="resource-card-icon">
                                                                <BookOpen size={20} />
                                                            </div>
                                                            <span style={{
                                                                fontSize: '0.75rem',
                                                                fontWeight: 700,
                                                                textTransform: 'uppercase',
                                                                color: 'var(--primary-color)',
                                                                background: 'rgba(99, 102, 241, 0.1)',
                                                                padding: '0.2rem 0.6rem',
                                                                borderRadius: '12px'
                                                            }}>
                                                                {ch.partTitle ? (ch.partTitle + ' • ') : ''}{activeMedium === 'Hindi' ? 'अध्याय' : 'Chapter'} {ch.chapterInPart || ch.chapterNumber}
                                                            </span>
                                                        </div>
                                                        <h4 className="resource-card-title">
                                                            {ch.title}
                                                        </h4>
                                                    </div>

                                                    <div className="resource-card-actions">
                                                        {isAvailable ? (
                                                            <a
                                                                href={ch.pdfUrl}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="btn btn-primary"
                                                            >
                                                                <FileText size={16} /> Read PDF
                                                            </a>
                                                        ) : (
                                                            <button
                                                                disabled
                                                                className="btn btn-secondary"
                                                                style={{ opacity: 0.6, cursor: 'not-allowed' }}
                                                            >
                                                                Unavailable
                                                            </button>
                                                        )}

                                                        {isAvailable && ch.portalUrl && (
                                                            <a
                                                                href={ch.portalUrl}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="btn btn-secondary"
                                                                style={{ fontSize: '0.82rem', padding: '0.5rem 0.8rem' }}
                                                            >
                                                                Official Portal Chapter <ExternalLink size={13} />
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                );
                            })()}
                        </div>
                    ) : ['mcqs', 'online-test', 'ncert-solution', 'subjective', 'sample-paper', 'pyq', 'video-lecture'].includes(activeContent) ? (
                        <EducationalContentContainer
                            activeClass={activeClass}
                            activeMedium={activeMedium}
                            activeSubject={activeSubject}
                            activeStream={activeStream}
                            activeContent={activeContent}
                            chapters={chapters.map((ch, idx) => getChapterName(activeClass, activeSubject, ch, idx, activeMedium))}
                        />
                    ) : (
                        /* DEFAULT CHAPTER-WISE VIEW FOR NOTES AND OTHER TABS (3 PER ROW HORIZONTAL GRID) */
                        <div className="resource-cards-grid">
                            {chapters.length > 0 ? chapters.map((chapterName, index) => {
                                const translatedChapter = getChapterName(activeClass, activeSubject, chapterName, index, activeMedium);
                                const pdfFilename = activeContent === 'notes' ? `class${activeClass}-${activeMedium.toLowerCase()}-${activeSubject === 'Social Studies (SST)' ? 'socialstudies' : activeSubject.toLowerCase().replace(/[^a-z0-9]/gi, '')}-ch${index + 1}.pdf` : `class${activeClass}-${activeMedium.toLowerCase()}-${activeSubject === 'Social Studies (SST)' ? 'socialstudies' : activeSubject.toLowerCase().replace(/[^a-z0-9]/gi, '')}-${activeContent}-ch${index + 1}.pdf`;
                                const pdfExists = pdfManifest.includes(pdfFilename);
                                return (
                                    <div
                                        key={index}
                                        className="resource-card animate-fade-in-up"
                                    >
                                        <div>
                                            <div className="resource-card-header">
                                                <div className="resource-card-icon">
                                                    {getIcon(classesData.tabs.find(t => t.id === activeContent)?.icon)}
                                                </div>
                                                <span style={{
                                                    fontSize: '0.75rem',
                                                    fontWeight: 700,
                                                    textTransform: 'uppercase',
                                                    color: 'var(--primary-color)',
                                                    background: 'rgba(99, 102, 241, 0.1)',
                                                    padding: '0.2rem 0.6rem',
                                                    borderRadius: '12px'
                                                }}>
                                                    {activeMedium === 'Hindi' ? 'अध्याय' : 'Chapter'} {index + 1}
                                                </span>
                                            </div>
                                            <h4 className="resource-card-title">
                                                {translatedChapter}
                                            </h4>
                                        </div>

                                        <div className="resource-card-actions">
                                            <button className="btn btn-secondary">
                                                Open Resource <ArrowRight size={15} />
                                            </button>

                                            {['notes', 'ncert-solution', 'mcqs', 'books'].includes(activeContent) && (
                                                externalBookLinks[pdfFilename] ? (
                                                    <a
                                                        href={externalBookLinks[pdfFilename]}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="btn btn-primary"
                                                    >
                                                        <FileText size={16} /> View PDF <ArrowRight size={15} />
                                                    </a>
                                                ) : pdfExists ? (
                                                    <a
                                                        href={`/pdfs/${pdfFilename}`}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="btn btn-primary"
                                                    >
                                                        <FileText size={16} /> View PDF <ArrowRight size={15} />
                                                    </a>
                                                ) : (activeContent === 'books' && getDirectNcertChapterPdf(activeClass, activeSubject, activeMedium, index + 1, activeStream)) ? (
                                                    <a
                                                        href={getDirectNcertChapterPdf(activeClass, activeSubject, activeMedium, index + 1, activeStream)}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="btn btn-primary"
                                                    >
                                                        <FileText size={16} /> View PDF <ArrowRight size={15} />
                                                    </a>
                                                ) : (
                                                    <button
                                                        disabled
                                                        className="btn btn-secondary"
                                                        style={{ opacity: 0.5, cursor: 'not-allowed' }}
                                                    >
                                                        Unavailable
                                                    </button>
                                                )
                                            )}
                                        </div>
                                    </div>
                                );
                            }) : (
                                <div style={{ gridColumn: '1 / -1', padding: '4rem', textAlign: 'center', color: 'var(--text-secondary)', background: 'rgba(128,128,128,0.03)', borderRadius: '12px', border: '1px dashed var(--border-color)' }}>
                                    <BookOpen size={48} style={{ margin: '0 auto 1rem', opacity: 0.3 }} />
                                    <p style={{ fontSize: '1.2rem', marginBottom: 0 }}>No dynamic {classesData.tabs.find(t => t.id === activeContent)?.label} uploaded for {activeSubject} yet.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Classes;
