import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Code, Cpu, Trophy, Star, CheckCircle, Github, Twitter, Linkedin, ArrowLeft, FileText, CheckSquare, Book, File, Clock, PlayCircle, Terminal, Users, TrendingUp, Shield, Zap, Check, Target, Award, Briefcase, Library, PenTool, Beaker, Atom, FlaskConical, GraduationCap, Laptop, Rocket, Sun, Monitor, Brain } from 'lucide-react';
import { classesData, getSubjectName, getChapterName } from '../data/classesData';
import pdfManifest from '../data/pdfManifest.json';

const SectionIcon = ({ icon: Icon, colorHex = "#3b82f6", align = "center" }) => {
    const hexToRgba = (hex, alpha) => {
        const r = parseInt(hex.slice(1, 3), 16) || 0;
        const g = parseInt(hex.slice(3, 5), 16) || 0;
        const b = parseInt(hex.slice(5, 7), 16) || 0;
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    return (
        <div style={{ display: 'flex', justifyContent: align, width: '100%', marginBottom: '1.5rem' }}>
            <div
                style={{
                    color: colorHex,
                    background: hexToRgba(colorHex, 0.1),
                    padding: '1.2rem',
                    borderRadius: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 8px 25px ${hexToRgba(colorHex, 0.2)}`,
                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px) scale(1.1)';
                    e.currentTarget.style.boxShadow = `0 15px 35px ${hexToRgba(colorHex, 0.4)}`;
                    e.currentTarget.style.filter = 'drop-shadow(0 0 8px currentColor)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = `0 8px 25px ${hexToRgba(colorHex, 0.2)}`;
                    e.currentTarget.style.filter = 'none';
                }}
            >
                <Icon size={46} />
            </div>
        </div>
    );
};
import heroIllustration from '../assets/hero_illustration.png';
import "./Home.css";

const SnakeIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M10 21V19C10 17.8954 10.8954 17 12 17H14C15.6569 17 17 14.3137 17 11V9C17 7.34315 15.6569 6 14 6H10C8.34315 6 7 7.34315 7 9V11C7 12.6569 8.34315 14 10 14H14" />
        <path d="M8 9a2 2 0 1 0 0-4h4" />
        <circle cx="9.5" cy="7.5" r="0.5" fill="currentColor" />
    </svg>
);

const getClassIconData = (cls) => {
    switch (cls) {
        case 6: return { icon: <Briefcase className="animated-icon-svg" />, color: '#60a5fa' };
        case 7: return { icon: <Library className="animated-icon-svg" />, color: '#34d399' };
        case 8: return { icon: <PenTool className="animated-icon-svg" />, color: '#fbbf24' };
        case 9: return { icon: <Beaker className="animated-icon-svg" />, color: '#f472b6' };
        case 10: return { icon: <Atom className="animated-icon-svg" />, color: '#a78bfa' };
        case 11: return { icon: <FlaskConical className="animated-icon-svg" />, color: '#38bdf8' };
        case 12: return { icon: <GraduationCap className="animated-icon-svg" />, color: '#fb7185' };
        default: return { icon: <BookOpen className="animated-icon-svg" />, color: '#ffffff' };
    }
};

const TypingHero = ({ fullText }) => {
    const [typedText, setTypedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [typingSpeed, setTypingSpeed] = useState(100);

    useEffect(() => {
        let timer;
        const handleTyping = () => {
            const nextText = isDeleting
                ? fullText.substring(0, typedText.length - 1)
                : fullText.substring(0, typedText.length + 1);

            setTypedText(nextText);

            if (!isDeleting && nextText === fullText) {
                setTypingSpeed(2500);
                setIsDeleting(true);
            } else if (isDeleting && nextText === '') {
                setIsDeleting(false);
                setTypingSpeed(500);
            } else {
                setTypingSpeed(isDeleting ? 40 : 80);
            }
        };

        timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [typedText, isDeleting, typingSpeed, fullText]);

    return (
        <span className="hero-subtitle soft-blue-gradient" style={{ fontSize: '1.5rem', fontWeight: 600 }}>
            {typedText}
            <span className="typing-cursor">|</span>
        </span>
    );
};

const Home = () => {
    // 5-Step Flow States
    const [activeClass, setActiveClass] = useState(null);
    const [activeMedium, setActiveMedium] = useState(null);
    const [activeStream, setActiveStream] = useState(null);
    const [activeSubject, setActiveSubject] = useState(null);
    const [activeContent, setActiveContent] = useState(null);

    const allClasses = [...classesData.junior.classes, ...classesData.senior.classes];
    const programmingCourses = [
        { id: 'Python', name: 'Python', icon: <Terminal size={24} />, desc: 'The most popular language for beginners, data science, and web development.' },
        { id: 'Java', name: 'Java', icon: <Book size={24} />, desc: 'Enterprise-grade language for backend systems and Android development.' },
        { id: 'C++', name: 'C++', icon: <Cpu size={24} />, desc: 'High-performance language widely used in game dev and competitive programming.' },
        { id: 'Web Development', name: 'Web Development', icon: <Code size={24} />, desc: 'Build modern responsive websites and full-stack applications.' }
    ];

    // Data for the new Computer Science Section
    const csCategories = [
        {
            title: "Core Programming",
            courses: [
                { name: "Python Mastery", desc: "From basics to advanced applications.", icon: <Code size={24} /> },
                { name: "Java Enterprise", desc: "Build scalable backend systems.", icon: <Terminal size={24} /> },
                { name: "C++ Fundamentals", desc: "High-performance computing & DSA.", icon: <Cpu size={24} /> },
                { name: "Full-Stack Web", desc: "MERN stack and modern frameworks.", icon: <BookOpen size={24} /> }
            ]
        },
        {
            title: "Core Computer Science Subjects",
            courses: [
                { name: "Data Structures", desc: "Master algorithms and problem solving.", icon: <File size={24} /> },
                { name: "Operating Systems", desc: "Understand kernel and processes.", icon: <Cpu size={24} /> },
                { name: "Database Systems", desc: "SQL, NoSQL, and system design.", icon: <FileText size={24} /> },
                { name: "Computer Networks", desc: "Protocols, routing, and security.", icon: <CheckSquare size={24} /> }
            ]
        },
        {
            title: "Advanced Technologies",
            courses: [
                { name: "Artificial Intelligence", desc: "Machine learning and neural networks.", icon: <Star size={24} /> },
                { name: "Cloud Computing", desc: "AWS, Azure, and deployment strategies.", icon: <Book size={24} /> },
                { name: "Cybersecurity", desc: "Ethical hacking and defense mechanisms.", icon: <CheckCircle size={24} /> },
                { name: "Data Science", desc: "Analytics, visualization, and big data.", icon: <Trophy size={24} /> }
            ]
        }
    ];

    // Data for the Summer Special Courses
    const summerCourses = [
        { name: "Basic Computer Course", desc: "Essential digital skills for everyone.", icon: <Cpu size={24} /> },
        { name: "Advanced Excel", desc: "Master formulas, macros, and data analysis.", icon: <FileText size={24} /> },
        { name: "Spoken English", desc: "Build fluency and communication confidence.", icon: <Star size={24} /> },
        { name: "Personality Development", desc: "Enhance soft skills and personal growth.", icon: <Trophy size={24} /> },
        { name: "Digital Marketing", desc: "SEO, social media, and online strategies.", icon: <CheckCircle size={24} /> },
        { name: "Graphic Designing", desc: "Learn Photoshop, Illustrator, and Canva.", icon: <Cpu size={24} /> },
        { name: "Python for Beginners", desc: "Start your coding journey with Python.", icon: <Terminal size={24} /> },
        { name: "Video Editing", desc: "Premiere Pro, After Effects, and storytelling.", icon: <PlayCircle size={24} /> },
        { name: "Tally with GST", desc: "Complete accounting and taxation software.", icon: <File size={24} /> },
        { name: "AI & ChatGPT Basics", desc: "Leverage AI tools for everyday productivity.", icon: <Star size={24} /> },
        { name: "Public Speaking", desc: "Overcome stage fear and speak with impact.", icon: <Trophy size={24} /> },
        { name: "Coding for Kids", desc: "Fun, interactive programming fundamentals.", icon: <Code size={24} /> }
    ];

    // Helper for icons mapping
    const getIcon = (iconName) => {
        const icons = {
            FileText: <FileText size={18} />, CheckSquare: <CheckSquare size={18} />,
            Book: <Book size={18} />, BookOpen: <BookOpen size={18} />,
            File: <File size={18} />, Clock: <Clock size={18} />,
            PlayCircle: <PlayCircle size={18} />
        };
        return icons[iconName] || <FileText size={18} />;
    };


    // Count-up animation for Stats section
    useEffect(() => {
        const statsSection = document.getElementById('stats-section');
        if (!statsSection) return;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                const counters = document.querySelectorAll('.stat-counter');
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const duration = 2000;
                    const increment = target / (duration / 16);
                    let current = 0;
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.innerText = Math.ceil(current) + (counter.getAttribute('data-suffix') || '');
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.innerText = target + (counter.getAttribute('data-suffix') || '');
                        }
                    };
                    updateCounter();
                });
                observer.disconnect();
            }
        }, { threshold: 0.5 });

        observer.observe(statsSection);

        return () => observer.disconnect();
    }, []);

    // Handler Functions
    const handleClassClick = (id) => {
        setActiveClass(id);
        setActiveMedium(null);
        setActiveStream(null);
        setActiveSubject(null);
        setActiveContent(null);
        setTimeout(() => document.getElementById('dynamic-selection-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    };

    const handleMediumClick = (medium) => {
        setActiveMedium(medium);
        if (activeClass < 11) {
            setActiveStream(null);
        }
        setActiveSubject(null);
        setActiveContent(null);
        setTimeout(() => document.getElementById('subject-selection-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
    };

    const handleStreamClick = (streamId) => {
        setActiveStream(streamId);
        setActiveMedium(null);
        setActiveSubject(null);
        setActiveContent(null);
        setTimeout(() => document.getElementById('medium-selection-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
    };

    const handleSubjectClick = (subject) => {
        setActiveSubject(subject);
        setActiveContent(null);
        setTimeout(() => document.getElementById('content-selection-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    };

    const handleContentClick = (contentId) => {
        setActiveContent(contentId);
        setTimeout(() => document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    };

    const resetSelection = () => {
        setActiveClass(null);
        setActiveMedium(null);
        setActiveStream(null);
        setActiveSubject(null);
        setActiveContent(null);
    };

    // Simple particle generation
    const particles = Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        size: `${Math.random() * 3 + 1}px`,
        duration: `${Math.random() * 10 + 10}s`,
        delay: `${Math.random() * 10}s`
    }));

    return (
        <div className="home-container">
            {/* Animated Background Blobs */}
            <div className="blob" style={{ top: '10%', left: '5%', width: '400px', height: '400px', background: 'var(--electric-blue)' }}></div>
            <div className="blob" style={{ bottom: '20%', right: '10%', width: '500px', height: '500px', background: 'var(--vivid-purple)', animationDelay: '-5s' }}></div>
            <div className="blob" style={{ top: '60%', left: '20%', width: '300px', height: '300px', background: 'var(--electric-blue)', animationDelay: '-10s', opacity: 0.1 }}></div>

            <section className="hero-section">
                <div className="grid-overlay"></div>

                {/* Subtle Particles */}
                <div className="particles-container">
                    {particles.map(p => (
                        <div
                            key={p.id}
                            className="particle"
                            style={{
                                left: p.left,
                                width: p.size,
                                height: p.size,
                                animationDuration: p.duration,
                                animationDelay: p.delay,
                                "--x": `${(Math.random() - 0.5) * 100}px`,
                                "--y": `${(Math.random() - 0.5) * 100}px`
                            }}
                        />
                    ))}
                </div>

                <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                    <div className="hero-grid">
                        <div className="animate-fade-in">
                            <h1 style={{ fontSize: 'clamp(3.5rem, 8vw, 5.5rem)', fontWeight: 800, marginBottom: '2rem', lineHeight: 1.1 }}>
                                Welcome to <span className="gradient-text">Tech Karma Classes</span>
                            </h1>

                            <p style={{ marginBottom: '3.5rem' }}>
                                <TypingHero fullText="CBSE 2026 Classes + Programming + Computer Science" />
                            </p>

                            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'inherit' }}>
                                <Link to="/admission" className="btn btn-primary">
                                    Start Learning <ArrowRight size={20} />
                                </Link>
                                <Link to="#explore-cs" className="btn btn-secondary" onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById('explore-cs').scrollIntoView({ behavior: 'smooth' });
                                }}>
                                    Explore Courses
                                </Link>
                            </div>
                        </div>

                        {/* Modern Coding Illustration */}
                        <div className="animate-fade-in" style={{ animationDelay: '0.3s', display: 'flex', justifyContent: 'center' }}>
                            <img
                                src={heroIllustration}
                                alt="Modern Coding Illustration"
                                loading="eager"
                                decoding="async"
                                fetchpriority="high"
                                style={{
                                    width: '100%',
                                    maxWidth: '500px',
                                    height: 'auto',
                                    filter: 'drop-shadow(0 20px 50px rgba(59, 130, 246, 0.3))',
                                    animation: 'floating-animation 4s infinite ease-in-out'
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* STEP 2: SELECT CLASS */}
            <section className={`class-section ${activeClass ? 'active-mode' : ''}`} id="class-selection">
                <div className="container" style={{ textAlign: 'center' }}>
                    <div className="section-title">
                        <SectionIcon icon={GraduationCap} colorHex="#60a5fa" align="center" />
                        <h2 style={{ fontSize: '3.5rem' }}>
                            {activeClass ? `${typeof activeClass === 'number' ? (activeMedium === 'Hindi' ? 'कक्षा ' : 'Class ') : ''}${activeClass} ${activeMedium === 'Hindi' ? 'चयनित' : 'Selected'}` : 'Select Your Class'}
                        </h2>
                    </div>
                    {!activeClass && (
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '700px', margin: '-1rem auto 6rem', lineHeight: 1.7 }} className="animate-fade-in">
                            Empower your academic journey with the perfect blend of school curriculum and real-world tech literacy.
                        </p>
                    )}

                    {!activeClass ? (
                        <div className="grid grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2.5rem' }}>
                            {allClasses.map((cls, index) => {
                                const isSenior = cls >= 11;
                                return (
                                    <div
                                        key={cls}
                                        onClick={() => handleClassClick(cls)}
                                        className="animate-fade-in"
                                        style={{
                                            animationDelay: `${index * 0.1}s`,
                                            cursor: 'pointer',
                                            textAlign: 'center',
                                            position: 'relative',
                                            overflow: 'hidden',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            padding: '2rem 1.5rem',
                                            aspectRatio: '1/1',
                                            borderRadius: '20px',
                                            background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0) 100%)',
                                            border: '1px solid rgba(255, 255, 255, 0.1)',
                                            boxShadow: '0 15px 35px -5px rgba(0, 0, 0, 0.6), inset 0 2px 5px rgba(255, 255, 255, 0.05)',
                                            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                            backdropFilter: 'blur(20px)',
                                            WebkitBackdropFilter: 'blur(20px)',
                                            transformStyle: 'preserve-3d',
                                            perspective: '1000px'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'perspective(1000px) rotateX(4deg) rotateY(-4deg) translateY(-15px) scale(1.03)';
                                            e.currentTarget.style.boxShadow = '20px 30px 60px -10px rgba(59, 130, 246, 0.3), -20px 30px 60px -10px rgba(139, 92, 246, 0.3), inset 0 2px 15px rgba(255, 255, 255, 0.1)';
                                            e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.5)';
                                            e.currentTarget.style.background = 'linear-gradient(145deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)';

                                            const reflection = e.currentTarget.querySelector('.card-reflection');
                                            if (reflection) {
                                                reflection.style.opacity = '1';
                                                reflection.style.transform = 'translateX(100%) rotate(45deg)';
                                            }

                                            const img = e.currentTarget.querySelector('.card-img');
                                            if (img) {
                                                img.style.transform = 'scale(1.1)';
                                            }

                                            const icon = e.currentTarget.querySelector('.animated-icon-container');
                                            if (icon) {
                                                icon.style.filter = 'drop-shadow(0 0 15px currentColor)';
                                            }

                                            const title = e.currentTarget.querySelector('h3');
                                            if (title) {
                                                title.style.transform = 'translateZ(20px)';
                                                title.style.background = 'linear-gradient(135deg, #a5f3fc 0%, #3b82f6 100%)';
                                                title.style.webkitBackgroundClip = 'text';
                                                title.style.color = 'transparent';
                                            }

                                            const text = e.currentTarget.querySelector('p');
                                            if (text) {
                                                text.style.transform = 'translateZ(10px)';
                                                text.style.color = '#e2e8f0';
                                            }

                                            const btn = e.currentTarget.querySelector('.internal-btn');
                                            if (btn) {
                                                btn.style.transform = 'translateZ(40px) translateY(-3px)';
                                                btn.style.background = 'linear-gradient(90deg, #8b5cf6, #3b82f6)';
                                                btn.style.borderColor = 'transparent';
                                                btn.style.color = 'white';
                                                btn.style.boxShadow = '0 15px 30px rgba(59, 130, 246, 0.5), inset 0 2px 0 rgba(255,255,255,0.2)';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
                                            e.currentTarget.style.boxShadow = '0 15px 35px -5px rgba(0, 0, 0, 0.6), inset 0 2px 5px rgba(255, 255, 255, 0.05)';
                                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                            e.currentTarget.style.background = 'linear-gradient(145deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0) 100%)';

                                            const reflection = e.currentTarget.querySelector('.card-reflection');
                                            if (reflection) {
                                                reflection.style.opacity = '0';
                                                reflection.style.transform = 'translateX(-100%) rotate(45deg)';
                                            }

                                            const img = e.currentTarget.querySelector('.card-img');
                                            if (img) {
                                                img.style.transform = 'scale(1)';
                                            }

                                            const icon = e.currentTarget.querySelector('.animated-icon-container');
                                            if (icon) {
                                                icon.style.filter = 'drop-shadow(0 0 15px currentColor)';
                                            }

                                            const title = e.currentTarget.querySelector('h3');
                                            if (title) {
                                                title.style.transform = 'translateZ(0)';
                                                title.style.background = 'none';
                                                title.style.webkitBackgroundClip = 'border-box';
                                                title.style.color = 'white';
                                            }

                                            const text = e.currentTarget.querySelector('p');
                                            if (text) {
                                                text.style.transform = 'translateZ(0)';
                                                text.style.color = '#cbd5e1';
                                            }

                                            const btn = e.currentTarget.querySelector('.internal-btn');
                                            if (btn) {
                                                btn.style.transform = 'translateZ(0) translateY(0)';
                                                btn.style.background = 'rgba(255, 255, 255, 0.03)';
                                                btn.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                                btn.style.color = 'white';
                                                btn.style.boxShadow = 'none';
                                            }
                                        }}
                                    >
                                        {/* Glossy reflection effect overlay */}
                                        <div
                                            className="card-reflection"
                                            style={{
                                                position: 'absolute',
                                                top: '-50%',
                                                left: '-50%',
                                                width: '200%',
                                                height: '200%',
                                                background: 'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%)',
                                                transform: 'translateX(-100%) rotate(45deg)',
                                                transition: 'all 0.8s ease',
                                                opacity: 0,
                                                pointerEvents: 'none',
                                                zIndex: 0
                                            }}
                                        />

                                        {/* Background Image Overlay */}
                                        <div style={{
                                            position: 'absolute',
                                            inset: '0',
                                            zIndex: 0,
                                            overflow: 'hidden',
                                            borderRadius: '20px',
                                        }}>
                                            <img
                                                className="card-img"
                                                src={
                                                    cls >= 11 ? "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800"
                                                        : typeof cls === 'string' ? "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800"
                                                            : cls >= 9 ? "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800"
                                                                : "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800"
                                                }
                                                alt={`Class ${cls}`}
                                                loading="lazy"
                                                decoding="async"
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    opacity: 0.2,
                                                    transition: 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                                                }}
                                            />
                                            <div style={{
                                                position: 'absolute',
                                                inset: '0',
                                                background: 'linear-gradient(to top, rgba(15, 23, 42, 0.95) 10%, rgba(15, 23, 42, 0.6) 80%, rgba(15, 23, 42, 0.3) 100%)',
                                                pointerEvents: 'none'
                                            }} />
                                        </div>

                                        {(() => {
                                            const { icon, color } = getClassIconData(cls);
                                            return (
                                                <div
                                                    className="animated-icon-container"
                                                    style={{ color: color, borderColor: `rgba(255,255,255,0.1)` }}
                                                >
                                                    {icon}
                                                </div>
                                            );
                                        })()}

                                        <h3 style={{
                                            fontSize: '1.8rem', marginBottom: '0.75rem', fontWeight: 800,
                                            letterSpacing: '-0.5px', color: 'white',
                                            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                            position: 'relative', zIndex: 1
                                        }}>
                                            Class {cls}
                                        </h3>

                                        <p style={{
                                            color: '#cbd5e1', marginBottom: '1.5rem',
                                            fontSize: '0.95rem', lineHeight: 1.5,
                                            transition: 'all 0.4s ease', position: 'relative', zIndex: 1
                                        }}>
                                            {isSenior
                                                ? 'Professional-grade board preparation with deeper insights.'
                                                : 'Robust conceptual foundations in core subjects with early logic.'}
                                        </p>

                                        <div
                                            className="internal-btn"
                                            style={{
                                                width: '100%', justifyContent: 'center', fontWeight: 700,
                                                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                                background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)',
                                                color: 'white', position: 'relative', padding: '0.75rem 1.5rem',
                                                borderRadius: '12px', display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                                                zIndex: 1, backdropFilter: 'blur(5px)', fontSize: '0.9rem'
                                            }}
                                        >
                                            Select <ArrowRight size={16} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <button onClick={resetSelection} className="btn btn-secondary" style={{ marginBottom: '1rem' }}>
                            <ArrowLeft size={18} /> Back to Selection
                        </button>
                    )}
                </div>
            </section>

            {/* SUMMER SPECIAL COURSES SECTION */}
            {!activeClass && (
                <section className="summer-section" style={{ padding: '6rem 0', position: 'relative', zIndex: 10 }}>
                    <div className="container" style={{ textAlign: 'center' }}>
                        <div className="section-title">
                            <SectionIcon icon={Sun} colorHex="#fbbf24" align="center" />
                            <h2 style={{ fontSize: '3.5rem', position: 'relative', display: 'inline-block' }}>
                                🔥 Summer Special Courses 2026
                                <div className="gradient-underline"></div>
                            </h2>
                        </div>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '700px', margin: '2rem auto 4rem', lineHeight: 1.7 }} className="animate-fade-in">
                            Upgrade your skills this summer with high-demand courses.
                        </p>

                        <div className="cs-grid">
                            {summerCourses.map((course, idx) => (
                                <div key={idx} className="summer-card cs-card animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s`, position: 'relative' }}>
                                    <div className="summer-badge">
                                        Limited Time Summer Offer
                                    </div>
                                    <div className="animated-icon-container" style={{ color: 'var(--primary-color)', margin: '0 auto 1.5rem auto', borderColor: `rgba(255,255,255,0.1)` }}>
                                        {course.icon}
                                    </div>
                                    <h4 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>{course.name}</h4>
                                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.6, flex: 1 }}>{course.desc}</p>
                                    <button className="btn btn-secondary" style={{ width: '100%', marginTop: 'auto', background: 'linear-gradient(90deg, var(--vivid-purple), var(--electric-blue))', border: 'none', color: 'white' }}>
                                        Enroll Now <ArrowRight size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* SECTION 1: STATS SECTION */}
            {!activeClass && (
                <section id="stats-section" className="stats-section" style={{ padding: '4rem 0', position: 'relative', zIndex: 10 }}>
                    <div className="container" style={{ textAlign: 'center' }}>
                        <div className="section-grid">
                            {[
                                { count: 500, suffix: '+', label: 'Students Enrolled', icon: <Users size={32} /> },
                                { count: 2000, suffix: '+', label: 'Notes Delivered', icon: <FileText size={32} /> },
                                { count: 95, suffix: '%', label: 'Success Rate', icon: <TrendingUp size={32} /> },
                                { count: 5, suffix: '+', label: 'Years of Excellence', icon: <Award size={32} /> }
                            ].map((stat, idx) => (
                                <div key={idx} className="section-card animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s`, alignItems: 'center' }}>
                                    <div style={{ background: 'var(--bg-secondary)', color: 'var(--electric-blue)', padding: '1rem', borderRadius: '50%', marginBottom: '1.5rem', display: 'inline-flex' }}>
                                        {stat.icon}
                                    </div>
                                    <h3 style={{ fontSize: '3rem', fontWeight: 800, color: 'white', marginBottom: '0.5rem', background: 'linear-gradient(135deg, #a5f3fc 0%, #3b82f6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                        <span className="stat-counter" data-target={stat.count} data-suffix={stat.suffix}>0</span>
                                    </h3>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', fontWeight: 600 }}>{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* SECTION 2: WHY CHOOSE TECH KARMA CLASSES */}
            {!activeClass && (
                <section className="why-choose-section" style={{ padding: '6rem 0', position: 'relative', zIndex: 10 }}>
                    <div className="container" style={{ textAlign: 'center' }}>
                        <div className="section-title">
                            <h2 style={{ fontSize: '3.5rem', position: 'relative', display: 'inline-block' }}>
                                Why Choose Tech Karma Classes?
                            </h2>
                        </div>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '700px', margin: '1rem auto 4rem', lineHeight: 1.7 }} className="animate-fade-in">
                            Designed for excellence, built for your success
                        </p>

                        <div className="section-grid">
                            {[
                                { title: 'Chapter-wise Structured Notes', desc: 'Comprehensive, easy-to-understand study materials covering every topic in detail.', icon: <BookOpen size={28} /> },
                                { title: 'Weekly Test Series', desc: 'Regular assessments to track your progress and prepare you for real exams.', icon: <FileText size={28} /> },
                                { title: 'Concept Clarity Sessions', desc: 'Interactive doubt-solving focused entirely on making complex concepts crystal clear.', icon: <Cpu size={28} /> },
                                { title: 'Performance Tracking', desc: 'Detailed analytics and feedback to identify strengths and areas for improvement.', icon: <Clock size={28} /> }
                            ].map((feature, idx) => (
                                <div key={idx} className="section-card glow-border animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                                    <div style={{ background: 'var(--bg-secondary)', color: 'var(--vivid-purple)', padding: '1rem', borderRadius: '16px', display: 'inline-flex', marginBottom: '1.5rem', alignSelf: 'flex-start' }}>
                                        {feature.icon}
                                    </div>
                                    <h4 style={{ fontSize: '1.5rem', color: 'white', marginBottom: '1rem', textAlign: 'left', fontWeight: '700' }}>{feature.title}</h4>
                                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, textAlign: 'left', flex: 1 }}>{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* SECTION 3: COURSE PRICING */}
            {!activeClass && (
                <section className="pricing-section" style={{ padding: '6rem 0', position: 'relative', zIndex: 10 }}>
                    <div className="container" style={{ textAlign: 'center' }}>
                        <div className="section-title">
                            <h2 style={{ fontSize: '3.5rem', position: 'relative', display: 'inline-block' }}>
                                Course Pricing
                            </h2>
                        </div>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '700px', margin: '1rem auto 4rem', lineHeight: 1.7 }} className="animate-fade-in">
                            Professional training at affordable prices. Invest in your future today.
                        </p>

                        <div className="section-grid">
                            {[
                                { title: 'C Foundation', price: '₹2,999', duration: '3 Months', features: ['50+ Live Classes', 'Problem Solving Focus', 'Certificate'], icon: <Laptop className="animated-icon-svg" /> },
                                { title: 'Python Mastery', price: '₹4,999', duration: '6 Months', features: ['100+ Live Classes', 'Real-world Projects', 'Certificate of Completion'], icon: <SnakeIcon className="animated-icon-svg" />, popular: true },
                                { title: 'C++ Programming', price: '₹3,499', duration: '4 Months', features: ['DSA Included', 'Competitive Programming', 'Certificate'], icon: <Rocket className="animated-icon-svg" /> },
                                { title: 'AI Specialist', price: '₹7,999', duration: '8 Months', features: ['Machine Learning Basics', 'Neural Networks', 'Industry Projects'], icon: <Star className="animated-icon-svg" /> }
                            ].map((plan, idx) => (
                                <div key={idx} className={`section-card animate-fade-in-up ${plan.popular ? 'pricing-popular' : ''}`} style={{ animationDelay: `${idx * 0.1}s`, borderTop: plan.popular ? '3px solid var(--electric-blue)' : '1px solid var(--glass-border)' }}>
                                    {plan.popular && (
                                        <div style={{ position: 'absolute', top: 0, right: 0, background: 'linear-gradient(90deg, var(--vivid-purple), var(--electric-blue))', color: 'white', fontSize: '0.8rem', fontWeight: 'bold', padding: '0.4rem 1rem', borderBottomLeftRadius: '16px' }}>
                                            Most Popular
                                        </div>
                                    )}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center', marginBottom: '1rem' }}>
                                        <div className="animated-icon-container" style={{ width: '48px', height: '48px', color: plan.popular ? 'var(--electric-blue)' : 'var(--vivid-purple)' }}>{plan.icon}</div>
                                        <h4 style={{ fontSize: '1.4rem', color: 'white', fontWeight: 700 }}>{plan.title}</h4>
                                    </div>
                                    <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white', margin: '1.5rem 0' }}>
                                        {plan.price}
                                    </div>
                                    <div style={{ color: 'var(--electric-blue)', fontWeight: 600, marginBottom: '2rem' }}>
                                        Duration: {plan.duration}
                                    </div>
                                    <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2.5rem', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
                                        {plan.features.map((feature, fIdx) => (
                                            <li key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-secondary)' }}>
                                                <Check size={18} color="var(--electric-blue)" style={{ flexShrink: 0 }} /> {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <button className="btn btn-secondary" style={{ width: '100%', marginTop: 'auto', background: plan.popular ? 'linear-gradient(90deg, var(--vivid-purple), var(--electric-blue))' : 'rgba(255,255,255,0.05)', border: plan.popular ? 'none' : '1px solid rgba(255,255,255,0.1)', color: 'white' }}>
                                        Enroll Now <ArrowRight size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* STEP 3 & 4: DYNAMIC FLOW */}
            {activeClass && (
                <section id="dynamic-selection-section" className="dynamic-selection-section">
                    <div className="container">
                        {/* 1. SELECT STREAM (Only for Class 11 and 12) */}
                        {activeClass >= 11 && (
                            <div className="glass-card animate-fade-in-up" style={{ marginBottom: '3rem', padding: '3rem', borderTop: '1px solid var(--electric-blue)' }}>
                                <h3 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'white', borderLeft: '4px solid var(--vivid-purple)', paddingLeft: '1.5rem' }}>1. Select Stream</h3>
                                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                    {classesData.senior.streams.map(stream => (
                                        <button
                                            key={stream.id}
                                            onClick={() => handleStreamClick(stream.id)}
                                            className={`btn ${activeStream === stream.id ? 'btn-primary' : 'btn-secondary'}`}
                                            style={{
                                                flex: '1 1 auto',
                                                padding: '1rem 2rem',
                                                background: activeStream === stream.id ? 'var(--vivid-purple)' : 'rgba(255,255,255,0.05)',
                                                border: activeStream === stream.id ? 'none' : '1px solid var(--glass-border)',
                                                color: 'white'
                                            }}
                                        >
                                            {stream.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* 2. SELECT MEDIUM  */}
                        {(activeClass < 11 || activeStream) && (
                            <div id="medium-selection-section" className="glass-card animate-fade-in-up" style={{ marginBottom: '3rem', padding: '3rem' }}>
                                <h3 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'white', borderLeft: '4px solid var(--electric-blue)', paddingLeft: '1.5rem' }}>{activeClass >= 11 ? '2. Select Medium' : '1. Select Medium'}</h3>
                                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                                    {(activeClass >= 11 && activeStream === 'science' ? ['English'] : ['English', 'Hindi']).map(medium => (
                                        <button
                                            key={medium}
                                            onClick={() => handleMediumClick(medium)}
                                            className={`btn ${activeMedium === medium ? 'btn-primary' : 'btn-secondary'}`}
                                            style={{ flex: '1 1 250px', fontSize: '1.25rem', padding: '1.25rem' }}
                                        >
                                            {medium} Medium
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* 5. SELECT SUBJECT */}
                        {activeMedium && (activeClass < 11 || activeStream) && (
                            <div id="subject-selection-section" className="glass-card animate-fade-in-up" style={{ marginBottom: '3rem', padding: '3rem', borderTop: '1px solid var(--electric-blue)' }}>
                                <h3 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'white', borderLeft: '4px solid var(--vivid-purple)', paddingLeft: '1.5rem' }}>{activeClass >= 11 ? '3. Select Subject' : '2. Select Subject'}</h3>
                                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                    {Object.keys(activeClass >= 11 ? classesData[activeClass].mediums[activeMedium].streams[activeStream].subjects : classesData[activeClass].mediums[activeMedium].subjects).map(sub => {
                                        const subjectName = getSubjectName(sub, activeMedium);
                                        return (
                                            <button
                                                key={sub}
                                                onClick={() => handleSubjectClick(sub)}
                                                className={`btn ${activeSubject === sub ? 'btn-primary' : 'btn-secondary'}`}
                                                style={{
                                                    flex: '1 1 auto',
                                                    padding: '1rem 2rem',
                                                    background: activeSubject === sub ? 'var(--vivid-purple)' : 'rgba(255,255,255,0.05)',
                                                    border: activeSubject === sub ? 'none' : '1px solid var(--glass-border)',
                                                    color: 'white'
                                                }}
                                            >
                                                {subjectName}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* 5. SELECT CONTENT TYPE & CHAPTERS */}
                        {activeSubject && (
                            <div id="content-selection-section" className="glass-card animate-fade-in-up" style={{ marginBottom: '3rem', padding: '3rem' }}>
                                <h3 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'white', borderLeft: '4px solid var(--electric-blue)', paddingLeft: '1.5rem' }}>{activeClass >= 11 ? '4. Select Content Type' : '3. Select Content Type'}</h3>
                                <div className="tabs-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '4rem' }}>
                                    {classesData.tabs.map(tab => (
                                        <button
                                            key={tab.id}
                                            className={`tab-btn ${activeContent === tab.id ? 'active' : ''}`}
                                            onClick={() => handleContentClick(tab.id)}
                                            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 2rem' }}
                                        >
                                            {getIcon(tab.icon)} {tab.label}
                                        </button>
                                    ))}
                                </div>

                                {activeContent && (
                                    <div id="results-section" className="animate-fade-in" style={{
                                        background: 'rgba(255,255,255,0.02)',
                                        padding: '3rem',
                                        borderRadius: '20px',
                                        border: '1px solid var(--glass-border)'
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                                            <h4 style={{ fontSize: '1.75rem', color: 'var(--electric-blue)' }}>
                                                {activeClass >= 11 ? `${classesData.senior.streams.find(s => s.id === activeStream)?.label || ''} | ` : ''}
                                            </h4>
                                            <span style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--electric-blue)', padding: '0.5rem 1.5rem', borderRadius: '50px', fontSize: '0.9rem', fontWeight: 600 }}>
                                                CBSE 2026 Updated
                                            </span>
                                        </div>

                                        <div className="grid grid-3" style={{ gap: '1.5rem' }}>
                                            {(activeClass >= 11 ? classesData[activeClass]?.mediums?.[activeMedium]?.streams?.[activeStream]?.subjects?.[activeSubject]?.[activeContent] : classesData[activeClass]?.mediums?.[activeMedium]?.subjects?.[activeSubject]?.[activeContent] || []).map((chapter, idx) => {
                                                const translatedChapter = getChapterName(activeClass, activeSubject, chapter, idx, activeMedium);

                                                const pdfFilename = activeContent === 'notes' ? `class${activeClass}-${activeMedium.toLowerCase()}-${activeSubject === 'Social Studies (SST)' ? 'socialstudies' : activeSubject.toLowerCase().replace(/[^a-z0-9]/gi, '')}-ch${idx + 1}.pdf` : `class${activeClass}-${activeMedium.toLowerCase()}-${activeSubject === 'Social Studies (SST)' ? 'socialstudies' : activeSubject.toLowerCase().replace(/[^a-z0-9]/gi, '')}-${activeContent}-ch${idx + 1}.pdf`;
                                                const pdfExists = pdfManifest.includes(pdfFilename);

                                                return (
                                                    <div
                                                        key={idx}
                                                        className="glass-card"
                                                        style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', transition: '0.3s' }}
                                                    >
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                            <div style={{ padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: '12px', color: 'var(--electric-blue)' }}>
                                                                {getIcon(classesData.tabs.find(t => t.id === activeContent)?.icon)}
                                                            </div>
                                                            <span style={{ fontWeight: 600, color: 'white' }}>{activeMedium === 'Hindi' ? 'अध्याय' : 'Chapter'} {idx + 1}</span>
                                                        </div>
                                                        <h5 style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>{translatedChapter}</h5>
                                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: 'auto' }}>
                                                            <button className="btn btn-secondary" style={{ width: '100%', fontSize: '0.9rem' }}>
                                                                Open Resource <ArrowRight size={16} />
                                                            </button>

                                                            {['notes', 'ncert-solution', 'mcqs', 'books'].includes(activeContent) && (
                                                                pdfExists ? (
                                                                    <a
                                                                        href={`/pdfs/${pdfFilename}`}
                                                                        target="_blank"
                                                                        rel="noreferrer"
                                                                        className="btn btn-primary"
                                                                        style={{ width: '100%', fontSize: '0.9rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
                                                                    >
                                                                        View PDF <ArrowRight size={16} />
                                                                    </a>
                                                                ) : (
                                                                    <button
                                                                        disabled
                                                                        className="btn btn-secondary"
                                                                        style={{ width: '100%', fontSize: '0.9rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', opacity: 0.5, cursor: 'not-allowed' }}
                                                                    >
                                                                        Unavailable
                                                                    </button>
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* COMPUTER SCIENCE & PROGRAMMING COURSES SECTION */}
            {!activeClass && (
                <section className="cs-section" style={{ padding: '6rem 0', position: 'relative', zIndex: 10 }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <div className="section-title">
                        <SectionIcon icon={Code} colorHex="#38bdf8" align="center" />
                        <h2 style={{ fontSize: '3.5rem' }}>Computer Science & Programming Courses</h2>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '700px', margin: '-1rem auto 4rem', lineHeight: 1.7 }} className="animate-fade-in">
                        Build real-world skills with our expert-led curriculum
                    </p>

                    <div className="cs-section-content" style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
                        {csCategories.map((category, idx) => {
                            let CatIcon = Code;
                            let catColor = "#a855f7";
                            if (category.title.includes("Core Computer")) {
                                CatIcon = Monitor;
                                catColor = "#10b981";
                            } else if (category.title.includes("Advanced")) {
                                CatIcon = Brain;
                                catColor = "#f43f5e";
                            }

                            return (
                                <section key={idx} className="cs-category-block">
                                    <SectionIcon icon={CatIcon} colorHex={catColor} align="left" />
                                    <h3 style={{ fontSize: '2rem', color: 'white', marginBottom: '2rem', textAlign: 'left', borderLeft: '4px solid var(--electric-blue)', paddingLeft: '1rem' }}>
                                        {category.title}
                                    </h3>
                                    <div className="cs-grid">
                                        {category.courses.map((course, cIdx) => (
                                            <div key={cIdx} className="cs-card animate-fade-in-up" style={{ animationDelay: `${(idx * 0.1) + (cIdx * 0.1)}s` }}>
                                                <div className="animated-icon-container" style={{ margin: '0 auto 1.5rem auto', color: 'var(--primary-color)', borderColor: 'rgba(255,255,255,0.1)' }}>
                                                    {course.icon}
                                                </div>
                                                <h4 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>{course.name}</h4>
                                                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.6, flex: 1 }}>{course.desc}</p>
                                                <button className="btn btn-secondary" style={{ width: '100%', marginTop: 'auto', background: 'linear-gradient(90deg, var(--primary-color), var(--vivid-purple))', border: 'none', color: 'white' }}>
                                                    Explore Course <ArrowRight size={16} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            );
                        })}
                    </div>
                </div>
            </section>
            )}

            <footer className="footer">
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '5rem', marginBottom: '5rem' }}>
                        <div>
                            <h3 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '2rem', fontWeight: 800 }}>Tech Karma</h3>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1.15rem', lineHeight: 1.8 }}>
                                Revolutionizing tech education for the next generation. Join the ranks of future-proof engineers and leaders.
                            </p>
                            <div style={{ display: 'flex', gap: '1.5rem' }}>
                                <Github size={22} style={{ cursor: 'pointer' }} />
                                <Twitter size={22} style={{ cursor: 'pointer' }} />
                                <Linkedin size={22} style={{ cursor: 'pointer' }} />
                            </div>
                        </div>
                        <div>
                            <h4 style={{ marginBottom: '2rem', color: 'white', fontSize: '1.4rem' }}>Resources</h4>
                            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.25rem', color: 'var(--text-secondary)' }}>
                                <li style={{ cursor: 'pointer' }}>Academy Tracks</li>
                                <li style={{ cursor: 'pointer' }}>Admission Portal</li>
                                <li style={{ cursor: 'pointer' }}>Scholarship Test</li>
                                <li style={{ cursor: 'pointer' }}>Student Portal</li>
                            </ul>
                        </div>
                        <div>
                            <h4 style={{ marginBottom: '2rem', color: 'white', fontSize: '1.4rem' }}>Connect</h4>
                            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.25rem', color: 'var(--text-secondary)' }}>
                                <li>Janakpuri District Center, New Delhi</li>
                                <li>+91 97100 00000</li>
                                <li>hello@techkarma.io</li>
                                <li>Office Hours: 10AM - 7PM</li>
                            </ul>
                        </div>
                    </div>
                    <div style={{ textAlign: 'center', paddingTop: '4rem', borderTop: '1px solid var(--glass-border)', color: 'var(--text-secondary)', fontSize: '0.95rem', letterSpacing: '1px' }}>
                        &copy; 2026 TECH KARMA CLASSES. PRESERVING ACADEMIC EXCELLENCE THROUGH INNOVATION.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
