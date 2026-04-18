import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Book, FileText, CheckSquare, BookOpen, File, Clock, PlayCircle } from 'lucide-react';
import { classesData } from '../data/classesData';

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

    // Dynamic Subjects based on streams for High School or fixed for Junior
    const currentSubjects = isHighSchool
        ? (classesData[classNum]?.mediums?.[selectedMedium]?.streams?.[selectedStream]?.subjects ? Object.keys(classesData[classNum].mediums[selectedMedium].streams[selectedStream].subjects) : [])
        : (classesData[classNum]?.mediums?.[selectedMedium]?.subjects ? Object.keys(classesData[classNum].mediums[selectedMedium].subjects) : []);

    // Set default subject on load or when stream or class changes
    useEffect(() => {
        if (currentSubjects.length > 0) {
            setSelectedSubject(currentSubjects[0].toLowerCase());
        } else {
            setSelectedSubject('');
        }
    }, [classNum, selectedMedium, selectedStream, isHighSchool]);

    // Derive chapters list directly from selectedClass, selectedMedium, selectedStream, and selectedSubject
    // Since case in classesData matches but subjects are lowered for states, we need to find the correct subject key
    const currentSubjectsRaw = isHighSchool
        ? (classesData[classNum]?.mediums?.[selectedMedium]?.streams?.[selectedStream]?.subjects ? Object.keys(classesData[classNum].mediums[selectedMedium].streams[selectedStream].subjects) : [])
        : (classesData[classNum]?.mediums?.[selectedMedium]?.subjects ? Object.keys(classesData[classNum].mediums[selectedMedium].subjects) : []);

    const originalSubjectName = currentSubjectsRaw.find(sub => sub.toLowerCase() === selectedSubject) || selectedSubject;

    const chapters = isHighSchool
        ? classesData[classNum]?.mediums?.[selectedMedium]?.streams?.[selectedStream]?.subjects?.[originalSubjectName]?.[activeTab] || []
        : classesData[classNum]?.mediums?.[selectedMedium]?.subjects?.[originalSubjectName]?.[activeTab] || [];

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

            <div className="glass-card" style={{ marginBottom: '2rem' }}>

                {/* Filters Grid */}
                <div className="grid grid-3" style={{ gap: '1.5rem', marginBottom: '2rem' }}>

                    {isHighSchool && (
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Select Stream</label>
                            <select value={selectedStream} onChange={(e) => setSelectedStream(e.target.value)}>
                                {classesData.senior.streams.map(stream => (
                                    <option key={stream.id} value={stream.id}>{stream.label}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Medium</label>
                        <select value={selectedMedium} onChange={(e) => setSelectedMedium(e.target.value)}>
                            {Object.keys(classesData[classNum]?.mediums || {}).map(med => (
                                <option key={med} value={med}>{classesData[classNum].mediums[med].label || med}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Subject</label>
                        <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
                            {currentSubjects.map(sub => (
                                <option key={sub} value={sub.toLowerCase()}>{sub}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '2rem 0' }} />

                {/* Content Tabs */}
                <div className="tabs-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                    {classesData.tabs.map(tab => (
                        <button
                            key={tab.id}
                            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                        >
                            {getIcon(tab.icon)} {tab.label}
                        </button>
                    ))}
                </div>

                {/* Dynamic Content Area */}
                <div style={{ background: 'var(--bg-primary)', padding: '2rem', borderRadius: 'var(--border-radius)', border: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                        <h3 style={{ fontSize: '1.5rem', textTransform: 'capitalize' }}>
                            {classesData.getSubjectName ? classesData.getSubjectName(originalSubjectName, selectedMedium) : (selectedSubject || 'Subject')} - {classesData.tabs.find(t => t.id === activeTab)?.label}
                        </h3>
                        <span style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary-color)', padding: '0.4rem 1rem', borderRadius: '20px', fontWeight: 600, fontSize: '0.9rem' }}>
                            CBSE Syllabus 2025-26
                        </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {chapters.map((chapterName, index) => (
                            <div key={index} className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', cursor: 'pointer', transition: 'all 0.2s', boxShadow: 'none' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--text-secondary)', flexShrink: 0 }}>
                                            {index + 1}
                                        </div>
                                        <h4 style={{ fontSize: '1.1rem', margin: 0 }}>
                                            {classesData.getChapterName ? classesData.getChapterName(classNum, originalSubjectName, chapterName, index, selectedMedium) : chapterName}
                                        </h4>
                                    </div>
                                    <span style={{ color: 'var(--success-color)', display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}><CheckSquare size={18} /> View</span>
                                </div>
                                {(['notes', 'ncert-solution', 'mcqs', 'subjective', 'books', 'online-test', 'sample-paper', 'pyq'].includes(activeTab)) && (
                                    <div style={{ marginTop: '0.5rem' }}>
                                        <a
                                            href={`/pdfs/class${classNum}-${selectedMedium.toLowerCase()}-${selectedSubject === 'social studies (sst)' ? 'socialstudies' : selectedSubject.toLowerCase().replace(/[^a-z0-9]/gi, '')}${activeTab === 'notes' ? '' : '-' + activeTab}-ch${index + 1}.pdf`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="btn btn-primary"
                                            onClick={(e) => e.stopPropagation()} // Prevent triggering parent onClick if one is added later
                                            style={{ display: 'inline-flex', padding: '0.5rem 1rem', fontSize: '0.9rem', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}
                                        >
                                            View {classesData.tabs.find(t => t.id === activeTab)?.label || 'PDF'} <FileText size={16} />
                                        </a>
                                    </div>
                                )}
                            </div>
                        ))}
                        {chapters.length === 0 && (
                            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                                No chapters available for this subject yet.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClassDetail;
