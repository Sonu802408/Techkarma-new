import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X, GraduationCap, ChevronDown, User as UserIcon, LogOut, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';

const Navbar = ({ theme, setTheme }) => {
    const { user, isLoggedIn, isAdmin, logout, presence } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [isClassDropdownOpen, setIsClassDropdownOpen] = useState(false);
    const [isProgrammingDropdownOpen, setIsProgrammingDropdownOpen] = useState(false);
    const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);

    const location = useLocation();
    const classDropdownRef = useRef(null);
    const programmingDropdownRef = useRef(null);
    const moreDropdownRef = useRef(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        // When opening menu, reset dropdowns
        setIsClassDropdownOpen(false);
        setIsProgrammingDropdownOpen(false);
        setIsMoreDropdownOpen(false);
    };

    const closeMenu = () => {
        setIsOpen(false);
        setIsClassDropdownOpen(false);
        setIsProgrammingDropdownOpen(false);
        setIsMoreDropdownOpen(false);
    };

    const [scrolled, setScrolled] = useState(false);
    const [logoTilt, setLogoTilt] = useState({ rotateX: 0, rotateY: 0, isHovered: false });

    const handleLogoMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotX = ((centerY - y) / centerY) * 24;
        const rotY = ((x - centerX) / centerX) * 24;
        setLogoTilt({ rotateX: rotX, rotateY: rotY, isHovered: true });
    };

    const handleLogoMouseLeave = () => {
        setLogoTilt({ rotateX: 0, rotateY: 0, isHovered: false });
    };

    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setScrolled(window.scrollY > 50);
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });

        const handleClickOutside = (event) => {
            if (classDropdownRef.current && !classDropdownRef.current.contains(event.target)) {
                setIsClassDropdownOpen(false);
            }
            if (programmingDropdownRef.current && !programmingDropdownRef.current.contains(event.target)) {
                setIsProgrammingDropdownOpen(false);
            }
            if (moreDropdownRef.current && !moreDropdownRef.current.contains(event.target)) {
                setIsMoreDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const moreItems = [
        { name: 'Admission', path: '/admission', desc: 'New batch enrollments & eligibility' },
        { name: 'Core Computer', path: '/core-computer', desc: 'OS, DBMS, CN & Compiler Design' },
        { name: 'Advanced Tech', path: '/advanced-tech', desc: 'AI, ML, Cloud & Cyber Security' },
        { name: 'Online Exam', path: '/exam', desc: 'Practice mock tests & quizzes' },
        { name: 'Courses', path: '/courses', desc: 'Complete batch curriculum & fees' },
        { name: 'Contact Us', path: '/contact', desc: 'Reach our faculty & center' }
    ];

    const programmingLanguages = [
        { name: 'Python', path: '/programming', tag: 'AI & Data' },
        { name: 'C Language', path: '/programming', tag: 'Foundation' },
        { name: 'C++', path: '/programming', tag: 'DSA' },
        { name: 'Java', path: '/programming', tag: 'Enterprise' },
        { name: 'HTML & CSS', path: '/programming', tag: 'Web Basics' },
        { name: 'JavaScript', path: '/programming', tag: 'Full Stack' }
    ];

    // Helper functions to handle mutually exclusive dropdowns
    const toggleClassDropdown = (e) => {
        e.preventDefault();
        setIsClassDropdownOpen(!isClassDropdownOpen);
        setIsProgrammingDropdownOpen(false);
        setIsMoreDropdownOpen(false);
    };

    const toggleProgrammingDropdown = (e) => {
        e.preventDefault();
        setIsProgrammingDropdownOpen(!isProgrammingDropdownOpen);
        setIsClassDropdownOpen(false);
        setIsMoreDropdownOpen(false);
    };

    const toggleMoreDropdown = (e) => {
        e.preventDefault();
        setIsMoreDropdownOpen(!isMoreDropdownOpen);
        setIsClassDropdownOpen(false);
        setIsProgrammingDropdownOpen(false);
    };

    return (
        <nav
            className={`navbar ${scrolled ? 'scrolled' : ''}`}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                padding: scrolled ? '10px 0' : '14px 0',
                background: scrolled ? 'rgba(5, 10, 24, 0.88)' : 'rgba(5, 10, 24, 0.65)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderBottom: '1px solid rgba(56, 189, 248, 0.12)',
                boxShadow: scrolled ? '0 10px 30px -10px rgba(0, 0, 0, 0.7)' : 'none',
                transition: 'all 0.3s ease'
            }}
        >
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: '1440px', margin: '0 auto', padding: '0 1.25rem' }}>

                {/* Logo */}
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', zIndex: 1001, textDecoration: 'none', flexShrink: 0 }} onClick={closeMenu}>
                    <div
                        className="logo-3d-stage"
                        onMouseMove={handleLogoMouseMove}
                        onMouseEnter={() => setLogoTilt(prev => ({ ...prev, isHovered: true }))}
                        onMouseLeave={handleLogoMouseLeave}
                        style={{
                            height: '52px',
                            width: '52px',
                            perspective: '1000px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            cursor: 'pointer'
                        }}
                    >
                        <div
                            className={`logo-3d-card ${logoTilt.isHovered ? 'hovered' : 'floating'}`}
                            style={{
                                width: '100%',
                                height: '100%',
                                transformStyle: 'preserve-3d',
                                transform: logoTilt.isHovered
                                    ? `perspective(800px) rotateX(${logoTilt.rotateX}deg) rotateY(${logoTilt.rotateY}deg) scale3d(1.18, 1.18, 1.18) translateZ(28px)`
                                    : undefined,
                                transition: logoTilt.isHovered ? 'transform 0.08s ease-out' : 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)'
                            }}
                        >
                            <img
                                src={logo}
                                alt="Tech Karma Classes"
                                className="logo-3d-img"
                                style={{
                                    height: '100%',
                                    width: '100%',
                                    objectFit: 'contain',
                                    filter: logoTilt.isHovered
                                        ? 'drop-shadow(0 16px 28px rgba(56, 189, 248, 0.9)) drop-shadow(0 0 35px rgba(14, 165, 233, 0.7))'
                                        : 'drop-shadow(0 8px 16px rgba(56, 189, 248, 0.65)) drop-shadow(0 0 16px rgba(14, 165, 233, 0.4))',
                                    transition: 'filter 0.3s ease'
                                }}
                            />
                        </div>
                    </div>
                    <span className="navbar-brand-name" style={{
                        fontSize: 'clamp(1.1rem, 1.6vw, 1.5rem)',
                        fontWeight: '800',
                        letterSpacing: '-0.3px',
                        background: 'linear-gradient(90deg, #38bdf8 0%, #818cf8 50%, #c084fc 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        whiteSpace: 'nowrap'
                    }}>
                        Tech Karma Classes
                    </span>
                </Link>

                {/* Desktop Clean Main Links */}
                <div
                    style={{
                        display: 'none',
                        gap: '0.65rem',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 1,
                        padding: '0 1rem',
                        margin: '0 1rem'
                    }}
                    className="desktop-nav-menu"
                >
                    {/* 1. Home */}
                    <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
                        Home
                    </Link>

                    {/* 2. Classes Dropdown */}
                    <div style={{ position: 'relative' }} ref={classDropdownRef}>
                        <button
                            className={`nav-link ${location.pathname.includes('/classes') ? 'active' : ''}`}
                            onClick={toggleClassDropdown}
                            style={{ border: 'none', background: 'transparent', outline: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}
                        >
                            Classes
                            <ChevronDown size={15} style={{ transform: isClassDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s ease' }} />
                        </button>

                        <div style={{
                            position: 'absolute',
                            top: 'calc(100% + 10px)',
                            left: '50%',
                            transform: isClassDropdownOpen ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(-10px)',
                            minWidth: '220px',
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '0.6rem',
                            background: 'rgba(10, 17, 40, 0.96)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            border: '1px solid rgba(56, 189, 248, 0.25)',
                            borderRadius: '16px',
                            boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.7), 0 0 25px rgba(56, 189, 248, 0.15)',
                            opacity: isClassDropdownOpen ? 1 : 0,
                            visibility: isClassDropdownOpen ? 'visible' : 'hidden',
                            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                            zIndex: 1000
                        }}>
                            <div style={{ padding: '0.4rem 0.6rem 0.6rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '0.4rem' }}>
                                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                    CBSE & Board Classes
                                </span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.3rem' }}>
                                {[6, 7, 8, 9, 10, 11, 12].map(num => (
                                    <Link
                                        key={num}
                                        to={`/classes/${num}`}
                                        onClick={() => setIsClassDropdownOpen(false)}
                                        className="dropdown-item"
                                        style={{
                                            padding: '0.55rem 0.75rem',
                                            fontSize: '0.88rem',
                                            borderRadius: '10px',
                                            fontWeight: 600,
                                            color: 'var(--text-primary)',
                                            textDecoration: 'none',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            transition: 'all 0.2s ease',
                                            background: 'rgba(255, 255, 255, 0.03)'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = 'rgba(56, 189, 248, 0.12)';
                                            e.currentTarget.style.color = '#38bdf8';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                                            e.currentTarget.style.color = 'var(--text-primary)';
                                        }}
                                    >
                                        <span>Class {num}</span>
                                        {num >= 10 && (
                                            <span style={{ fontSize: '0.65rem', padding: '0.1rem 0.35rem', borderRadius: '6px', background: 'rgba(234, 179, 8, 0.2)', color: '#facc15' }}>Board</span>
                                        )}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 3. Notes (Prominent Free Study Material link) */}
                    <Link
                        to="/notes"
                        className={`nav-link ${location.pathname === '/notes' ? 'active' : ''}`}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                    >
                        <span>Notes</span>
                        <span style={{
                            fontSize: '0.68rem',
                            padding: '0.15rem 0.45rem',
                            borderRadius: '12px',
                            background: 'linear-gradient(135deg, #10b981, #059669)',
                            color: '#ffffff',
                            fontWeight: 800,
                            letterSpacing: '0.4px',
                            boxShadow: '0 0 10px rgba(16, 185, 129, 0.4)'
                        }}>
                            FREE
                        </span>
                    </Link>

                    {/* 4. Programming Dropdown */}
                    <div style={{ position: 'relative' }} ref={programmingDropdownRef}>
                        <button
                            className={`nav-link ${location.pathname.includes('/programming') ? 'active' : ''}`}
                            onClick={toggleProgrammingDropdown}
                            style={{ border: 'none', background: 'transparent', outline: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}
                        >
                            Programming
                            <ChevronDown size={15} style={{ transform: isProgrammingDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s ease' }} />
                        </button>

                        <div style={{
                            position: 'absolute',
                            top: 'calc(100% + 10px)',
                            left: '50%',
                            transform: isProgrammingDropdownOpen ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(-10px)',
                            minWidth: '240px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.25rem',
                            padding: '0.6rem',
                            background: 'rgba(10, 17, 40, 0.96)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            border: '1px solid rgba(56, 189, 248, 0.25)',
                            borderRadius: '16px',
                            boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.7), 0 0 25px rgba(56, 189, 248, 0.15)',
                            opacity: isProgrammingDropdownOpen ? 1 : 0,
                            visibility: isProgrammingDropdownOpen ? 'visible' : 'hidden',
                            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                            zIndex: 1000
                        }}>
                            <div style={{ padding: '0.4rem 0.6rem 0.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '0.2rem' }}>
                                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#a855f7', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                    Coding Bootcamps
                                </span>
                            </div>
                            {programmingLanguages.map(item => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    onClick={() => setIsProgrammingDropdownOpen(false)}
                                    style={{
                                        padding: '0.55rem 0.75rem',
                                        fontSize: '0.88rem',
                                        borderRadius: '10px',
                                        fontWeight: 600,
                                        color: 'var(--text-primary)',
                                        textDecoration: 'none',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        transition: 'all 0.2s ease',
                                        background: 'rgba(255, 255, 255, 0.02)'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'rgba(168, 85, 247, 0.12)';
                                        e.currentTarget.style.color = '#c084fc';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                                        e.currentTarget.style.color = 'var(--text-primary)';
                                    }}
                                >
                                    <span>{item.name}</span>
                                    <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>{item.tag}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* 5. More / Explore Dropdown */}
                    <div style={{ position: 'relative' }} ref={moreDropdownRef}>
                        <button
                            className="nav-link"
                            onClick={toggleMoreDropdown}
                            style={{ border: 'none', background: 'transparent', outline: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}
                        >
                            Explore
                            <ChevronDown size={15} style={{ transform: isMoreDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s ease' }} />
                        </button>

                        <div style={{
                            position: 'absolute',
                            top: 'calc(100% + 10px)',
                            right: 0,
                            transform: isMoreDropdownOpen ? 'translateY(0)' : 'translateY(-10px)',
                            minWidth: '260px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.3rem',
                            padding: '0.65rem',
                            background: 'rgba(10, 17, 40, 0.96)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            border: '1px solid rgba(56, 189, 248, 0.25)',
                            borderRadius: '16px',
                            boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.7), 0 0 25px rgba(56, 189, 248, 0.15)',
                            opacity: isMoreDropdownOpen ? 1 : 0,
                            visibility: isMoreDropdownOpen ? 'visible' : 'hidden',
                            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                            zIndex: 1000
                        }}>
                            <div style={{ padding: '0.4rem 0.6rem 0.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '0.2rem' }}>
                                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                    Institute & Programs
                                </span>
                            </div>
                            {moreItems.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    onClick={() => setIsMoreDropdownOpen(false)}
                                    style={{
                                        padding: '0.6rem 0.75rem',
                                        borderRadius: '10px',
                                        textDecoration: 'none',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '0.15rem',
                                        transition: 'all 0.2s ease',
                                        background: 'rgba(255, 255, 255, 0.02)'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'rgba(56, 189, 248, 0.1)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                                    }}
                                >
                                    <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                                        {item.name}
                                    </span>
                                    <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                                        {item.desc}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', zIndex: 1001, flexShrink: 0 }}>
                    
                    {/* Live Presence Pill */}
                    <div
                        className="live-presence-pill"
                        title={`${presence?.totalLiveCount || 1} Active Visitor(s) Online Right Now`}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            padding: '0.32rem 0.65rem',
                            borderRadius: '20px',
                            background: 'rgba(34, 197, 94, 0.1)',
                            border: '1px solid rgba(34, 197, 94, 0.3)',
                            color: '#22c55e',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            userSelect: 'none',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        <span style={{ position: 'relative', display: 'inline-flex', width: '7px', height: '7px', alignItems: 'center', justifyContent: 'center' }}>
                            <span className="live-dot-pulse" style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', background: '#22c55e', opacity: 0.8 }}></span>
                            <span style={{ position: 'relative', width: '5px', height: '5px', borderRadius: '50%', background: '#16a34a' }}></span>
                        </span>
                        <span>{presence?.totalLiveCount || 1} Live</span>
                    </div>

                    {/* Sleek Minimal Theme Selector */}
                    <select
                        className="dropdown-toggle"
                        value={theme}
                        onChange={(e) => setTheme(e.target.value)}
                        style={{
                            flexShrink: 0,
                            whiteSpace: 'nowrap',
                            maxWidth: '115px',
                            padding: '0.35rem 0.65rem',
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            borderRadius: '20px',
                            border: '1px solid rgba(148, 163, 184, 0.25)',
                            background: 'rgba(15, 23, 42, 0.7)',
                            color: 'var(--text-primary)',
                            outline: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        <option value="dark" className="dropdown-menu">Dark Cyber</option>
                        <option value="light" className="dropdown-menu">Light Mode</option>
                        <option value="midnight" className="dropdown-menu">Midnight Blue</option>
                        <option value="cyberpunk" className="dropdown-menu">Cyberpunk Neon</option>
                        <option value="charcoal" className="dropdown-menu">Charcoal Black</option>
                        <option value="sunset" className="dropdown-menu">Soft Sunset</option>
                        <option value="forest" className="dropdown-menu">Emerald Forest</option>
                        <option value="aurora" className="dropdown-menu">Arctic Aurora</option>
                        <option value="luxury-gold" className="dropdown-menu">Luxury Gold</option>
                    </select>

                    {/* Auth Status & Quick Actions */}
                    {isLoggedIn ? (
                        <div style={{ display: 'none', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }} className="desktop-nav-menu">
                            {isAdmin && (
                                <Link
                                    to="/admin"
                                    style={{
                                        padding: '0.38rem 0.8rem',
                                        fontSize: '0.8rem',
                                        fontWeight: 700,
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.35rem',
                                        borderRadius: '20px',
                                        textDecoration: 'none',
                                        whiteSpace: 'nowrap',
                                        background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.25), rgba(99, 102, 241, 0.3))',
                                        border: '1px solid rgba(56, 189, 248, 0.5)',
                                        color: '#38bdf8',
                                        boxShadow: '0 0 14px rgba(56, 189, 248, 0.25)'
                                    }}
                                >
                                    <Shield size={13} /> Admin
                                </Link>
                            )}

                            <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.35rem',
                                padding: '0.35rem 0.75rem',
                                background: 'rgba(99, 102, 241, 0.1)',
                                borderRadius: '20px',
                                border: '1px solid rgba(99, 102, 241, 0.25)',
                                flexShrink: 0
                            }}>
                                <UserIcon size={14} color="#818cf8" />
                                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', maxWidth: '95px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {user?.name?.split(' ')[0] || 'User'}
                                </span>
                            </div>

                            <button
                                onClick={logout}
                                title="Sign Out"
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'var(--text-secondary)',
                                    cursor: 'pointer',
                                    padding: '0.35rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    outline: 'none'
                                }}
                            >
                                <LogOut size={16} />
                            </button>
                        </div>
                    ) : (
                        <div style={{ display: 'none', alignItems: 'center', gap: '0.45rem', flexShrink: 0 }} className="desktop-nav-menu">
                            <Link
                                to="/login"
                                style={{
                                    padding: '0.38rem 0.85rem',
                                    fontSize: '0.82rem',
                                    fontWeight: 600,
                                    borderRadius: '20px',
                                    textDecoration: 'none',
                                    whiteSpace: 'nowrap',
                                    color: 'var(--text-primary)',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid rgba(255, 255, 255, 0.15)',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                Log In
                            </Link>
                            <Link
                                to="/login"
                                state={{ initialMode: 'signup' }}
                                style={{
                                    padding: '0.38rem 0.95rem',
                                    fontSize: '0.82rem',
                                    fontWeight: 700,
                                    borderRadius: '20px',
                                    textDecoration: 'none',
                                    whiteSpace: 'nowrap',
                                    background: 'linear-gradient(135deg, #0284c7, #2563eb)',
                                    color: '#ffffff',
                                    boxShadow: '0 0 15px rgba(37, 99, 235, 0.35)',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}

                    <button className="mobile-menu-btn" onClick={toggleMenu} style={{ background: 'transparent', color: 'var(--text-primary)', display: 'block', flexShrink: 0 }}>
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div
                style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100dvh',
                    background: 'var(--bg-primary)', zIndex: 1000,
                    display: isOpen ? 'flex' : 'none', flexDirection: 'column',
                    padding: '6rem 2rem 2rem', paddingTop: '80px', overflowY: 'auto'
                }}
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start', marginTop: '1rem', width: '100%', padding: '0 1rem' }}>
                    {/* Mobile Live Presence Banner */}
                    <div style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '12px',
                        background: 'rgba(34, 197, 94, 0.08)',
                        border: '1px solid rgba(34, 197, 94, 0.25)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        boxSizing: 'border-box'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ position: 'relative', display: 'inline-flex', width: '8px', height: '8px', alignItems: 'center', justifyContent: 'center' }}>
                                <span className="live-dot-pulse" style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', background: '#22c55e', opacity: 0.75 }}></span>
                                <span style={{ position: 'relative', width: '6px', height: '6px', borderRadius: '50%', background: '#16a34a' }}></span>
                            </span>
                            <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#22c55e' }}>
                                {presence?.totalLiveCount || 1} Active Online
                            </span>
                        </div>
                        <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                            {presence?.totalVisits ? `${presence.totalVisits} Visits` : 'Live'}
                        </span>
                    </div>

                    <Link to="/" onClick={closeMenu} style={{ fontSize: '1.25rem', fontWeight: 600, color: location.pathname === '/' ? '#38bdf8' : 'var(--text-primary)' }}>
                        Home
                    </Link>

                    {/* Mobile Notes Link */}
                    <Link to="/notes" onClick={closeMenu} style={{ fontSize: '1.25rem', fontWeight: 600, color: location.pathname === '/notes' ? '#38bdf8' : 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>Study Material & Notes</span>
                        <span style={{ fontSize: '0.68rem', padding: '0.15rem 0.45rem', borderRadius: '10px', background: 'linear-gradient(135deg, #10b981, #059669)', color: '#fff', fontWeight: 800 }}>FREE</span>
                    </Link>

                    {/* Mobile Class Dropdown */}
                    <div style={{ width: '100%' }}>
                        <button
                            onClick={() => setIsClassDropdownOpen(!isClassDropdownOpen)}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', fontSize: '1.25rem', fontWeight: 600, color: location.pathname.includes('/classes') ? '#38bdf8' : 'var(--text-primary)', background: 'transparent', border: 'none', padding: '0.5rem 0', outline: 'none' }}
                        >
                            <span>Classes</span>
                            <ChevronDown size={22} style={{ transform: isClassDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }} />
                        </button>
                        <div style={{
                            maxHeight: isClassDropdownOpen ? '600px' : '0',
                            overflow: 'hidden',
                            transition: 'all 0.3s ease-in-out',
                            display: 'flex', flexDirection: 'column', gap: '0.5rem',
                            paddingLeft: '1rem', opacity: isClassDropdownOpen ? 1 : 0
                        }}>
                            {[6, 7, 8, 9, 10, 11, 12].map(num => (
                                <Link
                                    key={num}
                                    to={`/classes/${num}`}
                                    onClick={closeMenu}
                                    style={{ padding: '0.4rem 0', fontSize: '1.05rem', color: 'var(--text-secondary)', textDecoration: 'none' }}
                                >
                                    Class {num}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Mobile Programming Dropdown */}
                    <div style={{ width: '100%' }}>
                        <button
                            onClick={() => setIsProgrammingDropdownOpen(!isProgrammingDropdownOpen)}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', fontSize: '1.25rem', fontWeight: 600, color: location.pathname.includes('/programming') ? '#38bdf8' : 'var(--text-primary)', background: 'transparent', border: 'none', padding: '0.5rem 0', outline: 'none' }}
                        >
                            <span>Programming</span>
                            <ChevronDown size={22} style={{ transform: isProgrammingDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }} />
                        </button>
                        <div style={{
                            maxHeight: isProgrammingDropdownOpen ? '400px' : '0',
                            overflow: 'hidden',
                            transition: 'all 0.3s ease-in-out',
                            display: 'flex', flexDirection: 'column', gap: '0.5rem',
                            paddingLeft: '1rem', opacity: isProgrammingDropdownOpen ? 1 : 0
                        }}>
                            {programmingLanguages.map(item => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    onClick={closeMenu}
                                    style={{ padding: '0.4rem 0', fontSize: '1.05rem', color: 'var(--text-secondary)', textDecoration: 'none' }}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {moreItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            onClick={closeMenu}
                            style={{ fontSize: '1.25rem', fontWeight: 600, color: location.pathname === item.path ? '#38bdf8' : 'var(--text-primary)', padding: '0.4rem 0', textDecoration: 'none' }}
                        >
                            {item.name}
                        </Link>
                    ))}

                    {/* Mobile Theme Selection */}
                    <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0' }}>
                        <span style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--text-primary)' }}>Theme</span>
                        <select
                            className="dropdown-toggle"
                            value={theme}
                            onChange={(e) => { setTheme(e.target.value); closeMenu(); }}
                        >
                            <option value="light" className="dropdown-menu">Light Mode</option>
                            <option value="dark" className="dropdown-menu">Dark Cyber</option>
                            <option value="midnight" className="dropdown-menu">Midnight Blue</option>
                            <option value="charcoal" className="dropdown-menu">Charcoal Black</option>
                            <option value="sunset" className="dropdown-menu">Soft Sunset</option>
                            <option value="cyberpunk" className="dropdown-menu">Cyberpunk Neon 3D</option>
                            <option value="forest" className="dropdown-menu">Emerald Forest 3D</option>
                            <option value="amber" className="dropdown-menu">Retro Amber 3D</option>
                            <option value="purple" className="dropdown-menu">Royal Purple 3D</option>
                            <option value="solarized" className="dropdown-menu">Solarized Light 3D</option>
                            <option value="crimson" className="dropdown-menu">Crimson Matrix 3D</option>
                            <option value="aurora" className="dropdown-menu">Arctic Aurora 3D</option>
                            <option value="luxury-gold" className="dropdown-menu">Luxury Gold 3D</option>
                            <option value="dracula" className="dropdown-menu">Dracula Vampire 3D</option>
                            <option value="holographic" className="dropdown-menu">Holographic Frost 3D</option>
                        </select>
                    </div>

                    {/* Mobile Auth Section */}
                    {isLoggedIn ? (
                        <div style={{ width: '100%', padding: '1rem', background: 'rgba(99, 102, 241, 0.08)', borderRadius: 'var(--border-radius)', display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '0.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <UserIcon size={20} color="var(--primary-color)" />
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)' }}>{user?.name}</div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{user?.role === 'admin' ? 'Administrator' : 'Student Account'}</div>
                                </div>
                            </div>
                            {isAdmin && (
                                <Link to="/admin" onClick={closeMenu} className="btn btn-secondary" style={{ width: '100%', padding: '0.6rem', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                                    <Shield size={16} /> Open Admin Dashboard
                                </Link>
                            )}
                            <button onClick={() => { logout(); closeMenu(); }} className="btn btn-secondary" style={{ width: '100%', padding: '0.6rem', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                                <LogOut size={16} /> Sign Out
                            </button>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem', width: '100%' }}>
                            <Link to="/login" onClick={closeMenu} className="btn btn-secondary" style={{ width: '100%', padding: '0.75rem', textAlign: 'center' }}>
                                Log In (Existing Account)
                            </Link>
                            <Link to="/login" state={{ initialMode: 'signup' }} onClick={closeMenu} className="btn btn-primary" style={{ width: '100%', padding: '0.75rem', textAlign: 'center', background: 'linear-gradient(135deg, #2563eb, #3b82f6)' }}>
                                Sign Up (New Student)
                            </Link>
                        </div>
                    )}

                    <Link to="/contact" className="btn btn-primary" onClick={closeMenu} style={{ marginTop: '1rem', width: '100%', padding: '1rem' }}>
                        Enroll Now
                    </Link>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        @media (min-width: 1024px) {
          .mobile-menu-btn { display: none !important; }
          .desktop-nav-menu { display: flex !important; }
        }
        .dropdown-item:hover {
           background: rgba(99, 102, 241, 0.1);
           color: var(--primary-color) !important;
        }
        .logo-3d-stage {
          --logo-height: 110px;
          user-select: none;
        }
        @media (max-width: 1024px) {
          .logo-3d-stage { --logo-height: 85px; }
        }
        @media (max-width: 768px) {
          .logo-3d-stage { --logo-height: 65px; }
        }

        @keyframes logo3dFloat {
          0% {
            transform: perspective(900px) rotateX(6deg) rotateY(-8deg) translateY(0px) translateZ(0px);
          }
          33% {
            transform: perspective(900px) rotateX(-5deg) rotateY(7deg) translateY(-8px) translateZ(16px);
          }
          66% {
            transform: perspective(900px) rotateX(5deg) rotateY(6deg) translateY(-4px) translateZ(8px);
          }
          100% {
            transform: perspective(900px) rotateX(6deg) rotateY(-8deg) translateY(0px) translateZ(0px);
          }
        }

        .logo-3d-card.floating {
          animation: logo3dFloat 5.5s ease-in-out infinite;
        }
      `}} />
        </nav>
    );
};

export default Navbar;
