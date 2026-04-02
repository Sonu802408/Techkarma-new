import React, { useState } from 'react';
import { Search, Download, FileText, Lock } from 'lucide-react';

const Notes = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');

    const categories = ['All', 'Class 10', 'Class 12 Board', 'Programming', 'Competitive'];

    const notesList = [
        { id: 1, title: 'Calculus Complete Formulas', category: 'Class 12 Board', type: 'PDF', pages: 12, size: '2.4 MB', isPremium: false },
        { id: 2, title: 'Python Zero to Hero Notes', category: 'Programming', type: 'PDF', pages: 145, size: '15.6 MB', isPremium: true },
        { id: 3, title: 'Class 10 Science Full NCERT Notes', category: 'Class 10', type: 'PDF', pages: 85, size: '8.2 MB', isPremium: false },
        { id: 4, title: 'Data Structures Cheat Sheet', category: 'Programming', type: 'PDF', pages: 5, size: '1.1 MB', isPremium: false },
        { id: 5, title: 'JEE Main Physics Mechanics', category: 'Competitive', type: 'PDF', pages: 68, size: '10.5 MB', isPremium: true },
        { id: 6, title: 'English Grammar Rules', category: 'All', type: 'PDF', pages: 30, size: '4.2 MB', isPremium: false },
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

            <div className="glass-card" style={{ marginBottom: '3rem', padding: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ position: 'relative', flex: '1 1 300px' }}>
                    <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                    <input
                        type="text"
                        placeholder="Search notes, topics, or subjects..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
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

            <div className="grid grid-3">
                {filteredNotes.length > 0 ? filteredNotes.map(note => (
                    <div key={note.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{ background: 'var(--bg-secondary)', padding: '0.5rem', borderRadius: 'var(--border-radius-sm)', color: 'var(--accent-color)' }}>
                                <FileText size={24} />
                            </div>
                            {note.isPremium ? (
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', background: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning-color)', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600 }}>
                                    <Lock size={14} /> Premium
                                </span>
                            ) : (
                                <span style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success-color)', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600 }}>
                                    Free
                                </span>
                            )}
                        </div>

                        <div>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', lineHeight: 1.3 }}>{note.title}</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{note.category}</p>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                            <span>{note.pages} Pages</span>
                            <span>•</span>
                            <span>{note.size}</span>
                            <span>•</span>
                            <span>{note.type}</span>
                        </div>

                        <button className={note.isPremium ? "btn btn-secondary" : "btn btn-primary"} style={{ width: '100%', marginTop: '0.5rem' }}>
                            {note.isPremium ? 'Unlock Note' : <><Download size={18} /> Download</>}
                        </button>
                    </div>
                )) : (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', background: 'var(--bg-secondary)', borderRadius: 'var(--border-radius)' }}>
                        <h3 style={{ marginBottom: '0.5rem' }}>No notes found</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>Try adjusting your search or category filter.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Notes;
