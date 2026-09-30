import React, { useState, useEffect } from 'react';
import { Target, Clock, CheckCircle, AlertCircle, RotateCcw, ArrowRight, ArrowLeft, Award, HelpCircle } from 'lucide-react';

const OnlineTestRunner = ({ testData, chapterTitle = '', activeMedium = 'English' }) => {
    const [testState, setTestState] = useState('welcome');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [flagged, setFlagged] = useState({});
    const [timeLeft, setTimeLeft] = useState((testData?.durationMinutes || 20) * 60);

    const questions = testData?.questions || [];

    useEffect(() => {
        let timer;
        if (testState === 'running' && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (testState === 'running' && timeLeft === 0) {
            setTestState('result');
        }
        return () => clearInterval(timer);
    }, [testState, timeLeft]);

    const handleStart = () => {
        setTimeLeft((testData?.durationMinutes || 20) * 60);
        setAnswers({});
        setFlagged({});
        setCurrentQuestion(0);
        setTestState('running');
    };

    const handleSelectOption = (qIdx, optIdx) => {
        setAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
    };

    const handleToggleFlag = (qIdx) => {
        setFlagged(prev => ({ ...prev, [qIdx]: !prev[qIdx] }));
    };

    const handleSubmit = () => {
        setTestState('result');
    };

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    const totalQuestions = questions.length;
    let correctCount = 0;
    let attemptedCount = 0;

    questions.forEach((q, idx) => {
        if (answers[idx] !== undefined) {
            attemptedCount++;
            if (answers[idx] === q.correctIndex) {
                correctCount++;
            }
        }
    });

    const score = correctCount * 2;
    const totalMarks = totalQuestions * 2;
    const percentage = totalMarks > 0 ? Math.round((score / totalMarks) * 100) : 0;

    if (testState === 'welcome') {
        return (
            <div className="glass-card animate-fade-in-up" style={{ padding: '3rem 2rem', textAlign: 'center', maxWidth: '750px', margin: '0 auto' }}>
                <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(236, 72, 153, 0.2))',
                    color: 'var(--primary-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem'
                }}>
                    <Target size={32} />
                </div>

                <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                    {testData?.testTitle || (activeMedium === 'Hindi' ? 'ऑनलाइन अध्याय मूल्यांकन' : 'Chapter Online Assessment')}
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '2rem' }}>
                    {chapterTitle} • {totalQuestions} {activeMedium === 'Hindi' ? 'प्रश्न' : 'Questions'} • {testData?.durationMinutes || 20} {activeMedium === 'Hindi' ? 'मिनट' : 'Mins'} • {totalMarks} {activeMedium === 'Hindi' ? 'कुल अंक' : 'Total Marks'}
                </p>

                <div style={{
                    background: 'var(--bg-secondary)',
                    borderRadius: '12px',
                    border: '1px solid var(--border-color)',
                    padding: '1.5rem',
                    textAlign: 'left',
                    marginBottom: '2rem'
                }}>
                    <h4 style={{ margin: '0 0 0.8rem', fontSize: '1.05rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <AlertCircle size={18} color="var(--primary-color)" /> {activeMedium === 'Hindi' ? 'परीक्षा निर्देश' : 'Test Instructions'}
                    </h4>
                    <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.8 }}>
                        {(testData?.instructions || [
                            'Each question has 4 options with only 1 correct answer.',
                            '2 marks awarded for every correct response. No negative marking.',
                            'You can navigate between questions and mark them for review.'
                        ]).map((inst, idx) => (
                            <li key={idx}>{inst}</li>
                        ))}
                    </ul>
                </div>

                <button onClick={handleStart} className="btn btn-primary" style={{ padding: '0.9rem 3rem', fontSize: '1.1rem' }}>
                    {activeMedium === 'Hindi' ? 'टेस्ट शुरू करें' : 'Start Online Test Now'} <ArrowRight size={18} />
                </button>
            </div>
        );
    }

    if (testState === 'running') {
        const q = questions[currentQuestion];
        return (
            <div className="animate-fade-in-up online-test-grid">
                <div className="glass-card" style={{ padding: '2rem', borderRadius: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                        <span style={{ fontWeight: 700, color: 'var(--primary-color)', fontSize: '0.95rem' }}>
                            {activeMedium === 'Hindi' ? 'प्रश्न' : 'Question'} {currentQuestion + 1} of {totalQuestions}
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Marks: +2 / -0</span>
                            <button
                                onClick={() => handleToggleFlag(currentQuestion)}
                                style={{
                                    background: flagged[currentQuestion] ? 'rgba(245, 158, 11, 0.15)' : 'var(--bg-secondary)',
                                    color: flagged[currentQuestion] ? 'var(--warning-color)' : 'var(--text-secondary)',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: '8px',
                                    padding: '0.3rem 0.7rem',
                                    fontSize: '0.8rem',
                                    cursor: 'pointer',
                                    fontWeight: 600
                                }}
                            >
                                {flagged[currentQuestion] ? '★ Flagged' : '☆ Flag for Review'}
                            </button>
                        </div>
                    </div>

                    <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '1.5rem', lineHeight: 1.5, fontWeight: 600 }}>
                        {q?.question}
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
                        {(q?.options || []).map((opt, optIdx) => {
                            const optionLabels = ['A', 'B', 'C', 'D'];
                            const isSelected = answers[currentQuestion] === optIdx;

                            return (
                                <button
                                    key={optIdx}
                                    onClick={() => handleSelectOption(currentQuestion, optIdx)}
                                    style={{
                                        background: isSelected ? 'rgba(99, 102, 241, 0.15)' : 'var(--bg-primary)',
                                        border: isSelected ? '2px solid var(--primary-color)' : '1px solid var(--border-color)',
                                        color: 'var(--text-primary)',
                                        borderRadius: '10px',
                                        padding: '1rem 1.25rem',
                                        textAlign: 'left',
                                        fontSize: '0.98rem',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        transition: 'all 0.15s'
                                    }}
                                >
                                    <span style={{
                                        width: '28px',
                                        height: '28px',
                                        borderRadius: '50%',
                                        background: isSelected ? 'var(--primary-color)' : 'var(--bg-secondary)',
                                        color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 700,
                                        fontSize: '0.85rem'
                                    }}>
                                        {optionLabels[optIdx]}
                                    </span>
                                    <span style={{ flex: 1 }}>{opt}</span>
                                </button>
                            );
                        })}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <button
                            onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                            disabled={currentQuestion === 0}
                            className="btn-secondary"
                            style={{ opacity: currentQuestion === 0 ? 0.4 : 1, display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                        >
                            <ArrowLeft size={16} /> {activeMedium === 'Hindi' ? 'पिछला' : 'Previous'}
                        </button>

                        {currentQuestion < totalQuestions - 1 ? (
                            <button
                                onClick={() => setCurrentQuestion(prev => Math.min(totalQuestions - 1, prev + 1))}
                                className="btn btn-primary"
                                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                            >
                                {activeMedium === 'Hindi' ? 'अगला' : 'Next'} <ArrowRight size={16} />
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                className="btn btn-primary"
                                style={{ background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none' }}
                            >
                                {activeMedium === 'Hindi' ? 'परीक्षा सबमिट करें' : 'Submit Test'}
                            </button>
                        )}
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="glass-card" style={{
                        padding: '1.25rem',
                        textAlign: 'center',
                        borderRadius: '14px',
                        background: timeLeft < 300 ? 'rgba(239, 68, 68, 0.08)' : 'var(--bg-secondary)',
                        border: timeLeft < 300 ? '1px solid #ef4444' : '1px solid var(--border-color)'
                    }}>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            {activeMedium === 'Hindi' ? 'शेष समय' : 'Time Remaining'}
                        </span>
                        <div style={{
                            fontSize: '2rem',
                            fontWeight: 800,
                            fontFamily: 'monospace',
                            color: timeLeft < 300 ? '#ef4444' : 'var(--primary-color)',
                            marginTop: '0.3rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem'
                        }}>
                            <Clock size={24} /> {formatTime(timeLeft)}
                        </div>
                    </div>

                    <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '14px' }}>
                        <h4 style={{ margin: '0 0 1rem', fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: 700 }}>
                            {activeMedium === 'Hindi' ? 'प्रश्न नेविगेटर' : 'Question Palette'}
                        </h4>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.5rem', marginBottom: '1.5rem' }}>
                            {questions.map((_, idx) => {
                                const isCurrent = currentQuestion === idx;
                                const isAnswered = answers[idx] !== undefined;
                                const isFlagged = flagged[idx];

                                let bg = 'var(--bg-primary)';
                                let color = 'var(--text-secondary)';
                                let border = '1px solid var(--border-color)';

                                if (isAnswered) {
                                    bg = 'rgba(16, 185, 129, 0.2)';
                                    color = 'var(--success-color)';
                                    border = '1px solid var(--success-color)';
                                }
                                if (isFlagged) {
                                    bg = 'rgba(245, 158, 11, 0.2)';
                                    color = 'var(--warning-color)';
                                }
                                if (isCurrent) {
                                    border = '2px solid var(--primary-color)';
                                }

                                return (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentQuestion(idx)}
                                        style={{
                                            height: '36px',
                                            borderRadius: '8px',
                                            background: bg,
                                            color: color,
                                            border: border,
                                            fontWeight: 700,
                                            fontSize: '0.85rem',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {idx + 1}
                                    </button>
                                );
                            })}
                        </div>

                        <button
                            onClick={handleSubmit}
                            className="btn btn-primary"
                            style={{ width: '100%', marginTop: '0.5rem', padding: '0.6rem 1rem', fontSize: '0.9rem' }}
                        >
                            {activeMedium === 'Hindi' ? 'सबमिट करें' : 'Submit Test'}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="animate-fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="glass-card" style={{
                padding: '2.5rem',
                borderRadius: '16px',
                textAlign: 'center',
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(16, 185, 129, 0.08))',
                border: '1px solid var(--border-color)'
            }}>
                <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: percentage >= 60 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                    color: percentage >= 60 ? 'var(--success-color)' : 'var(--warning-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem'
                }}>
                    <Award size={32} />
                </div>

                <h2 style={{ fontSize: '2rem', margin: '0 0 0.5rem', color: 'var(--text-primary)' }}>
                    {percentage >= 80 ? 'Outstanding Performance!' : percentage >= 50 ? 'Good Effort!' : 'Keep Practicing!'}
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '2rem' }}>
                    {chapterTitle} • Online Test Assessment
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', maxWidth: '650px', margin: '0 auto 2rem' }}>
                    <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                        <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary-color)' }}>{score} / {totalMarks}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Score Secured</div>
                    </div>
                    <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                        <div style={{ fontSize: '1.8rem', fontWeight: 800, color: percentage >= 60 ? 'var(--success-color)' : '#ef4444' }}>{percentage}%</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Percentage</div>
                    </div>
                    <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                        <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--success-color)' }}>{correctCount}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Correct Answers</div>
                    </div>
                    <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                        <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ef4444' }}>{attemptedCount - correctCount}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Incorrect Answers</div>
                    </div>
                </div>

                <button onClick={handleStart} className="btn btn-primary" style={{ padding: '0.75rem 2rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    <RotateCcw size={16} /> {activeMedium === 'Hindi' ? 'पुनः परीक्षा दें' : 'Retake Test'}
                </button>
            </div>

            <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', margin: '1rem 0 0', fontWeight: 700 }}>
                {activeMedium === 'Hindi' ? 'विस्तृत प्रश्न समीक्षा एवं हल' : 'Question Review & Solutions'}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {questions.map((q, idx) => {
                    const selectedOpt = answers[idx];
                    const isCorrect = selectedOpt === q.correctIndex;
                    const optionLabels = ['A', 'B', 'C', 'D'];

                    return (
                        <div key={idx} className="glass-card" style={{
                            padding: '1.5rem',
                            borderRadius: '12px',
                            border: isCorrect ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(239, 68, 68, 0.4)'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                <h4 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                                    Q{idx + 1}. {q.question}
                                </h4>
                                <span style={{
                                    fontSize: '0.78rem',
                                    fontWeight: 700,
                                    padding: '0.2rem 0.6rem',
                                    borderRadius: '12px',
                                    background: isCorrect ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                                    color: isCorrect ? 'var(--success-color)' : '#ef4444',
                                    flexShrink: 0
                                }}>
                                    {isCorrect ? '+2 Marks' : '0 Marks'}
                                </span>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.6rem', marginBottom: '1rem' }}>
                                {(q.options || []).map((opt, optIdx) => {
                                    const isCorrectOpt = optIdx === q.correctIndex;
                                    const isSelectedOpt = optIdx === selectedOpt;

                                    let optBg = 'var(--bg-primary)';
                                    let optBorder = '1px solid var(--border-color)';
                                    if (isCorrectOpt) {
                                        optBg = 'rgba(16, 185, 129, 0.15)';
                                        optBorder = '1px solid var(--success-color)';
                                    } else if (isSelectedOpt && !isCorrectOpt) {
                                        optBg = 'rgba(239, 68, 68, 0.15)';
                                        optBorder = '1px solid #ef4444';
                                    }

                                    return (
                                        <div key={optIdx} style={{
                                            padding: '0.6rem 0.8rem',
                                            borderRadius: '8px',
                                            background: optBg,
                                            border: optBorder,
                                            fontSize: '0.88rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem'
                                        }}>
                                            <span style={{ fontWeight: 700 }}>{optionLabels[optIdx]}.</span>
                                            <span>{opt}</span>
                                            {isCorrectOpt && <CheckCircle size={14} color="var(--success-color)" style={{ marginLeft: 'auto' }} />}
                                        </div>
                                    );
                                })}
                            </div>

                            {q.explanation && (
                                <div style={{ background: 'var(--bg-secondary)', padding: '0.8rem 1rem', borderRadius: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                    <strong style={{ color: 'var(--primary-color)' }}>Explanation:</strong> {q.explanation}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default OnlineTestRunner;
