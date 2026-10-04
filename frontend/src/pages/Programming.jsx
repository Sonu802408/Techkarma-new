import React, { useState } from 'react';
import { Terminal, Laptop, Rocket, BookOpen, Globe, Palette, Zap, ArrowRight, Download, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import PdfViewerModal from '../components/common/PdfViewerModal.jsx';

const Programming = () => {
    // PDF View Mode Modal State
    const [activePdfModal, setActivePdfModal] = useState({
        isOpen: false,
        pdfUrl: '',
        title: '',
        subtitle: '',
        badge: 'PDF',
        filename: ''
    });

    const handleOpenPdf = (pdfUrl, title, subtitle, badge, filename) => {
        if (!pdfUrl) return;
        setActivePdfModal({
            isOpen: true,
            pdfUrl,
            title,
            subtitle: subtitle || 'Tech Karma Programming Notes',
            badge: badge || 'Notes PDF',
            filename
        });
    };

    const handleClosePdf = () => {
        setActivePdfModal(prev => ({ ...prev, isOpen: false }));
    };
    const languages = [
        {
            name: 'Python',
            tag: 'AI, Data & Backend',
            icon: Terminal,
            color: '#38bdf8',
            colorRgb: '56, 189, 248',
            desc: 'High-level, versatile language powering artificial intelligence, data science, automation, and full-stack web applications.',
            pdfUrl: 'https://huggingface.co/datasets/SonuTechKarma/techkarma-pdfs/resolve/main/pdfs/python-pre-notes-cse-gyan.pdf',
            topics: ['Variables, Lists & Dictionaries', 'Functions & Functional Programming', 'Object-Oriented Programming (OOP)', 'NumPy, Pandas & Automation', 'Django & FastAPI Basics']
        },
        {
            name: 'C Language',
            tag: 'Foundational Systems',
            icon: Laptop,
            color: '#60a5fa',
            colorRgb: '96, 165, 250',
            desc: 'The mother of modern programming. Master pointers, raw memory allocation, structured programming, and hardware-level algorithms.',
            pdfUrl: 'https://huggingface.co/datasets/SonuTechKarma/techkarma-pdfs/resolve/main/pdfs/C_Programming_Complete_Handwritten_Notes.pdf',
            topics: ['Data Types & Control Flow', 'Arrays, Strings & Matrices', 'Pointers & Memory Architecture', 'Dynamic Memory (malloc/free)', 'Structures, Unions & File I/O']
        },
        {
            name: 'C++',
            tag: 'High Performance & DSA',
            icon: Rocket,
            color: '#818cf8',
            colorRgb: '129, 140, 248',
            desc: 'Ultra-fast compiled language designed for system software, game development, high-frequency engines, and competitive coding.',
            pdfUrl: 'https://huggingface.co/datasets/SonuTechKarma/techkarma-pdfs/resolve/main/pdfs/CPP_Programming_Complete_Handwritten_Notes.pdf',
            topics: ['Classes, Objects & Constructors', 'Standard Template Library (STL)', 'Pointers, References & Templates', 'Operator Overloading & Virtual Funcs', 'DSA Problem-Solving Patterns']
        },
        {
            name: 'Java',
            tag: 'Enterprise & Cloud',
            icon: BookOpen,
            color: '#f97316',
            colorRgb: '249, 115, 22',
            desc: 'Platform-independent enterprise powerhouse language powering scalable backend servers, Android development, and microservices.',
            pdfUrl: 'https://huggingface.co/datasets/SonuTechKarma/techkarma-pdfs/resolve/main/pdfs/Java_Programming_Complete_Handwritten_Notes.pdf',
            topics: ['Core Java & OOP Principles', 'Java Collections Framework', 'Multithreading & Concurrency', 'Exception Handling & I/O Streams', 'Spring Boot & JDBC Intro']
        },
        {
            name: 'HTML5',
            tag: 'Web Structure',
            icon: Globe,
            color: '#ef4444',
            colorRgb: '239, 68, 68',
            desc: 'The universal backbone of the web. Learn semantic tags, modern forms, media streaming, web accessibility, and SEO foundations.',
            pdfUrl: 'https://huggingface.co/datasets/SonuTechKarma/techkarma-pdfs/resolve/main/pdfs/HTML_Complete_Handwritten_Notes.pdf',
            topics: ['Semantic HTML5 Elements', 'Modern Forms & Input Types', 'Audio, Video & Canvas Media', 'Web Accessibility (a11y)', 'SEO Optimization & Meta Standards']
        },
        {
            name: 'CSS3',
            tag: 'Modern UI & Styling',
            icon: Palette,
            color: '#06b6d4',
            colorRgb: '6, 182, 212',
            desc: 'Transform web documents into gorgeous user interfaces with Flexbox, CSS Grid, keyframe animations, glassmorphism, and responsive layouts.',
            pdfUrl: 'https://huggingface.co/datasets/SonuTechKarma/techkarma-pdfs/resolve/main/pdfs/CSS_Complete_Handwritten_Notes.pdf',
            topics: ['Flexbox & CSS Grid Mastery', 'Transitions & Keyframe Animations', 'Responsive Design & Media Queries', 'CSS Custom Properties (Variables)', 'Glassmorphism & 3D Transforms']
        },
        {
            name: 'JavaScript',
            tag: 'Interactive & Dynamic Web',
            icon: Zap,
            color: '#eab308',
            colorRgb: '234, 179, 8',
            desc: 'The heartbeat of modern interactive web development. Master ES6+ syntax, asynchronous programming, DOM APIs, and state management.',
            pdfUrl: 'https://huggingface.co/datasets/SonuTechKarma/techkarma-pdfs/resolve/main/pdfs/JavaScript_Complete_Handwritten_Notes.pdf',
            topics: ['ES6+ Syntax & Scope (let/const)', 'DOM Manipulation & Event Handling', 'Promises, Async/Await & Fetch API', 'Closures, Prototypes & Callbacks', 'State, Modules & Web APIs']
        }
    ];

    return (
        <div className="section container animate-fade-in-up" style={{ paddingBottom: '8rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.25)', padding: '0.4rem 1rem', borderRadius: '30px', color: 'var(--primary-color)', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1.25rem' }}>
                    <Terminal size={16} /> Core Programming Curriculum
                </div>
                <h1 className="gradient-text" style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Programming Languages</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '650px', margin: '0 auto', lineHeight: 1.7 }}>
                    Master the most in-demand languages and web technologies in the global IT industry. Build logic from ground zero to production-level engineering.
                </p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '2rem',
                width: '100%',
                boxSizing: 'border-box'
            }}>
                {languages.map((lang, index) => {
                    const IconComponent = lang.icon;
                    return (
                        <div
                            key={index}
                            className="animate-fade-in-up"
                            style={{
                                animationDelay: `${index * 0.08}s`,
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                background: 'var(--card-bg, rgba(15, 23, 42, 0.75))',
                                backdropFilter: 'blur(16px)',
                                WebkitBackdropFilter: 'blur(16px)',
                                border: '1px solid var(--card-border, rgba(255, 255, 255, 0.08))',
                                borderRadius: '22px',
                                padding: '2rem 1.75rem',
                                boxShadow: 'var(--card-3d-shadow)',
                                transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                                overflow: 'hidden'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-8px) scale(1.015)';
                                e.currentTarget.style.borderColor = `rgba(${lang.colorRgb}, 0.55)`;
                                e.currentTarget.style.boxShadow = `0 20px 45px -10px rgba(0, 0, 0, 0.5), 0 0 25px rgba(${lang.colorRgb}, 0.25)`;

                                const topBar = e.currentTarget.querySelector('.card-accent-bar');
                                if (topBar) topBar.style.height = '4px';

                                const btn = e.currentTarget.querySelector('.explore-lang-btn');
                                if (btn) {
                                    btn.style.background = lang.color;
                                    btn.style.color = '#ffffff';
                                    btn.style.boxShadow = `0 6px 20px rgba(${lang.colorRgb}, 0.45)`;
                                }

                                const icon = e.currentTarget.querySelector('.animated-icon-container');
                                if (icon) {
                                    icon.style.transform = 'scale(1.08) rotate(4deg)';
                                    icon.style.background = `rgba(${lang.colorRgb}, 0.22)`;
                                    icon.style.borderColor = `rgba(${lang.colorRgb}, 0.6)`;
                                }
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                e.currentTarget.style.borderColor = 'var(--card-border, rgba(255, 255, 255, 0.08))';
                                e.currentTarget.style.boxShadow = 'var(--card-3d-shadow)';

                                const topBar = e.currentTarget.querySelector('.card-accent-bar');
                                if (topBar) topBar.style.height = '3px';

                                const btn = e.currentTarget.querySelector('.explore-lang-btn');
                                if (btn) {
                                    btn.style.background = 'rgba(255, 255, 255, 0.04)';
                                    btn.style.color = 'var(--text-primary)';
                                    btn.style.boxShadow = 'none';
                                }

                                const icon = e.currentTarget.querySelector('.animated-icon-container');
                                if (icon) {
                                    icon.style.transform = 'scale(1) rotate(0deg)';
                                    icon.style.background = `rgba(${lang.colorRgb}, 0.12)`;
                                    icon.style.borderColor = `rgba(${lang.colorRgb}, 0.25)`;
                                }
                            }}
                        >
                            {/* Colored Top Accent Bar */}
                            <div
                                className="card-accent-bar"
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    height: '3px',
                                    background: lang.color,
                                    transition: 'height 0.25s ease'
                                }}
                            />

                            {/* Header Row: Icon Badge & Stage Tag */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                                <div
                                    className="animated-icon-container"
                                    style={{
                                        width: '48px',
                                        height: '48px',
                                        borderRadius: '14px',
                                        background: `rgba(${lang.colorRgb}, 0.12)`,
                                        border: `1px solid rgba(${lang.colorRgb}, 0.25)`,
                                        color: lang.color,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                                        margin: 0
                                    }}
                                >
                                    <IconComponent size={24} />
                                </div>
                                <span style={{
                                    fontSize: '0.74rem',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.06em',
                                    color: lang.color,
                                    background: `rgba(${lang.colorRgb}, 0.1)`,
                                    border: `1px solid rgba(${lang.colorRgb}, 0.22)`,
                                    padding: '4px 11px',
                                    borderRadius: '999px'
                                }}>
                                    {lang.tag}
                                </span>
                            </div>

                            {/* Title & Description */}
                            <h2 style={{
                                fontSize: '1.85rem',
                                fontWeight: 800,
                                color: 'var(--text-primary)',
                                marginBottom: '0.65rem',
                                letterSpacing: '-0.5px'
                            }}>
                                {lang.name}
                            </h2>

                            <p style={{
                                color: 'var(--text-secondary)',
                                fontSize: '0.94rem',
                                lineHeight: 1.6,
                                marginBottom: '1.5rem',
                                minHeight: '58px'
                            }}>
                                {lang.desc}
                            </p>

                            {/* Key Modules Box */}
                            <div style={{
                                background: 'rgba(255, 255, 255, 0.03)',
                                border: '1px solid rgba(255, 255, 255, 0.06)',
                                borderRadius: '14px',
                                padding: '1.25rem 1.15rem',
                                marginBottom: '1.75rem',
                                flex: 1
                            }}>
                                <div style={{
                                    fontSize: '0.8rem',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.06em',
                                    color: 'var(--text-primary)',
                                    marginBottom: '0.75rem'
                                }}>
                                    Key Modules Covered:
                                </div>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                                    {lang.topics.map((topic, i) => (
                                        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                                            <span style={{
                                                display: 'inline-block',
                                                width: '6px',
                                                height: '6px',
                                                borderRadius: '50%',
                                                background: lang.color,
                                                flexShrink: 0
                                            }} />
                                            <span>{topic}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Action CTA Button */}
                            <div style={{ display: 'flex', gap: '0.6rem', marginTop: 'auto', width: '100%', flexWrap: 'wrap' }}>
                                <Link
                                    to="/courses"
                                    className="explore-lang-btn"
                                    style={{
                                        flex: 1,
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem',
                                        padding: '0.85rem 1rem',
                                        borderRadius: '12px',
                                        background: 'rgba(255, 255, 255, 0.04)',
                                        border: `1px solid rgba(${lang.colorRgb}, 0.35)`,
                                        color: 'var(--text-primary)',
                                        fontWeight: 700,
                                        fontSize: '0.92rem',
                                        textAlign: 'center',
                                        textDecoration: 'none',
                                        whiteSpace: 'nowrap',
                                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                                    }}
                                >
                                    <span>Explore Course</span>
                                    <ArrowRight size={16} />
                                </Link>
                                {lang.pdfUrl && (
                                    <button
                                        onClick={() => handleOpenPdf(
                                            lang.pdfUrl,
                                            `${lang.name} Complete Notes`,
                                            `${lang.tag} • Tech Karma Guide`,
                                            'Programming Notes',
                                            `${lang.name.replace(/\s+/g, '_')}_Complete_Notes.pdf`
                                        )}
                                        style={{
                                            flex: 1,
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '0.4rem',
                                            padding: '0.85rem 1rem',
                                            borderRadius: '12px',
                                            background: `rgba(${lang.colorRgb}, 0.22)`,
                                            border: `1px solid rgba(${lang.colorRgb}, 0.6)`,
                                            color: lang.color,
                                            fontWeight: 700,
                                            fontSize: '0.92rem',
                                            cursor: 'pointer',
                                            whiteSpace: 'nowrap',
                                            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                                        }}
                                    >
                                        <FileText size={16} />
                                        <span>View Notes</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Embedded PDF View Mode Modal */}
            <PdfViewerModal
                isOpen={activePdfModal.isOpen}
                onClose={handleClosePdf}
                pdfUrl={activePdfModal.pdfUrl}
                title={activePdfModal.title}
                subtitle={activePdfModal.subtitle}
                badge={activePdfModal.badge}
                filename={activePdfModal.filename}
            />
        </div>
    );
};

export default Programming;

