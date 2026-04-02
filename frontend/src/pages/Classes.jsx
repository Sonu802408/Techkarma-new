import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, ArrowRight, Book, FileText, CheckSquare, File, Clock, PlayCircle, Briefcase, Library, PenTool, Beaker, Atom, FlaskConical, GraduationCap } from 'lucide-react';
import { classesData, getSubjectName, getChapterName } from '../data/classesData';
import pdfManifest from '../data/pdfManifest.json';

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

const getClassIconData = (cls) => {
    switch (cls) {
        case 6: return { icon: <Briefcase className="animated-icon-svg" />, color: '#60a5fa' };
        case 7: return { icon: <Library className="animated-icon-svg" />, color: '#34d399' };
        case 8: return { icon: <PenTool className="animated-icon-svg" />, color: '#fbbf24' };
        case 9: return { icon: <Beaker className="animated-icon-svg" />, color: '#f472b6' };
        case 10: return { icon: <Atom className="animated-icon-svg" />, color: '#a78bfa' };
        case 11: return { icon: <FlaskConical className="animated-icon-svg" />, color: '#38bdf8' };
        case 12: return { icon: <GraduationCap className="animated-icon-svg" />, color: '#fb7185' };
        default: return { icon: <BookOpen className="animated-icon-svg" />, color: '#ffffff' };
    }
};

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

    // Handle Stream Click (Step 3)
    const handleStreamClick = (streamId) => {
        setActiveStream(streamId);
        setActiveMedium(null);
        setActiveSubject(null);
        setActiveContent(null);
    };

    // Handle Subject Click (Step 3)
    const handleSubjectClick = (subject) => {
        setActiveSubject(subject);
        setActiveContent(null);
    };

    // Handle Content Tab Click (Step 4)
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

                <div className="grid grid-3">
                    {allClasses.map((cls) => {
                        const isSenior = cls >= 11;
                        const bgType = isSenior ? 'rgba(99, 102, 241, 0.05)' : 'rgba(16, 185, 129, 0.05)';
                        const colorType = isSenior ? 'var(--primary-color)' : 'var(--success-color)';

                        return (
                            <div
                                key={cls}
                                onClick={() => handleClassClick(cls)}
                                className="glass-card feature-card"
                                style={{ display: 'flex', flexDirection: 'column', height: '100%', background: bgType, cursor: 'pointer' }}
                            >
                                {(() => {
                                    const { icon, color } = getClassIconData(cls);
                                    return (
                                        <div
                                            className="animated-icon-container"
                                            style={{ color: color, borderColor: `rgba(255,255,255,0.1)` }}
                                        >
                                            {icon}
                                        </div>
                                    );
                                })()}
                                <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Class {cls}</h2>
                                <p style={{ color: 'var(--text-secondary)', flex: 1, marginBottom: '2rem' }}>
                                    {isSenior
                                        ? 'Access Science, Commerce, and Arts streams specifically tailored for board exams.'
                                        : 'Complete Foundation course building a strong base for high school academics.'}
                                </p>

                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: colorType, fontWeight: 600 }}>
                                    Select Class <ArrowRight size={20} />
                                </div>
                            </div>
                        );
                    })}
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

            {/* STEP 1: SELECT STREAM (Only shows if Class >= 11) */}
            {activeClass >= 11 && (
                <div className="glass-card animate-fade-in-up" style={{ marginBottom: '2rem', padding: '2rem', borderTop: '4px solid var(--electric-blue)' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>1. Select Stream</h3>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        {classesData.senior.streams.map(stream => (
                            <button
                                key={stream.id}
                                onClick={() => handleStreamClick(stream.id)}
                                className={`btn ${activeStream === stream.id ? 'btn-primary' : 'btn-secondary'}`}
                                style={{
                                    flex: '1 1 auto',
                                    padding: '0.8rem 1.5rem',
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

            {/* STEP 2: SELECT MEDIUM */}
            {(activeClass < 11 || activeStream) && (
                <div className="glass-card animate-fade-in-up" style={{ marginBottom: '2rem', padding: '2rem' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>{activeClass >= 11 ? '2. Select Medium' : '1. Select Medium'}</h3>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        {availableMediums.filter(m => !(activeClass >= 11 && activeStream === 'science' && m === 'Hindi')).map(medium => (
                            <button
                                key={medium}
                                onClick={() => handleMediumClick(medium)}
                                className={`btn ${activeMedium === medium ? 'btn-primary' : 'btn-secondary'}`}
                                style={{ flex: '1 1 200px', fontSize: '1.1rem', padding: '1rem' }}
                            >
                                {medium} Medium
                            </button>
                        ))}
                        {availableMediums.filter(m => !(activeClass >= 11 && activeStream === 'science' && m === 'Hindi')).length === 0 && <p style={{ color: 'var(--text-secondary)' }}>No mediums available for this class.</p>}
                    </div>
                </div>
            )}

            {/* STEP 3: SELECT SUBJECT (Only shows if Medium [and Stream if applicable] is selected) */}
            {activeMedium && (activeClass < 11 || activeStream) && (
                <div className="glass-card animate-fade-in-up" style={{ marginBottom: '2rem', padding: '2rem', borderTop: '4px solid var(--primary-color)' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>{activeClass >= 11 ? '3. Select Subject' : '2. Select Subject'}</h3>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        {availableSubjects.map(sub => (
                            <button
                                key={sub}
                                onClick={() => handleSubjectClick(sub)}
                                className={`btn ${activeSubject === sub ? 'btn-primary' : 'btn-secondary'}`}
                                style={{
                                    flex: '1 1 auto',
                                    padding: '0.8rem 1.5rem',
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

            {/* STEP 4: SELECT CONTENT TYPE (Only shows if Subject is selected) */}
            {activeSubject && (
                <div className="glass-card animate-fade-in-up" style={{ marginBottom: '2rem', padding: '2rem', borderTop: '4px solid var(--accent-color)' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>{activeClass >= 11 ? '4. Select Content Type' : '3. Select Content Type'}</h3>
                    <div className="tabs-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'flex-start' }}>
                        {classesData.tabs.map(tab => (
                            <button
                                key={tab.id}
                                className={`tab-btn ${activeContent === tab.id ? 'active' : ''}`}
                                onClick={() => handleContentClick(tab.id)}
                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.8rem 1.5rem', flex: '1 1 auto' }}
                            >
                                {getIcon(tab.icon)} {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* STEP 5: DISPLAY DYNAMIC CHAPTERS (Only shows if Content is selected) */}
            {activeContent && (
                <div className="animate-fade-in-up" style={{
                    background: 'var(--bg-primary)',
                    padding: '2.5rem',
                    borderRadius: 'var(--border-radius)',
                    border: '1px solid var(--border-color)',
                    marginTop: '2rem',
                    boxShadow: 'var(--card-shadow)',
                    transition: 'all 0.3s ease-in-out'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                        <div>
                            <span style={{ color: 'var(--primary-color)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                Class {activeClass} • {activeMedium} {activeClass >= 11 ? `• ${classesData.senior.streams.find(s => s.id === activeStream)?.label || ''}` : ''} • {getSubjectName(activeSubject, activeMedium)}
                            </span>
                            <h3 style={{ fontSize: '2rem', marginTop: '0.5rem', color: 'var(--text-primary)' }}>
                                {classesData.tabs.find(t => t.id === activeContent)?.label}
                            </h3>
                        </div>
                        <span style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success-color)', padding: '0.5rem 1.2rem', borderRadius: '50px', fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <CheckSquare size={16} /> Syllabus Updated
                        </span>
                    </div>

                    <div className="grid grid-3" style={{ gap: '1.5rem', transition: 'all 0.3s ease' }}>
                        {chapters.length > 0 ? chapters.map((chapterName, index) => {
                            const translatedChapter = getChapterName(activeClass, activeSubject, chapterName, index, activeMedium);
                            const pdfFilename = activeContent === 'notes' ? `class${activeClass}-${activeMedium.toLowerCase()}-${activeSubject === 'Social Studies (SST)' ? 'socialstudies' : activeSubject.toLowerCase().replace(/[^a-z0-9]/gi, '')}-ch${index + 1}.pdf` : `class${activeClass}-${activeMedium.toLowerCase()}-${activeSubject === 'Social Studies (SST)' ? 'socialstudies' : activeSubject.toLowerCase().replace(/[^a-z0-9]/gi, '')}-${activeContent}-ch${index + 1}.pdf`;
                            const pdfExists = pdfManifest.includes(pdfFilename);
                            return (
                                <div
                                    key={index}
                                    className="animate-fade-in-up"
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.04), rgba(236, 72, 153, 0.04))',
                                        borderRadius: '12px',
                                        padding: '1.5rem',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '1.5rem',
                                        boxShadow: 'var(--card-shadow)',
                                        border: '1px solid var(--border-color)'
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.style.boxShadow = 'var(--hover-shadow)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'var(--card-shadow)'; }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                        <div style={{
                                            background: 'var(--bg-secondary)',
                                            padding: '0.8rem',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'var(--primary-color)',
                                            boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
                                        }}>
                                            {getIcon(classesData.tabs.find(t => t.id === activeContent)?.icon)}
                                        </div>
                                        <h4 style={{ fontSize: '1.1rem', margin: 0, fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.4 }}>
                                            {activeMedium === 'Hindi' ? 'अध्याय' : 'Chapter'} {index + 1}: {translatedChapter}
                                        </h4>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: 'auto' }}>
                                        <button className="btn btn-secondary" style={{ width: '100%', fontSize: '0.9rem', padding: '0.5rem 1rem' }}>
                                            Open Resource <ArrowRight size={16} />
                                        </button>

                                        {['notes', 'ncert-solution', 'mcqs', 'books'].includes(activeContent) && (
                                            pdfExists ? (
                                                <a
                                                    href={`/pdfs/${pdfFilename}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="btn btn-primary"
                                                    style={{ width: '100%', fontSize: '0.9rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}
                                                >
                                                    View PDF <ArrowRight size={16} />
                                                </a>
                                            ) : (
                                                <button
                                                    disabled
                                                    className="btn btn-secondary"
                                                    style={{ width: '100%', fontSize: '0.9rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', opacity: 0.5, cursor: 'not-allowed' }}
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
                </div>
            )}
        </div>
    );
};

export default Classes;
