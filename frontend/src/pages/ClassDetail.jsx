import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Book, FileText, CheckSquare, BookOpen, File, Clock, PlayCircle, ExternalLink, ShieldCheck, ArrowRight } from 'lucide-react';
import { classesData } from '../data/classesData';
import { getNcertBooks, getNcertChapters, getNcertChapterUrl, getDirectNcertChapterPdf } from '../data/ncertBooksData';
import EducationalContentContainer from '../components/educational/EducationalContentContainer.jsx';
import ErrorBoundary from '../components/common/ErrorBoundary.jsx';

const ClassDetail = () => {
    const { classId } = useParams();
    const navigate = useNavigate();
    const classNum = parseInt(classId, 10);

    // Validate Class ID
    useEffect(() => {
        const allValidClasses = [...classesData.junior.classes, ...classesData.senior.classes];
        if (!allValidClasses.includes(classNum)) {
            navigate('/classes'); // Redirect if invalid class URL
        }
    }, [classNum, navigate]);

    const isHighSchool = classNum >= 11;

    // States
    const [selectedStream, setSelectedStream] = useState('science');
    const [selectedMedium, setSelectedMedium] = useState('English');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [activeTab, setActiveTab] = useState('notes');

    // Handle stream change: auto-select English for science
    const handleStreamChange = (newStream) => {
        setSelectedStream(newStream);
        if (newStream === 'science') {
            setSelectedMedium('English');
        }
    };

    // Dynamic Subjects based on streams for High School or fixed for Junior
    const currentSubjects = isHighSchool
        ? (classesData[classNum]?.mediums?.[selectedMedium]?.streams?.[selectedStream]?.subjects ? Object.keys(classesData[classNum]?.mediums?.[selectedMedium]?.streams?.[selectedStream]?.subjects || {}) : [])
        : (classesData[classNum]?.mediums?.[selectedMedium]?.subjects ? Object.keys(classesData[classNum]?.mediums?.[selectedMedium]?.subjects || {}) : []);

    // Set default subject on load or when stream or class changes
    useEffect(() => {
        if (currentSubjects && currentSubjects.length > 0) {
            setSelectedSubject(currentSubjects[0].toLowerCase());
        } else {
            setSelectedSubject('');
        }
    }, [classNum, selectedMedium, selectedStream, isHighSchool]);

    // Derive chapters list directly from selectedClass, selectedMedium, selectedStream, and selectedSubject
    const currentSubjectsRaw = isHighSchool
        ? (classesData[classNum]?.mediums?.[selectedMedium]?.streams?.[selectedStream]?.subjects ? Object.keys(classesData[classNum]?.mediums?.[selectedMedium]?.streams?.[selectedStream]?.subjects || {}) : [])
        : (classesData[classNum]?.mediums?.[selectedMedium]?.subjects ? Object.keys(classesData[classNum]?.mediums?.[selectedMedium]?.subjects || {}) : []);

    const originalSubjectName = currentSubjectsRaw.find(sub => sub.toLowerCase() === selectedSubject) || selectedSubject || '';

    const chapters = (isHighSchool
        ? classesData[classNum]?.mediums?.[selectedMedium]?.streams?.[selectedStream]?.subjects?.[originalSubjectName]?.[activeTab]
        : classesData[classNum]?.mediums?.[selectedMedium]?.subjects?.[originalSubjectName]?.[activeTab]) || [];

    // Map icon strings back to lucid-react components
    const getIcon = (iconName) => {
        const icons = {
            FileText: <FileText size={18} />, CheckSquare: <CheckSquare size={18} />,
            Book: <Book size={18} />, BookOpen: <BookOpen size={18} />,
            File: <File size={18} />, Clock: <Clock size={18} />,
            PlayCircle: <PlayCircle size={18} />
        };
        return icons[iconName] || <FileText size={18} />;
    };

    return (
        <div className="section container animate-fade-in-up">
            <Link to="/classes" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '2rem', fontWeight: 600 }}>
                <ArrowLeft size={20} /> Back to Classes
            </Link>

            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>Class {classNum} Dashboard</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>Select your preferences to load targeted study materials.</p>
            </div>

            {/* Filter Controls */}
            <div className="glass-card" style={{ marginBottom: '2.5rem', padding: '2rem', maxWidth: '100%' }}>
                <div className={`grid ${isHighSchool && selectedStream === 'science' ? 'grid-2' : 'grid-3'}`} style={{ gap: '1.5rem', marginBottom: '1.5rem' }}>

                    {isHighSchool && (
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Select Stream</label>
                            <select value={selectedStream} onChange={(e) => handleStreamChange(e.target.value)}>
                                {classesData.senior.streams.map(stream => (
                                    <option key={stream.id} value={stream.id}>{stream.label}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Medium Selector (Bypassed for Class 11/12 Science) */}
                    {(!isHighSchool || selectedStream !== 'science') && (
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Medium</label>
                            <select value={selectedMedium} onChange={(e) => setSelectedMedium(e.target.value)}>
                                {Object.keys(classesData[classNum]?.mediums || {}).map(med => (
                                    <option key={med} value={med}>{classesData[classNum].mediums[med].label || med}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Subject</label>
                        <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
                            {currentSubjects.map(sub => (
                                <option key={sub} value={sub.toLowerCase()}>{sub}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '1.5rem 0' }} />

                {/* Content Tabs (4 Columns Per Row) */}
                <div className="content-types-grid">
                    {classesData.tabs.map(tab => (
                        <button
                            key={tab.id}
                            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%', padding: '0.85rem 1rem' }}
                        >
                            {getIcon(tab.icon)} {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Dynamic Content Section (Un-nested Clean Layout) */}
            <div style={{ marginTop: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                    <div>
                        <div style={{ color: 'var(--primary-color)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.25rem' }}>
                            Class {classNum} • {selectedMedium} {isHighSchool ? `• ${classesData.senior.streams.find(s => s.id === selectedStream)?.label || ''}` : ''} • {classesData.getSubjectName ? classesData.getSubjectName(originalSubjectName, selectedMedium) : (selectedSubject || 'Subject')}
                        </div>
                        <h2 style={{ fontSize: '2rem', margin: 0, textTransform: 'capitalize' }}>
                            {classesData.tabs.find(t => t.id === activeTab)?.label}
                        </h2>
                    </div>
                    <span style={{
                        background: activeTab === 'ncert-books' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(99, 102, 241, 0.1)',
                        color: activeTab === 'ncert-books' ? 'var(--electric-blue)' : 'var(--primary-color)',
                        padding: '0.5rem 1.2rem',
                        borderRadius: '50px',
                        fontWeight: 600,
                        fontSize: '0.88rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        border: '1px solid var(--border-color)'
                    }}>
                        {activeTab === 'ncert-books' ? <ShieldCheck size={16} /> : null}
                        {activeTab === 'ncert-books' ? 'Official NCERT Source' : 'CBSE Syllabus 2025-26'}
                    </span>
                </div>

                {/* DEDICATED NCERT BOOKS VIEW */}
                <ErrorBoundary fallback={<button className="btn btn-primary" onClick={() => window.history.back()} style={{marginTop: '1rem'}}>Go Back</button>}>
                {activeTab === 'ncert-books' ? (
                    <div>
                        {/* NCERT Official Banner */}
                        <div style={{
                            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(99, 102, 241, 0.08))',
                            border: '1px solid rgba(99, 102, 241, 0.2)',
                            borderRadius: '12px',
                            padding: '1.25rem',
                            marginBottom: '1.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            gap: '1rem'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '10px',
                                    background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#ffffff',
                                    fontWeight: 800,
                                    fontSize: '0.85rem'
                                }}>
                                    NCERT
                                </div>
                                <div>
                                    <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700 }}>Official NCERT Digital Textbooks</h4>
                                    <p style={{ margin: '0.2rem 0 0', color: 'var(--text-secondary)', fontSize: '0.82rem' }}>
                                        Class {classNum} • {selectedMedium} Medium • {classesData.getSubjectName ? classesData.getSubjectName(originalSubjectName, selectedMedium) : originalSubjectName}
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
                                    fontSize: '0.85rem',
                                    fontWeight: 600,
                                    textDecoration: 'none'
                                }}
                            >
                                Official Portal <ExternalLink size={14} />
                            </a>
                        </div>

                        {/* Standalone Horizontal Grid (3 per row Desktop, 2 Tablet, 1 Mobile) */}
                        {(() => {
                            const ncertChapters = getNcertChapters({ classNum, subject: originalSubjectName, medium: selectedMedium, stream: selectedStream }) || [];
                            if (ncertChapters.length === 0) {
                                return (
                                    <div style={{ padding: '3rem 1.5rem', textAlign: 'center', color: 'var(--text-secondary)', background: 'rgba(128,128,128,0.03)', borderRadius: '12px', border: '1px dashed var(--border-color)' }}>
                                        <BookOpen size={40} style={{ margin: '0 auto 1rem', opacity: 0.3 }} />
                                        <h4 style={{ fontSize: '1.1rem', marginBottom: '0.4rem', color: 'var(--text-primary)' }}>NCERT book currently unavailable. Please check again later.</h4>
                                        <p style={{ fontSize: '0.9rem' }}>Official NCERT digital editions for this subject are being updated according to latest CBSE guidelines.</p>
                                    </div>
                                );
                            }

                            return (
                                <div className="resource-cards-grid">
                                    {ncertChapters.map((ch, idx) => {
                                        if (!ch) return null;
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
                                                            {ch.partTitle ? (ch.partTitle + ' • ') : ''}{selectedMedium === 'Hindi' ? 'अध्याय' : 'Chapter'} {ch.chapterInPart || ch.chapterNumber}
                                                        </span>
                                                    </div>
                                                    <h4 className="resource-card-title">
                                                        {ch.title || 'Untitled Chapter'}
                                                    </h4>
                                                </div>

                                                <div className="resource-card-actions">
                                                    {isAvailable ? (
                                                        <a
                                                            href={ch.pdfUrl || '#'}
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
                ) : ['mcqs', 'online-test', 'ncert-solution', 'subjective', 'sample-paper', 'pyq', 'video-lecture'].includes(activeTab) ? (
                    <EducationalContentContainer
                        activeClass={classNum}
                        activeMedium={selectedMedium}
                        activeSubject={originalSubjectName}
                        activeStream={selectedStream}
                        activeContent={activeTab}
                        chapters={(chapters || []).map((ch, idx) => classesData.getChapterName ? classesData.getChapterName(classNum, originalSubjectName, ch, idx, selectedMedium) : (ch || `Chapter ${idx + 1}`))}
                    />
                ) : (
                    /* DEFAULT CHAPTER LIST FOR NOTES (3 PER ROW HORIZONTAL GRID) */
                    <div className="resource-cards-grid">
                        {(chapters || []).map((chapterName, index) => (
                            <div key={index} className="resource-card animate-fade-in-up">
                                <div>
                                    <div className="resource-card-header">
                                        <div className="resource-card-icon">
                                            <FileText size={20} />
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
                                            {selectedMedium === 'Hindi' ? 'अध्याय' : 'Chapter'} {index + 1}
                                        </span>
                                    </div>
                                    <h4 className="resource-card-title">
                                        {classesData.getChapterName ? classesData.getChapterName(classNum, originalSubjectName, chapterName || `Chapter ${index + 1}`, index, selectedMedium) : (chapterName || `Chapter ${index + 1}`)}
                                    </h4>
                                </div>

                                <div className="resource-card-actions">
                                    <button className="btn btn-secondary">
                                        Open Resource <ArrowRight size={15} />
                                    </button>
                                    {(['notes', 'ncert-solution', 'mcqs', 'subjective', 'books', 'online-test', 'sample-paper', 'pyq'].includes(activeTab)) && (
                                        <a
                                            href={activeTab === 'books' && getDirectNcertChapterPdf(classNum, originalSubjectName, selectedMedium, index + 1, selectedStream) ? getDirectNcertChapterPdf(classNum, originalSubjectName, selectedMedium, index + 1, selectedStream) : `https://huggingface.co/datasets/SonuTechKarma/techkarma-pdfs/resolve/main/pdfs/class${classNum}-${(selectedMedium || '').toLowerCase()}-${selectedSubject === 'social studies (sst)' ? 'socialstudies' : (selectedSubject || '').toLowerCase().replace(/[^a-z0-9]/gi, '')}${activeTab === 'notes' ? '' : '-' + activeTab}-ch${index + 1}.pdf`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="btn btn-primary"
                                        >
                                            <FileText size={16} /> View {classesData.tabs.find(t => t.id === activeTab)?.label || 'PDF'} <ArrowRight size={15} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                        {(!chapters || chapters.length === 0) && (
                            <div style={{ gridColumn: '1 / -1', padding: '3rem 2rem', textAlign: 'center', color: 'var(--text-secondary)', background: 'rgba(128,128,128,0.03)', borderRadius: '12px', border: '1px dashed var(--border-color)' }}>
                                <BookOpen size={40} style={{ margin: '0 auto 1rem', opacity: 0.3 }} />
                                <p style={{ fontSize: '1.1rem', margin: 0 }}>No chapters available for this subject yet.</p>
                            </div>
                        )}
                    </div>
                )}
                </ErrorBoundary>
            </div>
        </div>
    );
};

export default ClassDetail;


