import React, { useState } from 'react';
import { Upload, Users, BookOpen, Settings, FileText, Database, Plus, Trash2 } from 'lucide-react';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('materials');

    const tabs = [
        { id: 'materials', name: 'Study Materials', icon: FileText },
        { id: 'courses', name: 'Course Pricing', icon: Database },
        { id: 'queries', name: 'Contact Queries', icon: Users },
        { id: 'tests', name: 'Online Tests', icon: BookOpen },
        { id: 'settings', name: 'Settings', icon: Settings },
    ];

    return (
        <div className="section container" style={{ display: 'flex', gap: '2rem', minHeight: '80vh', alignItems: 'flex-start' }}>

            {/* Sidebar Navigation */}
            <div className="card" style={{ flex: '0 0 250px', display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '1.5rem 1rem' }}>
                <h2 style={{ fontSize: '1.2rem', padding: '0 1rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>Admin Menu</h2>
                {tabs.map(tab => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '1rem', borderRadius: 'var(--border-radius)',
                                background: isActive ? 'var(--brand-light)' : 'transparent',
                                color: isActive ? '#4f46e5' : 'var(--text-primary)',
                                fontWeight: isActive ? 700 : 500,
                                textAlign: 'left', transition: 'var(--transition-fast)'
                            }}
                        >
                            <Icon size={20} /> {tab.name}
                        </button>
                    )
                })}
            </div>

            {/* Main Content Area */}
            <div className="card animate-fade-in-up" style={{ flex: 1, minHeight: '600px' }}>

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
                                    <td style={{ padding: '1rem' }}><button style={{ color: '#ef4444', background: 'none' }}><Trash2 size={18} /></button></td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                                    <td style={{ padding: '1rem', fontWeight: 500 }}>Chemical Bonding MCQ</td>
                                    <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Class 11 Sci - Chemistry</td>
                                    <td style={{ padding: '1rem' }}><span style={{ background: '#d1fae5', color: '#10b981', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.85rem' }}>MCQ</span></td>
                                    <td style={{ padding: '1rem' }}><button style={{ color: '#ef4444', background: 'none' }}><Trash2 size={18} /></button></td>
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

export default AdminDashboard;
