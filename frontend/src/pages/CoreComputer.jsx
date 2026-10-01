import React, { useState } from 'react';
import { Database, Server, GitBranch, Shield, Globe, Layers, Download, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const CoreComputer = () => {
    const subjects = [
        { name: 'Data Structures & Algorithms', icon: GitBranch, color: '#ec4899', desc: 'The backbone of computer science. Learn arrays, trees, graphs, dynamic programming, and algorithm optimization.', pdfUrl: '/pdfs/Data-Structure-DSA-pre-notes-cse-gyan.pdf' },
        { name: 'Database Management (DBMS)', icon: Database, color: '#f59e0b', desc: 'Master SQL, normalization, ER diagrams, transaction management, and NoSQL databases.', pdfUrl: '/pdfs/DBMS-pre-notes-cse-gyan.pdf' },
        { name: 'Operating Systems (OS)', icon: Server, color: '#10b981', desc: 'Process management, memory management, deadlocks, and internal workings of Linux/Windows.', pdfUrl: '/pdfs/OS-pre-notes-cse-gyan.pdf' },
        { name: 'Object Oriented Programming', icon: Layers, color: '#3b82f6', desc: 'Classes, Objects, Inheritance, Polymorphism, Abstraction, and Encapsulation.', pdfUrl: '/pdfs/Java_Programming_Complete_Handwritten_Notes.pdf' },
        { name: 'Computer Networks', icon: Globe, color: '#8b5cf6', desc: 'OSI Model, TCP/IP, Routing algorithms, and network security fundamentals.', pdfUrl: '/pdfs/Computer-Networks-pre-notes-cse-gyan.pdf' },
        { name: 'Software Engineering', icon: Shield, color: '#6366f1', desc: 'SDLC, Agile methodologies, software testing, and project management.' }
    ];

    const [expandedSubject, setExpandedSubject] = useState(null);

    const computerNetworkChapters = [
        { title: 'Ch 1: Introduction & Network Fundamentals', file: 'csegyan-computer-networks-ch1.pdf' },
        { title: 'Ch 2: OSI Model and TCP/IP', file: 'csegyan-computer-networks-ch2.pdf' },
        { title: 'Ch 3: Data Link Layer', file: 'csegyan-computer-networks-ch3.pdf' },
        { title: 'Ch 4: Network Layer & Routing', file: 'csegyan-computer-networks-ch4.pdf' },
        { title: 'Ch 5: Transport Layer', file: 'csegyan-computer-networks-ch5.pdf' },
        { title: 'Ch 6: Application Layer & Security', file: 'csegyan-computer-networks-ch6.pdf' }
    ];

    const toggleSubject = (name) => {
        if (expandedSubject === name) {
            setExpandedSubject(null);
        } else {
            setExpandedSubject(name);
        }
    };

    return (
        <div className="section container animate-fade-in-up">
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Core Computer Subjects</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto' }}>Crucial subjects for university exams (B.Tech, BCA, MCA) and cracking top product-based company interviews.</p>
            </div>

            <div className="grid grid-3">
                {subjects.map((sub, index) => (
                    <div key={index} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', transition: 'all var(--transition-normal)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                            <div style={{ background: `rgba(${sub.color === '#ec4899' ? '236, 72, 153' : sub.color === '#f59e0b' ? '245, 158, 11' : sub.color === '#10b981' ? '16, 185, 129' : sub.color === '#3b82f6' ? '59, 130, 246' : sub.color === '#8b5cf6' ? '139, 92, 246' : '99, 102, 241'}, 0.1)`, padding: '0.8rem', borderRadius: '12px', color: sub.color }}>
                                <sub.icon size={28} />
                            </div>
                            <h3 style={{ fontSize: '1.3rem', margin: 0, lineHeight: 1.2 }}>{sub.name}</h3>
                        </div>

                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', flex: 1 }}>{sub.desc}</p>

                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                            <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', flex: 1 }}>Syllabus</button>
                            {sub.pdfUrl ? (
                                <a
                                    href={sub.pdfUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="btn btn-primary"
                                    style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', flex: 1, textAlign: 'center', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', textDecoration: 'none' }}
                                >
                                    <Download size={15} /> Notes PDF
                                </a>
                            ) : (
                                <Link to="/notes" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', flex: 1, textAlign: 'center' }}>Notes</Link>
                            )}
                        </div>

                        {sub.name === 'Computer Networks' && expandedSubject === sub.name && (
                            <div style={{ marginTop: '1rem', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontSize: '0.9rem' }}>CSE Gyan Notes</h4>
                                {computerNetworkChapters.map((chapter, i) => (
                                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem', background: 'var(--bg-primary)', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                                        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{chapter.title}</span>
                                        <a href={`/pdfs/${chapter.file}`} target="_blank" rel="noreferrer" style={{ color: 'var(--primary-color)', display: 'flex', alignItems: 'center' }}>
                                            <Download size={16} />
                                        </a>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="glass-card" style={{ marginTop: '4rem', background: 'linear-gradient(135deg, var(--bg-secondary), var(--bg-primary))', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
                <div>
                    <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Preparing for GATE / Placements?</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Get our specialized combined core pack designed for intensive preparation.</p>
                </div>
                <button className="btn btn-accent" style={{ padding: '1rem 2rem' }}>Explore Batch</button>
            </div>
        </div>
    );
};

export default CoreComputer;

