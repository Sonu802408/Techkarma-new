import fs from 'fs';
import path from 'path';
import puppeteer from '../frontend/node_modules/puppeteer/lib/esm/puppeteer/puppeteer.js';

// Base64 helper
function getBase64Image(filePath) {
    if (fs.existsSync(filePath)) {
        const fileBuffer = fs.readFileSync(filePath);
        const ext = path.extname(filePath).replace('.', '');
        return `data:image/${ext};base64,${fileBuffer.toString('base64')}`;
    }
    return '';
}

const logoBase64 = getBase64Image('d:/Techkarma/frontend/src/assets/logo.png');
const heroBase64 = getBase64Image('d:/Techkarma/frontend/src/assets/hero_illustration.png');

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>TechKarma - Comprehensive Project Report & Viva Guide</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap');

  :root {
    --primary: #4f46e5;
    --primary-light: #6366f1;
    --primary-dark: #3730a3;
    --secondary: #0ea5e9;
    --accent: #8b5cf6;
    --success: #10b981;
    --warning: #f59e0b;
    --danger: #ef4444;
    --dark: #0f172a;
    --dark-surface: #1e293b;
    --light-bg: #f8fafc;
    --card-border: #e2e8f0;
    --text-main: #1e293b;
    --text-muted: #64748b;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
    color: var(--text-main);
    background-color: #ffffff;
    line-height: 1.6;
    font-size: 13.5px;
  }

  .page {
    width: 210mm;
    min-height: 297mm;
    padding: 22mm 20mm;
    margin: 0 auto;
    position: relative;
    background: #ffffff;
    page-break-after: always;
    box-sizing: border-box;
  }

  .page:last-child {
    page-break-after: avoid;
  }

  /* Cover Page Styling */
  .cover-page {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: linear-gradient(145deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%);
    color: #ffffff;
    padding: 26mm 22mm;
  }

  .cover-header {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .cover-logo {
    height: 60px;
    filter: drop-shadow(0 4px 12px rgba(99, 102, 241, 0.4));
  }

  .cover-tagline {
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #818cf8;
  }

  .cover-hero-box {
    margin: 20px 0;
    text-align: center;
  }

  .cover-hero-img {
    max-height: 220px;
    filter: drop-shadow(0 15px 30px rgba(0, 0, 0, 0.6));
    border-radius: 16px;
  }

  .cover-title-group h1 {
    font-size: 34px;
    font-weight: 800;
    line-height: 1.15;
    background: linear-gradient(135deg, #ffffff 30%, #a5b4fc 70%, #38bdf8 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 12px;
  }

  .cover-title-group p {
    font-size: 16px;
    color: #cbd5e1;
    max-width: 650px;
    line-height: 1.5;
  }

  .cover-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 18px;
  }

  .cover-badge {
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.18);
    backdrop-filter: blur(8px);
    padding: 6px 14px;
    border-radius: 50px;
    font-size: 11.5px;
    font-weight: 600;
    color: #e2e8f0;
  }

  .cover-meta {
    border-top: 1px solid rgba(255, 255, 255, 0.15);
    padding-top: 18px;
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #94a3b8;
  }

  .cover-meta strong {
    color: #ffffff;
  }

  /* Section Styles */
  .section-title {
    font-size: 20px;
    font-weight: 800;
    color: var(--dark);
    margin-bottom: 14px;
    padding-bottom: 6px;
    border-bottom: 2.5px solid var(--primary);
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .section-title .icon-pill {
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    color: #ffffff;
    width: 28px;
    height: 28px;
    border-radius: 8px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: bold;
  }

  .lead-text {
    font-size: 13.5px;
    color: #475569;
    margin-bottom: 14px;
  }

  /* Mind Map Diagram */
  .mindmap-container {
    background: linear-gradient(145deg, #0f172a, #1e293b);
    border-radius: 16px;
    padding: 20px;
    color: #ffffff;
    margin: 16px 0;
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  }

  .mindmap-center {
    background: linear-gradient(135deg, #4f46e5, #06b6d4);
    padding: 12px 20px;
    border-radius: 12px;
    text-align: center;
    font-size: 15px;
    font-weight: 800;
    letter-spacing: 0.5px;
    box-shadow: 0 6px 20px rgba(79, 70, 229, 0.5);
    margin-bottom: 20px;
    border: 1px solid rgba(255,255,255,0.25);
  }

  .mindmap-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }

  .mindmap-node {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 10px;
    padding: 12px;
    transition: all 0.2s ease;
  }

  .mindmap-node.c-blue { border-top: 3.5px solid #38bdf8; }
  .mindmap-node.c-green { border-top: 3.5px solid #34d399; }
  .mindmap-node.c-purple { border-top: 3.5px solid #c084fc; }
  .mindmap-node.c-amber { border-top: 3.5px solid #fbbf24; }
  .mindmap-node.c-rose { border-top: 3.5px solid #fb7185; }
  .mindmap-node.c-indigo { border-top: 3.5px solid #818cf8; }

  .mindmap-node-title {
    font-size: 13px;
    font-weight: 700;
    margin-bottom: 6px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .mindmap-node ul {
    list-style: none;
    font-size: 11px;
    color: #cbd5e1;
  }

  .mindmap-node ul li {
    padding: 2px 0;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .mindmap-node ul li::before {
    content: "•";
    color: var(--secondary);
    font-weight: bold;
  }

  /* Grid layouts */
  .grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
    margin: 12px 0;
  }

  .grid-3 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin: 12px 0;
  }

  /* Cards */
  .card {
    background: #ffffff;
    border: 1px solid var(--card-border);
    border-radius: 12px;
    padding: 14px;
    box-shadow: 0 3px 8px rgba(0,0,0,0.03);
  }

  .card-highlight {
    background: #f8fafc;
    border-left: 4px solid var(--primary);
  }

  .card-title {
    font-size: 13.5px;
    font-weight: 700;
    color: var(--dark);
    margin-bottom: 6px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  /* Tables */
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 12px;
    margin: 12px 0;
    background: #ffffff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 6px rgba(0,0,0,0.02);
  }

  th, td {
    padding: 9px 12px;
    text-align: left;
    border-bottom: 1px solid #f1f5f9;
  }

  th {
    background: #f1f5f9;
    color: #334155;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 11px;
    letter-spacing: 0.5px;
  }

  tr:nth-child(even) {
    background: #f8fafc;
  }

  .pill {
    display: inline-block;
    padding: 2.5px 8px;
    border-radius: 4px;
    font-size: 10.5px;
    font-weight: 700;
    text-transform: uppercase;
  }

  .pill-get { background: #e0f2fe; color: #0369a1; }
  .pill-post { background: #dcfce7; color: #15803d; }
  .pill-put { background: #fef3c7; color: #b45309; }
  .pill-delete { background: #fee2e2; color: #b91c1c; }

  /* Callout boxes */
  .callout {
    padding: 12px 14px;
    border-radius: 10px;
    margin: 12px 0;
    font-size: 12.5px;
    display: flex;
    gap: 10px;
    align-items: flex-start;
  }

  .callout-info {
    background: #eff6ff;
    border: 1px solid #bfdbfe;
    color: #1e40af;
  }

  .callout-success {
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
    color: #166534;
  }

  .callout-warning {
    background: #fffbeb;
    border: 1px solid #fde68a;
    color: #92400e;
  }

  .callout-icon {
    font-size: 16px;
    line-height: 1;
    margin-top: 1px;
  }

  /* Code block */
  .code-snippet {
    background: #0f172a;
    color: #e2e8f0;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    padding: 10px 14px;
    border-radius: 8px;
    margin: 8px 0;
    overflow-x: auto;
    line-height: 1.45;
    border: 1px solid #334155;
  }

  /* Architecture SVG Diagram */
  .arch-diagram {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 16px;
    margin: 14px 0;
    text-align: center;
  }

  .footer-meta {
    position: absolute;
    bottom: 12mm;
    left: 20mm;
    right: 20mm;
    display: flex;
    justify-content: space-between;
    font-size: 10.5px;
    color: #94a3b8;
    border-top: 1px solid #e2e8f0;
    padding-top: 6px;
  }
</style>
</head>
<body>

<!-- PAGE 1: COVER PAGE -->
<div class="page cover-page">
  <div class="cover-header">
    ${logoBase64 ? `<img src="${logoBase64}" class="cover-logo" alt="TechKarma Logo" />` : ''}
    <div>
      <div class="cover-tagline">Academic Project Report & Viva Dossier</div>
      <div style="font-size: 18px; font-weight: 700; color: #ffffff;">TECH KARMA CLASSES</div>
    </div>
  </div>

  <div class="cover-hero-box">
    ${heroBase64 ? `<img src="${heroBase64}" class="cover-hero-img" alt="TechKarma Illustration" />` : ''}
  </div>

  <div class="cover-title-group">
    <h1>Full-Stack EdTech Web Application</h1>
    <p>A unified educational platform integrating CBSE Class 6–12 academic curricula, professional programming courses, automated test series, real-time presence telemetry, and cloud-optimized study materials.</p>
    
    <div class="cover-badges">
      <span class="cover-badge">⚛️ React 18 + Vite 5</span>
      <span class="cover-badge">🟢 Node.js + Express REST API</span>
      <span class="cover-badge">🍃 MongoDB + Mongoose</span>
      <span class="cover-badge">⚡ Socket.io Real-Time Engine</span>
      <span class="cover-badge">🔐 JWT & bcrypt Security</span>
      <span class="cover-badge">☁️ Cloud CDN Storage</span>
    </div>
  </div>

  <div class="cover-meta">
    <div>
      <strong>Project Name:</strong> Tech Karma Classes (TechKarma)<br>
      <strong>Domain:</strong> Educational Technology (EdTech) / Full-Stack Web Architecture
    </div>
    <div style="text-align: right;">
      <strong>Purpose:</strong> College Project Submission & Viva Defense<br>
      <strong>Developer:</strong> Sonu Kumar | Academic Session 2026
    </div>
  </div>
</div>

<!-- PAGE 2: EXECUTIVE SUMMARY & VISUAL MIND MAP -->
<div class="page">
  <div class="section-title">
    <span class="icon-pill">1</span>
    Executive Summary & Visual Mind Map
  </div>

  <p class="lead-text">
    <strong>Tech Karma Classes</strong> is an end-to-end educational web application engineered to bridge standard school curricula (CBSE Classes 6 to 12) with industry-relevant computer science education (C, C++, Java, Web Dev, Python, AI/ML, Cloud, and Cybersecurity).
  </p>

  <div class="mindmap-container">
    <div class="mindmap-center">
      🧠 TECHKARMA SYSTEM ECOSYSTEM & ARCHITECTURE
    </div>
    <div class="mindmap-grid">
      <div class="mindmap-node c-blue">
        <div class="mindmap-node-title" style="color: #38bdf8;">🖥️ Client Presentation (React 18)</div>
        <ul>
          <li>Vite 5 Lightning Fast HMR</li>
          <li>React Router DOM (SPA Routing)</li>
          <li>15 Dynamic Themes (LocalStorage)</li>
          <li>Lucide React Modern Iconography</li>
          <li>Marked (Rich Markdown Parsing)</li>
        </ul>
      </div>

      <div class="mindmap-node c-green">
        <div class="mindmap-node-title" style="color: #34d399;">⚙️ Application Logic (Express.js)</div>
        <ul>
          <li>Modular RESTful API Endpoints</li>
          <li>Stateless JWT Authentication</li>
          <li>Role-Based Access Control (RBAC)</li>
          <li>Multer File Upload Middleware</li>
          <li>Auto-Grading Examination Engine</li>
        </ul>
      </div>

      <div class="mindmap-node c-purple">
        <div class="mindmap-node-title" style="color: #c084fc;">🗄️ Database Layer (MongoDB)</div>
        <ul>
          <li>Flexible Document Schema (Mongoose)</li>
          <li>User, Course, Material, Exam Collections</li>
          <li>Nested Arrays for Syllabus & MCQs</li>
          <li>Indexed Email & Phone Constraints</li>
          <li>BSON Native Binary Performance</li>
        </ul>
      </div>

      <div class="mindmap-node c-amber">
        <div class="mindmap-node-title" style="color: #fbbf24;">⚡ Real-Time Telemetry (Socket.io)</div>
        <ul>
          <li>Bi-directional Full-Duplex WebSockets</li>
          <li>Multi-Tab Client De-duplication</li>
          <li>Live Student Online Presence</li>
          <li>Automatic Reconnection Resilience</li>
          <li>Broadcast Channel to Admin Panel</li>
        </ul>
      </div>

      <div class="mindmap-node c-rose">
        <div class="mindmap-node-title" style="color: #fb7185;">☁️ Automation & Cloud CDN</div>
        <ul>
          <li>Puppeteer Automated PDF Renderers</li>
          <li>PyMuPDF (150 DPI) Compression</li>
          <li>Hugging Face CDN Object Storage</li>
          <li>1-Click High-Speed Downloads</li>
          <li>Zero Server Bandwidth Choke</li>
        </ul>
      </div>

      <div class="mindmap-node c-indigo">
        <div class="mindmap-node-title" style="color: #818cf8;">🛡️ Security & Ops (DevOps)</div>
        <ul>
          <li>bcryptjs (Salted Cryptographic Hash)</li>
          <li>CORS Cross-Origin Policy Protection</li>
          <li>Serverless Architecture (Vercel)</li>
          <li>Nodemon & Hot Module Reload</li>
          <li>Dotenv Environment Isolation</li>
        </ul>
      </div>
    </div>
  </div>

  <div class="grid-2">
    <div class="card card-highlight">
      <div class="card-title">🎯 Primary Problem Addressed</div>
      <p style="font-size: 12px; color: #475569;">
        Existing educational sites are either restricted purely to school boards or exclusively to tech courses. Students are forced to juggle between multiple platforms, deal with broken download links, and pay exorbitant fees. TechKarma unifies school and coding curricula into a single high-speed platform.
      </p>
    </div>
    <div class="card card-highlight" style="border-left-color: var(--secondary);">
      <div class="card-title">💡 Key Technical Innovations</div>
      <p style="font-size: 12px; color: #475569;">
        Offloaded 200MB+ PDF documents to a cloud storage CDN, automated exam scoring with zero server state, engineered multi-tab session deduplication via WebSockets, and implemented 15 instant-switching CSS variable themes.
      </p>
    </div>
  </div>

  <div class="footer-meta">
    <span>Tech Karma Classes - Comprehensive Technical Dossier</span>
    <span>Page 2</span>
  </div>
</div>

<!-- PAGE 3: FULL TECH STACK BREAKDOWN & JUSTIFICATIONS -->
<div class="page">
  <div class="section-title">
    <span class="icon-pill">2</span>
    Comprehensive Tech Stack & Justifications
  </div>

  <p class="lead-text">
    Every technology, library, and runtime in this project was selected after evaluating performance benchmarks, bundle size impacts, and developer ergonomics:
  </p>

  <table>
    <thead>
      <tr>
        <th style="width: 22%;">Technology</th>
        <th style="width: 23%;">Role / Layer</th>
        <th>Engineering Justification ("Why Used?")</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>React 18</strong></td>
        <td>Client UI Framework</td>
        <td>Declarative component-based architecture allowed reusable modules (e.g. <code>McqViewer</code>, <code>ClassCard</code>, <code>Navbar</code>). Virtual DOM guarantees optimal re-rendering.</td>
      </tr>
      <tr>
        <td><strong>Vite 5</strong></td>
        <td>Build Tool & Dev Bundler</td>
        <td>Replaced legacy Webpack/CRA. Employs native ES Modules (ESM) to deliver sub-second hot-module replacement (HMR) and optimized Rollup production builds.</td>
      </tr>
      <tr>
        <td><strong>React Router v6</strong></td>
        <td>SPA Client Routing</td>
        <td>Enables fluid, zero-page-reload navigation across deep routes (<code>/notes</code>, <code>/courses</code>, <code>/admin</code>) with synchronized history restoration.</td>
      </tr>
      <tr>
        <td><strong>Node.js & Express</strong></td>
        <td>Server Runtime & REST API</td>
        <td>Non-blocking asynchronous I/O event loop handles high-concurrency student queries with minimal memory footprint. Clean middleware pipelines for auth and logging.</td>
      </tr>
      <tr>
        <td><strong>MongoDB & Mongoose</strong></td>
        <td>NoSQL Document Store</td>
        <td>Flexible JSON-like BSON documents naturally map to deeply nested academic structures (e.g. exams with questions and dynamic answer indices) without relational schema rigidity.</td>
      </tr>
      <tr>
        <td><strong>Socket.io</strong></td>
        <td>Real-Time WebSockets</td>
        <td>Full-duplex persistent connection between client and server for live telemetry (online student count) with automatic fallback to long-polling when needed.</td>
      </tr>
      <tr>
        <td><strong>JWT & bcryptjs</strong></td>
        <td>Authentication & Hashing</td>
        <td>bcrypt hashes passwords with cryptographic salt rounds. JWT ensures stateless authorization where user session is cryptographically signed and stored on client.</td>
      </tr>
      <tr>
        <td><strong>Multer</strong></td>
        <td>Multipart File Handling</td>
        <td>Parses <code>multipart/form-data</code> file uploads directly on the server with mime-type validation to safely store administrative PDF notes.</td>
      </tr>
      <tr>
        <td><strong>Puppeteer (Chrome CDP)</strong></td>
        <td>Headless Automation</td>
        <td>Automates headless Chromium instances to programmatically render styled HTML syllabus into high-precision, standard A4 formatted educational PDFs.</td>
      </tr>
      <tr>
        <td><strong>PyMuPDF (fitz)</strong></td>
        <td>Python Compression Engine</td>
        <td>Downsamples embedded image DPI to 150 and re-encodes pages with 70% JPEG compression, slashing PDF file weights by 75-80% without losing text crispness.</td>
      </tr>
      <tr>
        <td><strong>Hugging Face Datasets</strong></td>
        <td>Cloud Object CDN</td>
        <td>Hosts hundreds of megabytes of downloadable notes completely free of charge, avoiding GitHub repository bloat and Vercel 50MB serverless bundle limits.</td>
      </tr>
      <tr>
        <td><strong>CSS3 Custom Variables</strong></td>
        <td>Theming Engine</td>
        <td>15 cohesive color palettes dynamically injected via <code>data-theme</code> attribute and synced to <code>localStorage</code>, eliminating bulky CSS frameworks.</td>
      </tr>
    </tbody>
  </table>

  <div class="callout callout-info">
    <span class="callout-icon">💡</span>
    <div>
      <strong>Examiner Insight:</strong> If asked why MERN Stack was favored over traditional LAMP (Linux, Apache, MySQL, PHP) or Django/PostgreSQL, explain that <em>JavaScript ubiquity across both client and server reduces context switching</em>, and <em>MongoDB's document model represents JSON payloads with zero object-relational mapping impedance</em>.
    </div>
  </div>

  <div class="footer-meta">
    <span>Tech Karma Classes - Comprehensive Technical Dossier</span>
    <span>Page 3</span>
  </div>
</div>

<!-- PAGE 4: END-TO-END SYSTEM ARCHITECTURE & API CATALOG -->
<div class="page">
  <div class="section-title">
    <span class="icon-pill">3</span>
    System Architecture & Complete API Catalog
  </div>

  <div class="arch-diagram">
    <svg width="100%" height="150" viewBox="0 0 700 150" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Client Box -->
      <rect x="10" y="25" width="130" height="95" rx="8" fill="#EEF2FF" stroke="#4F46E5" stroke-width="2"/>
      <text x="75" y="55" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="12" fill="#1E1B4B" text-anchor="middle">CLIENT LAYER</text>
      <text x="75" y="75" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" fill="#4338CA" text-anchor="middle">React 18 (Vite)</text>
      <text x="75" y="92" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" fill="#6366F1" text-anchor="middle">Port 5173 / Browser</text>

      <!-- Arrow Client to Server -->
      <path d="M140 55 L220 55" stroke="#4F46E5" stroke-width="2" marker-end="url(#arrow)"/>
      <text x="180" y="47" font-size="8.5" fill="#4F46E5" text-anchor="middle" font-weight="600">REST API (HTTP)</text>

      <path d="M220 85 L140 85" stroke="#0EA5E9" stroke-width="2" stroke-dasharray="4 4"/>
      <text x="180" y="100" font-size="8.5" fill="#0EA5E9" text-anchor="middle" font-weight="600">Socket.io (WS)</text>

      <!-- Express Server Box -->
      <rect x="220" y="20" width="160" height="105" rx="8" fill="#F0FDF4" stroke="#16A34A" stroke-width="2"/>
      <text x="300" y="48" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="12" fill="#14532D" text-anchor="middle">SERVER / BACKEND</text>
      <text x="300" y="68" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" fill="#15803D" text-anchor="middle">Node.js + Express (5000)</text>
      <text x="300" y="85" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" fill="#166534" text-anchor="middle">JWT Guard & Multer</text>
      <text x="300" y="102" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" fill="#166534" text-anchor="middle">Socket Engine & Presence</text>

      <!-- Arrow Server to DB -->
      <path d="M380 55 L460 55" stroke="#16A34A" stroke-width="2"/>
      <text x="420" y="47" font-size="8.5" fill="#16A34A" text-anchor="middle" font-weight="600">Mongoose ODM</text>

      <!-- Arrow Server to CDN -->
      <path d="M380 85 L460 115" stroke="#D97706" stroke-width="2"/>
      <text x="420" y="112" font-size="8.5" fill="#D97706" text-anchor="middle" font-weight="600">Offloaded</text>

      <!-- Database Box -->
      <rect x="460" y="25" width="115" height="60" rx="8" fill="#FAF5FF" stroke="#9333EA" stroke-width="2"/>
      <text x="517" y="48" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="11" fill="#581C87" text-anchor="middle">MONGODB</text>
      <text x="517" y="65" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" fill="#7E22CE" text-anchor="middle">Users, Exams, Courses</text>

      <!-- Cloud CDN Box -->
      <rect x="460" y="95" width="115" height="45" rx="8" fill="#FFFBEB" stroke="#D97706" stroke-width="2"/>
      <text x="517" y="115" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="10" fill="#78350F" text-anchor="middle">CLOUD CDN (HF)</text>
      <text x="517" y="130" font-family="'Plus Jakarta Sans', sans-serif" font-size="8.5" fill="#B45309" text-anchor="middle">PDF Storage & Vault</text>

      <!-- Direct Client Download Link -->
      <path d="M120 120 C 180 155, 420 155, 460 125" stroke="#D97706" stroke-width="1.5" stroke-dasharray="3 3"/>
      <text x="270" y="145" font-size="8.5" fill="#B45309" text-anchor="middle" font-weight="600">Direct 1-Click High-Speed Download Stream</text>
    </svg>
  </div>

  <h3 style="font-size: 14px; margin-bottom: 8px;">Detailed REST API Specifications</h3>
  <table>
    <thead>
      <tr>
        <th>Method</th>
        <th>Endpoint Path</th>
        <th>Access Level</th>
        <th>Purpose & Request Payload</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><span class="pill pill-post">POST</span></td>
        <td><code>/api/auth/register</code></td>
        <td>Public</td>
        <td>Registers student. Validates unique email/phone, hashes password with bcrypt.</td>
      </tr>
      <tr>
        <td><span class="pill pill-post">POST</span></td>
        <td><code>/api/auth/login</code></td>
        <td>Public</td>
        <td>Authenticates credentials, compares hash, signs & returns 30-day JWT.</td>
      </tr>
      <tr>
        <td><span class="pill pill-get">GET</span></td>
        <td><code>/api/auth/users</code></td>
        <td>Admin Only</td>
        <td>Fetches registered students telemetry and last-activity timestamps.</td>
      </tr>
      <tr>
        <td><span class="pill pill-get">GET</span></td>
        <td><code>/api/courses</code></td>
        <td>Public</td>
        <td>Retrieves summer courses and bootcamps with fees and highlights.</td>
      </tr>
      <tr>
        <td><span class="pill pill-post">POST</span></td>
        <td><code>/api/courses</code></td>
        <td>Admin Only</td>
        <td>Creates course record with syllabus, thumbnail, and pricing.</td>
      </tr>
      <tr>
        <td><span class="pill pill-get">GET</span></td>
        <td><code>/api/materials</code></td>
        <td>Public</td>
        <td>Filters study materials by subject, class grade, or content type.</td>
      </tr>
      <tr>
        <td><span class="pill pill-post">POST</span></td>
        <td><code>/api/materials</code></td>
        <td>Admin Only</td>
        <td>Accepts <code>multipart/form-data</code> to upload new documents via Multer.</td>
      </tr>
      <tr>
        <td><span class="pill pill-get">GET</span></td>
        <td><code>/api/exams</code></td>
        <td>Public</td>
        <td>Fetches test series according to subject ID and difficulty (Easy/Medium/Hard).</td>
      </tr>
      <tr>
        <td><span class="pill pill-post">POST</span></td>
        <td><code>/api/exams/:id/submit</code></td>
        <td>Student Token</td>
        <td>Validates answers against DB answers array, grades score, returns %.</td>
      </tr>
      <tr>
        <td><span class="pill pill-post">POST</span></td>
        <td><code>/api/queries</code></td>
        <td>Public</td>
        <td>Accepts admission/counseling inquiries from public prospective leads.</td>
      </tr>
      <tr>
        <td><span class="pill pill-get">GET</span></td>
        <td><code>/api/stats</code></td>
        <td>Public</td>
        <td>Returns aggregated platform metrics (total registered students, page hits).</td>
      </tr>
    </tbody>
  </table>

  <div class="footer-meta">
    <span>Tech Karma Classes - Comprehensive Technical Dossier</span>
    <span>Page 4</span>
  </div>
</div>

<!-- PAGE 5: CORE SYSTEM MODULES & FUNCTION WALKTHROUGH -->
<div class="page">
  <div class="section-title">
    <span class="icon-pill">4</span>
    Core Functionalities & Mechanics
  </div>

  <div class="grid-2">
    <!-- Module 1: Download Vault -->
    <div class="card">
      <div class="card-title">📥 1. High-Speed PDF Material Vault</div>
      <p style="font-size: 12px; color: #475569; margin-bottom: 8px;">
        <strong>Mechanism:</strong> Instead of loading hefty files into local server memory, materials are mapped in <code>pdfManifest.json</code> and linked directly to an optimized Cloud CDN (Hugging Face Datasets).
      </p>
      <div class="code-snippet">
&lt;a href={\`https://huggingface.co/datasets/.../\${note.file}\`}
   target="_blank" rel="noreferrer" className="btn btn-primary"&gt;
   &lt;Download size={16} /&gt; Download PDF
&lt;/a&gt;
      </div>
      <p style="font-size: 11.5px; color: #64748b;">
        <strong>Benefit:</strong> 0% server CPU strain, instantaneous parallel downloads, and zero risk of bandwidth bottlenecking.
      </p>
    </div>

    <!-- Module 2: Online Examination System -->
    <div class="card">
      <div class="card-title">⏱️ 2. Automated Online Exam Engine</div>
      <p style="font-size: 12px; color: #475569; margin-bottom: 8px;">
        <strong>Mechanism:</strong> Built as a 3-stage finite state machine: <code>setup</code> &rarr; <code>active</code> &rarr; <code>result</code>.
      </p>
      <ul style="font-size: 11.5px; color: #475569; padding-left: 16px; margin-bottom: 8px;">
        <li>Countdown timer managed via non-drifting <code>useEffect</code> intervals.</li>
        <li>Automatic trigger on timer expiration (forces instant submission).</li>
        <li>Anti-Cheat: Questions are displayed on client, but <strong>answer verification is performed exclusively on the server</strong>.</li>
      </ul>
      <div class="code-snippet">
exam.questions.forEach((q, idx) => {
  totalMarks += q.marks || 1;
  if (userAnswers[idx] === q.correctOptionIndex) score += q.marks || 1;
});
      </div>
    </div>

    <!-- Module 3: Socket.io Live Presence -->
    <div class="card">
      <div class="card-title">⚡ 3. Real-Time Telemetry & Presence</div>
      <p style="font-size: 12px; color: #475569; margin-bottom: 8px;">
        <strong>Mechanism:</strong> Bi-directional WebSocket channels synchronize active user count to the Admin Dashboard.
      </p>
      <ul style="font-size: 11.5px; color: #475569; padding-left: 16px;">
        <li>Maintains dual state maps: <code>socketUserMap</code> & <code>activeUsersMap</code>.</li>
        <li><strong>Multi-Tab De-duplication:</strong> A user opening 5 browser tabs is counted as 1 distinct student using a <code>Set&lt;socketId&gt;</code>.</li>
        <li>Emits <code>livePresenceUpdate</code> on connect, identification, and disconnect events.</li>
      </ul>
    </div>

    <!-- Module 4: Dynamic Theming -->
    <div class="card">
      <div class="card-title">🎨 4. 15-Theme Dynamic Engine</div>
      <p style="font-size: 12px; color: #475569; margin-bottom: 8px;">
        <strong>Mechanism:</strong> Pure CSS variables configured on the <code>:root</code> element, controlled via custom React state and <code>localStorage</code>.
      </p>
      <ul style="font-size: 11.5px; color: #475569; padding-left: 16px;">
        <li>Themes: Dark, Light, Cyberpunk, Luxury Gold, Dracula, etc.</li>
        <li>Zero FOUC (Flash of Unstyled Content) achieved by synchronizing attributes inside <code>useLayoutEffect</code> prior to screen paint.</li>
      </ul>
    </div>
  </div>

  <div class="card" style="margin-top: 14px; background: #f8fafc;">
    <div class="card-title">🛒 5. Course Catalog & Admission Inquiry Pipeline</div>
    <p style="font-size: 12px; color: #475569;">
      <strong>End-to-End Flow:</strong> A student browsing <code>Courses.jsx</code> evaluates discounted pricing (original vs. offer), course duration, and feature bullets. Clicking <strong>"Enroll Now"</strong> transitions the user to <code>Admission.jsx</code> with pre-filled course context. Upon submission, the record is committed to MongoDB (<code>Query</code> collection) and flagged as <code>Pending</code>. The administrative team can inspect, triage, and mark inquiries as <code>Resolved</code> within <code>AdminDashboard.jsx</code>.
    </p>
  </div>

  <div class="footer-meta">
    <span>Tech Karma Classes - Comprehensive Technical Dossier</span>
    <span>Page 5</span>
  </div>
</div>

<!-- PAGE 6: PRODUCTION CHALLENGES & VIVA DEFENSE GUIDE -->
<div class="page">
  <div class="section-title">
    <span class="icon-pill">5</span>
    Engineering Challenges & Viva Defense
  </div>

  <h3 style="font-size: 13.5px; margin-bottom: 8px; color: var(--dark);">Case Studies in Technical Problem Solving</h3>

  <div class="callout callout-warning">
    <span class="callout-icon">⚠️</span>
    <div>
      <strong>Problem 1: Hefty PDF File Sizes & Cloud Host Limits (&gt;200 MB)</strong><br>
      <em>Issue:</em> Handwritten scans and Puppeteer exports exceeded Git push limits (100MB) and Vercel serverless payload restrictions (50MB).<br>
      <em>Resolution:</em> Built a Python pipeline using <code>PyMuPDF</code> (<code>compress_all.py</code>) to render pages at 150 DPI and 70% JPEG quality, dropping sizes by 75%. Scripted <code>upload_all_to_hf.py</code> to offload storage to Hugging Face Cloud CDN.
    </div>
  </div>

  <div class="callout callout-warning">
    <span class="callout-icon">⚠️</span>
    <div>
      <strong>Problem 2: Cross-Origin Resource Sharing (CORS) Blockade</strong><br>
      <em>Issue:</em> Browser security blocked React (port 5173) from requesting Node (port 5000).<br>
      <em>Resolution:</em> Configured <code>cors()</code> middleware in Express and established a development proxy inside <code>vite.config.js</code> under <code>/api</code>.
    </div>
  </div>

  <div class="callout callout-warning">
    <span class="callout-icon">⚠️</span>
    <div>
      <strong>Problem 3: Single Page Application (SPA) 404 on Direct Route Refresh</strong><br>
      <em>Issue:</em> Visiting <code>/notes</code> directly on production returned 404 because Vercel sought a physical file.<br>
      <em>Resolution:</em> Formulated a URL rewrite manifest in <code>vercel.json</code> routing all wildcard paths (<code>/(.*)</code>) to <code>index.html</code>.
    </div>
  </div>

  <h3 style="font-size: 14px; margin: 14px 0 8px; color: var(--dark);">Top 6 Viva Questions & High-Impact Answers</h3>

  <div style="font-size: 12px; color: #334155;">
    <p style="margin-bottom: 8px;">
      <strong>Q1. Why did you choose MongoDB over a relational database like MySQL?</strong><br>
      <em>Answer:</em> "Our educational domain involves heterogeneous, deeply nested data—such as dynamic MCQ options, variable course feature lists, and chapter syllabi. MongoDB’s document model represents these JSON structures natively without requiring costly multi-table SQL joins."
    </p>

    <p style="margin-bottom: 8px;">
      <strong>Q2. How is authentication made stateless using JWT?</strong><br>
      <em>Answer:</em> "Instead of persisting user session states inside server memory, the server signs a cryptographically verifiable JSON Web Token containing the user's ID and role. The client includes this token in the <code>Authorization: Bearer</code> header, which the backend verifies using a secret key without any database lookup."
    </p>

    <p style="margin-bottom: 8px;">
      <strong>Q3. What is the advantage of Socket.io over standard HTTP polling?</strong><br>
      <em>Answer:</em> "HTTP polling requires continuous, repetitive request-response handshakes that consume bandwidth and CPU. Socket.io establishes a persistent, full-duplex TCP WebSocket connection, allowing the server to push real-time telemetry instantly with minimal latency."
    </p>

    <p style="margin-bottom: 8px;">
      <strong>Q4. How do you prevent cheating in your online examination engine?</strong><br>
      <em>Answer:</em> "Although questions and options are served to the client, the correct answer indices are kept strictly confidential on the backend. When a student submits their choices, grading and mark tallying occur in the Express controller, preventing any inspect-element tampering."
    </p>

    <p style="margin-bottom: 8px;">
      <strong>Q5. How do you prevent ghost connection counts in Socket.io?</strong><br>
      <em>Answer:</em> "We map each user ID to a <code>Set</code> of socket IDs. If a student opens three tabs, all three sockets belong to the same set. The student is marked offline only when the set becomes empty (i.e. every tab is closed)."
    </p>
  </div>

  <div class="footer-meta">
    <span>Tech Karma Classes - Comprehensive Technical Dossier</span>
    <span>Page 6</span>
  </div>
</div>

<!-- PAGE 7: BRANDING ENGINEERING & 3D INTERACTIVE LOGO ARCHITECTURE -->
<div class="page">
  <div class="section-title">
    <span class="icon-pill">6</span>
    Branding Engineering & 3D Interactive Logo Architecture
  </div>

  <p class="lead-text">
    A step-by-step technical breakdown of how the brand identity was upgraded, mathematically pre-processed to remove raster checkerboard artifacts, integrated across all UI search bars, and transformed into an interactive 3-D physics-based element:
  </p>

  <div class="grid-2">
    <!-- Step 1 -->
    <div class="card card-highlight">
      <div class="card-title">🐍 1. Algorithmic Background Extraction (Python)</div>
      <p style="font-size: 11.5px; color: #475569; margin-bottom: 6px;">
        <strong>The Problem:</strong> The raw uploaded emblem was an RGB JPEG containing a simulated checkerboard transparency grid. Placing it directly resulted in unsightly gray/white square artifacts.
      </p>
      <p style="font-size: 11.5px; color: #475569; margin-bottom: 6px;">
        <strong>The Algorithm:</strong> Engineered a <em>Breadth-First Search (BFS) Flood Fill</em> in Python using NumPy and PIL. Starting strictly from the outer boundaries, pixels were evaluated for chromatic grayness:
      </p>
      <div class="code-snippet">
is_gray = (|R-G| &lt; 18) & (|G-B| &lt; 18) & (R &gt; 125)
# Boundary BFS traverses only outer background
arr[visited_mask, 3] = 0 # True Alpha Channel
      </div>
      <p style="font-size: 11px; color: #64748b;">
        Protected the internal emblem pixels (white book pages, code brackets) while stripping 240,000+ exterior pixels into an authentic transparent 32-bit RGBA PNG.
      </p>
    </div>

    <!-- Step 2 -->
    <div class="card card-highlight" style="border-left-color: var(--secondary);">
      <div class="card-title">🌐 2. Multi-Resolution Favicon & Cache-Busting</div>
      <p style="font-size: 11.5px; color: #475569; margin-bottom: 6px;">
        <strong>The Problem:</strong> Web browsers aggressively cache tab favicons inside internal memory caches, ignoring standard file replacements.
      </p>
      <p style="font-size: 11.5px; color: #475569; margin-bottom: 6px;">
        <strong>The Resolution:</strong>
      </p>
      <ul style="font-size: 11px; color: #475569; padding-left: 14px; margin-bottom: 6px;">
        <li>Generated mipmapped <code>favicon.ico</code> packaging 16x16, 32x32, 48x48, and 64x64 resolutions.</li>
        <li>Injected explicit HTTP cache-busting version query parameters into <code>index.html</code>:</li>
      </ul>
      <div class="code-snippet">
&lt;link rel="icon" sizes="32x32" href="/logo.png?v=20261004b" /&gt;
&lt;link rel="shortcut icon" href="/favicon.ico?v=20261004b" /&gt;
      </div>
      <p style="font-size: 11px; color: #64748b;">
        Guaranteed instant browser cache invalidation and instantaneous tab icon refreshes across Chrome, Edge, and mobile viewports.
      </p>
    </div>
  </div>

  <div class="grid-2">
    <!-- Step 3 -->
    <div class="card card-highlight" style="border-left-color: var(--accent);">
      <div class="card-title">🔍 3. Cross-Platform Search Bar Integration</div>
      <p style="font-size: 11.5px; color: #475569; margin-bottom: 6px;">
        Integrated the emblem directly into user interaction points:
      </p>
      <ul style="font-size: 11px; color: #475569; padding-left: 14px;">
        <li><strong>Study Material Vault (<code>/notes</code>):</strong> Embedded a glowing 32px circular emblem within the search input with adjusted left padding (<code>3.8rem</code>).</li>
        <li><strong>Admin Telemetry (<code>/admin</code>):</strong> Injected miniature brand badges into Student & NCERT book search inputs.</li>
        <li><strong>Footer & Login Card:</strong> Replaced generic graduation cap SVGs with the high-resolution brand badge.</li>
      </ul>
    </div>

    <!-- Step 4 -->
    <div class="card card-highlight" style="border-left-color: var(--success);">
      <div class="card-title">🕹️ 4. 3-D Interactive Flex & Mouse Physics</div>
      <p style="font-size: 11.5px; color: #475569; margin-bottom: 6px;">
        <strong>Dynamic Mouse Parallax:</strong> Implemented real-time cursor tracking in React:
      </p>
      <div class="code-snippet">
const rotX = ((centerY - y) / centerY) * 24;
const rotY = ((x - centerX) / centerX) * 24;
// Transforms in 3D perspective space:
transform: perspective(800px) rotateX(\${rotX}deg) 
           rotateY(\${rotY}deg) scale3d(1.18, 1.18, 1.18) 
           translateZ(28px);
      </div>
      <p style="font-size: 11px; color: #64748b;">
        Paired with continuous idle floating keyframe physics (<code>@keyframes logo3dFloat</code>) and dynamic cyan/neon drop-shadow aura for an authentic 3D holographic feel.
      </p>
    </div>
  </div>

  <div class="callout callout-success" style="margin-top: 14px;">
    <span class="callout-icon">✅</span>
    <div>
      <strong>Examiner Takeaway:</strong> Demonstrates practical proficiency in combining <em>computer graphics pre-processing</em> (Python/Pillow), <em>browser performance caching</em> (HTTP headers), and <em>modern CSS3 3D Matrix Mathematics</em> with React event-driven UI state.
    </div>
  </div>

  <div class="footer-meta">
    <span>Tech Karma Classes - Comprehensive Technical Dossier</span>
    <span>Page 7</span>
  </div>
</div>

</body>
</html>
`;

async function generatePDF() {
    console.log('Launching headless browser via Puppeteer...');
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });

    const page = await browser.newPage();
    console.log('Setting HTML content...');
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    const outputPath = 'd:/Techkarma/TechKarma_Project_Report_And_Viva_Guide.pdf';
    console.log('Rendering PDF to:', outputPath);

    await page.pdf({
        path: outputPath,
        format: 'A4',
        printBackground: true,
        margin: {
            top: '0mm',
            bottom: '0mm',
            left: '0mm',
            right: '0mm'
        }
    });

    await browser.close();
    console.log('SUCCESS: PDF generated successfully at:', outputPath);
}

generatePDF().catch(err => {
    console.error('ERROR generating PDF:', err);
    process.exit(1);
});
