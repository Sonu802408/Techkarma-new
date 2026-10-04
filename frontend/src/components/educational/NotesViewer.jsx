import React, { useState } from 'react';
import { 
    BookOpen, Printer, Copy, Check, Sparkles, AlertTriangle, 
    CheckCircle2, ChevronRight, Layers, FileText, ArrowRight,
    HelpCircle, Lightbulb, Compass, Award
} from 'lucide-react';

const NotesViewer = ({
    notesData,
    chapterTitle = '',
    activeMedium = 'English',
    classNum,
    subject
}) => {
    const [copiedMindMap, setCopiedMindMap] = useState(false);
    const isHindi = (activeMedium || 'English').toLowerCase() === 'hindi';

    const handleCopyMindMap = () => {
        if (notesData?.mindMap) {
            navigator.clipboard.writeText(notesData.mindMap);
            setCopiedMindMap(true);
            setTimeout(() => setCopiedMindMap(false), 2000);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    const topics = notesData?.topics || notesData?.sections || [];

    return (
        <div className="notes-viewer-container animate-fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* PRINT-ONLY HEADER */}
            <div className="print-only-header" style={{ display: 'none' }}>
                <div style={{ textAlign: 'center', borderBottom: '2px solid #1e293b', paddingBottom: '12px', marginBottom: '16px' }}>
                    <h1 style={{ fontSize: '20pt', margin: 0, color: '#0f172a', fontWeight: 800 }}>TECH KARMA CLASSES</h1>
                    <p style={{ fontSize: '10pt', margin: '4px 0 0', color: '#475569' }}>
                        Official CBSE 2026 Study Notes • Class {classNum} {subject} • {isHindi ? 'हिंदी माध्यम' : 'English Medium'}
                    </p>
                    <h2 style={{ fontSize: '14pt', margin: '8px 0 0', color: '#2563eb', fontWeight: 700 }}>
                        {notesData?.chapterTitle || chapterTitle}
                    </h2>
                </div>
            </div>

            {/* SCREEN HEADER HERO */}
            <div className="no-print glass-card" style={{
                borderRadius: '18px',
                padding: '2rem 2.2rem',
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(59, 130, 246, 0.08) 50%, rgba(236, 72, 153, 0.08) 100%)',
                border: '1px solid rgba(99, 102, 241, 0.25)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                            width: '54px',
                            height: '54px',
                            borderRadius: '14px',
                            background: 'linear-gradient(135deg, #4f46e5, #06b6d4)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#ffffff',
                            fontWeight: 800,
                            boxShadow: '0 6px 18px rgba(79, 70, 229, 0.35)',
                            flexShrink: 0
                        }}>
                            <BookOpen size={28} />
                        </div>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '0.3rem' }}>
                                <span style={{
                                    fontSize: '0.75rem',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    color: '#ffffff',
                                    background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                                    padding: '0.2rem 0.75rem',
                                    borderRadius: '50px',
                                    letterSpacing: '0.5px'
                                }}>
                                    CBSE Class {classNum} {subject}
                                </span>
                                <span style={{
                                    fontSize: '0.75rem',
                                    fontWeight: 700,
                                    color: isHindi ? '#ec4899' : '#0ea5e9',
                                    background: isHindi ? 'rgba(236, 72, 153, 0.15)' : 'rgba(14, 165, 233, 0.15)',
                                    padding: '0.2rem 0.7rem',
                                    borderRadius: '50px'
                                }}>
                                    {isHindi ? 'हिंदी माध्यम (Hindi Medium)' : 'English Medium'}
                                </span>
                                <span style={{
                                    fontSize: '0.75rem',
                                    fontWeight: 700,
                                    color: '#10b981',
                                    background: 'rgba(16, 185, 129, 0.15)',
                                    padding: '0.2rem 0.7rem',
                                    borderRadius: '50px'
                                }}>
                                    100% NCERT Syllabus
                                </span>
                            </div>
                            <h2 style={{ margin: 0, fontSize: '1.75rem', color: 'var(--text-primary)', fontWeight: 800, lineHeight: 1.3 }}>
                                {notesData?.chapterTitle || chapterTitle}
                            </h2>
                        </div>
                    </div>

                    {/* ACTIONS */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                        <button
                            onClick={handlePrint}
                            className="btn btn-primary"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.65rem 1.4rem',
                                fontSize: '0.92rem',
                                fontWeight: 700,
                                borderRadius: '10px',
                                boxShadow: '0 4px 15px rgba(59, 130, 246, 0.35)',
                                cursor: 'pointer'
                            }}
                            title="Print or Save as PDF with official Tech Karma formatting"
                        >
                            <Printer size={18} />
                            {isHindi ? 'प्रिंट करें / पीडीएफ सेव करें' : 'Print / Save PDF'}
                        </button>
                    </div>
                </div>

                {notesData?.overview && (
                    <p style={{
                        margin: 0,
                        color: 'var(--text-secondary)',
                        fontSize: '0.95rem',
                        lineHeight: 1.65,
                        borderTop: '1px solid var(--border-color)',
                        paddingTop: '0.9rem'
                    }}>
                        <strong>{isHindi ? 'अध्याय सारांश:' : 'Chapter Overview:'}</strong> {notesData.overview}
                    </p>
                )}
            </div>

            {/* FIRST PAGE: TEXT-BASED / ASCII MIND MAP */}
            {notesData?.mindMap && (
                <div className="notes-card" style={{
                    borderRadius: '16px',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    padding: '1.75rem 2rem',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1rem',
                        borderBottom: '1px solid var(--border-color)',
                        paddingBottom: '0.75rem',
                        flexWrap: 'wrap',
                        gap: '0.5rem'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                            <Compass size={22} color="var(--primary-color)" />
                            <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--text-primary)', fontWeight: 700 }}>
                                {isHindi ? '🗺️ अध्याय माइंड मैप (Mind Map - एक नज़र में संपूर्ण पुनरावृत्ति)' : '🗺️ Chapter Mind Map (Glance Flow Diagram)'}
                            </h3>
                        </div>
                        <button
                            onClick={handleCopyMindMap}
                            className="no-print btn-secondary"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.4rem',
                                padding: '0.4rem 0.9rem',
                                fontSize: '0.82rem',
                                borderRadius: '8px',
                                background: 'var(--bg-primary)',
                                border: '1px solid var(--border-color)',
                                color: 'var(--text-primary)',
                                cursor: 'pointer'
                            }}
                        >
                            {copiedMindMap ? <Check size={14} color="var(--success-color)" /> : <Copy size={14} />}
                            {copiedMindMap ? (isHindi ? 'कॉपी हो गया!' : 'Copied!') : (isHindi ? 'माइंड मैप कॉपी करें' : 'Copy Mind Map')}
                        </button>
                    </div>

                    <pre style={{
                        margin: 0,
                        padding: '1.25rem',
                        background: 'rgba(15, 23, 42, 0.75)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '12px',
                        color: '#38bdf8',
                        fontFamily: 'JetBrains Mono, Consolas, Monaco, monospace',
                        fontSize: '0.88rem',
                        lineHeight: 1.5,
                        overflowX: 'auto',
                        whiteSpace: 'pre'
                    }}>
                        {notesData.mindMap}
                    </pre>
                </div>
            )}

            {/* DETAILED TOPICS LIST */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {topics.map((t, idx) => (
                    <div 
                        key={idx}
                        className="notes-topic-card notes-card"
                        style={{
                            borderRadius: '16px',
                            background: 'var(--bg-secondary)',
                            border: '1px solid var(--border-color)',
                            padding: '2rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.5rem',
                            position: 'relative'
                        }}
                    >
                        {/* TOPIC HEADER */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            borderBottom: '2px solid var(--border-color)',
                            paddingBottom: '0.9rem'
                        }}>
                            <span style={{ fontSize: '1.6rem' }}>{t.emoji || '📖'}</span>
                            <h3 style={{ margin: 0, fontSize: '1.35rem', color: 'var(--text-primary)', fontWeight: 800 }}>
                                {t.title}
                            </h3>
                        </div>

                        {/* BULLET POINTS & CONTENT */}
                        {t.concepts && Array.isArray(t.concepts) && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {t.concepts.map((concept, cIdx) => (
                                    <div 
                                        key={cIdx} 
                                        style={{ 
                                            display: 'flex', 
                                            alignItems: 'flex-start', 
                                            gap: '0.75rem',
                                            lineHeight: 1.7,
                                            fontSize: '0.96rem',
                                            color: 'var(--text-primary)'
                                        }}
                                    >
                                        <div style={{
                                            width: '8px',
                                            height: '8px',
                                            borderRadius: '50%',
                                            background: 'var(--primary-color)',
                                            marginTop: '0.55rem',
                                            flexShrink: 0
                                        }} />
                                        <div 
                                            style={{ flex: 1 }}
                                            dangerouslySetInnerHTML={{ __html: concept }}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* CALLOUT BOX FOR FORMULAS / LAWS / DEFINITIONS */}
                        {t.callout && (
                            <div style={{
                                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(16, 185, 129, 0.08))',
                                borderLeft: '5px solid var(--primary-color)',
                                borderTop: '1px solid var(--border-color)',
                                borderRight: '1px solid var(--border-color)',
                                borderBottom: '1px solid var(--border-color)',
                                borderRadius: '10px',
                                padding: '1.1rem 1.4rem',
                                fontSize: '0.94rem',
                                color: 'var(--text-primary)',
                                lineHeight: 1.7
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', fontWeight: 800, color: 'var(--primary-color)' }}>
                                    <Lightbulb size={18} />
                                    <span>{isHindi ? 'मुख्य सूत्र / वैज्ञानिक नियम / परिभाषा (>):' : 'Key Law / Formula / NCERT Definition (>):'}</span>
                                </div>
                                <div style={{ fontWeight: 600 }}>
                                    {t.callout}
                                </div>
                            </div>
                        )}

                        {/* COMPARISON TABLE */}
                        {t.table && (
                            <div style={{
                                overflowX: 'auto',
                                borderRadius: '12px',
                                border: '1px solid var(--border-color)',
                                background: 'var(--bg-primary)'
                            }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.92rem' }}>
                                    <thead>
                                        <tr style={{ background: 'rgba(99, 102, 241, 0.15)', borderBottom: '1px solid var(--border-color)' }}>
                                            {(t.table.headers || []).map((h, hIdx) => (
                                                <th key={hIdx} style={{ padding: '0.85rem 1.1rem', color: 'var(--text-primary)', fontWeight: 700 }}>
                                                    {h}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(t.table.rows || []).map((row, rIdx) => (
                                            <tr key={rIdx} style={{
                                                borderBottom: rIdx < t.table.rows.length - 1 ? '1px solid var(--border-color)' : 'none',
                                                background: rIdx % 2 === 1 ? 'rgba(255, 255, 255, 0.02)' : 'transparent'
                                            }}>
                                                {row.map((cell, cIdx) => (
                                                    <td key={cIdx} style={{ padding: '0.8rem 1.1rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
                                                        {cell}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* DIAGRAM INTEGRATION BOX */}
                        {t.diagram && (
                            <div style={{
                                background: 'rgba(14, 165, 233, 0.06)',
                                border: '1px dashed #0284c7',
                                borderRadius: '12px',
                                padding: '1.25rem 1.5rem',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.9rem'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#0284c7', fontWeight: 800 }}>
                                    <Sparkles size={18} />
                                    <span>{isHindi ? '✏️ एनसीईआरटी आरेख (Diagram Guide & Layout):' : '✏️ NCERT Diagram Guide & Examiner Layout:'}</span>
                                    <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{t.diagram.title}</span>
                                </div>

                                {t.diagram.howToDraw && (
                                    <div style={{ fontSize: '0.92rem', color: 'var(--text-primary)', lineHeight: 1.65 }}>
                                        <strong style={{ color: '#0ea5e9', display: 'block', marginBottom: '0.2rem' }}>
                                            {isHindi ? 'परीक्षा में चित्र कैसे बनाएँ (Step-by-Step Drawing Guide):' : 'Step-by-Step Exam Drawing Guide:'}
                                        </strong>
                                        {t.diagram.howToDraw}
                                    </div>
                                )}

                                {t.diagram.labelingPoints && Array.isArray(t.diagram.labelingPoints) && (
                                    <div style={{
                                        background: 'var(--bg-primary)',
                                        borderRadius: '8px',
                                        padding: '0.8rem 1rem',
                                        border: '1px solid var(--border-color)'
                                    }}>
                                        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--success-color)', display: 'block', marginBottom: '0.4rem' }}>
                                            {isHindi ? '✓ परीक्षक द्वारा जाँचे जाने वाले मुख्य नामांकन (Examiner Labeling Checklist):' : '✓ Mandatory Examiner Labeling Points (For Full Marks):'}
                                        </span>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                            {t.diagram.labelingPoints.map((pt, pIdx) => (
                                                <span key={pIdx} style={{
                                                    fontSize: '0.82rem',
                                                    background: 'rgba(16, 185, 129, 0.12)',
                                                    color: 'var(--text-primary)',
                                                    border: '1px solid rgba(16, 185, 129, 0.3)',
                                                    padding: '0.2rem 0.6rem',
                                                    borderRadius: '6px',
                                                    fontWeight: 600
                                                }}>
                                                    • {pt}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* EXAM CORNER */}
                        {t.examCorner && (
                            <div style={{
                                background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.05), rgba(245, 158, 11, 0.06))',
                                border: '1px solid rgba(245, 158, 11, 0.3)',
                                borderRadius: '12px',
                                padding: '1.25rem 1.5rem',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f59e0b', fontWeight: 800, fontSize: '1.05rem' }}>
                                    <Award size={20} />
                                    <span>{isHindi ? '🎯 परीक्षा कॉर्नर (Exam Corner):' : '🎯 Exam Corner & Examiner Traps:'}</span>
                                </div>

                                {t.examCorner.trap && (
                                    <div style={{
                                        background: 'rgba(239, 68, 68, 0.08)',
                                        borderLeft: '4px solid #ef4444',
                                        borderRadius: '6px',
                                        padding: '0.75rem 1rem',
                                        fontSize: '0.92rem',
                                        color: 'var(--text-primary)',
                                        lineHeight: 1.6
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#ef4444', fontWeight: 700, marginBottom: '0.2rem' }}>
                                            <AlertTriangle size={16} />
                                            <span>{isHindi ? '⚠️ सामान्य परीक्षा गलती (Exam Trap / Common Mistake):' : '⚠️ Exam Trap / Common Student Mistake:'}</span>
                                        </div>
                                        {t.examCorner.trap}
                                    </div>
                                )}

                                {t.examCorner.pyqs && Array.isArray(t.examCorner.pyqs) && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                        <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                                            {isHindi ? '📝 महत्वपूर्ण विगत वर्ष / अवधारणात्मक प्रश्न (PYQs & Model Answers):' : '📝 Important Previous Year Questions & Model Answers:'}
                                        </span>
                                        {t.examCorner.pyqs.map((qItem, qIdx) => (
                                            <div key={qIdx} style={{
                                                background: 'var(--bg-primary)',
                                                border: '1px solid var(--border-color)',
                                                borderRadius: '8px',
                                                padding: '0.85rem 1.1rem',
                                                fontSize: '0.9rem',
                                                lineHeight: 1.6
                                            }}>
                                                <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                                                    Q{qIdx + 1}: {qItem.q}
                                                </div>
                                                <div style={{ color: 'var(--text-secondary)' }}>
                                                    <strong style={{ color: 'var(--success-color)' }}>{isHindi ? 'आदर्श उत्तर: ' : 'Answer: '}</strong>
                                                    {qItem.a}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* PRINT-ONLY FOOTER */}
            <div className="print-only-footer" style={{ display: 'none' }}>
                <div style={{ textAlign: 'center', borderTop: '1px solid #94a3b8', paddingTop: '10px', marginTop: '20px', fontSize: '9pt', color: '#64748b' }}>
                    Tech Karma Classes • Certified NCERT Curriculum • www.techkarmaclasses.vercel.app
                </div>
            </div>
        </div>
    );
};

export default NotesViewer;
