import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Monitor, Award, ArrowRight } from 'lucide-react';

const Hero = () => {
    return (
        <section className="section" style={{ position: 'relative', overflow: 'hidden' }}>
            {/* Background Soft Gradients */}
            <div style={{
                position: 'absolute', top: '-10%', left: '-10%', width: '400px', height: '400px',
                background: 'var(--brand-light)', borderRadius: '50%', filter: 'blur(80px)', zIndex: -1
            }}></div>
            <div style={{
                position: 'absolute', bottom: '-10%', right: '-10%', width: '300px', height: '300px',
                background: 'rgba(245, 158, 11, 0.15)', borderRadius: '50%', filter: 'blur(80px)', zIndex: -1
            }}></div>

            <div className="container animate-fade-in-up" style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto', paddingTop: '2rem' }}>
                <h1 style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem' }}>
                    Welcome to <span className="gradient-text">Tech Karma Classes</span>
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '700px', margin: '0 auto 3rem auto' }}>
                    Premium CBSE Education meets Future-Ready Technology. Master academics, coding, and advanced technologies all in one unified, scalable platform.
                </p>

                <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link to="/classes" className="btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
                        Explore Subjects <ArrowRight size={20} />
                    </Link>
                    <Link to="/courses" className="btn-secondary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
                        Summer IT Courses
                    </Link>
                </div>
            </div>

            {/* Feature Highlights */}
            <div className="container animate-fade-in-up" style={{ marginTop: '5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', animationDelay: '0.2s' }}>
                <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <BookOpen color="#4f46e5" size={40} style={{ marginBottom: '1rem' }} />
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>CBSE Excellence</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Class 5-12 structured notes, NCERT solutions, and online mock tests.</p>
                </div>
                <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <Monitor color="#f59e0b" size={40} style={{ marginBottom: '1rem' }} />
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Modern Programming</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Master Python, Java, C++, and Web Development from fundamentals.</p>
                </div>
                <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <Award color="#10b981" size={40} style={{ marginBottom: '1rem' }} />
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Advanced Tech</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Jumpstart your career with AI, Data Science, and Cloud Computing basics.</p>
                </div>
            </div>
        </section>
    );
};

export default Hero;
