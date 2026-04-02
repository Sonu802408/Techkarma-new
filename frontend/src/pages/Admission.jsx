import React, { useState } from 'react';
import { Send, CheckCircle, GraduationCap } from 'lucide-react';

const Admission = () => {
    const [formData, setFormData] = useState({
        studentName: '',
        parentName: '',
        phone: '',
        email: '',
        grade: '',
        courseType: 'academic'
    });

    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Admission Data Submitted:", formData);
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ studentName: '', parentName: '', phone: '', email: '', grade: '', courseType: 'academic' });
        }, 5000);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="section container animate-fade-in-up">
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <div style={{ display: 'inline-block', padding: '0.8rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '50%', color: 'var(--primary-color)', marginBottom: '1rem' }}>
                    <GraduationCap size={40} />
                </div>
                <h1 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Admission Open 2026-27</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>Join the community of toppers. Fill out the application form below and our counselor will contact you shortly.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '4rem' }}>
                <div>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Why choose us?</h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
                        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                            <CheckCircle style={{ color: 'var(--success-color)', flexShrink: 0, marginTop: '4px' }} />
                            <div>
                                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Expert Faculty</h3>
                                <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Learn from industry experts, IITians, and gold medalists.</p>
                            </div>
                        </div>

                        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                            <CheckCircle style={{ color: 'var(--success-color)', flexShrink: 0, marginTop: '4px' }} />
                            <div>
                                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Personalized Attention</h3>
                                <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Small batch sizes for personalized 1-to-1 doubt clearing.</p>
                            </div>
                        </div>

                        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                            <CheckCircle style={{ color: 'var(--success-color)', flexShrink: 0, marginTop: '4px' }} />
                            <div>
                                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Modern Infrastructure</h3>
                                <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Smart classrooms with AC and high-speed internet.</p>
                            </div>
                        </div>
                    </div>

                    <div style={{ background: 'var(--primary-color)', color: 'white', padding: '2rem', borderRadius: 'var(--border-radius)' }}>
                        <h3 style={{ marginBottom: '0.5rem' }}>Need Help?</h3>
                        <p style={{ opacity: 0.9, marginBottom: '1rem' }}>Call us directly for admission queries.</p>
                        <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>+91 81305 50381</h2>
                    </div>
                </div>

                <div className="glass-card" style={{ padding: '2.5rem' }}>
                    <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>Registration Form</h2>

                    {submitted ? (
                        <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid var(--success-color)', padding: '2rem', borderRadius: 'var(--border-radius)', textAlign: 'center', color: 'var(--success-color)' }}>
                            <CheckCircle size={48} style={{ margin: '0 auto 1rem' }} />
                            <h3 style={{ marginBottom: '0.5rem' }}>Application Submitted!</h3>
                            <p style={{ color: 'var(--text-primary)' }}>Our counselor will reach out to you within 24 hours.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div className="grid grid-2" style={{ gap: '1.5rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Student Name</label>
                                    <input type="text" name="studentName" required value={formData.studentName} onChange={handleChange} placeholder="John Doe" />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Parent/Guardian Name</label>
                                    <input type="text" name="parentName" required value={formData.parentName} onChange={handleChange} placeholder="Mr. Doe" />
                                </div>
                            </div>

                            <div className="grid grid-2" style={{ gap: '1.5rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Mobile Number</label>
                                    <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="+91 00000 00000" />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Email Address</label>
                                    <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="john@example.com" />
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Course Interested In</label>
                                <select name="courseType" value={formData.courseType} onChange={handleChange}>
                                    <option value="academic">Academic Class (5-12)</option>
                                    <option value="programming">Programming Language</option>
                                    <option value="advanced">Advanced Technology (AI/ML)</option>
                                    <option value="summer">Summer Special Course</option>
                                </select>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Class / Grade</label>
                                <input type="text" name="grade" required value={formData.grade} onChange={handleChange} placeholder="E.g. Class 10 or College 1st Year" />
                            </div>

                            <button type="submit" className="btn-primary" style={{ padding: '1.2rem', marginTop: '1rem', width: '100%' }}>
                                Submit Application <Send size={20} />
                            </button>
                        </form>
                    )}
                </div>
            </div>
            <style dangerouslySetInnerHTML={{
                __html: `
        @media (max-width: 992px) {
           .container > div:nth-child(2) { grid-template-columns: 1fr; }
        }
      `}} />
        </div>
    );
};

export default Admission;
