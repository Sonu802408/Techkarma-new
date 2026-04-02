import React, { useState } from 'react';
import { User, Lock, Mail, ArrowRight } from 'lucide-react';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [role, setRole] = useState('student');
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Connect to backend API later
        console.log('Submitting', { ...formData, role, isLogin });
    };

    return (
        <section className="section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="card animate-fade-in-up" style={{ width: '100%', maxWidth: '450px', padding: '3rem 2rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h2 className="gradient-text" style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                        {isLogin ? 'Welcome Back' : 'Join Tech Karma'}
                    </h2>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        {isLogin ? 'Log in to continue your learning journey' : 'Sign up to unlock premium courses'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    {/* Role Selection Tracker */}
                    <div style={{ display: 'flex', background: 'var(--bg-primary)', padding: '0.25rem', borderRadius: 'var(--border-radius)', gap: '0.25rem' }}>
                        <button
                            type="button"
                            onClick={() => setRole('student')}
                            style={{ flex: 1, padding: '0.5rem', borderRadius: 'var(--border-radius)', background: role === 'student' ? 'var(--bg-secondary)' : 'transparent', boxShadow: role === 'student' ? 'var(--card-shadow)' : 'none', color: 'var(--text-primary)', fontWeight: 600, transition: 'var(--transition-fast)' }}
                        >
                            Student
                        </button>
                        <button
                            type="button"
                            onClick={() => setRole('admin')}
                            style={{ flex: 1, padding: '0.5rem', borderRadius: 'var(--border-radius)', background: role === 'admin' ? 'var(--bg-secondary)' : 'transparent', boxShadow: role === 'admin' ? 'var(--card-shadow)' : 'none', color: 'var(--text-primary)', fontWeight: 600, transition: 'var(--transition-fast)' }}
                        >
                            Admin
                        </button>
                    </div>

                    {!isLogin && (
                        <div style={{ position: 'relative' }}>
                            <User size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: 'var(--border-radius)', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontSize: '1rem', outline: 'none' }}
                            />
                        </div>
                    )}

                    <div style={{ position: 'relative' }}>
                        <Mail size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: 'var(--border-radius)', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontSize: '1rem', outline: 'none' }}
                        />
                    </div>

                    <div style={{ position: 'relative' }}>
                        <Lock size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: 'var(--border-radius)', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontSize: '1rem', outline: 'none' }}
                        />
                    </div>

                    <button type="submit" className="btn-primary" style={{ width: '100%', padding: '1rem', marginTop: '0.5rem' }}>
                        {isLogin ? 'Sign In' : 'Create Account'} <ArrowRight size={20} />
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--text-secondary)' }}>
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button onClick={() => setIsLogin(!isLogin)} style={{ background: 'none', color: '#4f46e5', fontWeight: 600 }}>
                        {isLogin ? 'Sign up' : 'Log in'}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Login;
