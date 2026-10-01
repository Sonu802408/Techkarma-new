import React, { useState } from 'react';
import { Brain, Cloud, ShieldAlert, Database, Download, ArrowRight, Sparkles, CheckCircle2, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdvancedTech = () => {
    const [expandedCard, setExpandedCard] = useState(null);

    const techCards = [
        {
            id: 'ai',
            title: 'Artificial Intelligence (AI)',
            subtitle: 'Machine Learning, Neural Networks & Generative AI',
            icon: Brain,
            tag: 'AI & ML',
            color: '#f43f5e',
            colorRgb: '244, 63, 94',
            desc: 'Master AI fundamentals, machine learning algorithms, deep neural architectures, PyTorch, computer vision, natural language processing, and Generative AI (LLMs & Transformers).',
            topics: [
                '1. Foundations: Linear Algebra, Probability & AI Search Algorithms',
                '2. Supervised & Unsupervised ML: Regression, Decision Trees, Clustering',
                '3. Deep Learning: Neural Networks, Backpropagation & Optimizers',
                '4. Computer Vision: CNNs, Object Detection & Image Segmentation',
                '5. NLP & Generative AI: Transformers, Attention Mechanism & LLM Engineering'
            ],
            pdfUrl: '/pdfs/AI_Complete_Handwritten_Notes.pdf',
            pdfTitle: 'AI Notes PDF'
        },
        {
            id: 'cloud',
            title: 'Cloud Computing',
            subtitle: 'AWS, Azure, Docker & Kubernetes Orchestration',
            icon: Cloud,
            tag: 'Cloud & DevOps',
            color: '#06b6d4',
            colorRgb: '6, 182, 212',
            desc: 'Architect, deploy, and scale enterprise cloud solutions using AWS services, Docker containerization, Kubernetes cluster management, CI/CD pipelines, and serverless microservices.',
            topics: [
                '1. Cloud Models: IaaS, PaaS, SaaS & Hybrid Architecture',
                '2. AWS Core Services: EC2, S3, RDS, VPC & IAM Security',
                '3. Containerization: Dockerfiles, Images, Volumes & Networking',
                '4. Container Orchestration: Kubernetes Pods, Deployments & Ingress',
                '5. DevOps & Serverless: CI/CD Pipelines, AWS Lambda & Microservices'
            ],
            pdfUrl: '/pdfs/Cloud_Computing_Complete_Handwritten_Notes.pdf',
            pdfTitle: 'Cloud Notes PDF'
        },
        {
            id: 'security',
            title: 'Cyber Security',
            subtitle: 'Ethical Hacking, Cryptography & Threat Mitigation',
            icon: ShieldAlert,
            tag: 'Security & CEH',
            color: '#10b981',
            colorRgb: '16, 185, 129',
            desc: 'Protect systems against modern cyber threats. Learn network security protocols, ethical hacking, OWASP Top 10 web vulnerabilities, cryptography, malware analysis, and security auditing.',
            topics: [
                '1. Core Fundamentals: CIA Triad, Threat Vectors & Defense in Depth',
                '2. Network Security: Wireshark, Nmap, Firewalls & VPN Protocols',
                '3. Cryptography: Symmetric (AES), Asymmetric (RSA), Hashing & PKI',
                '4. Web Security: OWASP Top 10 (SQLi, XSS, CSRF) & Penetration Testing',
                '5. Advanced Cyber Defense: Incident Response, Forensics & Cloud Security'
            ],
            pdfUrl: '/pdfs/Cyber_Security_Complete_Handwritten_Notes.pdf',
            pdfTitle: 'Cyber Security PDF'
        },
        {
            id: 'ds',
            title: 'Data Science',
            subtitle: 'Data Analytics, Statistical Modeling & Big Data',
            icon: Database,
            tag: 'Data & Analytics',
            color: '#8b5cf6',
            colorRgb: '139, 92, 246',
            desc: 'Extract actionable insights from complex data. Master data wrangling with Pandas & NumPy, interactive visualizations, statistical inference, hypothesis testing, and predictive ML models.',
            topics: [
                '1. Data Foundations: Python Stack & Exploratory Data Analysis (EDA)',
                '2. Data Manipulation: Pandas DataFrames, Cleaning & Feature Engineering',
                '3. Statistical Modeling: Probability Distributions & Hypothesis Testing',
                '4. Data Visualization: Matplotlib, Seaborn & Interactive Dashboards',
                '5. Advanced Analytics: Time-Series Forecasting & Big Data Pipelines'
            ],
            pdfUrl: '/pdfs/Data_Science_Complete_Handwritten_Notes.pdf',
            pdfTitle: 'Data Science PDF'
        }
    ];

    const toggleExpand = (id) => {
        setExpandedCard(expandedCard === id ? null : id);
    };

    return (
        <div className="section container animate-fade-in-up" style={{ paddingBottom: '8rem' }}>
            {/* Header Section */}
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'rgba(244, 63, 94, 0.1)',
                    border: '1px solid rgba(244, 63, 94, 0.25)',
                    padding: '0.4rem 1.1rem',
                    borderRadius: '30px',
                    color: '#f43f5e',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    marginBottom: '1.25rem'
                }}>
                    <Sparkles size={16} /> Industry 4.0 Specialization
                </div>
                <h1 className="gradient-text" style={{ fontSize: '3.5rem', marginBottom: '1rem', letterSpacing: '-0.5px' }}>
                    Advanced Technologies
                </h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '680px', margin: '0 auto', lineHeight: 1.7 }}>
                    Future-ready CSE domains curated by industry experts with complete handwritten PDF study resources, practical projects, and exam blueprints.
                </p>
            </div>

            {/* 4-Column Responsive Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
                gap: '2rem',
                width: '100%',
                boxSizing: 'border-box'
            }} className="adv-tech-grid">
                {techCards.map((tech, index) => {
                    const IconComponent = tech.icon;
                    const isExpanded = expandedCard === tech.id;

                    return (
                        <div
                            key={index}
                            className="adv-tech-card animate-fade-in-up"
                            style={{
                                animationDelay: `${index * 0.1}s`,
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                background: 'var(--card-bg, rgba(15, 23, 42, 0.75))',
                                backdropFilter: 'blur(16px)',
                                WebkitBackdropFilter: 'blur(16px)',
                                border: `1px solid ${isExpanded ? `rgba(${tech.colorRgb}, 0.6)` : 'var(--card-border, rgba(255, 255, 255, 0.08))'}`,
                                borderRadius: '22px',
                                padding: '2rem 1.6rem',
                                boxShadow: isExpanded ? `0 20px 45px -10px rgba(0, 0, 0, 0.6), 0 0 30px rgba(${tech.colorRgb}, 0.35)` : '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
                                transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                                overflow: 'hidden'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                                e.currentTarget.style.borderColor = `rgba(${tech.colorRgb}, 0.6)`;
                                e.currentTarget.style.boxShadow = `0 20px 45px -10px rgba(0, 0, 0, 0.6), 0 0 30px rgba(${tech.colorRgb}, 0.35)`;

                                const topBar = e.currentTarget.querySelector('.card-accent-bar');
                                if (topBar) topBar.style.height = '4px';

                                const icon = e.currentTarget.querySelector('.animated-icon-container');
                                if (icon) {
                                    icon.style.transform = 'scale(1.1) rotate(5deg)';
                                    icon.style.background = `rgba(${tech.colorRgb}, 0.25)`;
                                    icon.style.borderColor = `rgba(${tech.colorRgb}, 0.6)`;
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isExpanded) {
                                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                    e.currentTarget.style.borderColor = 'var(--card-border, rgba(255, 255, 255, 0.08))';
                                    e.currentTarget.style.boxShadow = '0 10px 30px -10px rgba(0, 0, 0, 0.5)';

                                    const topBar = e.currentTarget.querySelector('.card-accent-bar');
                                    if (topBar) topBar.style.height = '3px';

                                    const icon = e.currentTarget.querySelector('.animated-icon-container');
                                    if (icon) {
                                        icon.style.transform = 'scale(1) rotate(0deg)';
                                        icon.style.background = `rgba(${tech.colorRgb}, 0.12)`;
                                        icon.style.borderColor = `rgba(${tech.colorRgb}, 0.28)`;
                                    }
                                }
                            }}
                        >
                            {/* Glowing Top Accent Bar */}
                            <div
                                className="card-accent-bar"
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    height: '3px',
                                    background: `linear-gradient(90deg, ${tech.color}, rgba(${tech.colorRgb}, 0.3))`,
                                    transition: 'height 0.25s ease'
                                }}
                            />

                            {/* Top Row: Icon Container & Tag Pill */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                                <div
                                    className="animated-icon-container"
                                    style={{
                                        width: '52px',
                                        height: '52px',
                                        borderRadius: '14px',
                                        background: `rgba(${tech.colorRgb}, 0.12)`,
                                        border: `1px solid rgba(${tech.colorRgb}, 0.28)`,
                                        color: tech.color,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                                        margin: 0
                                    }}
                                >
                                    <IconComponent size={26} />
                                </div>

                                <span style={{
                                    fontSize: '0.72rem',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.06em',
                                    color: tech.color,
                                    background: `rgba(${tech.colorRgb}, 0.1)`,
                                    border: `1px solid rgba(${tech.colorRgb}, 0.25)`,
                                    padding: '4px 10px',
                                    borderRadius: '999px'
                                }}>
                                    {tech.tag}
                                </span>
                            </div>

                            {/* Title & Subtitle */}
                            <h2 style={{
                                fontSize: '1.5rem',
                                fontWeight: 800,
                                color: 'var(--text-primary)',
                                marginBottom: '0.3rem',
                                letterSpacing: '-0.3px'
                            }}>
                                {tech.title}
                            </h2>

                            <p style={{
                                color: tech.color,
                                fontWeight: 700,
                                fontSize: '0.82rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.04em',
                                marginBottom: '0.9rem'
                            }}>
                                {tech.subtitle}
                            </p>

                            <p style={{
                                color: 'var(--text-secondary)',
                                fontSize: '0.9rem',
                                lineHeight: 1.6,
                                marginBottom: '1.5rem',
                                minHeight: '56px'
                            }}>
                                {tech.desc}
                            </p>

                            {/* Core Topics Module Box (Fundamentals → Advanced) */}
                            <div style={{
                                background: 'rgba(255, 255, 255, 0.03)',
                                border: '1px solid rgba(255, 255, 255, 0.06)',
                                borderRadius: '12px',
                                padding: '1.1rem 1rem',
                                marginBottom: '1.6rem',
                                flex: 1
                            }}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: '0.75rem'
                                }}>
                                    <span style={{
                                        fontSize: '0.76rem',
                                        fontWeight: 700,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.06em',
                                        color: 'var(--text-primary)',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.4rem'
                                    }}>
                                        <BookOpen size={14} style={{ color: tech.color }} />
                                        Sub-topics (Basic → Adv):
                                    </span>
                                    <button
                                        onClick={() => toggleExpand(tech.id)}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            color: tech.color,
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            fontSize: '0.76rem',
                                            fontWeight: 700
                                        }}
                                    >
                                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                    </button>
                                </div>

                                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                                    {(isExpanded ? tech.topics : tech.topics.slice(0, 3)).map((topic, tIdx) => (
                                        <li key={tIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.84rem', lineHeight: 1.4 }}>
                                            <CheckCircle2 size={14} style={{ color: tech.color, flexShrink: 0, marginTop: '2px' }} />
                                            <span>{topic}</span>
                                        </li>
                                    ))}
                                    {!isExpanded && tech.topics.length > 3 && (
                                        <li
                                            onClick={() => toggleExpand(tech.id)}
                                            style={{
                                                color: tech.color,
                                                fontSize: '0.8rem',
                                                fontWeight: 600,
                                                cursor: 'pointer',
                                                paddingTop: '4px',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '0.2rem'
                                            }}
                                        >
                                            + {tech.topics.length - 3} more advanced topics <ChevronDown size={14} />
                                        </li>
                                    )}
                                </ul>
                            </div>

                            {/* Action Buttons: Download PDF & Explore Course */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', width: '100%', marginTop: 'auto' }}>
                                <a
                                    href={tech.pdfUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{
                                        width: '100%',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem',
                                        padding: '0.8rem 1rem',
                                        borderRadius: '12px',
                                        background: `rgba(${tech.colorRgb}, 0.22)`,
                                        border: `1px solid rgba(${tech.colorRgb}, 0.55)`,
                                        color: tech.color,
                                        fontWeight: 700,
                                        fontSize: '0.9rem',
                                        textDecoration: 'none',
                                        boxShadow: `0 4px 15px rgba(${tech.colorRgb}, 0.2)`,
                                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                                        whiteSpace: 'nowrap'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = tech.color;
                                        e.currentTarget.style.color = '#ffffff';
                                        e.currentTarget.style.boxShadow = `0 6px 20px rgba(${tech.colorRgb}, 0.45)`;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = `rgba(${tech.colorRgb}, 0.22)`;
                                        e.currentTarget.style.color = tech.color;
                                        e.currentTarget.style.boxShadow = `0 4px 15px rgba(${tech.colorRgb}, 0.2)`;
                                    }}
                                >
                                    <Download size={16} />
                                    <span>Download Notes (PDF)</span>
                                </a>

                                <Link
                                    to="/courses"
                                    style={{
                                        width: '100%',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.4rem',
                                        padding: '0.7rem 1rem',
                                        borderRadius: '12px',
                                        background: 'rgba(255, 255, 255, 0.04)',
                                        border: '1px solid rgba(255, 255, 255, 0.08)',
                                        color: 'var(--text-primary)',
                                        fontWeight: 600,
                                        fontSize: '0.85rem',
                                        textDecoration: 'none',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    <span>Explore Curriculum</span>
                                    <ArrowRight size={14} />
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Custom Responsive Styles */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @media (min-width: 1200px) {
                    .adv-tech-grid {
                        grid-template-columns: repeat(4, 1fr) !important;
                    }
                }
            `}} />
        </div>
    );
};

export default AdvancedTech;

