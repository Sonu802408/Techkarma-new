import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import logo from '../assets/logo.png';

const Footer = () => {
    return (
        <footer style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', paddingTop: '4rem', paddingBottom: '2rem', marginTop: 'auto' }}>
            <div className="container">
                <div className="grid grid-3" style={{ marginBottom: '3rem' }}>

                    {/* Brand Col */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', textDecoration: 'none' }}>
                            <img
                                src={logo}
                                alt="Tech Karma Classes"
                                style={{
                                    height: '56px',
                                    width: '56px',
                                    objectFit: 'contain',
                                    filter: 'drop-shadow(0 0 10px rgba(56, 189, 248, 0.55))',
                                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'perspective(400px) rotateY(-20deg) rotateX(12deg) scale(1.2) translateZ(10px)';
                                    e.currentTarget.style.filter = 'drop-shadow(0 0 20px rgba(56, 189, 248, 0.95)) drop-shadow(0 0 35px rgba(14, 165, 233, 0.6))';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'none';
                                    e.currentTarget.style.filter = 'drop-shadow(0 0 10px rgba(56, 189, 248, 0.55))';
                                }}
                            />
                            <span style={{ fontWeight: 800, fontSize: '1.5rem', letterSpacing: '-0.5px' }} className="gradient-text">
                                Tech Karma
                            </span>
                        </Link>
                        <p style={{ color: 'var(--text-secondary)', maxWidth: '300px' }}>
                            Premium national-level coaching institute providing the best education in academics, programming, and advanced technologies.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <a href="#" style={{ color: 'var(--text-secondary)', background: 'var(--bg-primary)', padding: '0.5rem', borderRadius: '50%', display: 'flex' }}><Facebook size={20} /></a>
                            <a href="#" style={{ color: 'var(--text-secondary)', background: 'var(--bg-primary)', padding: '0.5rem', borderRadius: '50%', display: 'flex' }}><Twitter size={20} /></a>
                            <a href="#" style={{ color: 'var(--text-secondary)', background: 'var(--bg-primary)', padding: '0.5rem', borderRadius: '50%', display: 'flex' }}><Instagram size={20} /></a>
                            <a href="#" style={{ color: 'var(--text-secondary)', background: 'var(--bg-primary)', padding: '0.5rem', borderRadius: '50%', display: 'flex' }}><Linkedin size={20} /></a>
                        </div>
                    </div>

                    {/* Quick Links Col */}
                    <div>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Quick Links</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            <Link to="/classes" style={{ color: 'var(--text-secondary)' }}>Academic Classes (5-12)</Link>
                            <Link to="/programming" style={{ color: 'var(--text-secondary)' }}>Programming Languages</Link>
                            <Link to="/core-computer" style={{ color: 'var(--text-secondary)' }}>Core Computer Subjects</Link>
                            <Link to="/advanced-tech" style={{ color: 'var(--text-secondary)' }}>Advanced Technologies</Link>
                            <Link to="/courses" style={{ color: 'var(--text-secondary)' }}>Summer Courses</Link>
                            <Link to="/admission" style={{ color: 'var(--text-secondary)' }}>Admission Open</Link>
                        </div>
                    </div>

                    {/* Contact Col */}
                    <div>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Contact Us</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-secondary)' }}>
                                <Phone size={20} style={{ color: 'var(--primary-color)' }} />
                                <span>+91 8130550381</span>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-secondary)' }}>
                                <Mail size={20} style={{ color: 'var(--primary-color)' }} />
                                <span>sonuk802408@gmail.com</span>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-secondary)' }}>
                                <MapPin size={24} style={{ color: 'var(--primary-color)', flexShrink: 0 }} />
                                <span>Near by MCED school chilla village mayur vihar ph-1 new Delhi 110091</span>
                            </div>
                        </div>
                    </div>

                </div>

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '2rem', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <p>&copy; {new Date().getFullYear()} Tech Karma Classes. All rights reserved.</p>
                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                        <Link to="/privacy">Privacy Policy</Link>
                        <Link to="/terms">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
