import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Upload, Users, BookOpen, Settings, FileText, Database, Plus, Trash2, Shield, RefreshCw, Search, Phone, Mail, Clock, CheckCircle2, ExternalLink, Book, Check, MessageSquare } from 'lucide-react';
import { ncertBooksData } from '../data/ncertBooksData';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';

const AdminDashboard = () => {
    const { token, isAdmin, isLoggedIn, presence } = useAuth();
    const [activeTab, setActiveTab] = useState('students');
    const [usersList, setUsersList] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(false);
    const [userError, setUserError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [ncertSearch, setNcertSearch] = useState('');
    const [ncertClassFilter, setNcertClassFilter] = useState('all');
    const [ncertMediumFilter, setNcertMediumFilter] = useState('all');
    const [booksList, setBooksList] = useState(ncertBooksData);

    const tabs = [
        { id: 'students', name: 'Registered Students', icon: Users },
        { id: 'ncert-books', name: 'NCERT Textbooks', icon: BookOpen },
        { id: 'materials', name: 'Study Materials', icon: FileText },
        { id: 'courses', name: 'Course Pricing', icon: Database },
        { id: 'queries', name: 'Contact Queries', icon: MessageSquare },
        { id: 'tests', name: 'Online Tests', icon: BookOpen },
        { id: 'settings', name: 'Settings', icon: Settings },
    ];

    const fetchUsers = async () => {
        if (!token) return;
        setLoadingUsers(true);
        setUserError('');
        try {
            const res = await fetch('/api/auth/users', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || 'Failed to fetch users');
            }
            setUsersList(data.users || []);
        } catch (err) {
            setUserError(err.message || 'Error loading registered users');
        } finally {
            setLoadingUsers(false);
        }
    };

    useEffect(() => {
        if (activeTab === 'students' && isAdmin) {
            fetchUsers();
        }
    }, [activeTab, isAdmin, token]);

    // Format relative time (e.g. "Just now", "5 mins ago", "Yesterday")
    const formatLastActive = (dateString) => {
        if (!dateString) return 'Never';
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffSecs = Math.floor(diffMs / 1000);
        const diffMins = Math.floor(diffSecs / 60);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffSecs < 60) return 'Just now';
        if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
        if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    // Filter users by search query
    const filteredUsers = usersList.filter(u => {
        const q = searchQuery.toLowerCase();
        return (
            (u.name && u.name.toLowerCase().includes(q)) ||
            (u.email && u.email.toLowerCase().includes(q)) ||
            (u.phone && u.phone.includes(q))
        );
    });

    if (!isLoggedIn || !isAdmin) {
        return (
            <div className="section container" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="card" style={{ maxWidth: '500px', textAlign: 'center', padding: '3rem 2rem' }}>
                    <Shield size={60} color="#ef4444" style={{ margin: '0 auto 1.5rem auto' }} />
                    <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Admin Access Required</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                        This area is restricted to authorized administrators only. Please log in with an administrator account.
                    </p>
                    <Link to="/login" className="btn-primary" style={{ display: 'inline-block' }}>
                        Go to Admin Login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="section container" style={{ display: 'flex', gap: '2rem', minHeight: '80vh', alignItems: 'flex-start', flexWrap: 'wrap' }}>

            {/* Sidebar Navigation */}
            <div className="card" style={{ flex: '0 0 250px', display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '1.5rem 1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0 1rem', marginBottom: '1rem' }}>
                    <Shield size={20} color="var(--primary-color)" />
                    <h2 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', margin: 0 }}>Admin Portal</h2>
                </div>
                {tabs.map(tab => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.9rem 1rem', borderRadius: 'var(--border-radius)',
                                background: isActive ? 'var(--brand-light)' : 'transparent',
                                color: isActive ? '#4f46e5' : 'var(--text-primary)',
                                fontWeight: isActive ? 700 : 500,
                                textAlign: 'left', transition: 'var(--transition-fast)',
                                border: 'none', cursor: 'pointer', fontSize: '0.95rem'
                            }}
                        >
                            <Icon size={18} /> {tab.name}
                        </button>
                    )
                })}
            </div>

            {/* Main Content Area */}
            <div className="card animate-fade-in-up" style={{ flex: '1 1 600px', minHeight: '600px', overflowX: 'auto' }}>

                {/* STUDENTS & LIVE USERS TAB */}
                {activeTab === 'students' && (
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                            <div>
                                <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Registered Students & Presence</h2>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
                                    Total Registered: <strong>{usersList.length > 0 ? usersList.length : (presence?.totalRegistered || 580)}</strong> | Currently Live: <strong style={{ color: '#22c55e' }}>{presence?.totalLiveCount || 24}</strong>
                                </p>
                            </div>
                            <button
                                onClick={fetchUsers}
                                disabled={loadingUsers}
                                className="btn-secondary"
                                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                            >
                                <RefreshCw size={16} className={loadingUsers ? 'spin' : ''} /> Refresh
                            </button>
                        </div>

                        {/* Search Bar */}
                        <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
                            <div style={{ position: 'absolute', left: '0.6rem', top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', gap: '0.4rem', pointerEvents: 'none', zIndex: 2 }}>
                                <img src={logo} alt="Logo" style={{ width: '28px', height: '28px', objectFit: 'contain', filter: 'drop-shadow(0 0 6px rgba(56, 189, 248, 0.65))' }} />
                                <Search size={16} style={{ color: 'var(--text-secondary)' }} />
                            </div>
                            <input
                                type="text"
                                placeholder="Search students by name, email, or phone number..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '0.8rem 1rem 0.8rem 3.6rem',
                                    borderRadius: 'var(--border-radius)',
                                    border: '1px solid var(--border-color)',
                                    background: 'var(--bg-primary)',
                                    color: 'var(--text-primary)',
                                    fontSize: '0.95rem',
                                    outline: 'none'
                                }}
                            />
                        </div>

                        {userError && (
                            <div style={{ padding: '1rem', background: 'rgba(239,68,68,0.1)', color: '#ef4444', borderRadius: 'var(--border-radius)', marginBottom: '1.5rem' }}>
                                {userError}
                            </div>
                        )}

                        {loadingUsers ? (
                            <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-secondary)' }}>
                                <RefreshCw size={32} className="spin" style={{ margin: '0 auto 1rem auto' }} />
                                <p>Loading registered student data...</p>
                            </div>
                        ) : filteredUsers.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-secondary)' }}>
                                <Users size={48} style={{ margin: '0 auto 1rem auto', opacity: 0.4 }} />
                                <h3>No registered students found</h3>
                                <p style={{ fontSize: '0.9rem' }}>Try adjusting your search criteria or register a new student account.</p>
                            </div>
                        ) : (
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '650px' }}>
                                    <thead>
                                        <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                            <th style={{ padding: '0.8rem 1rem' }}>Student Name</th>
                                            <th style={{ padding: '0.8rem 1rem' }}>Phone Number</th>
                                            <th style={{ padding: '0.8rem 1rem' }}>Email Address</th>
                                            <th style={{ padding: '0.8rem 1rem' }}>Role</th>
                                            <th style={{ padding: '0.8rem 1rem' }}>Status</th>
                                            <th style={{ padding: '0.8rem 1rem' }}>Last Active</th>
                                            <th style={{ padding: '0.8rem 1rem' }}>Registered Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredUsers.map((u) => {
                                            const isOnline = presence.onlineStudentNames.includes(u.name);
                                            return (
                                                <tr key={u._id} style={{ borderBottom: '1px solid var(--border-color)', fontSize: '0.92rem' }}>
                                                    <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                                                        {u.name}
                                                    </td>
                                                    <td style={{ padding: '1rem', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>
                                                        {u.phone || 'N/A'}
                                                    </td>
                                                    <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>
                                                        {u.email}
                                                    </td>
                                                    <td style={{ padding: '1rem' }}>
                                                        <span style={{
                                                            background: u.role === 'admin' ? 'rgba(139, 92, 246, 0.15)' : 'rgba(59, 130, 246, 0.1)',
                                                            color: u.role === 'admin' ? '#a855f7' : '#3b82f6',
                                                            padding: '0.2rem 0.6rem',
                                                            borderRadius: '12px',
                                                            fontSize: '0.8rem',
                                                            fontWeight: 600,
                                                            textTransform: 'capitalize'
                                                        }}>
                                                            {u.role || 'student'}
                                                        </span>
                                                    </td>
                                                    <td style={{ padding: '1rem' }}>
                                                        {isOnline ? (
                                                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#22c55e', fontWeight: 600, fontSize: '0.85rem' }}>
                                                                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', display: 'inline-block', boxShadow: '0 0 8px #22c55e' }}></span>
                                                                Online
                                                            </span>
                                                        ) : (
                                                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                                                                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--border-color)', display: 'inline-block' }}></span>
                                                                Offline
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td style={{ padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                                                        {formatLastActive(u.lastActive)}
                                                    </td>
                                                    <td style={{ padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                                                        {new Date(u.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                
                {/* NCERT TEXTBOOKS MANAGEMENT TAB */}
                {activeTab === 'ncert-books' && (
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                            <div>
                                <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Official NCERT Textbooks Directory</h2>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
                                    Total Configured Books: <strong>{booksList.length}</strong> • Official NCERT Portal Integration
                                </p>
                            </div>
                            <a
                                href="https://ncert.nic.in/textbook.php"
                                target="_blank"
                                rel="noreferrer"
                                className="btn-secondary"
                                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', fontSize: '0.9rem', textDecoration: 'none' }}
                            >
                                <ExternalLink size={16} /> Official NCERT Portal
                            </a>
                        </div>

                        {/* Search & Filter Bar */}
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                            <div style={{ position: 'relative', flex: '1 1 250px' }}>
                                <div style={{ position: 'absolute', left: '0.6rem', top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', gap: '0.4rem', pointerEvents: 'none', zIndex: 2 }}>
                                    <img src={logo} alt="Logo" style={{ width: '28px', height: '28px', objectFit: 'contain', filter: 'drop-shadow(0 0 6px rgba(56, 189, 248, 0.65))' }} />
                                    <Search size={16} style={{ color: 'var(--text-secondary)' }} />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search by book title, subject, or code..."
                                    value={ncertSearch}
                                    onChange={(e) => setNcertSearch(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 1rem 0.75rem 3.6rem',
                                        borderRadius: 'var(--border-radius)',
                                        border: '1px solid var(--border-color)',
                                        background: 'var(--bg-primary)',
                                        color: 'var(--text-primary)',
                                        fontSize: '0.92rem',
                                        outline: 'none'
                                    }}
                                />
                            </div>

                            <select
                                value={ncertClassFilter}
                                onChange={(e) => setNcertClassFilter(e.target.value)}
                                style={{
                                    padding: '0.75rem 1rem',
                                    borderRadius: 'var(--border-radius)',
                                    border: '1px solid var(--border-color)',
                                    background: 'var(--bg-primary)',
                                    color: 'var(--text-primary)',
                                    fontSize: '0.92rem',
                                    outline: 'none',
                                    minWidth: '140px'
                                }}
                            >
                                <option value="all">All Classes</option>
                                {[12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map(c => (
                                    <option key={c} value={c}>Class {c}</option>
                                ))}
                            </select>

                            <select
                                value={ncertMediumFilter}
                                onChange={(e) => setNcertMediumFilter(e.target.value)}
                                style={{
                                    padding: '0.75rem 1rem',
                                    borderRadius: 'var(--border-radius)',
                                    border: '1px solid var(--border-color)',
                                    background: 'var(--bg-primary)',
                                    color: 'var(--text-primary)',
                                    fontSize: '0.92rem',
                                    outline: 'none',
                                    minWidth: '140px'
                                }}
                            >
                                <option value="all">All Mediums</option>
                                <option value="English">English Medium</option>
                                <option value="Hindi">Hindi Medium</option>
                            </select>
                        </div>

                        {/* Books Table */}
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
                                <thead>
                                    <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                        <th style={{ padding: '0.8rem 1rem' }}>Book Title</th>
                                        <th style={{ padding: '0.8rem 1rem' }}>Class & Stream</th>
                                        <th style={{ padding: '0.8rem 1rem' }}>Subject & Medium</th>
                                        <th style={{ padding: '0.8rem 1rem' }}>NCERT Code</th>
                                        <th style={{ padding: '0.8rem 1rem' }}>Chapters</th>
                                        <th style={{ padding: '0.8rem 1rem' }}>Status</th>
                                        <th style={{ padding: '0.8rem 1rem' }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {booksList
                                        .filter(b => {
                                            const matchClass = ncertClassFilter === 'all' || b.class === parseInt(ncertClassFilter, 10);
                                            const matchMed = ncertMediumFilter === 'all' || b.medium.toLowerCase() === ncertMediumFilter.toLowerCase();
                                            const q = ncertSearch.toLowerCase();
                                            const matchQ = !q || b.title.toLowerCase().includes(q) || b.subject.toLowerCase().includes(q) || (b.bookCode && b.bookCode.toLowerCase().includes(q));
                                            return matchClass && matchMed && matchQ;
                                        })
                                        .map((b) => (
                                            <tr key={b.id} style={{ borderBottom: '1px solid var(--border-color)', fontSize: '0.92rem' }}>
                                                <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                                        <Book size={18} color="var(--primary-color)" />
                                                        <span>{b.title}</span>
                                                    </div>
                                                </td>
                                                <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>
                                                    Class {b.class} {b.stream ? "(" + b.stream + ")" : ""}
                                                </td>
                                                <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>
                                                    {b.subject} • <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{b.medium}</span>
                                                </td>
                                                <td style={{ padding: '1rem', fontFamily: 'monospace', fontWeight: 600, color: 'var(--primary-color)' }}>
                                                    {b.bookCode || 'N/A'}
                                                </td>
                                                <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>
                                                    {b.totalChapters ? b.totalChapters + " Chs" : 'Full'}
                                                </td>
                                                <td style={{ padding: '1rem' }}>
                                                    <span style={{
                                                        background: b.status === 'active' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                                        color: b.status === 'active' ? '#10b981' : '#ef4444',
                                                        padding: '0.2rem 0.6rem',
                                                        borderRadius: '12px',
                                                        fontSize: '0.8rem',
                                                        fontWeight: 600,
                                                        textTransform: 'capitalize'
                                                    }}>
                                                        {b.status}
                                                    </span>
                                                </td>
                                                <td style={{ padding: '1rem' }}>
                                                    {b.officialUrl ? (
                                                        <a
                                                            href={b.officialUrl}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            style={{
                                                                color: 'var(--primary-color)',
                                                                textDecoration: 'none',
                                                                display: 'inline-flex',
                                                                alignItems: 'center',
                                                                gap: '0.3rem',
                                                                fontWeight: 600,
                                                                fontSize: '0.85rem'
                                                            }}
                                                        >
                                                            Open NCERT <ExternalLink size={14} />
                                                        </a>
                                                    ) : (
                                                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>No URL</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'materials' && (
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h2 style={{ fontSize: '1.8rem' }}>Manage Study Materials</h2>
                            <button className="btn-primary"><Plus size={18} /> Add New Material</button>
                        </div>

                        <div style={{ background: 'var(--bg-primary)', padding: '2rem', borderRadius: 'var(--border-radius)', border: '1px dashed var(--border-color)', textAlign: 'center', marginBottom: '2rem' }}>
                            <Upload size={40} color="var(--text-secondary)" style={{ margin: '0 auto 1rem auto' }} />
                            <h3>Upload PDF Files</h3>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>Support for Notes, Sample Papers, and NCERT solutions.</p>
                            <input type="file" id="pdf-upload" hidden accept=".pdf" />
                            <label htmlFor="pdf-upload" className="btn-secondary" style={{ display: 'inline-block', cursor: 'pointer' }}>Select File</label>
                        </div>

                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                                    <th style={{ padding: '1rem' }}>Title</th>
                                    <th style={{ padding: '1rem' }}>Class & Subject</th>
                                    <th style={{ padding: '1rem' }}>Type</th>
                                    <th style={{ padding: '1rem' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                                    <td style={{ padding: '1rem', fontWeight: 500 }}>Thermodynamics Notes</td>
                                    <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Class 11 Sci - Physics</td>
                                    <td style={{ padding: '1rem' }}><span style={{ background: '#e0e7ff', color: '#4f46e5', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.85rem' }}>Notes</span></td>
                                    <td style={{ padding: '1rem' }}><button style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}><Trash2 size={18} /></button></td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                                    <td style={{ padding: '1rem', fontWeight: 500 }}>Chemical Bonding MCQ</td>
                                    <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Class 11 Sci - Chemistry</td>
                                    <td style={{ padding: '1rem' }}><span style={{ background: '#d1fae5', color: '#10b981', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.85rem' }}>MCQ</span></td>
                                    <td style={{ padding: '1rem' }}><button style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}><Trash2 size={18} /></button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'courses' && (
                    <div>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>Edit Course Pricing</h2>
                        <div style={{ display: 'grid', gap: '1.5rem' }}>
                            {['Spoken English Mastery', 'Basic Coding for Kids', 'Graphic Designing'].map((course, idx) => (
                                <div key={idx} style={{ padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>{course}</h3>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Summer Course</p>
                                    </div>
                                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                        <input type="text" defaultValue="₹2,999" style={{ padding: '0.5rem', width: '100px', borderRadius: 'var(--border-radius)', border: '1px solid var(--border-color)', outline: 'none' }} />
                                        <button className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>Save</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'queries' && (
                    <div>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>Contact Queries</h2>
                        <div style={{ padding: '1.5rem', background: 'var(--bg-primary)', borderRadius: 'var(--border-radius)', borderLeft: '4px solid #f59e0b', marginBottom: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <h4 style={{ fontWeight: 700 }}>Rahul Sharma</h4>
                                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>2 hours ago</span>
                            </div>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>I want to enroll my son in the 10th standard Science classes. Please provide details.</p>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Phone: 9876543210</span>
                                <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Email: rahul@example.com</span>
                            </div>
                            <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
                                <button className="btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }}>Mark Resolved</button>
                                <a href="https://wa.me/919876543210" className="btn-secondary" style={{ padding: '0.4rem 1rem', fontSize: '0.9rem', color: '#25D366', borderColor: '#25D366' }}>Reply via WhatsApp</a>
                            </div>
                        </div>
                    </div>
                )}

                {(activeTab === 'tests' || activeTab === 'settings') && (
                    <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                        <Settings size={60} color="var(--text-secondary)" style={{ margin: '0 auto 1rem auto', opacity: 0.5 }} />
                        <h2 style={{ fontSize: '1.5rem', color: 'var(--text-secondary)' }}>Module under construction</h2>
                    </div>
                )}

            </div>
        </div>
    );
};

// Simple icon placeholder helper for queries
const MessageSquareIcon = ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
);

export default AdminDashboard;
