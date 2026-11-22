import React, { useState, useEffect } from 'react';
import { User, Phone, Mail, BookOpen, Camera, CheckCircle, Sparkles, MessageSquare, Lock } from 'lucide-react';

const VisitorLeadModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [className, setClassName] = useState('Class 10');
    const [photo, setPhoto] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [waLink, setWaLink] = useState('');

    useEffect(() => {
        // Compulsory check: Has the user submitted Name, Phone, and Email?
        let hasValidProfile = false;
        try {
            const visitorInfo = localStorage.getItem('techkarma_visitor_info');
            if (visitorInfo) {
                const parsed = JSON.parse(visitorInfo);
                if (parsed.name && parsed.phone && parsed.email) {
                    hasValidProfile = true;
                }
            }
        } catch (e) {}

        // Don't lock the screen if logged in as Admin
        let isAdmin = false;
        try {
            const userStr = localStorage.getItem('techkarma_user');
            if (userStr) {
                const u = JSON.parse(userStr);
                if (u.role === 'admin' || u.email === 'sonuk802408@gmail.com') {
                    isAdmin = true;
                }
            }
        } catch (e) {}

        if (!hasValidProfile && !isAdmin) {
            // Must pop up immediately and lock page
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
                setPhoto(reader.result); // Base64 image
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        const cleanName = name.trim();
        const cleanPhone = phone.trim();
        const cleanEmail = email.trim().toLowerCase();

        // Compulsory validation for Name, Mobile Number, and Email
        if (!cleanName || cleanName.length < 2) {
            setErrorMessage('Please enter your full name (at least 2 characters)');
            return;
        }

        if (!/^[0-9]{10}$/.test(cleanPhone)) {
            setErrorMessage('Please enter a valid 10-digit mobile number');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
            setErrorMessage('Please enter a valid email address (e.g. name@example.com)');
            return;
        }

        setIsSubmitting(true);

        const waText = 
`🔔 *Tech Karma Classes - Compulsory Student Registration*
━━━━━━━━━━━━━━━━━━━━━━
👤 *Student Name:* ${cleanName}
📱 *Mobile Number:* ${cleanPhone}
📧 *Email Address:* ${cleanEmail}
🎓 *Target Class / Course:* ${className}
⏰ *Time:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
━━━━━━━━━━━━━━━━━━━━━━
Hello Sir, I registered on the Tech Karma website. Please grant me full access to free study materials, notes, and course details for ${className}!`;

        const waUrl = `https://api.whatsapp.com/send?phone=918130550381&text=${encodeURIComponent(waText)}`;
        setWaLink(waUrl);

        try {
            // Save in localStorage so modal unlocks access
            localStorage.setItem('techkarma_lead_submitted', 'true');
            localStorage.setItem('techkarma_visitor_info', JSON.stringify({
                name: cleanName,
                phone: cleanPhone,
                email: cleanEmail,
                className,
                submittedAt: new Date().toISOString()
            }));

            // Sync with backend API
            Promise.allSettled([
                fetch('/api/queries', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: cleanName,
                        phone: cleanPhone,
                        email: cleanEmail,
                        className,
                        photo,
                        message: `Compulsory Form: ${cleanName} (${cleanPhone}, ${cleanEmail}) - ${className}`,
                        source: 'Compulsory Entry Form'
                    })
                }),
                fetch('/api/auth/register-lead', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: cleanName,
                        phone: cleanPhone,
                        email: cleanEmail,
                        className,
                        photo
                    })
                })
            ]).catch(() => {});

            // Open WhatsApp in new tab for direct connect
            try {
                window.open(waUrl, '_blank');
            } catch (err) {
                console.log('Popup blocked, fallback available', err);
            }

            setIsSuccess(true);
        } catch (err) {
            console.error('Error submitting compulsory form:', err);
            setIsSuccess(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(5, 10, 24, 0.88)',
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
                maxWidth: '460px',
                padding: '2rem',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 40px rgba(59, 130, 246, 0.3)',
                position: 'relative',
                color: '#ffffff',
                boxSizing: 'border-box'
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
                            Aapki registration successful ho gayi hai! Ab aap Tech Karma Classes ke sabhi free notes, NCERT solutions aur courses ko freely access kar sakte hain.
                        </p>

                        <a
                            href={waLink || `https://api.whatsapp.com/send?phone=918130550381&text=${encodeURIComponent(`Hello Sir, I registered. Name: ${name}, Phone: ${phone}, Email: ${email}, Class: ${className}`)}`}
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

                        <div>
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
                    </div>
                ) : (
                    <>
                        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
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
                                marginBottom: '0.75rem'
                            }}>
                                <Sparkles size={14} /> Tech Karma Classes • Compulsory Registration
                            </div>
                            <h3 style={{ fontSize: '1.55rem', fontWeight: 800, margin: '0 0 0.4rem', color: '#ffffff' }}>
                                Student Access Registration 📚
                            </h3>
                            <p style={{ color: '#94a3b8', fontSize: '0.88rem', margin: 0, lineHeight: 1.45 }}>
                                Website access karne ke liye apna <strong>Name</strong>, <strong>Mobile Number</strong> aur <strong>Email Address</strong> fill karna anivarya (compulsory) hai:
                            </p>
                        </div>

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

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.95rem' }}>
                            {/* Photo Picker (Optional) */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.03)', padding: '0.55rem 0.8rem', borderRadius: '12px', border: '1px dashed rgba(255,255,255,0.15)' }}>
                                <div style={{
                                    width: '44px',
                                    height: '44px',
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
                                        <Camera size={20} color="#94a3b8" />
                                    )}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#e2e8f0', cursor: 'pointer' }}>
                                        {photo ? 'Change Photo (Optional)' : 'Upload Your Photo (Optional)'}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handlePhotoChange}
                                            style={{ display: 'none' }}
                                        />
                                    </label>
                                    <span style={{ fontSize: '0.72rem', color: '#64748b' }}>JPG/PNG • Max 2MB</span>
                                </div>
                            </div>

                            {/* Name Input - Compulsory */}
                            <div>
                                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: '0.35rem', color: '#cbd5e1' }}>
                                    Full Name <span style={{ color: '#ef4444' }}>*</span>
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <User size={18} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Tony"
                                        value={name}
                                        onChange={(e) => { setName(e.target.value); setErrorMessage(''); }}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem 1rem 0.75rem 2.6rem',
                                            borderRadius: '10px',
                                            border: '1px solid rgba(255,255,255,0.18)',
                                            background: '#1e293b',
                                            color: '#ffffff',
                                            fontSize: '0.92rem',
                                            outline: 'none',
                                            boxSizing: 'border-box'
                                        }}
                                    />
                                </div>
                            </div>

                            {/* WhatsApp / Mobile Input - Compulsory */}
                            <div>
                                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: '0.35rem', color: '#cbd5e1' }}>
                                    Mobile / WhatsApp Number <span style={{ color: '#ef4444' }}>*</span>
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <Phone size={18} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#25D366' }} />
                                    <input
                                        type="tel"
                                        required
                                        placeholder="10-digit mobile number"
                                        value={phone}
                                        onChange={(e) => { setPhone(e.target.value.replace(/\D/g, '')); setErrorMessage(''); }}
                                        maxLength="10"
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem 1rem 0.75rem 2.6rem',
                                            borderRadius: '10px',
                                            border: '1px solid rgba(255,255,255,0.18)',
                                            background: '#1e293b',
                                            color: '#ffffff',
                                            fontSize: '0.92rem',
                                            outline: 'none',
                                            boxSizing: 'border-box'
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Email Address Input - Compulsory */}
                            <div>
                                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: '0.35rem', color: '#cbd5e1' }}>
                                    Email Address <span style={{ color: '#ef4444' }}>*</span>
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <Mail size={18} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#38bdf8' }} />
                                    <input
                                        type="email"
                                        required
                                        placeholder="e.g. student@gmail.com"
                                        value={email}
                                        onChange={(e) => { setEmail(e.target.value); setErrorMessage(''); }}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem 1rem 0.75rem 2.6rem',
                                            borderRadius: '10px',
                                            border: '1px solid rgba(255,255,255,0.18)',
                                            background: '#1e293b',
                                            color: '#ffffff',
                                            fontSize: '0.92rem',
                                            outline: 'none',
                                            boxSizing: 'border-box'
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Class Selection */}
                            <div>
                                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: '0.35rem', color: '#cbd5e1' }}>
                                    Select Your Class / Target Course
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <BookOpen size={18} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                                    <select
                                        value={className}
                                        onChange={(e) => setClassName(e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem 1rem 0.75rem 2.6rem',
                                            borderRadius: '10px',
                                            border: '1px solid rgba(255,255,255,0.18)',
                                            background: '#1e293b',
                                            color: '#ffffff',
                                            fontSize: '0.92rem',
                                            outline: 'none',
                                            boxSizing: 'border-box',
                                            cursor: 'pointer'
                                        }}
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

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                style={{
                                    marginTop: '0.6rem',
                                    padding: '0.9rem 1.5rem',
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
                                    gap: '0.5rem',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {isSubmitting ? 'Submitting & Verifying...' : '🚀 Submit & Unlock Website Access'}
                            </button>

                            <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#64748b', margin: '0.1rem 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}>
                                <Lock size={12} /> Filling details is required to unlock study materials.
                            </p>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default VisitorLeadModal;