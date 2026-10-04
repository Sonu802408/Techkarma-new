import React, { useState, useEffect } from 'react';
import { X, Download, ExternalLink, FileText, BookOpen, Loader2, Maximize2, AlertCircle } from 'lucide-react';

const PdfViewerModal = ({
    isOpen,
    onClose,
    pdfUrl,
    title = 'Document Preview',
    subtitle = '',
    badge = 'PDF',
    filename = ''
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [loadTimeout, setLoadTimeout] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsLoading(true);
            setLoadTimeout(false);
            document.body.style.overflow = 'hidden';

            const handleKeyDown = (e) => {
                if (e.key === 'Escape') {
                    onClose();
                }
            };
            window.addEventListener('keydown', handleKeyDown);

            // If iframe hasn't notified loaded within 7 seconds, show helpful quick link
            const timer = setTimeout(() => {
                setLoadTimeout(true);
            }, 7000);

            return () => {
                document.body.style.overflow = '';
                window.removeEventListener('keydown', handleKeyDown);
                clearTimeout(timer);
            };
        } else {
            document.body.style.overflow = '';
        }
    }, [isOpen, pdfUrl, onClose]);

    if (!isOpen || !pdfUrl) return null;

    // Use Google Docs Viewer to display inline without browser auto-downloading attachment files
    const viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`;
    const cleanFilename = filename || `${title.replace(/[^a-zA-Z0-9_-]/g, '_')}.pdf`;

    return (
        <div 
            className="pdf-modal-backdrop animate-fade-in"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(5, 10, 24, 0.82)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                zIndex: 99999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1rem'
            }}
        >
            <div 
                className="pdf-modal-window"
                style={{
                    width: '100%',
                    maxWidth: '1150px',
                    height: '92vh',
                    maxHeight: '900px',
                    backgroundColor: 'var(--bg-secondary, #0f172a)',
                    border: '1px solid var(--border-color, rgba(255, 255, 255, 0.12))',
                    borderRadius: '16px',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.65), 0 0 30px rgba(99, 102, 241, 0.15)',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden'
                }}
            >
                {/* Modal Header */}
                <div style={{
                    padding: '0.9rem 1.25rem',
                    borderBottom: '1px solid var(--border-color, rgba(255, 255, 255, 0.08))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    background: 'var(--bg-primary, #090d16)'
                }}>
                    {/* Title & Badge */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '10px',
                            background: 'rgba(99, 102, 241, 0.12)',
                            color: 'var(--primary-color, #6366f1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                        }}>
                            {badge.toLowerCase().includes('book') ? <BookOpen size={20} /> : <FileText size={20} />}
                        </div>
                        <div style={{ minWidth: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                                <h3 style={{
                                    fontSize: '1.05rem',
                                    fontWeight: 700,
                                    color: 'var(--text-primary, #f8fafc)',
                                    margin: 0,
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}>
                                    {title}
                                </h3>
                                <span style={{
                                    fontSize: '0.72rem',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    background: 'rgba(99, 102, 241, 0.15)',
                                    color: 'var(--primary-color, #818cf8)',
                                    padding: '0.15rem 0.5rem',
                                    borderRadius: '6px',
                                    letterSpacing: '0.5px'
                                }}>
                                    {badge}
                                </span>
                            </div>
                            {subtitle && (
                                <p style={{
                                    fontSize: '0.82rem',
                                    color: 'var(--text-secondary, #94a3b8)',
                                    margin: '0.15rem 0 0 0',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}>
                                    {subtitle}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexShrink: 0 }}>
                        {/* Download Button (Only downloads when user chooses to click this) */}
                        <a
                            href={pdfUrl}
                            download={cleanFilename}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.45rem',
                                padding: '0.5rem 0.95rem',
                                fontSize: '0.86rem',
                                fontWeight: 600,
                                textDecoration: 'none'
                            }}
                            title="Download PDF file to your device"
                        >
                            <Download size={15} />
                            <span>Download PDF</span>
                        </a>

                        {/* Open in New Tab Button */}
                        <a
                            href={viewerUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-secondary"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.45rem',
                                padding: '0.5rem 0.85rem',
                                fontSize: '0.86rem',
                                textDecoration: 'none'
                            }}
                            title="Open preview in a full new browser tab"
                        >
                            <ExternalLink size={15} />
                            <span className="hidden-mobile">New Tab</span>
                        </a>

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            style={{
                                background: 'rgba(255, 255, 255, 0.06)',
                                border: '1px solid var(--border-color, rgba(255, 255, 255, 0.1))',
                                color: 'var(--text-secondary, #94a3b8)',
                                width: '36px',
                                height: '36px',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.color = '#fff';
                                e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)';
                                e.currentTarget.style.borderColor = '#ef4444';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.color = 'var(--text-secondary, #94a3b8)';
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                                e.currentTarget.style.borderColor = 'var(--border-color, rgba(255, 255, 255, 0.1))';
                            }}
                            title="Close viewer (Esc)"
                        >
                            <X size={18} />
                        </button>
                    </div>
                </div>

                {/* Viewer Body */}
                <div style={{
                    flex: 1,
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#1e293b',
                    overflow: 'hidden'
                }}>
                    {/* Loading Spinner */}
                    {isLoading && (
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.9rem',
                            backgroundColor: 'var(--bg-secondary, #0f172a)',
                            zIndex: 2
                        }}>
                            <Loader2 size={40} className="animate-spin" color="var(--primary-color, #6366f1)" />
                            <span style={{ fontSize: '0.95rem', color: 'var(--text-secondary, #94a3b8)', fontWeight: 500 }}>
                                Loading View Mode...
                            </span>
                            {loadTimeout && (
                                <div style={{
                                    marginTop: '0.5rem',
                                    padding: '0.6rem 1rem',
                                    borderRadius: '8px',
                                    background: 'rgba(99, 102, 241, 0.08)',
                                    border: '1px solid rgba(99, 102, 241, 0.2)',
                                    fontSize: '0.85rem',
                                    color: 'var(--text-secondary, #cbd5e1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}>
                                    <AlertCircle size={15} color="#818cf8" />
                                    <span>Taking longer than expected? You can directly</span>
                                    <a href={pdfUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--primary-color, #818cf8)', fontWeight: 600 }}>
                                        Download PDF
                                    </a>
                                </div>
                            )}
                        </div>
                    )}

                    {/* PDF Frame */}
                    <iframe
                        src={viewerUrl}
                        title={title}
                        width="100%"
                        height="100%"
                        style={{
                            border: 'none',
                            display: 'block'
                        }}
                        onLoad={() => setIsLoading(false)}
                    />
                </div>

                {/* Viewer Footer Status Bar */}
                <div style={{
                    padding: '0.5rem 1.25rem',
                    borderTop: '1px solid var(--border-color, rgba(255, 255, 255, 0.08))',
                    background: 'var(--bg-primary, #090d16)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.78rem',
                    color: 'var(--text-secondary, #94a3b8)'
                }}>
                    <span>
                        📖 <strong>View Mode:</strong> Document is opened in reader view. Click <strong>Download PDF</strong> above if you want to save offline.
                    </span>
                    <span style={{ opacity: 0.75 }}>
                        Tech Karma Classes
                    </span>
                </div>
            </div>
        </div>
    );
};

export default PdfViewerModal;
