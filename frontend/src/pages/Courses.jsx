import React from 'react';
import { MonitorPlay, Check, Star } from 'lucide-react';

const Courses = () => {
    const summerCourses = [
        {
            title: 'Digital Marketing Mastery', price: '₹4,999', original: '₹9,999', duration: '3 Months', popular: true, desc: 'SEO, Social Media, Google Ads, Content Marketing. Live project included.',
            features: ['Industry Certifications', 'Live Ad Campaigns', '100% Placement Assistance']
        },
        {
            title: 'Spoken English & Personality', price: '₹2,999', original: '₹5,999', duration: '2 Months', popular: false, desc: 'Fluency, Public Speaking, Interview Prep, GD & Vocabulary building.',
            features: ['Daily Speaking Practice', 'Mock Interviews', 'Grammar Fundamentals']
        },
        {
            title: 'Graphic & UI/UX Design', price: '₹5,499', original: '₹12,000', duration: '3 Months', popular: false, desc: 'Photoshop, Illustrator, Figma. Build a professional design portfolio.',
            features: ['Adobe Creative Suite', 'Figma Prototyping', 'Portfolio Creation']
        },
        {
            title: 'Coding Bootcamp for Kids', price: '₹3,499', original: '₹6,000', duration: '2 Months', popular: true, desc: 'Block coding, Python basics, web design for ages 10-15.',
            features: ['Game Development', 'HTML/CSS Basics', 'Logic Building Games']
        }
    ];

    const fullCourses = [
        { title: 'Full Stack Web Dev', price: '₹14,999', duration: '6 Months', desc: 'MERN Stack (MongoDB, Express, React, Node.js). Build real-world applications.' },
        { title: 'Complete Python + DS', price: '₹8,999', duration: '4 Months', desc: 'Python programming combined with Data Structures and Algorithms.' },
        { title: 'Data Science Bootcamp', price: '₹16,999', duration: '6 Months', desc: 'Python, Pandas, ML Algorithms, PowerBI. Become a skilled Data Scientist.' }
    ];

    return (
        <div className="section container animate-fade-in-up">
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Premium Courses & Pricing</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>Invest in your future. Choose from our highly curated courses with easy editing options for administrators.</p>
            </div>

            <h2 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>☀️ Special Summer Courses</h2>
            <div className="grid grid-2" style={{ marginBottom: '6rem' }}>
                {summerCourses.map((course, index) => (
                    <div key={index} className="glass-card" style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
                        {course.popular && (
                            <div style={{ position: 'absolute', top: '-15px', right: '2rem', background: 'linear-gradient(135deg, var(--warning-color), #d97706)', color: 'white', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem', boxShadow: '0 4px 10px rgba(245, 158, 11, 0.4)' }}>
                                <Star size={14} fill="currentColor" /> MOST POPULAR
                            </div>
                        )}

                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', paddingRight: course.popular ? '80px' : '0' }}>{course.title}</h3>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', minHeight: '48px' }}>{course.desc}</p>

                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '1.5rem' }}>
                            <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary-color)', lineHeight: 1 }}>{course.price}</span>
                            <span style={{ textDecoration: 'line-through', color: 'var(--text-secondary)', fontSize: '1.1rem' }}>{course.original}</span>
                        </div>

                        <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: 'var(--border-radius-sm)', flex: 1, marginBottom: '2rem' }}>
                            <p style={{ fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>Course Includes:</p>
                            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                                    <MonitorPlay size={18} color="var(--primary-color)" /> {course.duration} Duration
                                </li>
                                {course.features.map((feat, i) => (
                                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                                        <Check size={18} color="var(--success-color)" /> {feat}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <button className={course.popular ? "btn btn-primary" : "btn btn-secondary"} style={{ width: '100%', padding: '1rem' }}>
                            Enroll Now
                        </button>
                    </div>
                ))}
            </div>

            <h2 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>🚀 Professional Tech Bootcamps</h2>
            <div className="grid grid-3">
                {fullCourses.map((course, index) => (
                    <div key={index} className="glass-card" style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', padding: '2.5rem 2rem' }}>
                        <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>{course.title}</h3>
                        <div style={{ padding: '0.5rem 1rem', background: 'var(--bg-secondary)', borderRadius: '50px', display: 'inline-block', margin: '0 auto 1.5rem', fontSize: '0.9rem', fontWeight: 600 }}>
                            ⏱️ {course.duration}
                        </div>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', flex: 1 }}>{course.desc}</p>
                        <h4 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1.5rem' }}>{course.price}</h4>
                        <button className="btn btn-secondary" style={{ width: '100%' }}>View Details</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Courses;
