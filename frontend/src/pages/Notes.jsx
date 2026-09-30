import React, { useState } from 'react';
import { Search, Download, FileText, Lock, ArrowRight } from 'lucide-react';

const Notes = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');

    const categories = ['All', 'Class 10', 'Class 12 Board', 'Programming', 'Competitive', 'Core CS'];

    const notesList = [
        { id: 1, title: 'Calculus Complete Formulas', category: 'Class 12 Board', type: 'PDF', pages: 12, size: '2.4 MB', isPremium: false },
        { id: 2, title: 'Python Zero to Hero Notes', category: 'Programming', type: 'PDF', pages: 145, size: '15.6 MB', isPremium: true },
        { id: 3, title: 'Class 10 Science Full NCERT Notes', category: 'Class 10', type: 'PDF', pages: 85, size: '8.2 MB', isPremium: false },
        { id: 4, title: 'Data Structures Cheat Sheet', category: 'Programming', type: 'PDF', pages: 5, size: '1.1 MB', isPremium: false },
        { id: 5, title: 'JEE Main Physics Mechanics', category: 'Competitive', type: 'PDF', pages: 68, size: '10.5 MB', isPremium: true },
        { id: 6, title: 'English Grammar Rules', category: 'All', type: 'PDF', pages: 30, size: '4.2 MB', isPremium: false },
        { id: 7, title: 'Ch 1: Introduction & Network Fundamentals (CSE Gyan)', category: 'Core CS', type: 'PDF', pages: 2, size: '420 KB', isPremium: false, file: 'csegyan-computer-networks-ch1.pdf' },
        { id: 8, title: 'Ch 2: OSI Model and TCP/IP (CSE Gyan)', category: 'Core CS', type: 'PDF', pages: 2, size: '415 KB', isPremium: false, file: 'csegyan-computer-networks-ch2.pdf' },
        { id: 9, title: 'Ch 3: Data Link Layer (CSE Gyan)', category: 'Core CS', type: 'PDF', pages: 2, size: '450 KB', isPremium: false, file: 'csegyan-computer-networks-ch3.pdf' },
        { id: 10, title: 'Ch 4: Network Layer & Routing (CSE Gyan)', category: 'Core CS', type: 'PDF', pages: 2, size: '430 KB', isPremium: false, file: 'csegyan-computer-networks-ch4.pdf' },
        { id: 11, title: 'Ch 5: Transport Layer (CSE Gyan)', category: 'Core CS', type: 'PDF', pages: 2, size: '390 KB', isPremium: false, file: 'csegyan-computer-networks-ch5.pdf' },
        { id: 12, title: 'Ch 6: Application Layer & Security (CSE Gyan)', category: 'Core CS', type: 'PDF', pages: 2, size: '410 KB', isPremium: false, file: 'csegyan-computer-networks-ch6.pdf' },
    ];

    const filteredNotes = notesList.filter(note =>
        (activeCategory === 'all' || note.category.toLowerCase() === activeCategory.toLowerCase()) &&
        note.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="section container animate-fade-in-up">
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Study Material Vault</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>Download free and premium handwritten notes, cheat sheets, and formulas.</p>
            </div>

            <div className="glass-card" style={{ marginBottom: '2.5rem', padding: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', maxWidth: '100%' }}>
                <div style={{ position: 'relative', flex: '1 1 300px' }}>
                    <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                    <input
                        type="text"
                        placeholder="Search notes, topics, or subjects..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        autoComplete="off"
                        style={{ paddingLeft: '3rem', borderRadius: '50px' }}
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

            {/* Standalone Horizontal Responsive Card Grid (3 per row Desktop, 2 Tablet, 1 Mobile) */}
            <div className="resource-cards-grid">
                {filteredNotes.length > 0 ? filteredNotes.map(note => (
                    <div key={note.id} className="resource-card animate-fade-in-up">
                        <div>
                            <div className="resource-card-header">
                                <div className="resource-card-icon">
                                    <FileText size={22} />
                                </div>
                                {note.isPremium ? (
                                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', background: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning-color)', padding: '0.25rem 0.65rem', borderRadius: '12px', fontSize: '0.78rem', fontWeight: 600 }}>
                                        <Lock size={13} /> Premium
                                    </span>
                                ) : (
                                    <span style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success-color)', padding: '0.25rem 0.65rem', borderRadius: '12px', fontSize: '0.78rem', fontWeight: 600 }}>
                                        Free
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
                                    {note.pages} Pages • {note.size}
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
                            ) : note.file ? (
                                <a href={`/pdfs/${note.file}`} target="_blank" rel="noreferrer" className="btn btn-primary">
                                    <Download size={16} /> Download PDF
                                </a>
                            ) : (
                                <button className="btn btn-primary">
                                    <Download size={16} /> Download PDF
                                </button>
                            )}
                        </div>
                    </div>
                )) : (
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
