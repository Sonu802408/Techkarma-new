import React, { useState } from 'react';
import { Code, Database, Cpu, ArrowRight } from 'lucide-react';

const Tech = () => {
    const [activeTab, setActiveTab] = useState('programming');

    const categories = {
        programming: {
            title: 'Programming Languages',
            icon: Code,
            color: '#3b82f6',
            items: [
                { name: 'Python', desc: 'From basics to Advanced DS.' },
                { name: 'Java', desc: 'Core Java, Collections & Multithreading.' },
                { name: 'C / C++', desc: 'Foundational memory management and OOPS.' }
            ]
        },
        core: {
            title: 'Core Computer Science',
            icon: Database,
            color: '#f59e0b',
            items: [
                { name: 'Data Structures & Algorithms', desc: 'Master coding interviews.' },
                { name: 'DBMS & SQL', desc: 'Database design and complex queries.' },
                { name: 'Operating Systems', desc: 'Kernel, Memory, and Process management.' },
                { name: 'Software Engineering', desc: 'SDLC, Agile, and System Design.' }
            ]
        },
        advanced: {
            title: 'Advanced Technology',
            icon: Cpu,
            color: '#10b981',
            items: [
                { name: 'Artificial Intelligence', desc: 'Neural Networks & Deep Learning.' },
                { name: 'Machine Learning', desc: 'Data modeling and predictive algorithms.' },
                { name: 'Cloud Computing', desc: 'AWS & Azure cloud architecture.' },
                { name: 'Cyber Security', desc: 'Ethical hacking and network defense.' }
            ]
        }
    };

    return (
        <div className="section container">
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 className="gradient-text" style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}>Tech & Programming</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>Master the skills that power the modern digital world.</p>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '3rem', flexWrap: 'wrap' }}>
                {Object.entries(categories).map(([key, cat]) => {
                    const Icon = cat.icon;
                    const isActive = activeTab === key;
                    return (
                        <button
                            key={key}
                            onClick={() => setActiveTab(key)}
                            style={{
                                padding: '1rem 2rem',
                                borderRadius: 'var(--border-radius)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.8rem',
                                background: isActive ? cat.color : 'var(--bg-secondary)',
                                color: isActive ? '#fff' : 'var(--text-primary)',
                                fontWeight: 600,
                                border: `1px solid ${isActive ? cat.color : 'var(--border-color)'}`,
                                transition: 'var(--transition-fast)',
                                boxShadow: isActive ? `0 4px 12px ${cat.color}40` : 'none'
                            }}
                        >
                            <Icon size={20} /> {cat.title}
                        </button>
                    );
                })}
            </div>

            <div className="animate-fade-in-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                {categories[activeTab].items.map((item, idx) => (
                    <div key={item.name} className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%', animationDelay: `${idx * 0.1}s` }}>
                        <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', color: categories[activeTab].color }}>{item.name}</h3>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', flex: 1 }}>{item.desc}</p>
                        <button className="btn-secondary" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                            View Modules <ArrowRight size={16} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tech;
