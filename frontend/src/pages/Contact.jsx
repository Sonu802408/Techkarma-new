import React, { useState } from 'react';
import { Phone, Mail, MapPin, Download, MessageSquare } from 'lucide-react';

const Contact = () => {
    const [status, setStatus] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('Message sent successfully! We will contact you soon.');
        e.target.reset();
    };

    return (
        <div className="section container animate-fade-in-up">
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 className="gradient-text" style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}>Contact & Download</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>Get in touch with us or download our mobile app for learning on the go.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>

                {/* Contact Form Details */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <div style={{ padding: '1rem', background: 'rgba(79, 70, 229, 0.1)', borderRadius: '50%', color: '#4f46e5' }}>
                            <Phone size={28} />
                        </div>
                        <div>
                            <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.2rem' }}>Call / WhatsApp</h3>
                            <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>8130550381</p>
                        </div>
                    </div>

                    <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <div style={{ padding: '1rem', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '50%', color: '#f59e0b' }}>
                            <Mail size={28} />
                        </div>
                        <div>
                            <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.2rem' }}>Email Us</h3>
                            <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>sonuk802408@gmail.com</p>
                        </div>
                    </div>

                    <div className="card" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: 'white', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
                        <h3 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Download size={24} /> Download Our App</h3>
                        <p style={{ opacity: 0.9 }}>Get full access to mock tests and video courses anywhere, anytime.</p>
                        <button style={{ background: 'white', color: '#059669', padding: '0.8rem 1.5rem', borderRadius: 'var(--border-radius)', fontWeight: 700, marginTop: '1rem' }}>
                            Download APK (Beta)
                        </button>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="card">
                    <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>Send Us a Message</h2>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <input
                            type="text"
                            placeholder="Your Name"
                            required
                            style={{ padding: '1rem', borderRadius: 'var(--border-radius)', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none' }}
                        />
                        <input
                            type="tel"
                            placeholder="Your Phone Number"
                            required
                            style={{ padding: '1rem', borderRadius: 'var(--border-radius)', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none' }}
                        />
                        <textarea
                            placeholder="Your Message"
                            rows="5"
                            required
                            style={{ padding: '1rem', borderRadius: 'var(--border-radius)', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none', resize: 'vertical' }}
                        ></textarea>

                        {status && <p style={{ color: '#10b981', fontWeight: 500 }}>{status}</p>}

                        <button type="submit" className="btn-primary" style={{ padding: '1rem' }}>
                            Send Message
                        </button>
                        <a href="https://wa.me/918130550381" target="_blank" rel="noreferrer" className="btn-secondary" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', padding: '1rem', borderColor: '#25D366', color: '#25D366' }}>
                            <MessageSquare size={20} /> Chat on WhatsApp
                        </a>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default Contact;
