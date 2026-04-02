import React from 'react';
import { Book, ArrowRight, Laptop, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';

const SnakeIcon = ({ className, size, color }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M10 21V19C10 17.8954 10.8954 17 12 17H14C15.6569 17 17 14.3137 17 11V9C17 7.34315 15.6569 6 14 6H10C8.34315 6 7 7.34315 7 9V11C7 12.6569 8.34315 14 10 14H14" />
        <path d="M8 9a2 2 0 1 0 0-4h4" />
        <circle cx="9.5" cy="7.5" r="0.5" fill="currentColor" />
    </svg>
);

const Programming = () => {
    const languages = [
        {
            name: 'Python',
            icon: SnakeIcon,
            color: '#3b82f6',
            desc: 'The most popular language for beginners, data science, and web development.',
            topics: ['Basics & Syntax', 'OOP Concepts', 'Data Structures', 'Web Scraping', 'Django & Flask']
        },
        {
            name: 'Java',
            icon: Book,
            color: '#ef4444',
            desc: 'Enterprise-grade language for backend systems and Android development.',
            topics: ['Core Java', 'Collections Framework', 'Multithreading', 'Spring Boot', 'JDBC']
        },
        {
            name: 'C++',
            icon: Rocket,
            color: '#8b5cf6',
            desc: 'High-performance language widely used in game dev and competitive programming.',
            topics: ['Pointers', 'STL (Standard Template Library)', 'OOPs in C++', 'Memory Management']
        },
        {
            name: 'C Language',
            icon: Laptop,
            color: '#10b981',
            desc: 'The mother of all languages. Build strong logic and fundamentals.',
            topics: ['Arrays & Strings', 'Functions & Pointers', 'Structures & Unions', 'File Handling']
        }
    ];

    return (
        <div className="section container animate-fade-in-up">
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Programming Languages</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>Master the most demanded languages in the IT industry. Logic building from scratch to advanced level.</p>
            </div>

            <div className="grid grid-2">
                {languages.map((lang, index) => (
                    <div key={index} className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', overflow: 'hidden' }}>

                        {/* Decorative background element */}
                        <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '150px', height: '150px', background: lang.color, opacity: 0.05, borderRadius: '50%', zIndex: 0 }}></div>

                        <div style={{ zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', textAlign: 'center' }}>
                            <div className="animated-icon-container" style={{ margin: '0 auto', color: lang.color, borderColor: `rgba(255,255,255,0.1)` }}>
                                <lang.icon className="animated-icon-svg" />
                            </div>
                            <h2 style={{ fontSize: '2rem', margin: 0 }}>{lang.name}</h2>
                        </div>

                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '2rem', zIndex: 1 }}>{lang.desc}</p>

                        <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: 'var(--border-radius-sm)', marginBottom: '2rem', zIndex: 1, flex: 1 }}>
                            <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Key Modules Covered:</h4>
                            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                {lang.topics.map((topic, i) => (
                                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                                        <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: lang.color }}></span>
                                        {topic}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <Link to={`/courses`} className="btn" style={{ width: '100%', background: 'var(--bg-secondary)', border: `1px solid ${lang.color}`, color: lang.color, zIndex: 1, textAlign: 'center' }}>
                            View Syllabus & Enroll <ArrowRight size={18} />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Programming;
