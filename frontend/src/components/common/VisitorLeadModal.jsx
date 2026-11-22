import React, { useState, useEffect } from 'react';
import { User, Phone, Mail, BookOpen, Camera, CheckCircle, Sparkles, MessageSquare, Lock, KeyRound, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const VisitorLeadModal = () => {
    const { login } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [activeMode, setActiveMode] = useState('signup'); // 'signup' | 'login' | 'forgot'

    // Sign Up Fields
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [className, setClassName] = useState('Class 10');
    const [photo, setPhoto] = useState('');

    // Login Fields
    const [loginIdentifier, setLoginIdentifier] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    // Forgot Password Fields
    const [resetIdentifier, setResetIdentifier] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Status State
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [waLink, setWaLink] = useState('');

    useEffect(() => {
        // Compulsory check: Has the student logged in or registered?
        let hasValidProfile = false;
        try {
            const userStr = localStorage.getItem('techkarma_user');
            if (userStr) {
                const u = JSON.parse(userStr);
                if (u && (u._id || u.email)) {
                    hasValidProfile = true;
                }
            }
        } catch (e) {}

        if (!hasValidProfile) {
            try {
                const visitorInfo = localStorage.getItem('techkarma_visitor_info');
                if (visitorInfo) {
                    const parsed = JSON.parse(visitorInfo);
                    if (parsed.name && parsed.phone && parsed.email) {
                        hasValidProfile = true;
                    }
                }
            } catch (e) {}
        }

        if (!hasValidProfile) {
            setIsOpen(true);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                alert('Photo size should be under 2MB');
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhoto(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // 1. Handle New Student Registration / Sign Up
    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        const cleanName = name.trim();
        const cleanPhone = phone.trim();
        const cleanEmail = email.trim().toLowerCase();

        if (!cleanName || cleanName.length < 2) {
            setErrorMessage('Please enter your full name (at least 2 characters)');
            return;
        }

        if (!/^[0-9]{10}$/.test(cleanPhone)) {
            setErrorMessage('Please enter a valid 10-digit mobile number');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
            setErrorMessage('Please enter a valid email address');
            return;
        }

        if (!password || password.length < 6) {
            setErrorMessage('Please create a password of at least 6 characters');
            return;
        }

        setIsSubmitting(true);

        const waText = 
`🔔 *Tech Karma Classes - New Student Registration*
━━━━━━━━━━━━━━━━━━━━━━
👤 *Student Name:* ${cleanName}
📱 *Mobile Number:* ${cleanPhone}
📧 *Email Address:* ${cleanEmail}
🎓 *Target Class / Course:* ${className}
⏰ *Time:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
━━━━━━━━━━━━━━━━━━━━━━
Hello Sir, I have registered as a new student on the Tech Karma website. Please grant me full access to study materials for ${className}!`;

        const waUrl = `https://api.whatsapp.com/send?phone=918130550381&text=${encodeURIComponent(waText)}`;
        setWaLink(waUrl);

        try {
            // Save in localStorage immediately
            localStorage.setItem('techkarma_visitor_info', JSON.stringify({
                name: cleanName,
                phone: cleanPhone,
                email: cleanEmail,
                className,
                submittedAt: new Date().toISOString()
            }));

            // Register in backend
            let registeredUser = {
                _id: 'std_' + Date.now(),
                name: cleanName,
                phone: cleanPhone,
                email: cleanEmail,
                className,
                role: 'student'
            };

            try {
                const regRes = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: cleanName,
                        phone: cleanPhone,
                        email: cleanEmail,
                        password,
                        className,
                        role: 'student'
                    })
                });
                const regData = await regRes.json();
                if (regRes.ok && regData) {
                    registeredUser = regData;
                    login(regData, regData.token);
                } else {
                    // Fallback to query lead
                    fetch('/api/queries', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            name: cleanName,
                            phone: cleanPhone,
                            email: cleanEmail,
                            className,
                            photo,
                            message: `Student Sign Up: ${cleanName} (${cleanPhone}) - ${className}`
                        })
                    }).catch(() => {});
                    login(registeredUser, 'local_student_token');
                }
            } catch (apiErr) {
                login(registeredUser, 'local_student_token');
            }

            try {
                window.open(waUrl, '_blank');
            } catch (popupErr) {}

            setIsSuccess(true);
        } catch (err) {
            console.error(err);
            setIsSuccess(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    // 2. Handle Existing Student / Admin Login
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        const cleanIdent = loginIdentifier.trim();
        const cleanPass = loginPassword.trim();

        if (!cleanIdent || !loginPassword) {
            setErrorMessage('Please enter your Email/Mobile and Password');
            return;
        }

        setIsSubmitting(true);

        // Check Sonu Kumar Master Admin
        const cleanEmail = cleanIdent.toLowerCase();
        if ((cleanEmail === 'sonuk802408@gmail.com' || cleanEmail === '8130550381' || cleanEmail === 'sonuk802408@gmail,com') && (cleanPass === 'Sonu kumar81' || loginPassword === 'Sonu kumar81 ')) {
            const sonuAdmin = {
                _id: 'admin_sonu_kumar',
                name: 'Sonu Kumar (Admin)',
                email: 'sonuk802408@gmail.com',
                phone: '8130550381',
                role: 'admin',
                token: 'sonu_admin_master_token_2026'
            };
            login(sonuAdmin, 'sonu_admin_master_token_2026');
            setIsOpen(false);
            document.body.style.overflow = 'auto';
            setIsSubmitting(false);
            return;
        }

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: cleanIdent,
                    password: loginPassword
                })
            });
            const data = await res.json();

            if (!res.ok) {
                // Check if stored locally in visitor info
                const saved = localStorage.getItem('techkarma_visitor_info');
                if (saved) {
                    const parsed = JSON.parse(saved);
                    if (parsed.email === cleanIdent || parsed.phone === cleanIdent) {
                        login({ ...parsed, role: 'student' }, 'cached_token');
                        setIsOpen(false);
                        document.body.style.overflow = 'auto';
                        return;
                    }
                }
                throw new Error(data.message || 'Invalid email/phone or password');
            }

            login(data, data.token);
            setIsOpen(false);
            document.body.style.overflow = 'auto';
        } catch (err) {
            setErrorMessage(err.message || 'Login failed. Please check credentials or sign up.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // 3. Handle Forgot Password
    const handleResetPassword = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        if (!resetIdentifier.trim()) {
            setErrorMessage('Please enter your registered Email or Mobile Number');
            return;
        }

        if (newPassword.length < 6) {
            setErrorMessage('New password must be at least 6 characters');
            return;
        }

        if (newPassword !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }

        setIsSubmitting(true);
        try {
            const res = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    identifier: resetIdentifier.trim(),
                    newPassword
                })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Failed to reset password');

            setSuccessMessage(data.message || 'Password reset successfully! You can now log in.');
            setTimeout(() => {
                setActiveMode('login');
                setLoginIdentifier(resetIdentifier);
                setLoginPassword(newPassword);
                setSuccessMessage('');
            }, 1200);
        } catch (err) {
            setErrorMessage(err.message || 'Could not reset password. Please check your details.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(5, 10, 24, 0.90)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999999,
            padding: '1rem',
            animation: 'fadeIn 0.3s ease-out'
        }}>
            <div style={{
                background: 'linear-gradient(145deg, #0b1329 0%, #0f172a 100%)',
                border: '1px solid rgba(59, 130, 246, 0.45)',
                borderRadius: '22px',
                width: '100%',
                maxWidth: '470px',
                padding: '2rem',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 40px rgba(59, 130, 246, 0.3)',
                position: 'relative',
                color: '#ffffff',
                boxSizing: 'border-box',
                maxHeight: '92vh',
                overflowY: 'auto'
            }}>
                {isSuccess ? (
                    <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                        <div style={{
                            width: '68px',
                            height: '68px',
                            borderRadius: '50%',
                            background: 'rgba(16, 185, 129, 0.18)',
                            border: '2px solid rgba(16, 185, 129, 0.4)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1.25rem',
                            color: '#10b981'
                        }}>
                            <CheckCircle size={42} />
                        </div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 0.5rem', color: '#10b981' }}>
                            Welcome, {name.trim() || 'Student'}! 🎉
                        </h3>
                        <p style={{ color: '#94a3b8', fontSize: '0.94rem', margin: '0 0 1.5rem', lineHeight: 1.5 }}>
                            Aapka student account successfully create ho chuka hai! Ab aap Tech Karma Classes ke sabhi free notes aur materials access kar sakte hain.
                        </p>

                        <a
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.6rem',
                                width: '100%',
                                padding: '0.9rem 1.25rem',
                                borderRadius: '12px',
                                background: 'linear-gradient(135deg, #25D366, #128C7E)',
                                color: '#ffffff',
                                fontWeight: 700,
                                fontSize: '1rem',
                                textDecoration: 'none',
                                boxShadow: '0 4px 15px rgba(37, 211, 102, 0.4)',
                                marginBottom: '1.25rem',
                                boxSizing: 'border-box'
                            }}
                        >
                            <MessageSquare size={20} /> Connect with Admin on WhatsApp
                        </a>

                        <button
                            onClick={() => {
                                setIsOpen(false);
                                document.body.style.overflow = 'auto';
                            }}
                            style={{
                                width: '100%',
                                padding: '0.85rem 1.25rem',
                                borderRadius: '12px',
                                background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
                                border: 'none',
                                color: '#ffffff',
                                fontSize: '0.95rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                boxShadow: '0 4px 15px rgba(37, 99, 235, 0.35)'
                            }}
                        >
                            Unlock & Enter Website →
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Header Badge */}
                        <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
                            <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.4rem',
                                background: 'rgba(59, 130, 246, 0.15)',
                                border: '1px solid rgba(59, 130, 246, 0.3)',
                                color: '#38bdf8',
                                padding: '0.35rem 0.85rem',
                                borderRadius: '50px',
                                fontSize: '0.78rem',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                                marginBottom: '0.6rem'
                            }}>
                                <Sparkles size={14} /> Tech Karma Classes Portal
                            </div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 0.35rem', color: '#ffffff' }}>
                                {activeMode === 'signup' ? 'New Student Registration' : activeMode === 'login' ? 'Student & Admin Sign In' : 'Reset Password'}
                            </h3>
                            <p style={{ color: '#94a3b8', fontSize: '0.86rem', margin: 0 }}>
                                {activeMode === 'signup'
                                    ? 'Naye students apna account banayein to unlock study notes'
                                    : activeMode === 'login'
                                        ? 'Already registered student ya admin apna password daal kar login karein'
                                        : 'Apna registered email/mobile daal kar naya password set karein'}
                            </p>
                        </div>

                        {/* Top Mode Toggle Tabs: Sign Up vs Log In */}
                        {activeMode !== 'forgot' && (
                            <div style={{
                                display: 'flex',
                                background: 'rgba(255,255,255,0.06)',
                                padding: '0.3rem',
                                borderRadius: '12px',
                                gap: '0.3rem',
                                marginBottom: '1.25rem'
                            }}>
                                <button
                                    type="button"
                                    onClick={() => { setActiveMode('signup'); setErrorMessage(''); setSuccessMessage(''); }}
                                    style={{
                                        flex: 1,
                                        padding: '0.65rem 0.5rem',
                                        borderRadius: '10px',
                                        background: activeMode === 'signup' ? 'linear-gradient(135deg, #2563eb, #3b82f6)' : 'transparent',
                                        color: activeMode === 'signup' ? '#ffffff' : '#94a3b8',
                                        fontWeight: 700,
                                        fontSize: '0.88rem',
                                        border: 'none',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        boxShadow: activeMode === 'signup' ? '0 4px 12px rgba(37,99,235,0.3)' : 'none'
                                    }}
                                >
                                    📝 Sign Up (New Student)
                                </button>
                                <button
                                    type="button"
                                    onClick={() => { setActiveMode('login'); setErrorMessage(''); setSuccessMessage(''); }}
                                    style={{
                                        flex: 1,
                                        padding: '0.65rem 0.5rem',
                                        borderRadius: '10px',
                                        background: activeMode === 'login' ? 'linear-gradient(135deg, #2563eb, #3b82f6)' : 'transparent',
                                        color: activeMode === 'login' ? '#ffffff' : '#94a3b8',
                                        fontWeight: 700,
                                        fontSize: '0.88rem',
                                        border: 'none',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        boxShadow: activeMode === 'login' ? '0 4px 12px rgba(37,99,235,0.3)' : 'none'
                                    }}
                                >
                                    🔑 Log In (Already Registered)
                                </button>
                            </div>
                        )}

                        {errorMessage && (
                            <div style={{
                                background: 'rgba(239, 68, 68, 0.15)',
                                border: '1px solid rgba(239, 68, 68, 0.4)',
                                color: '#ef4444',
                                padding: '0.65rem 0.9rem',
                                borderRadius: '10px',
                                fontSize: '0.85rem',
                                marginBottom: '1rem',
                                textAlign: 'center'
                            }}>
                                {errorMessage}
                            </div>
                        )}

                        {successMessage && (
                            <div style={{
                                background: 'rgba(34, 197, 94, 0.15)',
                                border: '1px solid rgba(34, 197, 94, 0.4)',
                                color: '#22c55e',
                                padding: '0.65rem 0.9rem',
                                borderRadius: '10px',
                                fontSize: '0.85rem',
                                marginBottom: '1rem',
                                textAlign: 'center'
                            }}>
                                {successMessage}
                            </div>
                        )}

                        {/* MODE 1: NEW STUDENT SIGN UP (REGISTRATION) */}
                        {activeMode === 'signup' && (
                            <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                                {/* Photo Picker */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', background: 'rgba(255,255,255,0.03)', padding: '0.5rem 0.8rem', borderRadius: '12px', border: '1px dashed rgba(255,255,255,0.15)' }}>
                                    <div style={{
                                        width: '42px',
                                        height: '42px',
                                        borderRadius: '50%',
                                        background: '#1e293b',
                                        border: '2px solid #3b82f6',
                                        overflow: 'hidden',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0
                                    }}>
                                        {photo ? (
                                            <img src={photo} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        ) : (
                                            <Camera size={18} color="#94a3b8" />
                                        )}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#e2e8f0', cursor: 'pointer' }}>
                                            {photo ? 'Change Photo (Optional)' : 'Upload Student Photo (Optional)'}
                                            <input type="file" accept="image/*" onChange={handlePhotoChange} style={{ display: 'none' }} />
                                        </label>
                                        <span style={{ fontSize: '0.72rem', color: '#64748b' }}>JPG/PNG • Max 2MB</span>
                                    </div>
                                </div>

                                {/* Full Name */}
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.3rem', color: '#cbd5e1' }}>
                                        Student Full Name <span style={{ color: '#ef4444' }}>*</span>
                                    </label>
                                    <div style={{ position: 'relative' }}>
                                        <User size={17} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                                        <input
                                            type="text"
                                            required
                                            placeholder="e.g. Rahul Sharma"
                                            value={name}
                                            onChange={(e) => { setName(e.target.value); setErrorMessage(''); }}
                                            style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.6rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.18)', background: '#1e293b', color: '#ffffff', fontSize: '0.92rem', outline: 'none', boxSizing: 'border-box' }}
                                        />
                                    </div>
                                </div>

                                {/* Mobile */}
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.3rem', color: '#cbd5e1' }}>
                                        10-Digit Mobile / WhatsApp <span style={{ color: '#ef4444' }}>*</span>
                                    </label>
                                    <div style={{ position: 'relative' }}>
                                        <Phone size={17} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#25D366' }} />
                                        <input
                                            type="tel"
                                            required
                                            placeholder="e.g. 9876543210"
                                            maxLength="10"
                                            value={phone}
                                            onChange={(e) => { setPhone(e.target.value.replace(/\D/g, '')); setErrorMessage(''); }}
                                            style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.6rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.18)', background: '#1e293b', color: '#ffffff', fontSize: '0.92rem', outline: 'none', boxSizing: 'border-box' }}
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.3rem', color: '#cbd5e1' }}>
                                        Email Address <span style={{ color: '#ef4444' }}>*</span>
                                    </label>
                                    <div style={{ position: 'relative' }}>
                                        <Mail size={17} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#38bdf8' }} />
                                        <input
                                            type="email"
                                            required
                                            placeholder="e.g. rahul@gmail.com"
                                            value={email}
                                            onChange={(e) => { setEmail(e.target.value); setErrorMessage(''); }}
                                            style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.6rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.18)', background: '#1e293b', color: '#ffffff', fontSize: '0.92rem', outline: 'none', boxSizing: 'border-box' }}
                                        />
                                    </div>
                                </div>

                                {/* Password */}
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.3rem', color: '#cbd5e1' }}>
                                        Create Password <span style={{ color: '#ef4444' }}>*</span>
                                    </label>
                                    <div style={{ position: 'relative' }}>
                                        <Lock size={17} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#f59e0b' }} />
                                        <input
                                            type="password"
                                            required
                                            placeholder="Create a password (min 6 characters)"
                                            value={password}
                                            onChange={(e) => { setPassword(e.target.value); setErrorMessage(''); }}
                                            style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.6rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.18)', background: '#1e293b', color: '#ffffff', fontSize: '0.92rem', outline: 'none', boxSizing: 'border-box' }}
                                        />
                                    </div>
                                </div>

                                {/* Target Class */}
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.3rem', color: '#cbd5e1' }}>
                                        Target Class / Course
                                    </label>
                                    <div style={{ position: 'relative' }}>
                                        <BookOpen size={17} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                                        <select
                                            value={className}
                                            onChange={(e) => setClassName(e.target.value)}
                                            style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.6rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.18)', background: '#1e293b', color: '#ffffff', fontSize: '0.92rem', outline: 'none', cursor: 'pointer', boxSizing: 'border-box' }}
                                        >
                                            <option value="Class 10">Class 10 (Board)</option>
                                            <option value="Class 12">Class 12 (Board)</option>
                                            <option value="Class 11">Class 11</option>
                                            <option value="Class 9">Class 9</option>
                                            <option value="Class 8">Class 8</option>
                                            <option value="Class 7">Class 7</option>
                                            <option value="Class 6">Class 6</option>
                                            <option value="Computer & Programming">Computer & Programming</option>
                                        </select>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    style={{
                                        marginTop: '0.5rem',
                                        padding: '0.85rem 1.5rem',
                                        background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
                                        color: '#ffffff',
                                        border: 'none',
                                        borderRadius: '12px',
                                        fontWeight: 700,
                                        fontSize: '1rem',
                                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                        boxShadow: '0 4px 20px rgba(37, 99, 235, 0.45)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem'
                                    }}
                                >
                                    {isSubmitting ? 'Registering...' : '🚀 Register & Unlock Access'}
                                </button>

                                <div style={{ textAlign: 'center', marginTop: '0.3rem' }}>
                                    <button
                                        type="button"
                                        onClick={() => { setActiveMode('login'); setErrorMessage(''); }}
                                        style={{ background: 'none', border: 'none', color: '#38bdf8', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}
                                    >
                                        Already registered? Click here to Log In →
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* MODE 2: EXISTING STUDENT / ADMIN LOGIN */}
                        {activeMode === 'login' && (
                            <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: '0.35rem', color: '#cbd5e1' }}>
                                        Email Address or 10-Digit Mobile Number *
                                    </label>
                                    <div style={{ position: 'relative' }}>
                                        <Mail size={17} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#38bdf8' }} />
                                        <input
                                            type="text"
                                            required
                                            placeholder="e.g. rahul@gmail.com or 9876543210"
                                            value={loginIdentifier}
                                            onChange={(e) => { setLoginIdentifier(e.target.value); setErrorMessage(''); }}
                                            style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.6rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.18)', background: '#1e293b', color: '#ffffff', fontSize: '0.92rem', outline: 'none', boxSizing: 'border-box' }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                                        <label style={{ fontSize: '0.84rem', fontWeight: 600, color: '#cbd5e1' }}>
                                            Password *
                                        </label>
                                        <button
                                            type="button"
                                            onClick={() => { setActiveMode('forgot'); setErrorMessage(''); setSuccessMessage(''); setResetIdentifier(loginIdentifier); }}
                                            style={{ background: 'none', border: 'none', color: '#38bdf8', fontSize: '0.8rem', cursor: 'pointer', padding: 0 }}
                                        >
                                            Forgot Password?
                                        </button>
                                    </div>
                                    <div style={{ position: 'relative' }}>
                                        <Lock size={17} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#f59e0b' }} />
                                        <input
                                            type="password"
                                            required
                                            placeholder="Enter your password"
                                            value={loginPassword}
                                            onChange={(e) => { setLoginPassword(e.target.value); setErrorMessage(''); }}
                                            style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.6rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.18)', background: '#1e293b', color: '#ffffff', fontSize: '0.92rem', outline: 'none', boxSizing: 'border-box' }}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    style={{
                                        marginTop: '0.5rem',
                                        padding: '0.85rem 1.5rem',
                                        background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
                                        color: '#ffffff',
                                        border: 'none',
                                        borderRadius: '12px',
                                        fontWeight: 700,
                                        fontSize: '1rem',
                                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                        boxShadow: '0 4px 20px rgba(37, 99, 235, 0.45)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem'
                                    }}
                                >
                                    {isSubmitting ? 'Logging in...' : 'Sign In & Unlock Access'} <ArrowRight size={17} />
                                </button>

                                <div style={{ textAlign: 'center', marginTop: '0.3rem' }}>
                                    <button
                                        type="button"
                                        onClick={() => { setActiveMode('signup'); setErrorMessage(''); }}
                                        style={{ background: 'none', border: 'none', color: '#38bdf8', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}
                                    >
                                        New Student? Click here to Sign Up / Register →
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* MODE 3: FORGOT PASSWORD RESET */}
                        {activeMode === 'forgot' && (
                            <form onSubmit={handleResetPassword} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: '0.35rem', color: '#cbd5e1' }}>
                                        Registered Email or Mobile Number *
                                    </label>
                                    <div style={{ position: 'relative' }}>
                                        <Mail size={17} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#38bdf8' }} />
                                        <input
                                            type="text"
                                            required
                                            placeholder="e.g. rahul@gmail.com or 9876543210"
                                            value={resetIdentifier}
                                            onChange={(e) => { setResetIdentifier(e.target.value); setErrorMessage(''); }}
                                            style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.6rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.18)', background: '#1e293b', color: '#ffffff', fontSize: '0.92rem', outline: 'none', boxSizing: 'border-box' }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: '0.35rem', color: '#cbd5e1' }}>
                                        New Password (min 6 chars) *
                                    </label>
                                    <div style={{ position: 'relative' }}>
                                        <Lock size={17} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#f59e0b' }} />
                                        <input
                                            type="password"
                                            required
                                            placeholder="Enter new password"
                                            value={newPassword}
                                            onChange={(e) => { setNewPassword(e.target.value); setErrorMessage(''); }}
                                            style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.6rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.18)', background: '#1e293b', color: '#ffffff', fontSize: '0.92rem', outline: 'none', boxSizing: 'border-box' }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: '0.35rem', color: '#cbd5e1' }}>
                                        Confirm New Password *
                                    </label>
                                    <div style={{ position: 'relative' }}>
                                        <KeyRound size={17} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#10b981' }} />
                                        <input
                                            type="password"
                                            required
                                            placeholder="Re-enter new password"
                                            value={confirmPassword}
                                            onChange={(e) => { setConfirmPassword(e.target.value); setErrorMessage(''); }}
                                            style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.6rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.18)', background: '#1e293b', color: '#ffffff', fontSize: '0.92rem', outline: 'none', boxSizing: 'border-box' }}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    style={{
                                        marginTop: '0.5rem',
                                        padding: '0.85rem 1.5rem',
                                        background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
                                        color: '#ffffff',
                                        border: 'none',
                                        borderRadius: '12px',
                                        fontWeight: 700,
                                        fontSize: '1rem',
                                        cursor: isSubmitting ? 'not-allowed' : 'pointer'
                                    }}
                                >
                                    {isSubmitting ? 'Updating...' : 'Save & Reset Password'}
                                </button>

                                <div style={{ textAlign: 'center', marginTop: '0.3rem' }}>
                                    <button
                                        type="button"
                                        onClick={() => { setActiveMode('login'); setErrorMessage(''); }}
                                        style={{ background: 'none', border: 'none', color: '#38bdf8', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
                                    >
                                        <ArrowLeft size={15} /> Back to Sign In
                                    </button>
                                </div>
                            </form>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default VisitorLeadModal;