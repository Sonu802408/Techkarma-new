import React from 'react';
import { Cpu, Database, ShieldAlert, Cloud, Link as LinkIcon, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdvancedTech = () => {
    const techs = [
        { title: 'Artificial Intelligence', subtitle: 'Machine Learning & Deep Learning', icon: Cpu, desc: 'Train models using TensorFlow and PyTorch. Build LLMs and computer vision applications.' },
        { title: 'Data Science', subtitle: 'Analytics & Visualization', icon: Database, desc: 'Data wrangling with Pandas, visualization with Tableau, and predictive analytics.' },
        { title: 'Cyber Security', subtitle: 'Ethical Hacking & CompTIA', icon: ShieldAlert, desc: 'Network security, penetration testing, cryptography, and vulnerability assessment.' },
        { title: 'Cloud Computing', subtitle: 'AWS & Azure Cloud', icon: Cloud, desc: 'Deploy scalable architecture, serverless computing, and cloud infrastructure management.' },
        { title: 'Blockchain', subtitle: 'Web3 & Smart Contracts', icon: LinkIcon, desc: 'Solidity development, decentralized applications (DApps), and cryptography basics.' },
        { title: 'App Development', subtitle: 'React Native & Flutter', icon: Smartphone, desc: 'Build cross-platform mobile applications for both Android and iOS.' }
    ];

    return (
        <div className="section container animate-fade-in-up">
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <span style={{ display: 'inline-block', padding: '0.4rem 1rem', background: 'rgba(236, 72, 153, 0.1)', color: 'var(--secondary-color)', borderRadius: '50px', fontWeight: 600, fontSize: '0.9rem', marginBottom: '1rem' }}>
                    Industry 4.0 Ready
                </span>
                <h1 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Advanced Technologies</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>Specialized courses designed to make you highly employable in the cutting-edge tech industry.</p>
            </div>

            <div className="grid grid-2">
                {techs.map((tech, i) => (
                    <div key={i} className="glass-card" style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', padding: '2rem' }}>
                        <div className="animated-icon-container" style={{ margin: '0', color: 'var(--primary-color)', flexShrink: 0, borderColor: `rgba(255,255,255,0.1)` }}>
                            <tech.icon className="animated-icon-svg" />
                        </div>
                        <div>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.2rem' }}>{tech.title}</h2>
                            <p style={{ color: 'var(--secondary-color)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '1rem' }}>{tech.subtitle}</p>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>{tech.desc}</p>
                            <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary-color)', fontWeight: 600, borderBottom: '2px solid transparent', paddingBottom: '0.2rem' }} className="hover-underline">
                                View Curriculum →
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        .hover-underline:hover { border-bottom-color: var(--primary-color) !important; }
        @media (max-width: 768px) {
           .glass-card { flex-direction: column; text-align: center; align-items: center !important; }
        }
      `}} />
        </div>
    );
};

export default AdvancedTech;
