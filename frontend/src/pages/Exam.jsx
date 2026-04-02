import React, { useState, useEffect } from 'react';
import { Target, Clock, AlertCircle, CheckCircle, RotateCcw } from 'lucide-react';

const Exam = () => {
    const [examState, setExamState] = useState('setup'); // setup, active, result
    const [level, setLevel] = useState('medium');
    const [timeLeft, setTimeLeft] = useState(0);

    const durationMap = { easy: 15 * 60, medium: 30 * 60, hard: 60 * 60 };

    useEffect(() => {
        let timer;
        if (examState === 'active' && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (examState === 'active' && timeLeft === 0) {
            setExamState('result');
        }
        return () => clearInterval(timer);
    }, [examState, timeLeft]);

    const startExam = () => {
        setTimeLeft(durationMap[level]);
        setExamState('active');
    };

    const submitExam = () => {
        setExamState('result');
    };

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    return (
        <div className="section container animate-fade-in-up">
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Test Your Skills</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>Take our mock exams to prepare for boards, university exams, or placements.</p>
            </div>

            <div style={{ maxWidth: '800px', margin: '0 auto' }}>

                {examState === 'setup' && (
                    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '3rem', textAlign: 'center' }}>
                        <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '1rem', borderRadius: '50%', color: 'var(--primary-color)', marginBottom: '1.5rem' }}>
                            <Target size={48} />
                        </div>
                        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Select Exam Difficulty</h2>

                        <div style={{ display: 'flex', gap: '1rem', width: '100%', maxWidth: '500px', marginBottom: '2rem' }}>
                            {['easy', 'medium', 'hard'].map(l => (
                                <button
                                    key={l}
                                    onClick={() => setLevel(l)}
                                    style={{
                                        flex: 1, padding: '1rem', borderRadius: 'var(--border-radius-sm)',
                                        textTransform: 'capitalize', fontWeight: 600,
                                        background: level === l ? 'var(--primary-color)' : 'transparent',
                                        color: level === l ? 'white' : 'var(--text-primary)',
                                        border: `2px solid ${level === l ? 'var(--primary-color)' : 'var(--border-color)'}`,
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {l}
                                    <div style={{ fontSize: '0.8rem', opacity: level === l ? 0.9 : 0.6, marginTop: '0.3rem', fontWeight: 400 }}>
                                        {durationMap[l] / 60} mins
                                    </div>
                                </button>
                            ))}
                        </div>

                        <div style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', padding: '1rem', borderRadius: 'var(--border-radius-sm)', display: 'flex', gap: '1rem', alignItems: 'flex-start', textAlign: 'left', marginBottom: '2rem', color: 'var(--text-primary)' }}>
                            <AlertCircle size={24} style={{ color: 'var(--warning-color)', flexShrink: 0 }} />
                            <p style={{ margin: 0, fontSize: '0.95rem' }}>
                                Ensure you have a stable internet connection. Do not refresh the page or switch tabs once the exam begins. The test will auto-submit when the timer reaches zero.
                            </p>
                        </div>

                        <button className="btn btn-primary" onClick={startExam} style={{ padding: '1rem 3rem', fontSize: '1.2rem' }}>
                            Start Exam Now
                        </button>
                    </div>
                )}

                {examState === 'active' && (
                    <div className="animate-fade-in-up">
                        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', padding: '1rem 2rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <span style={{ fontWeight: 600, textTransform: 'capitalize', color: 'var(--primary-color)' }}>{level} Level Test</span>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', background: timeLeft < 300 ? 'rgba(239, 68, 68, 0.1)' : 'var(--bg-secondary)', padding: '0.5rem 1rem', borderRadius: '50px', border: `1px solid ${timeLeft < 300 ? 'var(--danger-color)' : 'var(--border-color)'}`, color: timeLeft < 300 ? 'var(--danger-color)' : 'var(--text-primary)' }}>
                                <Clock size={20} className={timeLeft < 60 ? 'animate-pulse' : ''} />
                                <span style={{ fontSize: '1.2rem', fontWeight: 700, fontFamily: 'monospace' }}>
                                    {formatTime(timeLeft)}
                                </span>
                            </div>
                        </div>

                        <div className="glass-card" style={{ padding: '3rem', minHeight: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                            <h3 style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>Question UI Placeholder</h3>
                            <p style={{ maxWidth: '400px', opacity: 0.6 }}>The actual questions will be loaded here dynamically based on the selected backend API in the future.</p>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                            <button className="btn btn-secondary">Previous</button>
                            <button className="btn btn-primary">Next Question</button>
                        </div>

                        <div style={{ textAlign: 'center', marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
                            <button onClick={submitExam} className="btn" style={{ background: 'var(--success-color)', color: 'white' }}>
                                Submit Exam
                            </button>
                        </div>
                    </div>
                )}

                {examState === 'result' && (
                    <div className="glass-card animate-fade-in-up" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                        <div style={{ display: 'inline-flex', background: 'rgba(16, 185, 129, 0.1)', padding: '1.5rem', borderRadius: '50%', color: 'var(--success-color)', marginBottom: '1.5rem' }}>
                            <CheckCircle size={64} />
                        </div>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Exam Completed!</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '2.5rem' }}>Your answers have been successfully recorded.</p>

                        <div className="grid grid-3" style={{ gap: '1rem', marginBottom: '3rem', background: 'var(--bg-primary)', padding: '2rem', borderRadius: 'var(--border-radius)' }}>
                            <div>
                                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary-color)' }}>78%</div>
                                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Score</div>
                            </div>
                            <div style={{ borderLeft: '1px solid var(--border-color)', borderRight: '1px solid var(--border-color)' }}>
                                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--success-color)' }}>23</div>
                                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Correct</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--danger-color)' }}>7</div>
                                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Incorrect</div>
                            </div>
                        </div>

                        <button className="btn btn-primary" onClick={() => setExamState('setup')} style={{ padding: '1rem 2rem' }}>
                            <RotateCcw size={20} /> Take Another Test
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Exam;
