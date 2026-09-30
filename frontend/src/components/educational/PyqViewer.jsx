import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

const PyqViewer = ({ pyqData, chapterTitle = '', activeMedium = 'English' }) => {
    const questions = pyqData?.questions || [];

    return (
        <div className="animate-fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{
                background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.08), rgba(99, 102, 241, 0.08))',
                border: '1px solid rgba(245, 158, 11, 0.25)',
                borderRadius: '16px',
                padding: '1.5rem 2rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff',
                        fontWeight: 800,
                        fontSize: '1rem'
                    }}>
                        PYQ
                    </div>
                    <div>
                        <h3 style={{ margin: 0, fontSize: '1.35rem', color: 'var(--text-primary)', fontWeight: 700 }}>
                            {pyqData?.title || 'Tech Karma Classes — PYQ Practice'}
                        </h3>
                        <p style={{ margin: '0.2rem 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                            {chapterTitle} • {activeMedium === 'Hindi' ? 'विगत वर्षों के बोर्ड प्रश्न एवं आदर्श हल' : 'Verified Previous Year Board Exam Questions'}
                        </p>
                    </div>
                </div>

                <span style={{
                    background: 'rgba(245, 158, 11, 0.12)',
                    color: 'var(--warning-color)',
                    padding: '0.4rem 1rem',
                    borderRadius: '50px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                }}>
                    <ShieldCheck size={16} /> Authentic Board Archive
                </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {questions.map((item, idx) => (
                    <div key={idx} className="glass-card" style={{ padding: '1.75rem', borderRadius: '14px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                <span style={{
                                    background: 'var(--primary-color)',
                                    color: '#ffffff',
                                    fontSize: '0.78rem',
                                    fontWeight: 700,
                                    padding: '0.2rem 0.6rem',
                                    borderRadius: '8px'
                                }}>
                                    {item.board || 'CBSE Board'}
                                </span>
                                <span style={{
                                    background: 'rgba(245, 158, 11, 0.15)',
                                    color: 'var(--warning-color)',
                                    fontSize: '0.78rem',
                                    fontWeight: 700,
                                    padding: '0.2rem 0.6rem',
                                    borderRadius: '8px'
                                }}>
                                    Year {item.year}
                                </span>
                                {item.topic && (
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                        • {item.topic}
                                    </span>
                                )}
                            </div>

                            {item.marks && (
                                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--primary-color)' }}>
                                    {item.marks} {activeMedium === 'Hindi' ? 'अंक' : 'Marks'}
                                </span>
                            )}
                        </div>

                        <h4 style={{ fontSize: '1.05rem', color: 'var(--text-primary)', marginBottom: '1rem', fontWeight: 600, lineHeight: 1.5 }}>
                            {item.question}
                        </h4>

                        <div style={{
                            background: 'var(--bg-secondary)',
                            borderRadius: '10px',
                            border: '1px solid var(--border-color)',
                            padding: '1.25rem',
                            color: 'var(--text-primary)',
                            fontSize: '0.9rem',
                            lineHeight: 1.7,
                            whiteSpace: 'pre-line'
                        }}>
                            <div style={{ fontWeight: 700, color: 'var(--success-color)', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                <CheckCircle2 size={16} /> {activeMedium === 'Hindi' ? 'आदर्श उत्तर (Board Standard Solution):' : 'Official Board Standard Solution:'}
                            </div>
                            {item.modelAnswer}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PyqViewer;
