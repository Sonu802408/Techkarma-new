import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, ExternalLink, ShieldCheck, Code, Cpu, Trophy, Star, CheckCircle, Github, Twitter, Linkedin, ArrowLeft, FileText, CheckSquare, Book, File, Clock, PlayCircle, Terminal, Users, TrendingUp, Shield, Zap, Check, Target, Award, Briefcase, Library, PenTool, Beaker, Atom, FlaskConical, GraduationCap, Laptop, Rocket, Sun, Monitor, Brain, Globe, Palette, Download, ShieldAlert, Cloud, Database } from 'lucide-react';
import { classesData, getSubjectName, getChapterName } from '../data/classesData';
import pdfManifest from '../data/pdfManifest.json';
import { getNcertChapters, getDirectNcertChapterPdf } from '../data/ncertBooksData';
import EducationalContentContainer from '../components/educational/EducationalContentContainer.jsx';
import ClassCard from '../components/ClassCard.jsx';
import heroIllustration from '../assets/hero_illustration.png';
import { useAuth } from '../context/AuthContext';
import PdfViewerModal from '../components/common/PdfViewerModal.jsx';
import "./Home.css";

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

const SnakeIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M10 21V19C10 17.8954 10.8954 17 12 17H14C15.6569 17 17 14.3137 17 11V9C17 7.34315 15.6569 6 14 6H10C8.34315 6 7 7.34315 7 9V11C7 12.6569 8.34315 14 10 14H14" />
        <path d="M8 9a2 2 0 1 0 0-4h4" />
        <circle cx="9.5" cy="7.5" r="0.5" fill="currentColor" />
    </svg>
);

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
    const { presence } = useAuth();
    // 5-Step Flow States
    const [activeClass, setActiveClass] = useState(null);
    const [activeMedium, setActiveMedium] = useState(null);
    const [activeStream, setActiveStream] = useState(null);
    const [activeSubject, setActiveSubject] = useState(null);
    const [activeContent, setActiveContent] = useState(null);

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
            subtitle: subtitle || (activeClass ? `Class ${activeClass} • ${activeSubject || ''} • ${activeMedium || ''}` : ''),
            badge: badge || 'PDF',
            filename
        });
    };

    const handleClosePdf = () => {
        setActivePdfModal(prev => ({ ...prev, isOpen: false }));
    };

    const allClasses = [...classesData.junior.classes, ...classesData.senior.classes];
    const programmingCourses = [
        { id: 'Python', name: 'Python', icon: <Terminal size={24} />, desc: 'The most popular language for beginners, data science, and web development.' },
        { id: 'Java', name: 'Java', icon: <Book size={24} />, desc: 'Enterprise-grade language for backend systems and Android development.' },
        { id: 'C++', name: 'C++', icon: <Cpu size={24} />, desc: 'High-performance language widely used in game dev and competitive programming.' },
        { id: 'Web Development', name: 'Web Development', icon: <Code size={24} />, desc: 'Build modern responsive websites and full-stack applications.' }
    ];

    // Data for the Computer Science & Programming Section
    const csCategories = [
        {
            title: "Core Programming",
            courses: [
                { name: "Python", desc: "High-level language for AI, data science, automation, and backend engineering.", icon: <Terminal size={24} />, tag: "AI & Data", color: "#38bdf8", colorRgb: "56, 189, 248", pdfUrl: "https://huggingface.co/datasets/SonuTechKarma/techkarma-pdfs/resolve/main/pdfs/python-pre-notes-cse-gyan.pdf" },
                { name: "C Language", desc: "Foundational logic, pointers, memory architecture, and systems programming.", icon: <Laptop size={24} />, tag: "Systems & Logic", color: "#60a5fa", colorRgb: "96, 165, 250", pdfUrl: "https://huggingface.co/datasets/SonuTechKarma/techkarma-pdfs/resolve/main/pdfs/C_Programming_Complete_Handwritten_Notes.pdf" },
                { name: "C++", desc: "High-performance computing, OOP principles, STL, and competitive coding.", icon: <Rocket size={24} />, tag: "High Performance", color: "#818cf8", colorRgb: "129, 140, 248", pdfUrl: "https://huggingface.co/datasets/SonuTechKarma/techkarma-pdfs/resolve/main/pdfs/CPP_Programming_Complete_Handwritten_Notes.pdf" },
                { name: "Java", desc: "Enterprise systems, JVM internals, multithreading, and backend architecture.", icon: <BookOpen size={24} />, tag: "Enterprise", color: "#f97316", colorRgb: "249, 115, 22", pdfUrl: "https://huggingface.co/datasets/SonuTechKarma/techkarma-pdfs/resolve/main/pdfs/Java_Programming_Complete_Handwritten_Notes.pdf" },
                { name: "HTML5", desc: "The universal web backbone: semantic structure, modern forms, media, and SEO.", icon: <Globe size={24} />, tag: "Web Structure", color: "#ef4444", colorRgb: "239, 68, 68", pdfUrl: "https://huggingface.co/datasets/SonuTechKarma/techkarma-pdfs/resolve/main/pdfs/HTML_Complete_Handwritten_Notes.pdf" },
                { name: "CSS3", desc: "Modern UI styling, Flexbox, CSS Grid, keyframe animations, and glassmorphism.", icon: <Palette size={24} />, tag: "Modern UI", color: "#06b6d4", colorRgb: "6, 182, 212", pdfUrl: "https://huggingface.co/datasets/SonuTechKarma/techkarma-pdfs/resolve/main/pdfs/CSS_Complete_Handwritten_Notes.pdf" },
                { name: "JavaScript", desc: "Modern ES6+, DOM manipulation, asynchronous programming, and dynamic web APIs.", icon: <Zap size={24} />, tag: "Dynamic Web", color: "#eab308", colorRgb: "234, 179, 8", pdfUrl: "https://huggingface.co/datasets/SonuTechKarma/techkarma-pdfs/resolve/main/pdfs/JavaScript_Complete_Handwritten_Notes.pdf" }
            ]
        },
        {
            title: "Core Computer Science Subjects",
            courses: [
                { name: "Data Structures", desc: "Master algorithms, arrays, trees, graphs, and problem solving.", icon: <File size={24} />, tag: "DSA", color: "#10b981", colorRgb: "16, 185, 129", pdfUrl: "https://huggingface.co/datasets/SonuTechKarma/techkarma-pdfs/resolve/main/pdfs/Data-Structure-DSA-pre-notes-cse-gyan.pdf" },
                { name: "Operating Systems", desc: "Understand kernel, concurrency, processes, and memory management.", icon: <Cpu size={24} />, tag: "OS & Kernel", color: "#10b981", colorRgb: "16, 185, 129", pdfUrl: "https://huggingface.co/datasets/SonuTechKarma/techkarma-pdfs/resolve/main/pdfs/OS-pre-notes-cse-gyan.pdf" },
                { name: "Database Systems", desc: "SQL, normalization, indexing, NoSQL, and scalable schema design.", icon: <FileText size={24} />, tag: "Databases", color: "#10b981", colorRgb: "16, 185, 129", pdfUrl: "https://huggingface.co/datasets/SonuTechKarma/techkarma-pdfs/resolve/main/pdfs/DBMS-pre-notes-cse-gyan.pdf" },
                { name: "Computer Networks", desc: "TCP/IP protocols, routing, OSI model, socket programming, and security.", icon: <CheckSquare size={24} />, tag: "Networking", color: "#10b981", colorRgb: "16, 185, 129", pdfUrl: "https://huggingface.co/datasets/SonuTechKarma/techkarma-pdfs/resolve/main/pdfs/Computer-Networks-pre-notes-cse-gyan.pdf" }
            ]
        },
        {
            title: "Advanced Technologies",
            courses: [
                { name: "Artificial Intelligence", desc: "Machine learning, neural networks, deep learning, and generative AI.", icon: <Brain size={24} />, tag: "AI & ML", color: "#f43f5e", colorRgb: "244, 63, 94", pdfUrl: "https://huggingface.co/datasets/SonuTechKarma/techkarma-pdfs/resolve/main/pdfs/AI_Complete_Handwritten_Notes.pdf" },
                { name: "Cloud Computing", desc: "AWS, Azure, containerization (Docker/K8s), and microservices deployment.", icon: <Cloud size={24} />, tag: "Cloud & DevOps", color: "#06b6d4", colorRgb: "6, 182, 212", pdfUrl: "https://huggingface.co/datasets/SonuTechKarma/techkarma-pdfs/resolve/main/pdfs/Cloud_Computing_Complete_Handwritten_Notes.pdf" },
                { name: "Cyber Security", desc: "Ethical hacking, cryptography, threat modeling, and defense mechanisms.", icon: <ShieldAlert size={24} />, tag: "Security", color: "#10b981", colorRgb: "16, 185, 129", pdfUrl: "https://huggingface.co/datasets/SonuTechKarma/techkarma-pdfs/resolve/main/pdfs/Cyber_Security_Complete_Handwritten_Notes.pdf" },
                { name: "Data Science", desc: "Data analytics, statistical modeling, visualization, and big data pipelines.", icon: <Database size={24} />, tag: "Analytics", color: "#8b5cf6", colorRgb: "139, 92, 246", pdfUrl: "https://huggingface.co/datasets/SonuTechKarma/techkarma-pdfs/resolve/main/pdfs/Data_Science_Complete_Handwritten_Notes.pdf" }
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

    // Data for Statistics Counter Section
    const statsData = [
        {
            target: presence?.totalLiveCount || 1,
            suffix: " Live",
            value: `${presence?.totalLiveCount || 1} Live`,
            label: "Active Visitors Right Now",
            desc: "Real-time active visitors exploring courses and notes right now.",
            icon: <Zap size={30} />,
            color: "#22c55e",
            colorRgb: "34, 197, 94",
            isLive: true
        },
        {
            target: presence?.totalVisits || 1,
            suffix: "+",
            value: `${presence?.totalVisits || 1}+`,
            label: "Total Website Visits",
            desc: "Lifetime learners and visitors who have explored Tech Karma Classes.",
            icon: <Users size={30} />,
            color: "#3b82f6",
            colorRgb: "59, 130, 246"
        },
        {
            target: 2000,
            suffix: "+",
            value: "2000+",
            label: "Notes Delivered",
            desc: "Curated NCERT solutions, chapter revision notes, and exam blueprints.",
            icon: <FileText size={30} />,
            color: "#10b981",
            colorRgb: "16, 185, 129"
        },
        {
            target: 95,
            suffix: "%",
            value: "95%",
            label: "Success Rate",
            desc: "Consistent top rankers in CBSE board examinations and STEM olympiads.",
            icon: <TrendingUp size={30} />,
            color: "#f59e0b",
            colorRgb: "245, 158, 11"
        },
        {
            target: 5,
            suffix: "+",
            value: "5+",
            label: "Years of Excellence",
            desc: "Pioneering academic mentoring and modern tech education since 2021.",
            icon: <Award size={30} />,
            color: "#ec4899",
            colorRgb: "236, 72, 153"
        }
    ];

    // Data for Why Choose Tech Karma Classes Section
    const whyChooseData = [
        {
            title: "Expert Mentorship",
            desc: "Learn from top subject-matter mentors dedicated to building deep understanding and exam confidence.",
            icon: <GraduationCap size={28} />,
            color: "#3b82f6"
        },
        {
            title: "Structured NCERT Materials",
            desc: "Comprehensive chapter notes, question banks, formula cheat-sheets, and mock test papers.",
            icon: <BookOpen size={28} />,
            color: "#10b981"
        },
        {
            title: "Integrated Tech Skills",
            desc: "Seamlessly combining school academic curriculum with practical computer science, AI, and coding.",
            icon: <Code size={28} />,
            color: "#8b5cf6"
        },
        {
            title: "1-on-1 Doubt Support",
            desc: "Personalized doubt resolution and continuous performance feedback to ensure zero concept gaps.",
            icon: <ShieldCheck size={28} />,
            color: "#ec4899"
        }
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
        }, { threshold: 0.2 });

        observer.observe(statsSection);

        return () => observer.disconnect();
    }, [activeClass]);

    // Handler Functions
    const handleClassClick = (id) => {
        setActiveClass(id);
        setActiveMedium(null);
        setActiveStream(null);
        setActiveSubject(null);
        setActiveContent(null);
        if (id < 11) {
            setTimeout(() => document.getElementById('medium-selection-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
        } else {
            setTimeout(() => document.getElementById('dynamic-selection-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
        }
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
        if (streamId === 'science') {
            setActiveMedium('English');
            setActiveSubject(null);
            setActiveContent(null);
            setTimeout(() => document.getElementById('subject-selection-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
        } else {
            setActiveMedium(null);
            setActiveSubject(null);
            setActiveContent(null);
            setTimeout(() => document.getElementById('medium-selection-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
        }
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

                <div className="container" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
                    <div className="hero-layout" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)', gap: '4rem', alignItems: 'center' }}>
                        {/* Left Column: Text Content */}
                        <div className="hero-content animate-fade-in" style={{ textAlign: 'left' }}>
                            <div className="hero-badge animate-fade-in-up" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', padding: '0.6rem 1.2rem', borderRadius: '50px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', marginBottom: '1.5rem', backdropFilter: 'blur(10px)' }}>
                                <Rocket size={18} className="hero-badge-icon" style={{ color: 'var(--electric-blue)' }} />
                                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--electric-blue)', letterSpacing: '0.5px' }}>
                                    Transforming K-12 to Advanced Tech Education
                                </span>
                            </div>

                            <h1 className="hero-title" style={{ fontSize: '4.5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-1.5px' }}>
                                Code Your Future. <br />
                                <span className="gradient-text">Master Your Classes.</span>
                            </h1>

                            <div style={{ minHeight: '3.5rem', marginBottom: '2rem' }}>
                                <TypingHero fullText="From CBSE Board To Advanced Software Engineering" />
                            </div>

                            <p className="hero-desc" style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', lineHeight: 1.7, marginBottom: '3rem' }}>
                                High-performance learning tailored for the modern student. Interactive CBSE curriculum from Class 6 to 12 paired with hands-on Computer Science training.
                            </p>

                            <div className="hero-cta-group" style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                                <Link to="#class-selection" className="btn btn-primary" onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById('class-selection').scrollIntoView({ behavior: 'smooth' });
                                }}>
                                    Start Learning <ArrowRight size={18} />
                                </Link>
                                <Link to="#explore-cs" className="btn btn-secondary" onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById('explore-cs').scrollIntoView({ behavior: 'smooth' });
                                }}>
                                    Explore Courses
                                </Link>
                            </div>

                            {/* Real-time Live Social Proof Bar */}
                            <div className="hero-live-proof animate-fade-in" style={{
                                marginTop: '2.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1.1rem',
                                padding: '0.8rem 1.3rem',
                                borderRadius: '16px',
                                background: 'rgba(255, 255, 255, 0.04)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                backdropFilter: 'blur(12px)',
                                maxWidth: '530px'
                            }}>
                                {/* Student Avatar Stack */}
                                <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                                    {[
                                        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
                                        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
                                        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80'
                                    ].map((avatar, idx) => (
                                        <img
                                            key={idx}
                                            src={avatar}
                                            alt="Enrolled student"
                                            style={{
                                                width: '32px',
                                                height: '32px',
                                                borderRadius: '50%',
                                                border: '2px solid var(--bg-primary, #0f172a)',
                                                marginLeft: idx === 0 ? 0 : '-9px',
                                                objectFit: 'cover'
                                            }}
                                        />
                                    ))}
                                    <div style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                                        color: '#fff',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '0.72rem',
                                        fontWeight: 800,
                                        marginLeft: '-9px',
                                        border: '2px solid var(--bg-primary, #0f172a)'
                                    }}>
                                        +{presence?.totalVisits || 1}
                                    </div>
                                </div>

                                {/* Live Status Text */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                                        <span style={{ position: 'relative', display: 'inline-flex', width: '8px', height: '8px', alignItems: 'center', justifyContent: 'center' }}>
                                            <span className="live-dot-pulse" style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', background: '#22c55e', opacity: 0.85 }}></span>
                                            <span style={{ position: 'relative', width: '6px', height: '6px', borderRadius: '50%', background: '#16a34a' }}></span>
                                        </span>
                                        <span style={{ fontSize: '0.92rem', fontWeight: 700, color: '#22c55e' }}>
                                            {presence?.totalLiveCount || 1} Active Visitor{presence?.totalLiveCount > 1 ? 's' : ''} Online Right Now
                                        </span>
                                    </div>
                                    <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary, #94a3b8)', lineHeight: 1.3 }}>
                                        Total <strong>{presence?.totalVisits || 1}+</strong> recorded website visits • Live real-time tracking
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: 3D Illustration Graphic */}
                        <div className="hero-visual animate-fade-in" style={{ animationDelay: '0.2s', display: 'flex', justifyContent: 'center', position: 'relative' }}>
                            <div className="illustration-glow-bg" style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.25) 0%, rgba(139, 92, 246, 0.15) 50%, transparent 70%)',
                                filter: 'blur(50px)',
                                zIndex: 0
                            }}></div>
                            <img
                                src={heroIllustration}
                                alt="Tech Karma futuristic interactive education"
                                className="hero-main-img"
                                style={{
                                    width: '100%',
                                    maxWidth: '520px',
                                    height: 'auto',
                                    objectFit: 'contain',
                                    position: 'relative',
                                    zIndex: 1,
                                    filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.5))',
                                    animation: 'floating-animation 6s ease-in-out infinite'
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
                        <div className="class-cards-grid">
                            {allClasses.map((cls, index) => (
                                <ClassCard
                                    key={cls}
                                    cls={cls}
                                    index={index}
                                    onClick={() => handleClassClick(cls)}
                                />
                            ))}
                        </div>
                    ) : (
                        <button onClick={resetSelection} className="btn btn-secondary" style={{ marginBottom: '1rem' }}>
                            <ArrowLeft size={18} /> Back to Selection
                        </button>
                    )}
                </div>
            </section>

            {/* STATISTICS COUNTER SECTION */}
            {!activeClass && (
                <section id="stats-section" className="stats-section" style={{ padding: '6rem 0 3rem 0', position: 'relative', zIndex: 10 }}>
                    <div className="container" style={{ textAlign: 'center' }}>
                        <div className="section-title">
                            <SectionIcon icon={TrendingUp} colorHex="#10b981" align="center" />
                            <h2 style={{ fontSize: '3.5rem' }}>Our Proven Track Record</h2>
                        </div>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '700px', margin: '-1rem auto 4rem', lineHeight: 1.7 }} className="animate-fade-in">
                            Delivering measurable academic excellence and empowering learners across India.
                        </p>

                        <div className="section-grid">
                            {statsData.map((stat, idx) => (
                                <div
                                    key={idx}
                                    className="section-card animate-fade-in-up"
                                    style={{
                                        animationDelay: `${idx * 0.1}s`,
                                        textAlign: 'center',
                                        alignItems: 'center',
                                        background: 'var(--card-bg, rgba(15, 23, 42, 0.7))',
                                        border: '1px solid var(--card-border, rgba(255, 255, 255, 0.08))',
                                        boxShadow: 'var(--card-3d-shadow)',
                                        borderRadius: '20px',
                                        padding: '2.5rem 1.8rem',
                                        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                                        e.currentTarget.style.borderColor = stat.color;
                                        e.currentTarget.style.boxShadow = `0 20px 40px -10px rgba(0, 0, 0, 0.5), 0 0 25px ${stat.color}33`;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                        e.currentTarget.style.borderColor = 'var(--card-border, rgba(255, 255, 255, 0.08))';
                                        e.currentTarget.style.boxShadow = 'var(--card-3d-shadow)';
                                    }}
                                >
                                    <div
                                        className="animated-icon-container"
                                        style={{
                                            color: stat.color,
                                            background: `${stat.color}15`,
                                            borderColor: `${stat.color}30`,
                                            margin: '0 auto 1.5rem auto'
                                        }}
                                    >
                                        {stat.icon}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', margin: '0 0 0.5rem 0' }}>
                                        {stat.isLive && (
                                            <span style={{ position: 'relative', display: 'inline-flex', width: '12px', height: '12px', alignItems: 'center', justifyContent: 'center' }}>
                                                <span className="live-dot-pulse" style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', background: '#22c55e', opacity: 0.85 }}></span>
                                                <span style={{ position: 'relative', width: '8px', height: '8px', borderRadius: '50%', background: '#16a34a' }}></span>
                                            </span>
                                        )}
                                        <h3
                                            className="stat-counter"
                                            data-target={stat.target}
                                            data-suffix={stat.suffix}
                                            style={{
                                                fontSize: '3.2rem',
                                                fontWeight: 900,
                                                letterSpacing: '-1px',
                                                color: 'var(--text-primary)',
                                                margin: 0,
                                                fontFamily: "'Outfit', 'Inter', sans-serif"
                                            }}
                                        >
                                            {stat.value}
                                        </h3>
                                    </div>
                                    <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: stat.color, margin: '0 0 0.75rem 0' }}>
                                        {stat.label}
                                    </h4>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                                        {stat.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* WHY CHOOSE TECH KARMA CLASSES SECTION */}
            {!activeClass && (
                <section id="why-choose-section" className="why-choose-section" style={{ padding: '3rem 0 6rem 0', position: 'relative', zIndex: 10 }}>
                    <div className="container" style={{ textAlign: 'center' }}>
                        <div className="section-title">
                            <SectionIcon icon={Zap} colorHex="#8b5cf6" align="center" />
                            <h2 style={{ fontSize: '3.5rem' }}>Why Choose Tech Karma Classes?</h2>
                        </div>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '700px', margin: '-1rem auto 4rem', lineHeight: 1.7 }} className="animate-fade-in">
                            A next-generation learning platform designed to blend standard board curriculum with modern technical edge.
                        </p>

                        <div className="section-grid">
                            {whyChooseData.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="section-card animate-fade-in-up"
                                    style={{
                                        animationDelay: `${idx * 0.1}s`,
                                        textAlign: 'center',
                                        alignItems: 'center',
                                        background: 'var(--card-bg, rgba(15, 23, 42, 0.7))',
                                        border: '1px solid var(--card-border, rgba(255, 255, 255, 0.08))',
                                        boxShadow: 'var(--card-3d-shadow)',
                                        borderRadius: '20px',
                                        padding: '2.5rem 1.8rem',
                                        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                                        e.currentTarget.style.borderColor = item.color;
                                        e.currentTarget.style.boxShadow = `0 20px 40px -10px rgba(0, 0, 0, 0.5), 0 0 25px ${item.color}33`;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                        e.currentTarget.style.borderColor = 'var(--card-border, rgba(255, 255, 255, 0.08))';
                                        e.currentTarget.style.boxShadow = 'var(--card-3d-shadow)';
                                    }}
                                >
                                    <div
                                        className="animated-icon-container"
                                        style={{
                                            color: item.color,
                                            background: `${item.color}15`,
                                            borderColor: `${item.color}30`,
                                            margin: '0 auto 1.5rem auto'
                                        }}
                                    >
                                        {item.icon}
                                    </div>
                                    <h4 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.85rem' }}>
                                        {item.title}
                                    </h4>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

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

            {/* STEP 3 & 4: DYNAMIC FLOW */}
            {activeClass && (
                <section id="dynamic-selection-section" className="dynamic-selection-section">
                    <div className="container">
                        {/* 1. SELECT STREAM (Only for Class 11 and 12) */}
                        {activeClass >= 11 && (
                            <div className="glass-card animate-fade-in-up" style={{ marginBottom: '3rem', padding: '3rem', borderTop: '1px solid var(--electric-blue)' }}>
                                <h3 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'white', borderLeft: '4px solid var(--vivid-purple)', paddingLeft: '1.5rem' }}>1. Select Stream</h3>
                                <div className="stream-selection-grid">
                                    {classesData.senior.streams.map(stream => (
                                        <button
                                            key={stream.id}
                                            onClick={() => handleStreamClick(stream.id)}
                                            className={`btn ${activeStream === stream.id ? 'btn-primary' : 'btn-secondary'}`}
                                            style={{
                                                width: '100%',
                                                padding: '1.25rem 2rem',
                                                fontSize: '1.15rem',
                                                fontWeight: 700,
                                                textAlign: 'center',
                                                justifyContent: 'center',
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

                        {/* 2. SELECT MEDIUM (Bypassed for Class 11/12 Science) */}
                        {(activeClass < 11 || (activeStream && activeStream !== 'science')) && (
                            <div id="medium-selection-section" className="glass-card animate-fade-in-up" style={{ marginBottom: '3rem', padding: '3rem' }}>
                                <h3 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'white', borderLeft: '4px solid var(--electric-blue)', paddingLeft: '1.5rem' }}>
                                    {activeClass >= 11 ? '2. Select Medium' : '1. Select Medium'}
                                </h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
                                    {['English', 'Hindi'].map(medium => (
                                        <button
                                            key={medium}
                                            onClick={() => handleMediumClick(medium)}
                                            className={`btn ${activeMedium === medium ? 'btn-primary' : 'btn-secondary'}`}
                                            style={{ width: '100%', fontSize: '1.2rem', padding: '1.25rem', justifyContent: 'center' }}
                                        >
                                            {medium} Medium
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* 3. SELECT SUBJECT (Arranged in 3 Columns Per Row) */}
                        {activeMedium && (activeClass < 11 || activeStream) && (
                            <div id="subject-selection-section" className="glass-card animate-fade-in-up" style={{ marginBottom: '3rem', padding: '3rem', borderTop: '1px solid var(--electric-blue)' }}>
                                <h3 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'white', borderLeft: '4px solid var(--vivid-purple)', paddingLeft: '1.5rem' }}>
                                    {activeClass >= 11 ? (activeStream === 'science' ? '2. Select Subject' : '3. Select Subject') : '2. Select Subject'}
                                </h3>
                                <div className="subject-selection-grid">
                                    {Object.keys(activeClass >= 11 ? classesData[activeClass].mediums[activeMedium].streams[activeStream].subjects : classesData[activeClass].mediums[activeMedium].subjects).map(sub => {
                                        const subjectName = getSubjectName(sub, activeMedium);
                                        return (
                                            <button
                                                key={sub}
                                                onClick={() => handleSubjectClick(sub)}
                                                className={`btn ${activeSubject === sub ? 'btn-primary' : 'btn-secondary'}`}
                                                style={{
                                                    width: '100%',
                                                    padding: '1.15rem 1.75rem',
                                                    fontSize: '1.1rem',
                                                    fontWeight: 600,
                                                    textAlign: 'center',
                                                    justifyContent: 'center',
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

                        {/* 4. SELECT CONTENT TYPE (Arranged in 4 Columns Per Row) */}
                        {activeSubject && (
                            <div id="content-selection-section" className="glass-card animate-fade-in-up" style={{ marginBottom: '3rem', padding: '3rem' }}>
                                <h3 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'white', borderLeft: '4px solid var(--electric-blue)', paddingLeft: '1.5rem' }}>
                                    {activeClass >= 11 ? (activeStream === 'science' ? '3. Select Content Type' : '4. Select Content Type') : '3. Select Content Type'}
                                </h3>
                                <div className="content-types-grid">
                                    {classesData.tabs.map(tab => (
                                        <button
                                            key={tab.id}
                                            className={`tab-btn ${activeContent === tab.id ? 'active' : ''}`}
                                            onClick={() => handleContentClick(tab.id)}
                                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', padding: '1rem 1.5rem', width: '100%' }}
                                        >
                                            {getIcon(tab.icon)} {tab.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* 5. FINAL CONTENT VIEW (FLAT, UN-NESTED CONTAINER ON MAIN SECTION) */}
                        {activeSubject && activeContent && (
                            <div id="results-section" className="animate-fade-in-up" style={{ marginTop: '2.5rem', width: '100%' }}>
                                {/* Main Content Section Header */}
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: '2.5rem',
                                    flexWrap: 'wrap',
                                    gap: '1rem',
                                    paddingBottom: '1.25rem',
                                    borderBottom: '1px solid var(--glass-border)'
                                }}>
                                    <div>
                                        <div style={{ color: 'var(--primary-color)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '0.35rem' }}>
                                            Class {activeClass} • {activeMedium} Medium {activeClass >= 11 ? `• ${classesData.senior.streams.find(s => s.id === activeStream)?.label || ''}` : ''}
                                        </div>
                                        <h3 style={{ fontSize: '2.4rem', margin: 0, fontWeight: 800, color: 'white' }}>
                                            {getSubjectName(activeSubject, activeMedium)} — {classesData.tabs.find(t => t.id === activeContent)?.label}
                                        </h3>
                                    </div>
                                    <span style={{
                                        background: activeContent === 'ncert-books' ? 'rgba(59, 130, 246, 0.12)' : 'rgba(99, 102, 241, 0.12)',
                                        color: activeContent === 'ncert-books' ? 'var(--electric-blue)' : 'var(--primary-color)',
                                        padding: '0.6rem 1.4rem',
                                        borderRadius: '50px',
                                        fontSize: '0.9rem',
                                        fontWeight: 700,
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        border: '1px solid rgba(255, 255, 255, 0.12)',
                                        backdropFilter: 'blur(10px)'
                                    }}>
                                        {activeContent === 'ncert-books' ? <ShieldCheck size={18} /> : <CheckSquare size={18} />}
                                        {activeContent === 'ncert-books' ? 'Official NCERT Source' : 'CBSE 2026 Updated'}
                                    </span>
                                </div>

                                {activeContent === 'ncert-books' ? (
                                    <div>
                                        {/* NCERT Header Banner */}
                                        <div style={{
                                            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(99, 102, 241, 0.08))',
                                            border: '1px solid rgba(99, 102, 241, 0.25)',
                                            borderRadius: '16px',
                                            padding: '1.5rem',
                                            marginBottom: '2rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            flexWrap: 'wrap',
                                            gap: '1rem'
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <div style={{
                                                    width: '46px',
                                                    height: '46px',
                                                    borderRadius: '12px',
                                                    background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: '#ffffff',
                                                    fontWeight: 800,
                                                    fontSize: '0.95rem'
                                                }}>
                                                    NCERT
                                                </div>
                                                <div>
                                                    <h4 style={{ margin: 0, fontSize: '1.15rem', color: '#ffffff', fontWeight: 700 }}>
                                                        Official NCERT Digital Textbooks
                                                    </h4>
                                                    <p style={{ margin: '0.2rem 0 0', color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                                                        Class {activeClass} • {activeMedium} Medium • {getSubjectName(activeSubject, activeMedium)}
                                                    </p>
                                                </div>
                                            </div>
                                            <a
                                                href="https://ncert.nic.in/textbook.php"
                                                target="_blank"
                                                rel="noreferrer"
                                                style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '0.4rem',
                                                    color: 'var(--electric-blue)',
                                                    fontSize: '0.9rem',
                                                    fontWeight: 600,
                                                    textDecoration: 'none'
                                                }}
                                            >
                                                Official NCERT Portal <ExternalLink size={15} />
                                            </a>
                                        </div>

                                        {/* Chapter Cards Grid (Responsive 3 per row) */}
                                        {(() => {
                                            const ncertChapters = getNcertChapters({ classNum: activeClass, subject: activeSubject, medium: activeMedium, stream: activeStream });
                                            if (ncertChapters.length === 0) {
                                                return (
                                                    <div style={{ padding: '4rem 2rem', textAlign: 'center', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px dashed var(--glass-border)' }}>
                                                        <BookOpen size={48} style={{ margin: '0 auto 1rem', opacity: 0.3 }} />
                                                        <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#ffffff' }}>NCERT book currently unavailable. Please check again later.</h4>
                                                        <p style={{ fontSize: '0.95rem' }}>Official NCERT digital editions for this subject are being updated according to latest CBSE guidelines.</p>
                                                    </div>
                                                );
                                            }

                                            return (
                                                <div className="resource-cards-grid">
                                                    {ncertChapters.map((ch, idx) => {
                                                        const isAvailable = ch.status === 'active';
                                                        return (
                                                            <div
                                                                key={idx}
                                                                className="resource-card animate-fade-in-up"
                                                            >
                                                                <div>
                                                                    <div className="resource-card-header">
                                                                        <div className="resource-card-icon">
                                                                            <BookOpen size={20} />
                                                                        </div>
                                                                        <span style={{
                                                                            fontSize: '0.75rem',
                                                                            fontWeight: 700,
                                                                            color: 'var(--electric-blue)',
                                                                            textTransform: 'uppercase',
                                                                            background: 'rgba(59, 130, 246, 0.1)',
                                                                            padding: '0.2rem 0.6rem',
                                                                            borderRadius: '12px'
                                                                        }}>
                                                                            {ch.partTitle ? (ch.partTitle + ' • ') : ''}{activeMedium === 'Hindi' ? 'अध्याय' : 'Chapter'} {ch.chapterInPart || ch.chapterNumber}
                                                                        </span>
                                                                    </div>
                                                                    <h4 className="resource-card-title">
                                                                        {ch.title}
                                                                    </h4>
                                                                </div>

                                                                 <div className="resource-card-actions">
                                                                    {isAvailable ? (
                                                                        <>
                                                                            <button
                                                                                onClick={() => handleOpenPdf(
                                                                                    ch.pdfUrl,
                                                                                    `${ch.partTitle ? ch.partTitle + ' - ' : ''}${activeMedium === 'Hindi' ? 'अध्याय' : 'Chapter'} ${ch.chapterInPart || ch.chapterNumber}: ${ch.title}`,
                                                                                    `Class ${activeClass} • ${activeSubject} • NCERT Textbook (${activeMedium})`,
                                                                                    'NCERT Book',
                                                                                    `Class${activeClass}_${(activeSubject || '').replace(/\s+/g, '_')}_Ch${ch.chapterNumber}_NCERT.pdf`
                                                                                )}
                                                                                className="btn btn-primary"
                                                                            >
                                                                                <FileText size={16} /> Read PDF
                                                                            </button>
                                                                            <a
                                                                                href={ch.pdfUrl}
                                                                                download={`Class${activeClass}_${(activeSubject || '').replace(/\s+/g, '_')}_Ch${ch.chapterNumber}_NCERT.pdf`}
                                                                                target="_blank"
                                                                                rel="noreferrer"
                                                                                className="btn btn-secondary"
                                                                                title="Download PDF directly"
                                                                                style={{ padding: '0.45rem 0.75rem', fontSize: '0.82rem' }}
                                                                            >
                                                                                <Download size={14} /> Download
                                                                            </a>
                                                                        </>
                                                                    ) : (
                                                                        <button
                                                                            disabled
                                                                            className="btn btn-secondary"
                                                                            style={{ opacity: 0.6, cursor: 'not-allowed' }}
                                                                        >
                                                                            NCERT book currently unavailable.
                                                                        </button>
                                                                    )}

                                                                    {isAvailable && ch.portalUrl && (
                                                                        <a
                                                                            href={ch.portalUrl}
                                                                            target="_blank"
                                                                            rel="noreferrer"
                                                                            className="btn btn-secondary"
                                                                            style={{ fontSize: '0.82rem', padding: '0.5rem 0.8rem' }}
                                                                        >
                                                                            Official Portal Chapter <ExternalLink size={12} />
                                                                        </a>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            );
                                        })()}
                                    </div>
                                ) : ['mcqs', 'online-test', 'ncert-solution', 'subjective', 'sample-paper', 'pyq', 'video-lecture'].includes(activeContent) ? (
                                    <EducationalContentContainer
                                        activeClass={activeClass}
                                        activeMedium={activeMedium}
                                        activeSubject={activeSubject}
                                        activeStream={activeStream}
                                        activeContent={activeContent}
                                        chapters={(activeClass >= 11 ? classesData[activeClass]?.mediums?.[activeMedium]?.streams?.[activeStream]?.subjects?.[activeSubject]?.[activeContent] : classesData[activeClass]?.mediums?.[activeMedium]?.subjects?.[activeSubject]?.[activeContent] || []).map((ch, idx) => getChapterName(activeClass, activeSubject, ch, idx, activeMedium))}
                                    />
                                ) : (
                                    <div className="resource-cards-grid">
                                    {(activeClass >= 11 ? classesData[activeClass]?.mediums?.[activeMedium]?.streams?.[activeStream]?.subjects?.[activeSubject]?.[activeContent] : classesData[activeClass]?.mediums?.[activeMedium]?.subjects?.[activeSubject]?.[activeContent] || []).map((chapter, idx) => {
                                        const translatedChapter = getChapterName(activeClass, activeSubject, chapter, idx, activeMedium);

                                        const pdfFilename = activeContent === 'notes' ? `class${activeClass}-${activeMedium.toLowerCase()}-${activeSubject === 'Social Studies (SST)' ? 'socialstudies' : activeSubject.toLowerCase().replace(/[^a-z0-9]/gi, '')}-ch${idx + 1}.pdf` : `class${activeClass}-${activeMedium.toLowerCase()}-${activeSubject === 'Social Studies (SST)' ? 'socialstudies' : activeSubject.toLowerCase().replace(/[^a-z0-9]/gi, '')}-${activeContent}-ch${idx + 1}.pdf`;
                                        const pdfExists = pdfManifest.includes(pdfFilename);

                                        return (
                                            <div
                                                key={idx}
                                                className="resource-card animate-fade-in-up"
                                            >
                                                <div>
                                                    <div className="resource-card-header">
                                                        <div className="resource-card-icon">
                                                            {getIcon(classesData.tabs.find(t => t.id === activeContent)?.icon)}
                                                        </div>
                                                        <span style={{
                                                            fontSize: '0.75rem',
                                                            fontWeight: 700,
                                                            color: 'var(--electric-blue)',
                                                            textTransform: 'uppercase',
                                                            background: 'rgba(59, 130, 246, 0.1)',
                                                            padding: '0.2rem 0.6rem',
                                                            borderRadius: '12px'
                                                        }}>
                                                            {activeMedium === 'Hindi' ? 'अध्याय' : 'Chapter'} {idx + 1}
                                                        </span>
                                                    </div>
                                                    <h4 className="resource-card-title">{translatedChapter}</h4>
                                                </div>

                                                <div className="resource-card-actions">
                                                    {['notes', 'ncert-solution', 'mcqs', 'books'].includes(activeContent) && (() => {
                                                        const targetPdfUrl = pdfExists
                                                            ? `https://huggingface.co/datasets/SonuTechKarma/techkarma-pdfs/resolve/main/pdfs/${pdfFilename}`
                                                            : (activeContent === 'books' && getDirectNcertChapterPdf(activeClass, activeSubject, activeMedium, idx + 1, activeStream))
                                                                ? getDirectNcertChapterPdf(activeClass, activeSubject, activeMedium, idx + 1, activeStream)
                                                                : null;
                                                        const contentTabLabel = classesData.tabs.find(t => t.id === activeContent)?.label || 'PDF';
                                                        const cleanDownloadName = `Class${activeClass}_${(activeSubject || '').replace(/\s+/g, '_')}_Ch${idx + 1}_${activeContent}.pdf`;

                                                        if (!targetPdfUrl) {
                                                            return (
                                                                <button
                                                                    disabled
                                                                    className="btn btn-secondary"
                                                                    style={{ opacity: 0.5, cursor: 'not-allowed' }}
                                                                >
                                                                    Unavailable
                                                                </button>
                                                            );
                                                        }

                                                        return (
                                                            <>
                                                                <button
                                                                    onClick={() => handleOpenPdf(
                                                                        targetPdfUrl,
                                                                        translatedChapter,
                                                                        `Class ${activeClass} • ${activeSubject} • ${contentTabLabel} (${activeMedium})`,
                                                                        contentTabLabel,
                                                                        cleanDownloadName
                                                                    )}
                                                                    className="btn btn-primary"
                                                                >
                                                                    <FileText size={16} /> View PDF <ArrowRight size={15} />
                                                                </button>
                                                                <a
                                                                    href={targetPdfUrl}
                                                                    download={cleanDownloadName}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                    className="btn btn-secondary"
                                                                    title="Download PDF directly"
                                                                    style={{ padding: '0.45rem 0.75rem', fontSize: '0.82rem' }}
                                                                >
                                                                    <Download size={14} /> Download
                                                                </a>
                                                            </>
                                                        );
                                                    })()}
                                                </div>
                                            </div>
                                        );
                                    })}
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
                                    <h3 style={{ fontSize: '2rem', color: 'white', marginBottom: '2rem', textAlign: 'left', borderLeft: `4px solid ${catColor}`, paddingLeft: '1rem' }}>
                                        {category.title}
                                    </h3>
                                    <div className="cs-grid">
                                        {category.courses.map((course, cIdx) => (
                                            <div
                                                key={cIdx}
                                                className="cs-card animate-fade-in-up"
                                                style={{
                                                    animationDelay: `${(idx * 0.08) + (cIdx * 0.06)}s`,
                                                    position: 'relative',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    background: 'var(--card-bg, rgba(15, 23, 42, 0.75))',
                                                    backdropFilter: 'blur(16px)',
                                                    WebkitBackdropFilter: 'blur(16px)',
                                                    border: '1px solid var(--card-border, rgba(255, 255, 255, 0.08))',
                                                    borderRadius: '20px',
                                                    padding: '2rem 1.6rem',
                                                    boxShadow: 'var(--card-3d-shadow)',
                                                    transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                                                    textAlign: 'left'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                                                    e.currentTarget.style.borderColor = course.color || catColor;
                                                    e.currentTarget.style.boxShadow = `0 20px 40px -10px rgba(0, 0, 0, 0.5), 0 0 25px ${(course.color || catColor)}33`;

                                                    const btn = e.currentTarget.querySelector('.cs-explore-btn');
                                                    if (btn) {
                                                        btn.style.background = course.color || catColor;
                                                        btn.style.color = '#ffffff';
                                                        btn.style.boxShadow = `0 6px 18px ${(course.color || catColor)}45`;
                                                    }
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                                    e.currentTarget.style.borderColor = 'var(--card-border, rgba(255, 255, 255, 0.08))';
                                                    e.currentTarget.style.boxShadow = 'var(--card-3d-shadow)';

                                                    const btn = e.currentTarget.querySelector('.cs-explore-btn');
                                                    if (btn) {
                                                        btn.style.background = 'rgba(255, 255, 255, 0.05)';
                                                        btn.style.color = 'var(--text-primary)';
                                                        btn.style.boxShadow = 'none';
                                                    }
                                                }}
                                            >
                                                {/* Card Top Row: Icon & Tag Pill */}
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                                                    <div
                                                        className="animated-icon-container"
                                                        style={{
                                                            width: '46px',
                                                            height: '46px',
                                                            borderRadius: '12px',
                                                            background: `${course.color || catColor}18`,
                                                            borderColor: `${course.color || catColor}35`,
                                                            color: course.color || catColor,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            margin: 0
                                                        }}
                                                    >
                                                        {course.icon}
                                                    </div>
                                                    {course.tag && (
                                                        <span style={{
                                                            fontSize: '0.72rem',
                                                            fontWeight: 700,
                                                            textTransform: 'uppercase',
                                                            letterSpacing: '0.06em',
                                                            color: course.color || catColor,
                                                            background: `${course.color || catColor}12`,
                                                            border: `1px solid ${course.color || catColor}28`,
                                                            padding: '4px 10px',
                                                            borderRadius: '999px'
                                                        }}>
                                                            {course.tag}
                                                        </span>
                                                    )}
                                                </div>

                                                <h4 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem', letterSpacing: '-0.3px' }}>
                                                    {course.name}
                                                </h4>
                                                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.8rem', lineHeight: 1.6, flex: 1, fontSize: '0.92rem' }}>
                                                    {course.desc}
                                                </p>

                                                <div style={{ display: 'flex', gap: '0.6rem', marginTop: 'auto', width: '100%', flexWrap: 'wrap' }}>
                                                    <Link
                                                        to={category.title.includes("Core Programming") ? "/programming" : (category.title.includes("Core Computer Science") ? "/core-computer" : "/courses")}
                                                        className="cs-explore-btn"
                                                        style={{
                                                            flex: 1,
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            gap: '0.4rem',
                                                            padding: '0.8rem 1rem',
                                                            borderRadius: '12px',
                                                            background: 'rgba(255, 255, 255, 0.05)',
                                                            border: `1px solid ${course.color || catColor}40`,
                                                            color: 'var(--text-primary)',
                                                            fontWeight: 700,
                                                            fontSize: '0.88rem',
                                                            textDecoration: 'none',
                                                            whiteSpace: 'nowrap',
                                                            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                                                        }}
                                                    >
                                                        <span>Explore</span>
                                                        <ArrowRight size={15} />
                                                    </Link>
                                                    {course.pdfUrl && (
                                                        <button
                                                            onClick={() => handleOpenPdf(
                                                                course.pdfUrl,
                                                                `${course.name} - Complete Notes`,
                                                                `${course.tag || 'Programming'} • Tech Karma Comprehensive Guide`,
                                                                'Notes PDF',
                                                                `${course.name.replace(/\s+/g, '_')}_Complete_Notes.pdf`
                                                            )}
                                                            style={{
                                                                flex: 1,
                                                                display: 'inline-flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                gap: '0.4rem',
                                                                padding: '0.8rem 1rem',
                                                                borderRadius: '12px',
                                                                background: `${course.color || catColor}22`,
                                                                border: `1px solid ${course.color || catColor}60`,
                                                                color: course.color || catColor,
                                                                fontWeight: 700,
                                                                fontSize: '0.88rem',
                                                                cursor: 'pointer',
                                                                whiteSpace: 'nowrap',
                                                                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                                                            }}
                                                        >
                                                            <FileText size={15} />
                                                            <span>View Notes</span>
                                                        </button>
                                                    )}
                                                </div>
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

export default Home;


