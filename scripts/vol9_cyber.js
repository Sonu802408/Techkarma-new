const getHandwrittenStyles = require('./styles');

module.exports = function generateCyberNotesHTML() {
    const primaryColor = '#10b981'; // Emerald for Cyber Security

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Cyber Security — Complete Handwritten Notes</title>
    <style>
        ${getHandwrittenStyles(primaryColor)}
    </style>
</head>
<body>
<div class="notebook-container">
    <div class="cover-page">
        <div>
            <div class="cover-title-badge">Advanced Tech Series • B.Tech CSE</div>
            <h1 class="cover-title">CYBER SECURITY & ETHICAL HACKING</h1>
            <div class="cover-subtitle">Complete Professional Handwritten Notes</div>
            <p style="font-family: 'Kalam', cursive; font-size: 16px; color: #475569; max-width: 480px; margin: 0 auto;">
                Network Defense, Penetration Testing, Cryptography, OWASP Top 10 & Security Architecture
            </p>
        </div>
        <div class="cover-features">
            <div class="cover-feature-item">✓ CIA Triad & Threat Modeling</div>
            <div class="cover-feature-item">✓ Asymmetric & Symmetric Cryptography</div>
            <div class="cover-feature-item">✓ OWASP Top 10 Web Vulnerabilities</div>
            <div class="cover-feature-item">✓ Wireshark & Nmap Reconnaissance</div>
        </div>
        <div class="cover-footer">Designed for Security Audits & CEH / CompTIA Certifications</div>
    </div>

    <h1>CHAPTER 1: PRINCIPLES OF CYBER SECURITY</h1>
    <div class="concept-card">
        <div class="concept-title">💡 The CIA Triad</div>
        <p>Confidentiality, Integrity, and Availability form the core model of security policy development.</p>
    </div>
</div>
</body>
</html>
    `;
};
