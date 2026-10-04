import React, { useState } from 'react';
import { CheckCircle2, XCircle, HelpCircle, Award, RotateCcw, Filter, FileText, Download } from 'lucide-react';

const McqViewer = ({ mcqs = [], chapterTitle = '', activeMedium = 'English', pdfUrl, onOpenPdf }) => {
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [showExplanations, setShowExplanations] = useState({});
    const [difficultyFilter, setDifficultyFilter] = useState('All');

    const handleSelectOption = (qId, optionIdx) => {
        if (selectedAnswers[qId] !== undefined) return;
        setSelectedAnswers(prev => ({ ...prev, [qId]: optionIdx }));
        setShowExplanations(prev => ({ ...prev, [qId]: true }));
    };

    const handleReset = () => {
        setSelectedAnswers({});
        setShowExplanations({});
    };

    const filteredMcqs = difficultyFilter === 'All' 
        ? mcqs 
        : mcqs.filter(m => m.difficulty?.toLowerCase() === difficultyFilter.toLowerCase());

    const totalAnswered = Object.keys(selectedAnswers).length;
    const totalCorrect = Object.entries(selectedAnswers).reduce((acc, [qId, optIdx]) => {
        const q = mcqs.find(m => m.id === qId);
        return acc + (q && q.correctIndex === optIdx ? 1 : 0);
    }, 0);

    return (
        <div className="animate-fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(236, 72, 153, 0.06))',
                border: '1px solid var(--border-color)',
                borderRadius: '16px',
                padding: '1.5rem 2rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem'
            }}>
                <div>
                    <h3 style={{ margin: 0, fontSize: '1.4rem', color: 'var(--text-primary)', fontWeight: 700 }}>
                        {activeMedium === 'Hindi' ? 'अभ्यास बहुविकल्पीय प्रश्न (MCQs)' : 'Practice MCQs & Concept Check'}
                    </h3>
                    <p style={{ margin: '0.3rem 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        {chapterTitle} • {filteredMcqs.length} {activeMedium === 'Hindi' ? 'प्रश्न उपलब्ध' : 'Curated Questions'}
                    </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                    {pdfUrl && (
                        <>
                            <button
                                onClick={() => onOpenPdf ? onOpenPdf(pdfUrl, chapterTitle, 'MCQ Practice', 'MCQs PDF') : window.open(pdfUrl, '_blank')}
                                className="btn btn-primary"
                                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.45rem 1.1rem', fontSize: '0.85rem' }}
                            >
                                <FileText size={15} /> {activeMedium === 'Hindi' ? 'MCQ पीडीएफ' : 'MCQs PDF'}
                            </button>
                            <a
                                href={pdfUrl}
                                download
                                target="_blank"
                                rel="noreferrer"
                                className="btn btn-secondary"
                                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.45rem 0.9rem', fontSize: '0.85rem' }}
                                title="Download PDF directly"
                            >
                                <Download size={14} /> {activeMedium === 'Hindi' ? 'डाउनलोड' : 'Download'}
                            </a>
                        </>
                    )}
                    {totalAnswered > 0 && (
                        <div style={{
                            background: 'rgba(16, 185, 129, 0.12)',
                            color: 'var(--success-color)',
                            padding: '0.4rem 1rem',
                            borderRadius: '50px',
                            fontWeight: 700,
                            fontSize: '0.9rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem'
                        }}>
                            <Award size={18} /> {totalCorrect} / {totalAnswered} Correct ({Math.round((totalCorrect / totalAnswered) * 100)}%)
                        </div>
                    )}

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'var(--bg-secondary)', padding: '0.3rem 0.6rem', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                        <Filter size={14} color="var(--text-secondary)" />
                        <select
                            value={difficultyFilter}
                            onChange={(e) => setDifficultyFilter(e.target.value)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--text-primary)',
                                fontSize: '0.85rem',
                                outline: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            <option value="All">All Levels</option>
                            <option value="Easy">Easy</option>
                            <option value="Moderate">Moderate</option>
                            <option value="Conceptual">Conceptual</option>
                        </select>
                    </div>

                    {totalAnswered > 0 && (
                        <button
                            onClick={handleReset}
                            className="btn-secondary"
                            style={{ padding: '0.4rem 0.9rem', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
                        >
                            <RotateCcw size={14} /> Reset
                        </button>
                    )}
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {filteredMcqs.map((mcq, idx) => {
                    const answered = selectedAnswers[mcq.id] !== undefined;
                    const selectedIdx = selectedAnswers[mcq.id];
                    const isCorrect = selectedIdx === mcq.correctIndex;
                    const showExp = showExplanations[mcq.id];

                    return (
                        <div
                            key={mcq.id || idx}
                            className="glass-card"
                            style={{
                                padding: '1.75rem',
                                borderRadius: '14px',
                                border: answered 
                                    ? (isCorrect ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(239, 68, 68, 0.4)')
                                    : '1px solid var(--border-color)',
                                background: answered
                                    ? (isCorrect ? 'rgba(16, 185, 129, 0.02)' : 'rgba(239, 68, 68, 0.02)')
                                    : 'var(--bg-secondary)',
                                transition: 'all 0.2s ease',
                                boxShadow: 'var(--card-shadow)'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.2rem' }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                                    <span style={{
                                        background: 'var(--primary-color)',
                                        color: '#ffffff',
                                        width: '28px',
                                        height: '28px',
                                        borderRadius: '8px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 800,
                                        fontSize: '0.85rem',
                                        flexShrink: 0
                                    }}>
                                        {idx + 1}
                                    </span>
                                    <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-primary)', fontWeight: 600, lineHeight: 1.5 }}>
                                        {mcq.question}
                                    </h4>
                                </div>

                                {mcq.difficulty && (
                                    <span style={{
                                        fontSize: '0.75rem',
                                        fontWeight: 700,
                                        padding: '0.2rem 0.6rem',
                                        borderRadius: '12px',
                                        textTransform: 'uppercase',
                                        background: mcq.difficulty.toLowerCase() === 'easy' ? 'rgba(16, 185, 129, 0.1)' : mcq.difficulty.toLowerCase() === 'moderate' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(99, 102, 241, 0.1)',
                                        color: mcq.difficulty.toLowerCase() === 'easy' ? 'var(--success-color)' : mcq.difficulty.toLowerCase() === 'moderate' ? 'var(--warning-color)' : 'var(--primary-color)',
                                        flexShrink: 0
                                    }}>
                                        {mcq.difficulty}
                                    </span>
                                )}
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.8rem', marginBottom: '1rem' }}>
                                {mcq.options.map((opt, optIdx) => {
                                    const optionLabels = ['A', 'B', 'C', 'D'];
                                    const isThisSelected = selectedIdx === optIdx;
                                    const isThisCorrect = mcq.correctIndex === optIdx;

                                    let btnBackground = 'var(--bg-primary)';
                                    let btnBorder = '1px solid var(--border-color)';
                                    let btnColor = 'var(--text-primary)';

                                    if (answered) {
                                        if (isThisCorrect) {
                                            btnBackground = 'rgba(16, 185, 129, 0.15)';
                                            btnBorder = '1px solid var(--success-color)';
                                            btnColor = 'var(--success-color)';
                                        } else if (isThisSelected && !isThisCorrect) {
                                            btnBackground = 'rgba(239, 68, 68, 0.15)';
                                            btnBorder = '1px solid #ef4444';
                                            btnColor = '#ef4444';
                                        }
                                    }

                                    return (
                                        <button
                                            key={optIdx}
                                            onClick={() => handleSelectOption(mcq.id, optIdx)}
                                            disabled={answered}
                                            style={{
                                                background: btnBackground,
                                                border: btnBorder,
                                                color: btnColor,
                                                borderRadius: '10px',
                                                padding: '0.85rem 1rem',
                                                textAlign: 'left',
                                                fontSize: '0.95rem',
                                                fontWeight: 500,
                                                cursor: answered ? 'default' : 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.75rem',
                                                transition: 'all 0.15s ease'
                                            }}
                                        >
                                            <span style={{
                                                width: '24px',
                                                height: '24px',
                                                borderRadius: '50%',
                                                background: answered && isThisCorrect ? 'var(--success-color)' : (answered && isThisSelected ? '#ef4444' : 'var(--bg-secondary)'),
                                                color: (answered && (isThisCorrect || isThisSelected)) ? '#ffffff' : 'var(--text-secondary)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontWeight: 700,
                                                fontSize: '0.8rem',
                                                flexShrink: 0
                                            }}>
                                                {optionLabels[optIdx]}
                                            </span>
                                            <span style={{ flex: 1 }}>{opt}</span>
                                            {answered && isThisCorrect && <CheckCircle2 size={18} color="var(--success-color)" />}
                                            {answered && isThisSelected && !isThisCorrect && <XCircle size={18} color="#ef4444" />}
                                        </button>
                                    );
                                })}
                            </div>

                            {showExp && mcq.explanation && (
                                <div style={{
                                    marginTop: '1rem',
                                    padding: '1rem 1.25rem',
                                    borderRadius: '10px',
                                    background: isCorrect ? 'rgba(16, 185, 129, 0.08)' : 'rgba(99, 102, 241, 0.08)',
                                    borderLeft: isCorrect ? '4px solid var(--success-color)' : '4px solid var(--primary-color)',
                                    color: 'var(--text-primary)',
                                    fontSize: '0.9rem',
                                    lineHeight: 1.6
                                }}>
                                    <div style={{ fontWeight: 700, marginBottom: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: isCorrect ? 'var(--success-color)' : 'var(--primary-color)' }}>
                                        <HelpCircle size={16} /> {activeMedium === 'Hindi' ? 'विस्तृत व्याख्या' : 'Detailed Explanation'}
                                    </div>
                                    <p style={{ margin: 0 }}>{mcq.explanation}</p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default McqViewer;
