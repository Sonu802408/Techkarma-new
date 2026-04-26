import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X, GraduationCap, ChevronDown } from 'lucide-react';

import logo from '../assets/logo.png';

const Navbar = ({ theme, setTheme }) => {
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
        { name: 'Notes', path: '/notes' },
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
        { name: 'Java', path: '/programming' }
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
                        className="logo-img"
                        style={{
                            height: 'var(--logo-height, 110px)',
                            width: 'var(--logo-height, 110px)',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'transparent',
                            flexShrink: 0
                        }}
                    >
                        <img
                            src={logo}
                            alt="Tech Karma Classes"
                            style={{
                                height: '100%',
                                width: '100%',
                                objectFit: 'cover',
                                transform: 'scale(1.25)', // Scales up the logo graphic to push white borders out of the circular frame
                                transition: 'all 0.3s ease'
                            }}
                        />
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', zIndex: 1001 }}>
                    <select
                        className="dropdown-toggle"
                        value={theme}
                        onChange={(e) => setTheme(e.target.value)}
                    >
                        <option value="light" className="dropdown-menu">Light Mode</option>
                        <option value="dark" className="dropdown-menu">Dark Mode</option>
                        <option value="midnight" className="dropdown-menu">Midnight Blue</option>
                        <option value="charcoal" className="dropdown-menu">Charcoal Black</option>
                        <option value="sunset" className="dropdown-menu">Soft Sunset</option>
                    </select>

                    <button className="mobile-menu-btn" onClick={toggleMenu} style={{ background: 'transparent', color: 'var(--text-primary)', display: 'block' }}>
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
                            <option value="dark" className="dropdown-menu">Dark Mode</option>
                            <option value="midnight" className="dropdown-menu">Midnight Blue</option>
                            <option value="charcoal" className="dropdown-menu">Charcoal Black</option>
                            <option value="sunset" className="dropdown-menu">Soft Sunset</option>
                        </select>
                    </div>

                    <Link to="/contact" className="btn btn-primary" onClick={closeMenu} style={{ marginTop: '1.5rem', width: '100%', padding: '1rem' }}>
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
        .logo-img { --logo-height: 110px; }
        @media (max-width: 1024px) {
          .logo-img { --logo-height: 85px; }
        }
        @media (max-width: 768px) {
          .logo-img { --logo-height: 65px; }
        }
      `}} />
        </nav>
    );
};

export default Navbar;
