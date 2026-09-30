import React, { useState } from 'react';
import { PlayCircle } from 'lucide-react';

const VideoLecturesViewer = ({ videoData, chapterTitle = '', activeMedium = 'English' }) => {
    const lectures = videoData?.lectures || [];
    const [activeVideoIdx, setActiveVideoIdx] = useState(0);

    const activeLecture = lectures[activeVideoIdx] || lectures[0];

    return (
        <div className="animate-fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{
                background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.08), rgba(99, 102, 241, 0.08))',
                border: '1px solid rgba(239, 68, 68, 0.2)',
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
                        background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff',
                        boxShadow: '0 4px 10px rgba(239, 68, 68, 0.3)'
                    }}>
                        <PlayCircle size={26} />
                    </div>
                    <div>
                        <h3 style={{ margin: 0, fontSize: '1.35rem', color: 'var(--text-primary)', fontWeight: 700 }}>
                            {videoData?.title || 'Tech Karma Classes Video Lectures'}
                        </h3>
                        <p style={{ margin: '0.2rem 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                            {chapterTitle} • {lectures.length} {activeMedium === 'Hindi' ? 'वीडियो व्याख्यान' : 'Lectures Available'}
                        </p>
                    </div>
                </div>

                <span style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '0.4rem 1rem', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 600 }}>
                    HD Video & Chapter Walkthrough
                </span>
            </div>

            <div className="video-player-grid">
                <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '16px' }}>
                    {activeLecture?.embedUrl ? (
                        <div style={{
                            position: 'relative',
                            paddingBottom: '56.25%',
                            height: 0,
                            overflow: 'hidden',
                            borderRadius: '12px',
                            background: '#000000',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                            marginBottom: '1.25rem'
                        }}>
                            <iframe
                                src={activeLecture.embedUrl}
                                title={activeLecture.title}
                                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    ) : (
                        <div style={{ padding: '4rem 2rem', textAlign: 'center', background: 'var(--bg-secondary)', borderRadius: '12px', marginBottom: '1.25rem' }}>
                            <PlayCircle size={48} color="var(--primary-color)" style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                            <h4>Video stream loading...</h4>
                        </div>
                    )}

                    <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', margin: '0 0 0.5rem', fontWeight: 700 }}>
                        {activeLecture?.title}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '1rem' }}>
                        <span>Faculty: <strong>{activeLecture?.instructor}</strong></span>
                        <span>• Duration: <strong>{activeLecture?.duration}</strong></span>
                    </div>

                    {activeLecture?.keyNotes && (
                        <div style={{ background: 'var(--bg-secondary)', borderRadius: '10px', padding: '1rem 1.25rem', fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
                            <strong style={{ color: 'var(--primary-color)' }}>Faculty Notes:</strong> {activeLecture.keyNotes}
                        </div>
                    )}
                </div>

                <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '16px' }}>
                    <h4 style={{ margin: '0 0 1rem', fontSize: '1.05rem', color: 'var(--text-primary)', fontWeight: 700 }}>
                        {activeMedium === 'Hindi' ? 'व्याख्यान सूची' : 'Chapter Video Playlist'}
                    </h4>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                        {lectures.map((lec, idx) => {
                            const isCurrent = activeVideoIdx === idx;
                            return (
                                <div
                                    key={lec.id || idx}
                                    onClick={() => setActiveVideoIdx(idx)}
                                    style={{
                                        padding: '0.9rem 1rem',
                                        borderRadius: '10px',
                                        background: isCurrent ? 'rgba(99, 102, 241, 0.15)' : 'var(--bg-secondary)',
                                        border: isCurrent ? '1px solid var(--primary-color)' : '1px solid var(--border-color)',
                                        cursor: 'pointer',
                                        transition: 'all 0.15s ease',
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: '0.75rem'
                                    }}
                                >
                                    <PlayCircle size={18} color={isCurrent ? 'var(--primary-color)' : 'var(--text-secondary)'} style={{ marginTop: '0.2rem', flexShrink: 0 }} />
                                    <div>
                                        <h5 style={{ margin: 0, fontSize: '0.92rem', color: 'var(--text-primary)', fontWeight: isCurrent ? 700 : 500 }}>
                                            {lec.title}
                                        </h5>
                                        <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{lec.duration}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoLecturesViewer;
