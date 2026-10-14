import React, { useState, useEffect } from 'react';
import { X, User, Phone, BookOpen, Camera, CheckCircle, Sparkles, MessageSquare } from 'lucide-react';

const VisitorLeadModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [className, setClassName] = useState('Class 10');
    const [photo, setPhoto] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [waLink, setWaLink] = useState('');

    useEffect(() => {
        // Check if user already submitted or dismissed recently
        const alreadySubmitted = localStorage.getItem('techkarma_lead_submitted');
        const dismissedAt = localStorage.getItem('techkarma_lead_dismissed');

        // If dismissed more than 3 days ago, show again
        const isDismissExpired = !dismissedAt || (Date.now() - parseInt(dismissedAt, 10) > 3 * 24 * 60 * 60 * 1000);

        if (!alreadySubmitted && isDismissExpired) {
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 3000); // Trigger after 3 seconds of visiting

            return () => clearTimeout(timer);
        }
    }, []);

    const handleDismiss = () => {
        setIsOpen(false);
        localStorage.setItem('techkarma_lead_dismissed', Date.now().toString());
    };

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
        if (!name.trim() || !phone.trim()) {
            alert('Please enter your name and WhatsApp number');
            return;
        }

        setIsSubmitting(true);

        const waText = 
`🔔 *Tech Karma Classes - Free Notes & Books Registration*
━━━━━━━━━━━━━━━━━━━━━━
👤 *Student Name:* ${name.trim()}
📱 *WhatsApp Number:* ${phone.trim()}
🎓 *Target Class / Course:* ${className}
⏰ *Time:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
━━━━━━━━━━━━━━━━━━━━━━
Hello Sir, I registered on your website and want to access Free Notes & Books for ${className}. Please share details!`;

        const waUrl = `https://api.whatsapp.com/send?phone=918130550381&text=${encodeURIComponent(waText)}`;
        setWaLink(waUrl);

        try {
            // Save in localStorage so modal doesn't keep annoying visitor
            localStorage.setItem('techkarma_lead_submitted', 'true');

            // Send to backend if available (non-blocking)
            fetch('/api/queries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: name.trim(),
                    phone: phone.trim(),
                    className,
                    photo,
                    message: `Website Visitor Lead: ${name} (${phone}) - ${className}`,
                    source: 'Instant Website Visitor'
                })
            }).catch(() => {});

            // Automatically open WhatsApp with prefilled lead details to Admin
            try {
                window.open(waUrl, '_blank');
            } catch (openErr) {
                console.log('Direct popup blocked, fallback button available', openErr);
            }

            setIsSuccess(true);
        } catch (err) {
            console.error('Error submitting visitor lead:', err);
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
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99999,
            padding: '1rem',
            animation: 'fadeIn 0.3s ease-out'
        }}>
            <div style={{
                background: '#0f172a',
                border: '1px solid rgba(59, 130, 246, 0.35)',
                borderRadius: '20px',
                width: '100%',
                maxWidth: '440px',
                padding: '2rem',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 35px rgba(59, 130, 246, 0.25)',
                position: 'relative',
                color: '#ffffff'
            }}>
                {/* Close Button */}
                <button
                    onClick={handleDismiss}
                    aria-label="Close"
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: 'rgba(255, 255, 255, 0.08)',
                        border: 'none',
                        color: '#94a3b8',
                        cursor: 'pointer',
                        borderRadius: '50%',
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(239,68,68,0.2)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
                >
                    <X size={18} />
                </button>

                {isSuccess ? (
                    <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                        <div style={{
                            width: '64px',
                            height: '64px',
                            borderRadius: '50%',
                            background: 'rgba(16, 185, 129, 0.15)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1.25rem',
                            color: '#10b981'
                        }}>
                            <CheckCircle size={38} />
                        </div>
                        <h3 style={{ fontSize: '1.4rem', fontWeight: 700, margin: '0 0 0.5rem', color: '#10b981' }}>
                            Welcome, {name || 'Student'}! 🎉
                        </h3>
                        <p style={{ color: '#94a3b8', fontSize: '0.92rem', margin: '0 0 1.25rem', lineHeight: 1.5 }}>
                            Registration successful! Niche diye gaye WhatsApp button par tap karein aur apne WhatsApp se direct <strong style={{ color: '#25D366' }}>Tech Karma Classes (8130550381)</strong> par details send karein taki aapko free notes/books mil sake:
                        </p>

                        <a
                            href={waLink || `https://api.whatsapp.com/send?phone=918130550381&text=${encodeURIComponent(`Hello Sir, I registered on website. Student Name: ${name}, Class: ${className}`)}`}
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
                                background: '#25D366',
                                color: '#ffffff',
                                fontWeight: 700,
                                fontSize: '1rem',
                                textDecoration: 'none',
                                boxShadow: '0 4px 15px rgba(37, 211, 102, 0.4)',
                                marginBottom: '1.25rem',
                                boxSizing: 'border-box'
                            }}
                        >
                            <MessageSquare size={20} /> Send on WhatsApp (8130550381)
                        </a>

                        <div>
                            <button
                                onClick={() => setIsOpen(false)}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: '#94a3b8',
                                    fontSize: '0.88rem',
                                    cursor: 'pointer',
                                    textDecoration: 'underline'
                                }}
                            >
                                Continue browsing website →
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
                                color: '#38bdf8',
                                padding: '0.35rem 0.85rem',
                                borderRadius: '50px',
                                fontSize: '0.8rem',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                                marginBottom: '0.75rem'
                            }}>
                                <Sparkles size={14} /> Tech Karma Classes
                            </div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 0.4rem', color: '#ffffff' }}>
                                Unlock Free Notes & Books 📚
                            </h3>
                            <p style={{ color: '#94a3b8', fontSize: '0.88rem', margin: 0, lineHeight: 1.4 }}>
                                Enter your details below to instantly access free NCERT solutions, chapter notes, and mock tests.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {/* Photo Picker */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.03)', padding: '0.6rem 0.8rem', borderRadius: '12px', border: '1px dashed rgba(255,255,255,0.15)' }}>
                                <div style={{
                                    width: '46px',
                                    height: '46px',
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

                            {/* Name Input */}
                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: '#cbd5e1' }}>
                                    Full Name *
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <User size={18} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Tony"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem 1rem 0.75rem 2.6rem',
                                            borderRadius: '10px',
                                            border: '1px solid rgba(255,255,255,0.15)',
                                            background: '#1e293b',
                                            color: '#ffffff',
                                            fontSize: '0.92rem',
                                            outline: 'none',
                                            boxSizing: 'border-box'
                                        }}
                                    />
                                </div>
                            </div>

                            {/* WhatsApp / Phone Input */}
                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: '#cbd5e1' }}>
                                    WhatsApp / Mobile Number *
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <Phone size={18} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#25D366' }} />
                                    <input
                                        type="tel"
                                        required
                                        placeholder="10-digit mobile number"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        pattern="[0-9]{10}"
                                        maxLength="10"
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem 1rem 0.75rem 2.6rem',
                                            borderRadius: '10px',
                                            border: '1px solid rgba(255,255,255,0.15)',
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
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: '#cbd5e1' }}>
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
                                            border: '1px solid rgba(255,255,255,0.15)',
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
                                    marginTop: '0.5rem',
                                    padding: '0.85rem 1.5rem',
                                    background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
                                    color: '#ffffff',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontWeight: 700,
                                    fontSize: '1rem',
                                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                    boxShadow: '0 4px 15px rgba(37, 99, 235, 0.4)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {isSubmitting ? 'Submitting...' : '🚀 Unlock Free Access Now'}
                            </button>

                            <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#64748b', margin: '0.2rem 0 0' }}>
                                🔒 Your information is 100% confidential. No spam guaranteed.
                            </p>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default VisitorLeadModal;
