import React from 'react';
import { Bookmark, Printer } from 'lucide-react';

const SubjectiveViewer = ({ subjectiveData, chapterTitle = '', activeMedium = 'English' }) => {
    const sections = subjectiveData?.sections || [];

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
                        {subjectiveData?.title || 'Tech Karma Classes Subjective Questions & Model Answers'}
                    </h3>
                    <p style={{ margin: '0.3rem 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        {chapterTitle} • {activeMedium === 'Hindi' ? 'लघु एवं दीर्घ उत्तरीय प्रश्न संग्रह' : 'Very Short, Short, Long & Case-Based Questions'}
                    </p>
                </div>
                <button
                    onClick={() => window.print()}
                    className="btn-secondary no-print"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.55rem 1.2rem',
                        fontSize: '0.88rem',
                        cursor: 'pointer',
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '8px',
                        color: 'var(--text-primary)',
                        fontWeight: 600
                    }}
                >
                    <Printer size={16} /> {activeMedium === 'Hindi' ? 'प्रिंट प्रश्न बैंक' : 'Print Questions'}
                </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {sections.map((sec, secIdx) => (
                    <div key={secIdx} className="glass-card" style={{ padding: '1.75rem', borderRadius: '14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                            <Bookmark size={20} color="var(--primary-color)" />
                            <h4 style={{ margin: 0, fontSize: '1.15rem', color: 'var(--text-primary)', fontWeight: 700 }}>
                                {sec.type}
                            </h4>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {(sec.questions || []).map((item, qIdx) => (
                                <div key={qIdx} style={{
                                    background: 'var(--bg-secondary)',
                                    borderRadius: '12px',
                                    border: '1px solid var(--border-color)',
                                    padding: '1.25rem'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '0.8rem' }}>
                                        <h5 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-primary)', fontWeight: 600, lineHeight: 1.5 }}>
                                            Q{qIdx + 1}. {item.q}
                                        </h5>
                                        {item.marks && (
                                            <span style={{
                                                fontSize: '0.78rem',
                                                fontWeight: 700,
                                                padding: '0.2rem 0.6rem',
                                                borderRadius: '12px',
                                                background: 'rgba(99, 102, 241, 0.12)',
                                                color: 'var(--primary-color)',
                                                flexShrink: 0
                                            }}>
                                                {item.marks} {activeMedium === 'Hindi' ? 'अंक' : 'Marks'}
                                            </span>
                                        )}
                                    </div>

                                    <div style={{
                                        background: 'var(--bg-primary)',
                                        borderLeft: '4px solid var(--success-color)',
                                        borderRadius: '6px',
                                        padding: '1rem 1.2rem',
                                        fontSize: '0.9rem',
                                        color: 'var(--text-primary)',
                                        lineHeight: 1.7,
                                        whiteSpace: 'pre-line'
                                    }}>
                                        <strong style={{ color: 'var(--success-color)', display: 'block', marginBottom: '0.3rem' }}>
                                            {activeMedium === 'Hindi' ? 'आदर्श उत्तर एवं अंक विभाजन:' : 'Model Answer & Marking Scheme:'}
                                        </strong>
                                        {item.modelAnswer}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SubjectiveViewer;
