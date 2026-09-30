import React, { useState } from 'react';
import { Clock, Award, Eye, EyeOff, Printer, FileDown, FileText } from 'lucide-react';

const SamplePaperViewer = ({ paperData, chapterTitle = '', activeMedium = 'English', pdfUrl, officialSamplePdf }) => {
    const [showSolutions, setShowSolutions] = useState(false);

    const sections = paperData?.sections || [];

    return (
        <div className="animate-fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="glass-card" style={{
                padding: '2rem',
                borderRadius: '16px',
                textAlign: 'center',
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(236, 72, 153, 0.06))'
            }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--primary-color)' }}>
                    Tech Karma Classes & CBSE Official Assessment Series
                </span>
                <h2 style={{ fontSize: '1.75rem', margin: '0.4rem 0', color: 'var(--text-primary)' }}>
                    {paperData?.paperTitle || 'Sample Question Paper'}
                </h2>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', color: 'var(--text-secondary)', fontSize: '0.95rem', margin: '1rem 0', flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Clock size={16} /> Time: {paperData?.timeAllowed || '3 Hours'}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Award size={16} /> Max Marks: {paperData?.maxMarks || 70}
                    </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                    {officialSamplePdf && (
                        <a
                            href={officialSamplePdf}
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-primary"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.4rem', textDecoration: 'none' }}
                        >
                            <FileDown size={16} /> Download CBSE 2026 Board Sample Paper (PDF)
                        </a>
                    )}
                    {pdfUrl && (
                        <a
                            href={pdfUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="btn-secondary"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.2rem', textDecoration: 'none', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-primary)' }}
                        >
                            <FileText size={16} /> Unit Test PDF
                        </a>
                    )}
                    <button
                        onClick={() => setShowSolutions(prev => !prev)}
                        className="btn-secondary"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.2rem' }}
                    >
                        {showSolutions ? <EyeOff size={16} /> : <Eye size={16} />}
                        {showSolutions ? 'Hide Marking Scheme' : 'View Marking Scheme'}
                    </button>
                    <button
                        onClick={() => window.print()}
                        className="btn-secondary"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.2rem' }}
                    >
                        <Printer size={16} /> Print
                    </button>
                </div>
            </div>

            <div style={{ background: 'var(--bg-secondary)', padding: '1.25rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                <h4 style={{ margin: '0 0 0.5rem', fontSize: '0.95rem', color: 'var(--text-primary)' }}>General Instructions:</h4>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.7 }}>
                    {(paperData?.generalInstructions || []).map((inst, idx) => (
                        <li key={idx}>{inst}</li>
                    ))}
                </ul>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {sections.map((sec, secIdx) => (
                    <div key={secIdx} className="glass-card" style={{ padding: '1.75rem', borderRadius: '14px' }}>
                        <h4 style={{ margin: '0 0 1rem', fontSize: '1.1rem', color: 'var(--primary-color)', fontWeight: 700, borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                            {sec.sectionName}
                        </h4>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            {(sec.questions || []).map((qItem, qIdx) => (
                                <div key={qIdx} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <div style={{ fontSize: '0.98rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                                        {qItem.q}
                                    </div>

                                    {showSolutions && qItem.answer && (
                                        <div style={{
                                            background: 'rgba(16, 185, 129, 0.08)',
                                            borderLeft: '3px solid var(--success-color)',
                                            padding: '0.75rem 1rem',
                                            borderRadius: '6px',
                                            fontSize: '0.88rem',
                                            color: 'var(--text-primary)',
                                            lineHeight: 1.6
                                        }}>
                                            <strong style={{ color: 'var(--success-color)' }}>Solution / Value Point:</strong> {qItem.answer}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SamplePaperViewer;
