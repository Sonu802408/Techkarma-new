import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X, GraduationCap, ChevronDown, User as UserIcon, LogOut, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';

const Navbar = ({ theme, setTheme }) => {
    const { user, isLoggedIn, isAdmin, logout } = useAuth();
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

    const topItems = [
        { name: 'Admission', path: '/admission' },
        { name: 'Core Computer', path: '/core-computer' }
    ];

    const moreItems = [
        { name: 'Advanced Tech', path: '/advanced-tech' },
        { name: 'Exam', path: '/exam' },
        { name: 'Courses', path: '/courses' },
        { name: 'Contact', path: '/contact' }
    ];

    const programmingLanguages = [
        { name: 'Python', path: '/programming' },
        { name: 'C', path: '/programming' },
        { name: 'C++', path: '/programming' },
        { name: 'Java', path: '/programming' },
        { name: 'HTML', path: '/programming' },
        { name: 'CSS', path: '/programming' },
        { name: 'JavaScript', path: '/programming' }
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
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, padding: '15px 0', display: 'flex', alignItems: 'center' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>

                {/* Logo */}
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '15px', zIndex: 1001, paddingLeft: '20px', textDecoration: 'none' }} onClick={closeMenu}>
                    <div
                        className="logo-3d-stage"
                        onMouseMove={handleLogoMouseMove}
                        onMouseEnter={() => setLogoTilt(prev => ({ ...prev, isHovered: true }))}
                        onMouseLeave={handleLogoMouseLeave}
                        style={{
                            height: 'var(--logo-height, 110px)',
                            width: 'var(--logo-height, 110px)',
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
                        fontSize: 'clamp(1.2rem, 2vw, 1.8rem)',
                        fontWeight: '800',
                        background: 'linear-gradient(90deg, #3b82f6, #a855f7)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        whiteSpace: 'nowrap'
                    }}>
                        Tech Karma Classes
                    </span>
                </Link>






                {/* Desktop Links */}
                <div style={{ display: 'none', gap: '1.5rem', flexWrap: 'nowrap', justifyContent: 'center', alignItems: 'center', flex: 1, padding: '0 1.5rem' }} className="desktop-nav-menu">
                    <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} style={{ fontSize: '1rem' }}>
                        Home
                    </Link>

                    {/* Clickable Class Dropdown */}
                    <div style={{ position: 'relative' }} ref={classDropdownRef}>
                        <button
                            className={`nav-link ${location.pathname.includes('/classes') ? 'active' : ''}`}
                            onClick={toggleClassDropdown}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.9rem', background: 'transparent', padding: '0.5rem 0', outline: 'none' }}
                        >
                            Select Your Class
                            <ChevronDown size={16} style={{ transform: isClassDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }} />
                        </button>

                        <div className={`glass-card`} style={{
                            position: 'absolute', top: '100%', left: '50%', transform: isClassDropdownOpen ? 'translate(-50%, 10px)' : 'translate(-50%, 0)',
                            minWidth: '200px', display: 'flex', flexDirection: 'column', padding: '0.5rem',
                            opacity: isClassDropdownOpen ? 1 : 0, visibility: isClassDropdownOpen ? 'visible' : 'hidden',
                            transition: 'all 0.3s ease-in-out', zIndex: 100, borderRadius: 'var(--border-radius-sm)',
                            boxShadow: 'var(--card-shadow)'
                        }}>
                            {[6, 7, 8, 9, 10, 11, 12].map(num => (
                                <Link
                                    key={num}
                                    to="/classes"
                                    onClick={() => setIsClassDropdownOpen(false)}
                                    className="dropdown-item"
                                    style={{ padding: '0.8rem 1rem', fontSize: '0.95rem', borderRadius: 'var(--border-radius-sm)', transition: 'all var(--transition-fast)', fontWeight: 500, color: 'var(--text-primary)' }}
                                >
                                    Class {num}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Programming Dropdown */}
                    <div style={{ position: 'relative' }} ref={programmingDropdownRef}>
                        <button
                            className={`nav-link ${location.pathname.includes('/programming') ? 'active' : ''}`}
                            onClick={toggleProgrammingDropdown}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.9rem', background: 'transparent', padding: '0.5rem 0', outline: 'none' }}
                        >
                            Programming
                            <ChevronDown size={16} style={{ transform: isProgrammingDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }} />
                        </button>

                        <div className={`glass-card`} style={{
                            position: 'absolute', top: '100%', left: '50%', transform: isProgrammingDropdownOpen ? 'translate(-50%, 10px)' : 'translate(-50%, 0)',
                            minWidth: '200px', display: 'flex', flexDirection: 'column', padding: '0.5rem',
                            opacity: isProgrammingDropdownOpen ? 1 : 0, visibility: isProgrammingDropdownOpen ? 'visible' : 'hidden',
                            transition: 'all 0.3s ease-in-out', zIndex: 100, borderRadius: 'var(--border-radius-sm)',
                            boxShadow: 'var(--card-shadow)'
                        }}>
                            {programmingLanguages.map(item => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    onClick={() => setIsProgrammingDropdownOpen(false)}
                                    className="dropdown-item"
                                    style={{ padding: '0.8rem 1rem', fontSize: '0.95rem', borderRadius: 'var(--border-radius-sm)', transition: 'all var(--transition-fast)', fontWeight: 500, color: 'var(--text-primary)' }}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Standard Nav Items */}
                    {topItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                            style={{ fontSize: '0.9rem' }}
                        >
                            {item.name}
                        </Link>
                    ))}

                    {/* More Clickable Dropdown */}
                    <div style={{ position: 'relative' }} ref={moreDropdownRef}>
                        <button
                            className="nav-link"
                            onClick={toggleMoreDropdown}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.9rem', background: 'transparent', padding: '0.5rem 0', outline: 'none' }}
                        >
                            More
                            <ChevronDown size={16} style={{ transform: isMoreDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }} />
                        </button>
                        <div className="glass-card" style={{
                            position: 'absolute', top: '100%', right: 0, transform: isMoreDropdownOpen ? 'translateY(10px)' : 'translateY(0)',
                            minWidth: '200px', display: 'flex', flexDirection: 'column', padding: '0.5rem',
                            opacity: isMoreDropdownOpen ? 1 : 0, visibility: isMoreDropdownOpen ? 'visible' : 'hidden',
                            transition: 'all 0.3s ease-in-out', borderRadius: 'var(--border-radius-sm)', boxShadow: 'var(--card-shadow)'
                        }}>
                            {moreItems.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    onClick={() => setIsMoreDropdownOpen(false)}
                                    className="dropdown-item"
                                    style={{ padding: '0.8rem 1rem', fontSize: '0.95rem', borderRadius: 'var(--border-radius-sm)', transition: 'all var(--transition-fast)', fontWeight: 500, color: 'var(--text-primary)' }}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Actions (Desktop) */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', zIndex: 1001, flexShrink: 0, paddingRight: '20px' }}>
                    <select
                        className="dropdown-toggle"
                        value={theme}
                        onChange={(e) => setTheme(e.target.value)}
                        style={{
                            flexShrink: 0,
                            whiteSpace: 'nowrap',
                            maxWidth: '125px',
                            padding: '0.42rem 0.7rem',
                            fontSize: '0.82rem',
                            fontWeight: 600,
                            borderRadius: '20px',
                            cursor: 'pointer'
                        }}
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

                    {isLoggedIn ? (
                        <div style={{ display: 'none', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }} className="desktop-nav-menu">
                            {isAdmin && (
                                <Link
                                    to="/admin"
                                    className="btn-secondary"
                                    style={{ padding: '0.45rem 0.8rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.3rem', borderRadius: '20px', textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}
                                >
                                    <Shield size={14} /> Admin
                                </Link>
                            )}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.8rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '20px', border: '1px solid rgba(99, 102, 241, 0.2)', flexShrink: 0 }}>
                                <UserIcon size={15} color="var(--primary-color)" />
                                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', maxWidth: '110px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {user?.name?.split(' ')[0] || 'User'}
                                </span>
                            </div>
                            <button
                                onClick={logout}
                                title="Sign Out"
                                style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '0.4rem', display: 'flex', alignItems: 'center', flexShrink: 0 }}
                            >
                                <LogOut size={18} />
                            </button>
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="btn-secondary desktop-nav-menu"
                            style={{
                                padding: '0.45rem 1.15rem',
                                fontSize: '0.88rem',
                                fontWeight: 600,
                                borderRadius: '20px',
                                textDecoration: 'none',
                                whiteSpace: 'nowrap',
                                flexShrink: 0,
                                display: 'none',
                                alignItems: 'center',
                                justifyContent: 'center',
                                lineHeight: 1.2
                            }}
                        >
                            Sign In
                        </Link>
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

                    <Link to="/" onClick={closeMenu} style={{ fontSize: '1.4rem', fontWeight: 600, color: location.pathname === '/' ? 'var(--primary-color)' : 'var(--text-primary)' }}>
                        Home
                    </Link>

                    {/* Mobile Class Dropdown */}
                    <div style={{ width: '100%' }}>
                        <button
                            onClick={() => setIsClassDropdownOpen(!isClassDropdownOpen)}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', fontSize: '1.4rem', fontWeight: 600, color: location.pathname.includes('/classes') ? 'var(--primary-color)' : 'var(--text-primary)', background: 'transparent', padding: '0.5rem 0' }}
                        >
                            Select Your Class
                            <ChevronDown size={24} style={{ transform: isClassDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }} />
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
                                    to="/classes"
                                    onClick={closeMenu}
                                    style={{ padding: '0.5rem 0', fontSize: '1.1rem', color: 'var(--text-secondary)' }}
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
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', fontSize: '1.4rem', fontWeight: 600, color: location.pathname.includes('/programming') ? 'var(--primary-color)' : 'var(--text-primary)', background: 'transparent', padding: '0.5rem 0' }}
                        >
                            Programming
                            <ChevronDown size={24} style={{ transform: isProgrammingDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }} />
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
                                    style={{ padding: '0.5rem 0', fontSize: '1.1rem', color: 'var(--text-secondary)' }}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {[...topItems, ...moreItems].map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            onClick={closeMenu}
                            style={{ fontSize: '1.4rem', fontWeight: 600, color: location.pathname === item.path ? 'var(--primary-color)' : 'var(--text-primary)', padding: '0.5rem 0' }}
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
                        <Link to="/login" onClick={closeMenu} className="btn btn-secondary" style={{ width: '100%', padding: '0.8rem', textAlign: 'center', marginTop: '0.5rem' }}>
                            Student Sign In / Register
                        </Link>
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
