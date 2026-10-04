import React, { useState } from 'react';
import { BookOpen, CheckCircle, ChevronDown, ChevronUp, FileText, Sparkles, Download } from 'lucide-react';

const NcertSolutionsViewer = ({ solutionsData, chapterTitle = '', activeMedium = 'English', pdfUrl, onOpenPdf }) => {
    const [expandedExercises, setExpandedExercises] = useState({ 0: true });

    const toggleExercise = (idx) => {
        setExpandedExercises(prev => ({ ...prev, [idx]: !prev[idx] }));
    };

    const exercises = solutionsData?.exercises || [];

    return (
        <div className="animate-fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(99, 102, 241, 0.08))',
                border: '1px solid rgba(99, 102, 241, 0.25)',
                borderRadius: '16px',
                padding: '1.75rem 2rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff',
                        fontWeight: 800,
                        boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
                    }}>
                        <BookOpen size={24} />
                    </div>
                    <div>
                        <h3 style={{ margin: 0, fontSize: '1.35rem', color: 'var(--text-primary)', fontWeight: 700 }}>
                            {solutionsData?.source || 'Tech Karma Classes — NCERT Solutions'}
                        </h3>
                        <p style={{ margin: '0.2rem 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                            {chapterTitle} • {activeMedium === 'Hindi' ? 'चरणबद्ध प्रामाणिक हल' : 'Verified Step-by-Step Textbook Solutions'}
                        </p>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                    {pdfUrl && (
                        <>
                            <button
                                onClick={() => onOpenPdf ? onOpenPdf(pdfUrl, chapterTitle, 'NCERT Solutions', 'Solutions PDF') : window.open(pdfUrl, '_blank')}
                                className="btn btn-primary"
                                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.25rem', fontSize: '0.88rem' }}
                            >
                                <FileText size={16} /> {activeMedium === 'Hindi' ? 'संपूर्ण पीडीएफ देखें' : 'View Chapter PDF'}
                            </button>
                            <a
                                href={pdfUrl}
                                download
                                target="_blank"
                                rel="noreferrer"
                                className="btn btn-secondary"
                                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.5rem 0.9rem', fontSize: '0.85rem' }}
                                title="Download PDF directly"
                            >
                                <Download size={15} /> {activeMedium === 'Hindi' ? 'डाउनलोड' : 'Download'}
                            </a>
                        </>
                    )}
                    <span style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success-color)', padding: '0.4rem 1rem', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 600 }}>
                        CBSE 2026 Marking Scheme Aligned
                    </span>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {exercises.map((ex, exIdx) => {
                    const isOpen = expandedExercises[exIdx];

                    return (
                        <div key={exIdx} className="glass-card" style={{ borderRadius: '14px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                            <div
                                onClick={() => toggleExercise(exIdx)}
                                style={{
                                    padding: '1.25rem 1.75rem',
                                    background: 'var(--bg-secondary)',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-primary)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <FileText size={18} color="var(--primary-color)" /> {ex.exerciseName}
                                </h4>
                                {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                            </div>

                            {isOpen && (
                                <div style={{ padding: '1.5rem 1.75rem', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                                    {(ex.questions || []).map((qItem, qIdx) => (
                                        <div key={qIdx} style={{
                                            borderBottom: qIdx < ex.questions.length - 1 ? '1px solid var(--border-color)' : 'none',
                                            paddingBottom: qIdx < ex.questions.length - 1 ? '1.5rem' : '0'
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', marginBottom: '0.8rem' }}>
                                                <span style={{ fontWeight: 800, color: 'var(--primary-color)', fontSize: '0.95rem', flexShrink: 0 }}>
                                                    {qItem.qNum}:
                                                </span>
                                                <h5 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--text-primary)', fontWeight: 600, lineHeight: 1.5 }}>
                                                    {qItem.question}
                                                </h5>
                                            </div>

                                            <div style={{
                                                background: 'var(--bg-primary)',
                                                border: '1px solid var(--border-color)',
                                                borderRadius: '10px',
                                                padding: '1.25rem',
                                                color: 'var(--text-primary)',
                                                fontSize: '0.92rem',
                                                lineHeight: 1.7,
                                                whiteSpace: 'pre-line'
                                            }}>
                                                <div style={{ fontWeight: 700, color: 'var(--success-color)', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem' }}>
                                                    <CheckCircle size={15} /> {activeMedium === 'Hindi' ? 'चरणबद्ध हल (Step-by-Step Solution)' : 'Step-by-Step Solution'}
                                                </div>
                                                {qItem.solution}
                                            </div>

                                            {qItem.keyConcept && (
                                                <div style={{ marginTop: '0.6rem', fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                                    <Sparkles size={13} color="var(--primary-color)" /> <strong>Key Formula / Principle:</strong> {qItem.keyConcept}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default NcertSolutionsViewer;
