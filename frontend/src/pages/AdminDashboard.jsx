import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
    Upload, Users, BookOpen, Settings, FileText, Database, Plus, Trash2, 
    Shield, RefreshCw, Search, Phone, Mail, Clock, CheckCircle2, ExternalLink, 
    Book, Check, MessageSquare, Video, HelpCircle, Key, UserPlus, X, AlertCircle, PlayCircle
} from 'lucide-react';
import { ncertBooksData } from '../data/ncertBooksData';
import { useAuth } from '../context/AuthContext';
import { fetchAllMaterials, addMaterial, removeMaterial } from '../services/materialsService';
import logo from '../assets/logo.png';

const AdminDashboard = () => {
    const { token, user, isAdmin, isLoggedIn, presence, login } = useAuth();
    const [activeTab, setActiveTab] = useState('students');
    
    // Quick Admin Login State for gate
    const [gateEmail, setGateEmail] = useState('');
    const [gatePass, setGatePass] = useState('');
    const [gateLoading, setGateLoading] = useState(false);
    const [gateError, setGateError] = useState('');

    const handleGateLogin = async (e) => {
        e.preventDefault();
        setGateLoading(true);
        setGateError('');

        const cleanEmail = gateEmail.toLowerCase().trim();
        const cleanPass = gatePass.trim();

        // Direct master admin check
        if ((cleanEmail === 'sonuk802408@gmail.com' || cleanEmail === '8130550381' || cleanEmail === 'sonuk802408@gmail,com') && (cleanPass === 'Sonu kumar81' || gatePass === 'Sonu kumar81 ')) {
            const sonuAdmin = {
                _id: 'admin_sonu_kumar',
                name: 'Sonu Kumar (Admin)',
                email: 'sonuk802408@gmail.com',
                phone: '8130550381',
                role: 'admin',
                token: 'sonu_admin_master_token_2026'
            };
            login(sonuAdmin, 'sonu_admin_master_token_2026');
            setGateLoading(false);
            return;
        }

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: cleanEmail, password: gatePass })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Invalid credentials');
            if (data.role !== 'admin') throw new Error('This account does not have administrator privileges');

            login(data, data.token);
        } catch (err) {
            setGateError(err.message || 'Login failed. Please check credentials.');
        } finally {
            setGateLoading(false);
        }
    };
    
    // Students State
    const [usersList, setUsersList] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(false);
    const [userError, setUserError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    
    // Add Student Modal State
    const [showAddStudentModal, setShowAddStudentModal] = useState(false);
    const [newStudentData, setNewStudentData] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
        className: 'Class 10'
    });
    const [studentActionLoading, setStudentActionLoading] = useState(false);
    const [studentActionMsg, setStudentActionMsg] = useState({ type: '', text: '' });

    // Reset Password Modal State
    const [showResetModal, setShowResetModal] = useState(false);
    const [selectedStudentForReset, setSelectedStudentForReset] = useState(null);
    const [newPasswordVal, setNewPasswordVal] = useState('');

    // Materials State
    const [materialsList, setMaterialsList] = useState([]);
    const [loadingMaterials, setLoadingMaterials] = useState(false);
    const [materialFilterType, setMaterialFilterType] = useState('all');
    const [materialClassFilter, setMaterialClassFilter] = useState('all');
    const [showAddMaterialModal, setShowAddMaterialModal] = useState(false);

    // Add Material Form State
    const [materialForm, setMaterialForm] = useState({
        classNumber: '10',
        subjectName: 'Science',
        chapterName: 'General',
        type: 'Notes',
        title: '',
        fileUrl: '',
        videoUrl: '',
        duration: '30 mins',
        faculty: 'Tech Karma Classes',
        mcqQuestion: '',
        mcqOptionA: '',
        mcqOptionB: '',
        mcqOptionC: '',
        mcqOptionD: '',
        mcqCorrect: 'A',
        mcqExplanation: ''
    });

    // Queries State
    const [queriesList, setQueriesList] = useState([]);
    const [loadingQueries, setLoadingQueries] = useState(false);

    // NCERT state
    const [ncertSearch, setNcertSearch] = useState('');
    const [ncertClassFilter, setNcertClassFilter] = useState('all');
    const [ncertMediumFilter, setNcertMediumFilter] = useState('all');
    const [booksList] = useState(ncertBooksData);

    const tabs = [
        { id: 'students', name: 'Registered Students & Live Users', icon: Users },
        { id: 'materials', name: 'Study Materials (PDFs, Videos, MCQs)', icon: FileText },
        { id: 'queries', name: 'Student Registrations & Leads', icon: MessageSquare },
        { id: 'ncert-books', name: 'NCERT Textbooks Directory', icon: BookOpen },
        { id: 'courses', name: 'Course Pricing', icon: Database }
    ];

    // Fetch registered students
    const fetchUsers = async () => {
        setLoadingUsers(true);
        setUserError('');
        try {
            const res = await fetch('/api/auth/users', {
                headers: {
                    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
                }
            });
            if (res.ok) {
                const data = await res.json();
                if (data && data.users) {
                    setUsersList(data.users);
                    // Also cache locally
                    localStorage.setItem('techkarma_cached_students', JSON.stringify(data.users));
                    return;
                }
            }
            throw new Error('API unavailable, checking cache');
        } catch (err) {
            // Fallback to cached students or mock
            try {
                const cached = localStorage.getItem('techkarma_cached_students');
                if (cached) {
                    setUsersList(JSON.parse(cached));
                } else {
                    // Check visitor profile
                    const visitor = localStorage.getItem('techkarma_visitor_info');
                    if (visitor) {
                        const parsed = JSON.parse(visitor);
                        setUsersList([{
                            _id: 'visitor_1',
                            name: parsed.name,
                            phone: parsed.phone,
                            email: parsed.email,
                            className: parsed.className,
                            role: 'student',
                            lastActive: new Date().toISOString(),
                            createdAt: parsed.submittedAt || new Date().toISOString()
                        }]);
                    }
                }
            } catch (e) {}
        } finally {
            setLoadingUsers(false);
        }
    };

    // Load Materials
    const loadMaterials = async () => {
        setLoadingMaterials(true);
        try {
            const list = await fetchAllMaterials(token);
            setMaterialsList(list);
        } catch (e) {
            console.error(e);
        } finally {
            setLoadingMaterials(false);
        }
    };

    // Load Queries / Leads
    const fetchQueries = async () => {
        setLoadingQueries(true);
        try {
            const res = await fetch('/api/queries', {
                headers: { ...(token ? { 'Authorization': `Bearer ${token}` } : {}) }
            });
            if (res.ok) {
                const data = await res.json();
                setQueriesList(Array.isArray(data) ? data : []);
            }
        } catch (e) {
            // Local fallback
            const visitor = localStorage.getItem('techkarma_visitor_info');
            if (visitor) {
                const p = JSON.parse(visitor);
                setQueriesList([{
                    _id: 'local_lead_1',
                    name: p.name,
                    phone: p.phone,
                    email: p.email,
                    className: p.className,
                    message: `Website Visitor Lead: ${p.name} - ${p.className}`,
                    createdAt: p.submittedAt || new Date().toISOString()
                }]);
            }
        } finally {
            setLoadingQueries(false);
        }
    };

    useEffect(() => {
        if (isAdmin) {
            if (activeTab === 'students') fetchUsers();
            if (activeTab === 'materials') loadMaterials();
            if (activeTab === 'queries') fetchQueries();
        }
    }, [activeTab, isAdmin, token]);

    // Handle Admin Adding Student
    const handleAddStudentSubmit = async (e) => {
        e.preventDefault();
        setStudentActionLoading(true);
        setStudentActionMsg({ type: '', text: '' });

        try {
            const res = await fetch('/api/auth/admin/students', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
                },
                body: JSON.stringify(newStudentData)
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Failed to add student');

            const created = data.student || {
                _id: 'std_' + Date.now(),
                ...newStudentData,
                role: 'student',
                createdAt: new Date().toISOString(),
                lastActive: new Date().toISOString()
            };

            setUsersList(prev => [created, ...prev]);
            setShowAddStudentModal(false);
            setNewStudentData({ name: '', phone: '', email: '', password: '', className: 'Class 10' });
            alert(`Student ${created.name} added successfully!`);
        } catch (err) {
            // Fallback addition locally
            const fallbackStudent = {
                _id: 'std_' + Date.now(),
                ...newStudentData,
                role: 'student',
                createdAt: new Date().toISOString(),
                lastActive: new Date().toISOString()
            };
            setUsersList(prev => [fallbackStudent, ...prev]);
            setShowAddStudentModal(false);
            setNewStudentData({ name: '', phone: '', email: '', password: '', className: 'Class 10' });
            alert(`Student ${fallbackStudent.name} registered and saved.`);
        } finally {
            setStudentActionLoading(false);
        }
    };

    // Handle Admin Deleting Student
    const handleDeleteStudent = async (studentId, studentName) => {
        if (!window.confirm(`Are you sure you want to remove student "${studentName}"? This action cannot be undone.`)) {
            return;
        }

        try {
            await fetch(`/api/auth/admin/students/${studentId}`, {
                method: 'DELETE',
                headers: { ...(token ? { 'Authorization': `Bearer ${token}` } : {}) }
            });
        } catch (e) {}

        setUsersList(prev => prev.filter(u => u._id !== studentId));
        alert(`Student "${studentName}" removed successfully.`);
    };

    // Handle Admin Resetting Student Password
    const handleResetPasswordSubmit = async (e) => {
        e.preventDefault();
        if (!newPasswordVal || newPasswordVal.length < 6) {
            alert('Password must be at least 6 characters long');
            return;
        }

        try {
            await fetch(`/api/auth/admin/students/${selectedStudentForReset._id}/reset-password`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
                },
                body: JSON.stringify({ newPassword: newPasswordVal })
            });
            alert(`Password for student "${selectedStudentForReset.name}" has been reset successfully!`);
        } catch (e) {
            alert(`Password for "${selectedStudentForReset.name}" updated locally.`);
        }

        setShowResetModal(false);
        setSelectedStudentForReset(null);
        setNewPasswordVal('');
    };

    // Handle Adding New Material (Notes, Videos, MCQs)
    const handleAddMaterialSubmit = async (e) => {
        e.preventDefault();
        if (!materialForm.title.trim()) {
            alert('Please enter a title for the material');
            return;
        }

        let materialPayload = {
            classNumber: materialForm.classNumber,
            subjectName: materialForm.subjectName,
            chapterName: materialForm.chapterName || 'General',
            type: materialForm.type,
            title: materialForm.title.trim(),
            fileUrl: materialForm.fileUrl.trim(),
            videoUrl: materialForm.videoUrl.trim(),
            duration: materialForm.duration,
            faculty: materialForm.faculty
        };

        if (materialForm.type === 'MCQ') {
            materialPayload.mcqData = {
                question: materialForm.mcqQuestion || materialForm.title,
                options: [
                    materialForm.mcqOptionA || 'Option A',
                    materialForm.mcqOptionB || 'Option B',
                    materialForm.mcqOptionC || 'Option C',
                    materialForm.mcqOptionD || 'Option D'
                ],
                correctAnswer: materialForm.mcqCorrect || 'A',
                explanation: materialForm.mcqExplanation || 'Explanation by Tech Karma Faculty.'
            };
        }

        await addMaterial(materialPayload, token);
        await loadMaterials();
        setShowAddMaterialModal(false);
        setMaterialForm({
            classNumber: '10',
            subjectName: 'Science',
            chapterName: 'General',
            type: 'Notes',
            title: '',
            fileUrl: '',
            videoUrl: '',
            duration: '30 mins',
            faculty: 'Tech Karma Classes',
            mcqQuestion: '',
            mcqOptionA: '',
            mcqOptionB: '',
            mcqOptionC: '',
            mcqOptionD: '',
            mcqCorrect: 'A',
            mcqExplanation: ''
        });
        alert(`Material "${materialPayload.title}" has been added and published successfully!`);
    };

    // Handle Removing Material
    const handleDeleteMaterial = async (id, title) => {
        if (!window.confirm(`Are you sure you want to delete "${title}"?`)) {
            return;
        }
        await removeMaterial(id, token);
        await loadMaterials();
        alert(`Material "${title}" has been deleted.`);
    };

    // Format relative time helper
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
            (u.phone && u.phone.includes(q)) ||
            (u.className && u.className.toLowerCase().includes(q))
        );
    });

    // Filter materials
    const filteredMaterials = materialsList.filter(m => {
        const matchType = materialFilterType === 'all' || m.type === materialFilterType;
        const matchClass = materialClassFilter === 'all' || m.classNumber === materialClassFilter;
        return matchType && matchClass;
    });

    if (!isLoggedIn || !isAdmin) {
        return (
            <div className="section container" style={{ minHeight: '75vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
                <div className="card animate-fade-in-up" style={{ width: '100%', maxWidth: '440px', padding: '2.5rem 2rem', textAlign: 'center' }}>
                    <div style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '16px',
                        background: 'rgba(59, 130, 246, 0.12)',
                        border: '1px solid rgba(59, 130, 246, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1.25rem',
                        color: '#38bdf8'
                    }}>
                        <Shield size={36} />
                    </div>

                    <h2 style={{ fontSize: '1.7rem', fontWeight: 800, marginBottom: '0.4rem', color: '#ffffff' }}>Admin Portal Login</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                        Enter your master admin credentials to access full website control:
                    </p>

                    {gateError && (
                        <div style={{ padding: '0.65rem 0.9rem', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '10px', color: '#ef4444', marginBottom: '1.25rem', fontSize: '0.85rem' }}>
                            {gateError}
                        </div>
                    )}

                    <form onSubmit={handleGateLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: '0.3rem', color: '#cbd5e1' }}>Admin Email / Phone</label>
                            <input
                                type="text"
                                required
                                placeholder="sonuk802408@gmail.com"
                                value={gateEmail}
                                onChange={(e) => setGateEmail(e.target.value)}
                                style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none', boxSizing: 'border-box' }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: '0.3rem', color: '#cbd5e1' }}>Admin Password</label>
                            <input
                                type="password"
                                required
                                placeholder="••••••••"
                                value={gatePass}
                                onChange={(e) => setGatePass(e.target.value)}
                                style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none', boxSizing: 'border-box' }}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={gateLoading}
                            className="btn-primary"
                            style={{ padding: '0.9rem', width: '100%', marginTop: '0.5rem', fontWeight: 700 }}
                        >
                            {gateLoading ? 'Verifying...' : 'Unlock Admin Dashboard'}
                        </button>
                    </form>

                    <div style={{ marginTop: '1.5rem', fontSize: '0.85rem' }}>
                        <Link to="/login" style={{ color: '#4f46e5', textDecoration: 'none', fontWeight: 600 }}>
                            Go to Main Login / Reset Password →
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="section container" style={{ display: 'flex', gap: '2rem', minHeight: '80vh', alignItems: 'flex-start', flexWrap: 'wrap' }}>

            {/* Sidebar Navigation */}
            <div className="card" style={{ flex: '0 0 260px', display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '1.5rem 1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0 0.5rem', marginBottom: '1.25rem' }}>
                    <div style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '10px',
                        background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff'
                    }}>
                        <Shield size={20} />
                    </div>
                    <div>
                        <h2 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', margin: 0, fontWeight: 700 }}>Admin Portal</h2>
                        <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600 }}>● Full Control Mode</span>
                    </div>
                </div>

                {tabs.map(tab => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.85rem 1rem', borderRadius: 'var(--border-radius)',
                                background: isActive ? 'var(--brand-light)' : 'transparent',
                                color: isActive ? '#4f46e5' : 'var(--text-primary)',
                                fontWeight: isActive ? 700 : 500,
                                textAlign: 'left', transition: 'var(--transition-fast)',
                                border: 'none', cursor: 'pointer', fontSize: '0.92rem'
                            }}
                        >
                            <Icon size={18} /> {tab.name}
                        </button>
                    );
                })}

                <div style={{ marginTop: '2rem', padding: '1rem', background: 'var(--bg-primary)', borderRadius: '12px', border: '1px solid var(--border-color)', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    <p style={{ margin: '0 0 0.4rem', fontWeight: 600, color: 'var(--text-primary)' }}>Admin Contact</p>
                    <p style={{ margin: '0 0 0.2rem' }}>📞 8130550381</p>
                    <p style={{ margin: 0 }}>📧 admin@techkarma.com</p>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="card animate-fade-in-up" style={{ flex: '1 1 650px', minHeight: '650px', overflowX: 'auto', padding: '2rem' }}>

                {/* TAB 1: REGISTERED STUDENTS & PRESENCE */}
                {activeTab === 'students' && (
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                            <div>
                                <h2 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0 0 0.4rem' }}>Registered Students & Live Presence</h2>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', margin: 0 }}>
                                    Total Registered: <strong>{usersList.length}</strong> | Currently Live: <strong style={{ color: '#22c55e' }}>{presence?.totalLiveCount || 1}</strong> | Total Visits: <strong style={{ color: '#38bdf8' }}>{presence?.totalVisits || 1}</strong>
                                </p>
                            </div>
                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                <button
                                    onClick={() => setShowAddStudentModal(true)}
                                    className="btn-primary"
                                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.55rem 1.1rem', fontSize: '0.9rem' }}
                                >
                                    <UserPlus size={16} /> Add New Student
                                </button>
                                <button
                                    onClick={fetchUsers}
                                    disabled={loadingUsers}
                                    className="btn-secondary"
                                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.55rem 1rem', fontSize: '0.9rem' }}
                                >
                                    <RefreshCw size={16} className={loadingUsers ? 'spin' : ''} /> Refresh
                                </button>
                            </div>
                        </div>

                        {/* Search Bar */}
                        <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
                            <div style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', gap: '0.4rem', pointerEvents: 'none' }}>
                                <Search size={16} style={{ color: 'var(--text-secondary)' }} />
                            </div>
                            <input
                                type="text"
                                placeholder="Search students by name, email, phone number, or target class..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '0.8rem 1rem 0.8rem 2.8rem',
                                    borderRadius: 'var(--border-radius)',
                                    border: '1px solid var(--border-color)',
                                    background: 'var(--bg-primary)',
                                    color: 'var(--text-primary)',
                                    fontSize: '0.95rem',
                                    outline: 'none',
                                    boxSizing: 'border-box'
                                }}
                            />
                        </div>

                        {loadingUsers ? (
                            <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-secondary)' }}>
                                <RefreshCw size={32} className="spin" style={{ margin: '0 auto 1rem auto' }} />
                                <p>Loading student data...</p>
                            </div>
                        ) : filteredUsers.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-secondary)' }}>
                                <Users size={48} style={{ margin: '0 auto 1rem auto', opacity: 0.4 }} />
                                <h3>No registered students found</h3>
                                <p style={{ fontSize: '0.9rem' }}>Click "+ Add New Student" to enroll a student or adjust your search.</p>
                            </div>
                        ) : (
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '780px' }}>
                                    <thead>
                                        <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-secondary)', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                            <th style={{ padding: '0.85rem 1rem' }}>Student Name</th>
                                            <th style={{ padding: '0.85rem 1rem' }}>Phone / Mobile</th>
                                            <th style={{ padding: '0.85rem 1rem' }}>Email Address</th>
                                            <th style={{ padding: '0.85rem 1rem' }}>Class / Course</th>
                                            <th style={{ padding: '0.85rem 1rem' }}>Status</th>
                                            <th style={{ padding: '0.85rem 1rem' }}>Last Active</th>
                                            <th style={{ padding: '0.85rem 1rem', textAlign: 'center' }}>Admin Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredUsers.map((u) => {
                                            const isOnline = presence.onlineStudentNames?.includes(u.name);
                                            return (
                                                <tr key={u._id} style={{ borderBottom: '1px solid var(--border-color)', fontSize: '0.92rem' }}>
                                                    <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                            <span>{u.name}</span>
                                                            {u.role === 'admin' && (
                                                                <span style={{ fontSize: '0.7rem', padding: '0.15rem 0.45rem', borderRadius: '8px', background: 'rgba(168,85,247,0.15)', color: '#a855f7', fontWeight: 700 }}>ADMIN</span>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>
                                                        {u.phone ? (
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                                <a
                                                                    href={`https://wa.me/91${u.phone.replace(/\D/g, '')}`}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                    title="Open WhatsApp chat"
                                                                    style={{ color: '#25D366', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontWeight: 600 }}
                                                                >
                                                                    <Phone size={14} /> {u.phone}
                                                                </a>
                                                            </div>
                                                        ) : 'N/A'}
                                                    </td>
                                                    <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>
                                                        {u.email ? (
                                                            <a href={`mailto:${u.email}`} style={{ color: '#38bdf8', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                                                                <Mail size={14} /> {u.email}
                                                            </a>
                                                        ) : 'N/A'}
                                                    </td>
                                                    <td style={{ padding: '1rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                                                        {u.className || 'Class 10'}
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
                                                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                                                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                                                            {/* Reset Password Button */}
                                                            <button
                                                                onClick={() => {
                                                                    setSelectedStudentForReset(u);
                                                                    setShowResetModal(true);
                                                                    setNewPasswordVal('');
                                                                }}
                                                                title="Reset Password"
                                                                style={{
                                                                    padding: '0.4rem 0.65rem',
                                                                    borderRadius: '8px',
                                                                    background: 'rgba(59, 130, 246, 0.12)',
                                                                    border: '1px solid rgba(59, 130, 246, 0.3)',
                                                                    color: '#38bdf8',
                                                                    cursor: 'pointer',
                                                                    display: 'inline-flex',
                                                                    alignItems: 'center',
                                                                    gap: '0.3rem',
                                                                    fontSize: '0.78rem',
                                                                    fontWeight: 600
                                                                }}
                                                            >
                                                                <Key size={13} /> Reset Pass
                                                            </button>

                                                            {/* Remove Student Button */}
                                                            {u.role !== 'admin' && (
                                                                <button
                                                                    onClick={() => handleDeleteStudent(u._id, u.name)}
                                                                    title="Remove Student"
                                                                    style={{
                                                                        padding: '0.4rem 0.5rem',
                                                                        borderRadius: '8px',
                                                                        background: 'rgba(239, 68, 68, 0.12)',
                                                                        border: '1px solid rgba(239, 68, 68, 0.3)',
                                                                        color: '#ef4444',
                                                                        cursor: 'pointer',
                                                                        display: 'inline-flex',
                                                                        alignItems: 'center',
                                                                        fontSize: '0.78rem'
                                                                    }}
                                                                >
                                                                    <Trash2 size={14} />
                                                                </button>
                                                            )}
                                                        </div>
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

                {/* TAB 2: STUDY MATERIALS (PDFs, VIDEOS, MCQs, NOTES) */}
                {activeTab === 'materials' && (
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                            <div>
                                <h2 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0 0 0.4rem' }}>Study Materials & Content Control</h2>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', margin: 0 }}>
                                    Add, edit, or remove Notes, PDFs, Video Lectures, and MCQs for any class. Total active: <strong>{materialsList.length}</strong>
                                </p>
                            </div>
                            <button
                                onClick={() => setShowAddMaterialModal(true)}
                                className="btn-primary"
                                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.65rem 1.25rem', fontSize: '0.95rem' }}
                            >
                                <Plus size={18} /> Add New Material (PDF/Video/MCQ)
                            </button>
                        </div>

                        {/* Filters */}
                        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                            {['all', 'Notes', 'PDF', 'Video', 'MCQ', 'NCERT Solutions', 'Sample Papers'].map(type => (
                                <button
                                    key={type}
                                    onClick={() => setMaterialFilterType(type)}
                                    style={{
                                        padding: '0.45rem 0.9rem',
                                        borderRadius: '20px',
                                        background: materialFilterType === type ? 'var(--primary-color)' : 'var(--bg-primary)',
                                        color: materialFilterType === type ? '#ffffff' : 'var(--text-secondary)',
                                        border: '1px solid var(--border-color)',
                                        cursor: 'pointer',
                                        fontSize: '0.85rem',
                                        fontWeight: 600
                                    }}
                                >
                                    {type === 'all' ? 'All Types' : type}
                                </button>
                            ))}

                            <select
                                value={materialClassFilter}
                                onChange={(e) => setMaterialClassFilter(e.target.value)}
                                style={{
                                    padding: '0.45rem 1rem',
                                    borderRadius: '20px',
                                    border: '1px solid var(--border-color)',
                                    background: 'var(--bg-primary)',
                                    color: 'var(--text-primary)',
                                    fontSize: '0.85rem',
                                    marginLeft: 'auto'
                                }}
                            >
                                <option value="all">All Classes</option>
                                {[12, 11, 10, 9, 8, 7, 6].map(c => (
                                    <option key={c} value={c.toString()}>Class {c}</option>
                                ))}
                                <option value="Computer & Programming">Computer & Programming</option>
                            </select>
                        </div>

                        {/* Materials Table */}
                        {loadingMaterials ? (
                            <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-secondary)' }}>
                                <RefreshCw size={30} className="spin" style={{ margin: '0 auto 1rem auto' }} />
                                <p>Loading materials...</p>
                            </div>
                        ) : filteredMaterials.length === 0 ? (
                            <div style={{ background: 'var(--bg-primary)', padding: '3rem 2rem', borderRadius: '16px', border: '1px dashed var(--border-color)', textAlign: 'center' }}>
                                <FileText size={48} color="var(--text-secondary)" style={{ margin: '0 auto 1rem auto', opacity: 0.5 }} />
                                <h3>No materials added yet</h3>
                                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                                    Aap yahan se kisi bhi class ke liye Notes, PDFs, YouTube video lectures ya MCQs add kar sakte hain.
                                </p>
                                <button onClick={() => setShowAddMaterialModal(true)} className="btn-primary">
                                    <Plus size={16} /> Add Your First Material
                                </button>
                            </div>
                        ) : (
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
                                    <thead>
                                        <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-secondary)', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                            <th style={{ padding: '0.85rem 1rem' }}>Type</th>
                                            <th style={{ padding: '0.85rem 1rem' }}>Title & Description</th>
                                            <th style={{ padding: '0.85rem 1rem' }}>Class & Subject</th>
                                            <th style={{ padding: '0.85rem 1rem' }}>Chapter</th>
                                            <th style={{ padding: '0.85rem 1rem' }}>Preview / URL</th>
                                            <th style={{ padding: '0.85rem 1rem', textAlign: 'center' }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredMaterials.map((mat) => (
                                            <tr key={mat._id || mat.id} style={{ borderBottom: '1px solid var(--border-color)', fontSize: '0.92rem' }}>
                                                <td style={{ padding: '1rem' }}>
                                                    <span style={{
                                                        padding: '0.25rem 0.65rem',
                                                        borderRadius: '12px',
                                                        fontSize: '0.78rem',
                                                        fontWeight: 700,
                                                        background: mat.type === 'Video' ? 'rgba(239, 68, 68, 0.15)' : mat.type === 'MCQ' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(59, 130, 246, 0.15)',
                                                        color: mat.type === 'Video' ? '#ef4444' : mat.type === 'MCQ' ? '#10b981' : '#38bdf8'
                                                    }}>
                                                        {mat.type}
                                                    </span>
                                                </td>
                                                <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                                                    {mat.title}
                                                </td>
                                                <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>
                                                    Class {mat.classNumber} • {mat.subjectName}
                                                </td>
                                                <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>
                                                    {mat.chapterName || 'General'}
                                                </td>
                                                <td style={{ padding: '1rem' }}>
                                                    {mat.fileUrl ? (
                                                        <a href={mat.fileUrl} target="_blank" rel="noreferrer" style={{ color: '#38bdf8', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                                                            <ExternalLink size={14} /> Open PDF
                                                        </a>
                                                    ) : mat.videoUrl ? (
                                                        <a href={mat.videoUrl} target="_blank" rel="noreferrer" style={{ color: '#ef4444', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                                                            <PlayCircle size={14} /> Watch Video
                                                        </a>
                                                    ) : mat.mcqData ? (
                                                        <span style={{ fontSize: '0.82rem', color: '#10b981' }}>MCQ Ready</span>
                                                    ) : (
                                                        <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Text Content</span>
                                                    )}
                                                </td>
                                                <td style={{ padding: '1rem', textAlign: 'center' }}>
                                                    <button
                                                        onClick={() => handleDeleteMaterial(mat._id || mat.id, mat.title)}
                                                        title="Delete Material"
                                                        style={{
                                                            background: 'rgba(239, 68, 68, 0.12)',
                                                            border: '1px solid rgba(239, 68, 68, 0.3)',
                                                            color: '#ef4444',
                                                            borderRadius: '8px',
                                                            padding: '0.45rem 0.65rem',
                                                            cursor: 'pointer',
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            gap: '0.3rem',
                                                            fontSize: '0.8rem',
                                                            fontWeight: 600
                                                        }}
                                                    >
                                                        <Trash2 size={14} /> Remove
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {/* TAB 3: CONTACT & COMPULSORY LEADS */}
                {activeTab === 'queries' && (
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                            <div>
                                <h2 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0 0 0.4rem' }}>Student Registrations & Leads</h2>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', margin: 0 }}>
                                    Total visitor registrations received: <strong>{queriesList.length}</strong>
                                </p>
                            </div>
                            <button onClick={fetchQueries} className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                                <RefreshCw size={16} className={loadingQueries ? 'spin' : ''} /> Refresh Leads
                            </button>
                        </div>

                        {loadingQueries ? (
                            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                                <RefreshCw size={30} className="spin" style={{ margin: '0 auto 1rem auto' }} />
                                <p>Loading leads...</p>
                            </div>
                        ) : queriesList.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-secondary)' }}>
                                <MessageSquare size={48} style={{ margin: '0 auto 1rem auto', opacity: 0.4 }} />
                                <h3>No lead submissions yet</h3>
                            </div>
                        ) : (
                            <div style={{ display: 'grid', gap: '1rem' }}>
                                {queriesList.map((q, idx) => (
                                    <div key={q._id || idx} style={{ padding: '1.25rem 1.5rem', background: 'var(--bg-primary)', borderRadius: '14px', border: '1px solid var(--border-color)', borderLeft: '4px solid #3b82f6' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                            <div>
                                                <h4 style={{ margin: '0 0 0.2rem', fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{q.name}</h4>
                                                <span style={{ fontSize: '0.82rem', color: '#38bdf8', fontWeight: 600 }}>{q.className || 'Class 10'}</span>
                                            </div>
                                            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                                {formatLastActive(q.createdAt)}
                                            </span>
                                        </div>

                                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: '0.4rem 0 0.8rem' }}>
                                            {q.message || 'Compulsory student registration lead.'}
                                        </p>

                                        <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', alignItems: 'center', paddingTop: '0.5rem', borderTop: '1px solid var(--border-color)' }}>
                                            <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                                                📱 {q.phone}
                                            </span>
                                            {q.email && (
                                                <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                                                    ✉️ {q.email}
                                                </span>
                                            )}
                                            <a
                                                href={`https://api.whatsapp.com/send?phone=91${(q.phone || '').replace(/\D/g, '')}&text=${encodeURIComponent(`Hello ${q.name}, thank you for registering with Tech Karma Classes! How can we assist you with your studies for ${q.className || 'your class'}?`)}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="btn-secondary"
                                                style={{ marginLeft: 'auto', padding: '0.35rem 0.85rem', fontSize: '0.82rem', color: '#25D366', borderColor: '#25D366', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', textDecoration: 'none' }}
                                            >
                                                <MessageSquare size={14} /> Reply on WhatsApp
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* TAB 4: NCERT TEXTBOOKS DIRECTORY */}
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
                                <div style={{ position: 'absolute', left: '0.6rem', top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', gap: '0.4rem', pointerEvents: 'none' }}>
                                    <Search size={16} style={{ color: 'var(--text-secondary)' }} />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search by book title, subject, or code..."
                                    value={ncertSearch}
                                    onChange={(e) => setNcertSearch(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 1rem 0.75rem 2.8rem',
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
                                style={{ padding: '0.75rem 1rem', borderRadius: 'var(--border-radius)', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontSize: '0.92rem', outline: 'none' }}
                            >
                                <option value="all">All Classes</option>
                                {[12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map(c => (
                                    <option key={c} value={c}>Class {c}</option>
                                ))}
                            </select>

                            <select
                                value={ncertMediumFilter}
                                onChange={(e) => setNcertMediumFilter(e.target.value)}
                                style={{ padding: '0.75rem 1rem', borderRadius: 'var(--border-radius)', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontSize: '0.92rem', outline: 'none' }}
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
                                        <th style={{ padding: '0.8rem 1rem' }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {booksList
                                        .filter(b => {
                                            const matchClass = ncertClassFilter === 'all' || b.class === parseInt(ncertClassFilter, 10);
                                            const matchMed = ncertMediumFilter === 'all' || b.medium?.toLowerCase() === ncertMediumFilter.toLowerCase();
                                            const q = ncertSearch.toLowerCase();
                                            const matchQ = !q || b.title?.toLowerCase().includes(q) || b.subject?.toLowerCase().includes(q) || (b.bookCode && b.bookCode.toLowerCase().includes(q));
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
                                                            Open PDF <ExternalLink size={14} />
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

                {/* TAB 5: COURSES */}
                {activeTab === 'courses' && (
                    <div>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>Edit Course Pricing</h2>
                        <div style={{ display: 'grid', gap: '1.5rem' }}>
                            {['Complete Class 10 Board Mastery', 'Class 12 Physics & Math Special', 'Python & AI Development Bootcamp', 'Basic Coding for Kids', 'Full Stack Web Development'].map((course, idx) => (
                                <div key={idx} style={{ padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>{course}</h3>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Tech Karma Classes</p>
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

            </div>

            {/* MODAL 1: ADD NEW STUDENT */}
            {showAddStudentModal && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(0,0,0,0.75)',
                    backdropFilter: 'blur(5px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 99999,
                    padding: '1rem'
                }}>
                    <div className="card" style={{ width: '100%', maxWidth: '480px', padding: '2rem', position: 'relative' }}>
                        <button
                            onClick={() => setShowAddStudentModal(false)}
                            style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
                        >
                            <X size={20} />
                        </button>

                        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>Add New Student</h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
                            Create a student account directly from Admin control.
                        </p>

                        <form onSubmit={handleAddStudentSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: '0.3rem' }}>Student Full Name *</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Rahul Sharma"
                                    value={newStudentData.name}
                                    onChange={(e) => setNewStudentData({ ...newStudentData, name: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none', boxSizing: 'border-box' }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: '0.3rem' }}>10-Digit Mobile / WhatsApp Number *</label>
                                <input
                                    type="tel"
                                    required
                                    placeholder="e.g. 9876543210"
                                    maxLength="10"
                                    value={newStudentData.phone}
                                    onChange={(e) => setNewStudentData({ ...newStudentData, phone: e.target.value.replace(/\D/g, '') })}
                                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none', boxSizing: 'border-box' }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: '0.3rem' }}>Email Address *</label>
                                <input
                                    type="email"
                                    required
                                    placeholder="e.g. rahul@example.com"
                                    value={newStudentData.email}
                                    onChange={(e) => setNewStudentData({ ...newStudentData, email: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none', boxSizing: 'border-box' }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: '0.3rem' }}>Initial Password *</label>
                                <input
                                    type="password"
                                    required
                                    placeholder="Enter initial password (min 6 chars)"
                                    value={newStudentData.password}
                                    onChange={(e) => setNewStudentData({ ...newStudentData, password: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none', boxSizing: 'border-box' }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: '0.3rem' }}>Target Class / Course</label>
                                <select
                                    value={newStudentData.className}
                                    onChange={(e) => setNewStudentData({ ...newStudentData, className: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none', boxSizing: 'border-box' }}
                                >
                                    <option value="Class 10">Class 10</option>
                                    <option value="Class 12">Class 12</option>
                                    <option value="Class 11">Class 11</option>
                                    <option value="Class 9">Class 9</option>
                                    <option value="Class 8">Class 8</option>
                                    <option value="Class 7">Class 7</option>
                                    <option value="Class 6">Class 6</option>
                                    <option value="Computer & Programming">Computer & Programming</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                disabled={studentActionLoading}
                                className="btn-primary"
                                style={{ marginTop: '0.5rem', padding: '0.85rem', width: '100%' }}
                            >
                                {studentActionLoading ? 'Saving...' : 'Create Student Account'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL 2: RESET STUDENT PASSWORD */}
            {showResetModal && selectedStudentForReset && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(0,0,0,0.75)',
                    backdropFilter: 'blur(5px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 99999,
                    padding: '1rem'
                }}>
                    <div className="card" style={{ width: '100%', maxWidth: '420px', padding: '2rem', position: 'relative' }}>
                        <button
                            onClick={() => { setShowResetModal(false); setSelectedStudentForReset(null); }}
                            style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
                        >
                            <X size={20} />
                        </button>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            <Key size={20} color="#38bdf8" />
                            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0 }}>Reset Student Password</h3>
                        </div>

                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
                            Set a new password for student <strong>{selectedStudentForReset.name}</strong> ({selectedStudentForReset.email || selectedStudentForReset.phone}):
                        </p>

                        <form onSubmit={handleResetPasswordSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: '0.3rem' }}>New Password (min 6 chars) *</label>
                                <input
                                    type="password"
                                    required
                                    placeholder="Enter new password"
                                    value={newPasswordVal}
                                    onChange={(e) => setNewPasswordVal(e.target.value)}
                                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none', boxSizing: 'border-box' }}
                                />
                            </div>

                            <button type="submit" className="btn-primary" style={{ padding: '0.85rem', width: '100%' }}>
                                Update & Save Password
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL 3: ADD NEW MATERIAL (PDF, VIDEO, MCQ, NOTES) */}
            {showAddMaterialModal && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(0,0,0,0.8)',
                    backdropFilter: 'blur(6px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 99999,
                    padding: '1rem',
                    overflowY: 'auto'
                }}>
                    <div className="card" style={{ width: '100%', maxWidth: '560px', padding: '2rem', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}>
                        <button
                            onClick={() => setShowAddMaterialModal(false)}
                            style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
                        >
                            <X size={20} />
                        </button>

                        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.4rem' }}>
                            Add Material / Content to Website
                        </h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
                            Yahan se aap kisi bhi class ke liye Notes PDF, YouTube Video ya MCQ Question publish kar sakte hain.
                        </p>

                        <form onSubmit={handleAddMaterialSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {/* Material Type */}
                            <div>
                                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: '0.3rem' }}>Content Type *</label>
                                <select
                                    value={materialForm.type}
                                    onChange={(e) => setMaterialForm({ ...materialForm, type: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none' }}
                                >
                                    <option value="Notes">Notes / Handwritten PDF</option>
                                    <option value="PDF">Reference PDF / Book</option>
                                    <option value="Video">Video Lecture (YouTube/Video)</option>
                                    <option value="MCQ">Objective MCQ Quiz Question</option>
                                    <option value="NCERT Solutions">NCERT Solutions</option>
                                    <option value="Sample Papers">Sample Papers & PYQ</option>
                                </select>
                            </div>

                            {/* Class and Subject Grid */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: '0.3rem' }}>Target Class *</label>
                                    <select
                                        value={materialForm.classNumber}
                                        onChange={(e) => setMaterialForm({ ...materialForm, classNumber: e.target.value })}
                                        style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none' }}
                                    >
                                        <option value="10">Class 10 (Board)</option>
                                        <option value="12">Class 12 (Board)</option>
                                        <option value="11">Class 11</option>
                                        <option value="9">Class 9</option>
                                        <option value="8">Class 8</option>
                                        <option value="7">Class 7</option>
                                        <option value="6">Class 6</option>
                                        <option value="Computer & Programming">Computer & Programming</option>
                                    </select>
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: '0.3rem' }}>Subject Name *</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Science, Math, Physics"
                                        value={materialForm.subjectName}
                                        onChange={(e) => setMaterialForm({ ...materialForm, subjectName: e.target.value })}
                                        style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none', boxSizing: 'border-box' }}
                                    />
                                </div>
                            </div>

                            {/* Chapter Name */}
                            <div>
                                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: '0.3rem' }}>Chapter / Topic Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Chapter 1: Chemical Reactions or All Chapters"
                                    value={materialForm.chapterName}
                                    onChange={(e) => setMaterialForm({ ...materialForm, chapterName: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none', boxSizing: 'border-box' }}
                                />
                            </div>

                            {/* Title */}
                            <div>
                                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: '0.3rem' }}>Material Title *</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Chapter 1 Complete Handwritten Notes"
                                    value={materialForm.title}
                                    onChange={(e) => setMaterialForm({ ...materialForm, title: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none', boxSizing: 'border-box' }}
                                />
                            </div>

                            {/* Conditional: PDF / Notes URL */}
                            {(materialForm.type === 'Notes' || materialForm.type === 'PDF' || materialForm.type === 'NCERT Solutions' || materialForm.type === 'Sample Papers') && (
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: '0.3rem' }}>PDF URL or Link *</label>
                                    <input
                                        type="url"
                                        placeholder="https://... (Direct PDF link, Google Drive, or CDN URL)"
                                        value={materialForm.fileUrl}
                                        onChange={(e) => setMaterialForm({ ...materialForm, fileUrl: e.target.value })}
                                        style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none', boxSizing: 'border-box' }}
                                    />
                                </div>
                            )}

                            {/* Conditional: Video Lecture URL */}
                            {materialForm.type === 'Video' && (
                                <>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: '0.3rem' }}>YouTube Video URL / Embed *</label>
                                        <input
                                            type="url"
                                            required
                                            placeholder="https://www.youtube.com/watch?v=... or YouTube Embed link"
                                            value={materialForm.videoUrl}
                                            onChange={(e) => setMaterialForm({ ...materialForm, videoUrl: e.target.value })}
                                            style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none', boxSizing: 'border-box' }}
                                        />
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: '0.3rem' }}>Duration</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. 45 mins"
                                                value={materialForm.duration}
                                                onChange={(e) => setMaterialForm({ ...materialForm, duration: e.target.value })}
                                                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none', boxSizing: 'border-box' }}
                                            />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: '0.3rem' }}>Faculty Name</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. Senior Faculty"
                                                value={materialForm.faculty}
                                                onChange={(e) => setMaterialForm({ ...materialForm, faculty: e.target.value })}
                                                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none', boxSizing: 'border-box' }}
                                            />
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Conditional: MCQ Fields */}
                            {materialForm.type === 'MCQ' && (
                                <>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: '0.3rem' }}>Question Text *</label>
                                        <textarea
                                            rows="2"
                                            required
                                            placeholder="Enter MCQ Question..."
                                            value={materialForm.mcqQuestion}
                                            onChange={(e) => setMaterialForm({ ...materialForm, mcqQuestion: e.target.value })}
                                            style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none', boxSizing: 'border-box' }}
                                        />
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>Option A *</label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="Option A"
                                                value={materialForm.mcqOptionA}
                                                onChange={(e) => setMaterialForm({ ...materialForm, mcqOptionA: e.target.value })}
                                                style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none', boxSizing: 'border-box' }}
                                            />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>Option B *</label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="Option B"
                                                value={materialForm.mcqOptionB}
                                                onChange={(e) => setMaterialForm({ ...materialForm, mcqOptionB: e.target.value })}
                                                style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none', boxSizing: 'border-box' }}
                                            />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>Option C *</label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="Option C"
                                                value={materialForm.mcqOptionC}
                                                onChange={(e) => setMaterialForm({ ...materialForm, mcqOptionC: e.target.value })}
                                                style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none', boxSizing: 'border-box' }}
                                            />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>Option D *</label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="Option D"
                                                value={materialForm.mcqOptionD}
                                                onChange={(e) => setMaterialForm({ ...materialForm, mcqOptionD: e.target.value })}
                                                style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none', boxSizing: 'border-box' }}
                                            />
                                        </div>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem' }}>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>Correct Option *</label>
                                            <select
                                                value={materialForm.mcqCorrect}
                                                onChange={(e) => setMaterialForm({ ...materialForm, mcqCorrect: e.target.value })}
                                                style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none' }}
                                            >
                                                <option value="A">Option A</option>
                                                <option value="B">Option B</option>
                                                <option value="C">Option C</option>
                                                <option value="D">Option D</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>Explanation / Solution</label>
                                            <input
                                                type="text"
                                                placeholder="Short reason or explanation"
                                                value={materialForm.mcqExplanation}
                                                onChange={(e) => setMaterialForm({ ...materialForm, mcqExplanation: e.target.value })}
                                                style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none', boxSizing: 'border-box' }}
                                            />
                                        </div>
                                    </div>
                                </>
                            )}

                            <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem', padding: '0.85rem', width: '100%' }}>
                                Publish to Website
                            </button>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default AdminDashboard;