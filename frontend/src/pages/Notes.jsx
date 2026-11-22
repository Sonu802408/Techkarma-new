import React, { useState, useEffect } from 'react';
import { Search, Download, FileText, Lock, ArrowRight } from 'lucide-react';
import logo from '../assets/logo.png';
import { getAllNotesForCards } from '../services/materialsService';

const Notes = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [notesList, setNotesList] = useState(() => getAllNotesForCards());

    useEffect(() => {
        const updateNotes = () => setNotesList(getAllNotesForCards());
        window.addEventListener('techkarma_materials_updated', updateNotes);
        return () => window.removeEventListener('techkarma_materials_updated', updateNotes);
    }, []);

    const categories = ['All', 'Class 10', 'Class 12 Board', 'Class 11', 'Programming', 'Competitive', 'Core CS'];

    const filteredNotes = notesList.filter(note => {
        const cat = note.category || '';
        const matchCategory = activeCategory === 'all' || cat.toLowerCase().includes(activeCategory.toLowerCase()) || activeCategory.toLowerCase().includes(cat.toLowerCase());
        const matchSearch = (note.title || '').toLowerCase().includes(searchTerm.toLowerCase());
        return matchCategory && matchSearch;
    });

    return (
        <div className="section container animate-fade-in-up">
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Study Material Vault</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>Download free and premium handwritten notes, cheat sheets, and formulas.</p>
            </div>

            <div className="glass-card" style={{ marginBottom: '2.5rem', padding: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', maxWidth: '100%' }}>
                <div style={{ position: 'relative', flex: '1 1 300px' }}>
                    <div style={{
                        position: 'absolute',
                        left: '0.6rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        pointerEvents: 'none',
                        zIndex: 2
                    }}>
                        <img
                            src={logo}
                            alt="Tech Karma Classes"
                            style={{
                                width: '32px',
                                height: '32px',
                                objectFit: 'contain',
                                filter: 'drop-shadow(0 0 7px rgba(56, 189, 248, 0.65))',
                                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                cursor: 'pointer',
                                pointerEvents: 'auto'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'perspective(400px) rotateY(25deg) rotateX(-12deg) scale(1.35) translateZ(12px)';
                                e.currentTarget.style.filter = 'drop-shadow(0 4px 14px rgba(56, 189, 248, 0.95)) drop-shadow(0 0 25px rgba(14, 165, 233, 0.6))';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'none';
                                e.currentTarget.style.filter = 'drop-shadow(0 0 7px rgba(56, 189, 248, 0.65))';
                            }}
                        />
                        <Search size={16} style={{ color: 'var(--text-secondary)' }} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search notes, topics, or subjects..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        autoComplete="off"
                        style={{ paddingLeft: '3.8rem', borderRadius: '50px' }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat.toLowerCase())}
                            style={{
                                padding: '0.6rem 1.2rem',
                                borderRadius: '50px',
                                background: activeCategory === cat.toLowerCase() ? 'var(--primary-color)' : 'var(--bg-secondary)',
                                color: activeCategory === cat.toLowerCase() ? 'white' : 'var(--text-primary)',
                                border: `1px solid ${activeCategory === cat.toLowerCase() ? 'var(--primary-color)' : 'var(--border-color)'}`,
                                whiteSpace: 'nowrap',
                                fontWeight: 500,
                                transition: 'all var(--transition-fast)'
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Notes Cards Grid */}
            <div className="resource-cards-grid">
                {filteredNotes.length > 0 ? filteredNotes.map(note => {
                    const localPdfFiles = ['AIML_Complete_Handwritten_Notes.pdf', 'CN_Tech_Karma_Complete_Notes.pdf', 'Compiler_Design_Notes.pdf'];
                    const notePdfUrl = note.fileUrl || (note.file ? (
                        localPdfFiles.includes(note.file)
                            ? `/pdfs/${note.file}`
                            : `https://huggingface.co/datasets/SonuTechKarma/techkarma-pdfs/resolve/main/pdfs/${note.file}`
                    ) : '');

                    return (
                        <div key={note.id} className="resource-card animate-fade-in-up">
                            <div>
                                <div className="resource-card-header">
                                    <div className="resource-card-icon">
                                        <FileText size={22} color={note.isAdminAdded ? '#38bdf8' : 'var(--primary-color)'} />
                                    </div>
                                    {note.isAdminAdded ? (
                                        <span style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#38bdf8', padding: '0.25rem 0.65rem', borderRadius: '12px', fontSize: '0.78rem', fontWeight: 700 }}>
                                            ⭐ Admin Verified
                                        </span>
                                    ) : note.isPremium ? (
                                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', background: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning-color)', padding: '0.25rem 0.65rem', borderRadius: '12px', fontSize: '0.78rem', fontWeight: 600 }}>
                                            <Lock size={13} /> Premium
                                        </span>
                                    ) : (
                                        <span style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success-color)', padding: '0.25rem 0.65rem', borderRadius: '12px', fontSize: '0.78rem', fontWeight: 600 }}>
                                            Free PDF
                                        </span>
                                    )}
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
                                    <span style={{
                                        background: 'var(--bg-primary)',
                                        color: 'var(--primary-color)',
                                        fontSize: '0.75rem',
                                        fontWeight: 700,
                                        padding: '0.15rem 0.55rem',
                                        borderRadius: '8px',
                                        border: '1px solid var(--border-color)'
                                    }}>
                                        {note.category}
                                    </span>
                                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                                        {note.pages ? `${note.pages} Pages • ` : ''}{note.size || 'PDF'}
                                    </span>
                                </div>

                                <h3 className="resource-card-title">
                                    {note.title}
                                </h3>
                            </div>

                            <div className="resource-card-actions">
                                {note.isPremium ? (
                                    <button className="btn btn-secondary">
                                        Unlock Note <ArrowRight size={15} />
                                    </button>
                                ) : notePdfUrl ? (
                                    <div style={{ display: 'flex', gap: '0.5rem', width: '100%' }}>
                                        <a
                                            href={notePdfUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-primary"
                                            style={{ flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', fontSize: '0.85rem', textDecoration: 'none' }}
                                        >
                                            <FileText size={15} /> View Notes
                                        </a>
                                        <a
                                            href={notePdfUrl}
                                            download={note.file || `${note.title}.pdf`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="btn btn-secondary"
                                            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0.5rem 0.8rem', fontSize: '0.82rem' }}
                                            title="Download PDF directly"
                                        >
                                            <Download size={14} />
                                        </a>
                                    </div>
                                ) : (
                                    <button className="btn btn-secondary" disabled>
                                        Unavailable
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                }) : (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', background: 'var(--bg-secondary)', borderRadius: 'var(--border-radius)', border: '1px dashed var(--border-color)' }}>
                        <h3 style={{ marginBottom: '0.5rem' }}>No notes found</h3>
                        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Try adjusting your search or category filter.</p>
                    </div>
                )}
            </div>

        </div>
    );
};

export default Notes;