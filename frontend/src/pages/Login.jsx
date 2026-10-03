import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Mail, Phone, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [role, setRole] = useState('student');
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
        showInOnlineList: true
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        setLoading(true);

        try {
            const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
            const payload = isLogin
                ? { email: formData.email, password: formData.password }
                : {
                    name: formData.name,
                    phone: formData.phone,
                    email: formData.email,
                    password: formData.password,
                    role,
                    showInOnlineList: formData.showInOnlineList
                };

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Authentication failed');
            }

            login(data, data.token);
            setSuccessMessage(isLogin ? 'Login successful! Redirecting...' : 'Account created successfully! Redirecting...');

            setTimeout(() => {
                if (data.role === 'admin') {
                    navigate('/admin');
                } else {
                    navigate('/');
                }
            }, 800);

        } catch (err) {
            setError(err.message || 'Something went wrong. Please check your details.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
            <div className="card animate-fade-in-up" style={{ width: '100%', maxWidth: '480px', padding: '2.5rem 2rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ display: 'inline-block', marginBottom: '1rem' }}>
                        <img
                            src={logo}
                            alt="Tech Karma Classes"
                            style={{
                                width: '85px',
                                height: '85px',
                                objectFit: 'contain',
                                filter: 'drop-shadow(0 0 16px rgba(56, 189, 248, 0.65)) drop-shadow(0 0 5px rgba(14, 165, 233, 0.45))',
                                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                cursor: 'pointer'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'perspective(500px) rotateY(18deg) rotateX(-12deg) scale(1.2) translateZ(15px)';
                                e.currentTarget.style.filter = 'drop-shadow(0 8px 25px rgba(56, 189, 248, 0.95)) drop-shadow(0 0 40px rgba(14, 165, 233, 0.7))';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'none';
                                e.currentTarget.style.filter = 'drop-shadow(0 0 16px rgba(56, 189, 248, 0.65)) drop-shadow(0 0 5px rgba(14, 165, 233, 0.45))';
                            }}
                        />
                    </div>
                    <h2 className="gradient-text" style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                        {isLogin ? 'Welcome Back' : 'Join Tech Karma Classes'}
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                        {isLogin ? 'Sign in to access your student dashboard and courses' : 'Create your student account to access full study materials'}
                    </p>
                </div>

                {error && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.8rem 1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 'var(--border-radius)', color: '#ef4444', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                        <AlertCircle size={18} style={{ flexShrink: 0 }} />
                        <span>{error}</span>
                    </div>
                )}

                {successMessage && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.8rem 1rem', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)', borderRadius: 'var(--border-radius)', color: '#22c55e', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                        <ShieldCheck size={18} style={{ flexShrink: 0 }} />
                        <span>{successMessage}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                    {/* Role Selection Tracker */}
                    <div style={{ display: 'flex', background: 'var(--bg-primary)', padding: '0.25rem', borderRadius: 'var(--border-radius)', gap: '0.25rem' }}>
                        <button
                            type="button"
                            onClick={() => setRole('student')}
                            style={{ flex: 1, padding: '0.5rem', borderRadius: 'var(--border-radius)', background: role === 'student' ? 'var(--bg-secondary)' : 'transparent', boxShadow: role === 'student' ? 'var(--card-shadow)' : 'none', color: 'var(--text-primary)', fontWeight: 600, transition: 'var(--transition-fast)', border: 'none', cursor: 'pointer' }}
                        >
                            Student
                        </button>
                        <button
                            type="button"
                            onClick={() => setRole('admin')}
                            style={{ flex: 1, padding: '0.5rem', borderRadius: 'var(--border-radius)', background: role === 'admin' ? 'var(--bg-secondary)' : 'transparent', boxShadow: role === 'admin' ? 'var(--card-shadow)' : 'none', color: 'var(--text-primary)', fontWeight: 600, transition: 'var(--transition-fast)', border: 'none', cursor: 'pointer' }}
                        >
                            Admin
                        </button>
                    </div>

                    {!isLogin && (
                        <div style={{ position: 'relative' }}>
                            <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '0.85rem 1rem 0.85rem 2.8rem', borderRadius: 'var(--border-radius)', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontSize: '0.95rem', outline: 'none' }}
                            />
                        </div>
                    )}

                    {!isLogin && (
                        <div style={{ position: 'relative' }}>
                            <Phone size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone Number (10 digits)"
                                required
                                value={formData.phone}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '0.85rem 1rem 0.85rem 2.8rem', borderRadius: 'var(--border-radius)', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontSize: '0.95rem', outline: 'none' }}
                            />
                        </div>
                    )}

                    <div style={{ position: 'relative' }}>
                        <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                        <input
                            type="text"
                            name="email"
                            placeholder={isLogin ? "Email Address or Phone Number" : "Email Address"}
                            required
                            value={formData.email}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '0.85rem 1rem 0.85rem 2.8rem', borderRadius: 'var(--border-radius)', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontSize: '0.95rem', outline: 'none' }}
                        />
                    </div>

                    <div style={{ position: 'relative' }}>
                        <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '0.85rem 1rem 0.85rem 2.8rem', borderRadius: 'var(--border-radius)', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontSize: '0.95rem', outline: 'none' }}
                        />
                    </div>

                    {!isLogin && (
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', padding: '0.4rem 0.2rem' }}>
                            <input
                                type="checkbox"
                                id="showInOnlineList"
                                name="showInOnlineList"
                                checked={formData.showInOnlineList}
                                onChange={handleChange}
                                style={{ marginTop: '0.2rem', cursor: 'pointer', accentColor: 'var(--primary-color)' }}
                            />
                            <label htmlFor="showInOnlineList" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', cursor: 'pointer', lineHeight: 1.4 }}>
                                Show my name in the live online students list (Your phone number and email will <strong style={{ color: 'var(--text-primary)' }}>never</strong> be shared publicly).
                            </label>
                        </div>
                    )}

                    <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', padding: '0.9rem', marginTop: '0.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
                        {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')} <ArrowRight size={18} />
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setError('');
                            setSuccessMessage('');
                        }}
                        style={{ background: 'none', border: 'none', color: '#4f46e5', fontWeight: 600, cursor: 'pointer', padding: 0 }}
                    >
                        {isLogin ? 'Sign up' : 'Log in'}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Login;
