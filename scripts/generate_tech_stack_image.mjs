import fs from 'fs';
import path from 'path';
import puppeteer from '../frontend/node_modules/puppeteer/lib/esm/puppeteer/puppeteer.js';

// Helper to get base64 image
function getBase64Image(filePath) {
    if (fs.existsSync(filePath)) {
        const fileBuffer = fs.readFileSync(filePath);
        const ext = path.extname(filePath).replace('.', '');
        return `data:image/${ext};base64,${fileBuffer.toString('base64')}`;
    }
    return '';
}

const logoBase64 = getBase64Image('d:/Techkarma/frontend/public/logo.png');

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Tech Karma Classes - Stack Architecture</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    width: 1920px;
    height: 1080px;
    background: #070a13;
    font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
    color: #f1f5f9;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 50px 70px;
    position: relative;
    overflow: hidden;
  }

  /* Ambient Glow Backgrounds */
  .glow-1 {
    position: absolute;
    width: 650px;
    height: 650px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(99, 102, 241, 0.16) 0%, transparent 70%);
    top: -150px;
    left: -100px;
    pointer-events: none;
  }

  .glow-2 {
    position: absolute;
    width: 750px;
    height: 750px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(14, 165, 233, 0.14) 0%, transparent 70%);
    top: -100px;
    right: -150px;
    pointer-events: none;
  }

  .glow-3 {
    position: absolute;
    width: 700px;
    height: 700px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, transparent 70%);
    bottom: -150px;
    left: 30%;
    pointer-events: none;
  }

  /* Grid pattern overlay */
  .grid-pattern {
    position: absolute;
    inset: 0;
    background-image: linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
    background-size: 40px 40px;
    pointer-events: none;
  }

  /* Header Section */
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    z-index: 10;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    padding-bottom: 24px;
  }

  .brand-group {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .brand-logo {
    height: 68px;
    filter: drop-shadow(0 0 20px rgba(99, 102, 241, 0.5));
  }

  .brand-title {
    font-size: 32px;
    font-weight: 800;
    letter-spacing: -0.5px;
    background: linear-gradient(135deg, #ffffff 40%, #94a3b8 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .brand-subtitle {
    font-size: 15px;
    font-weight: 600;
    color: #38bdf8;
    letter-spacing: 1.5px;
    text-transform: uppercase;
  }

  .pill-badge {
    background: rgba(99, 102, 241, 0.15);
    border: 1px solid rgba(99, 102, 241, 0.35);
    padding: 8px 20px;
    border-radius: 9999px;
    font-size: 13px;
    font-weight: 700;
    color: #a5b4fc;
    letter-spacing: 0.5px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .pill-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #22c55e;
    box-shadow: 0 0 8px #22c55e;
  }

  /* Main Architecture Grid */
  .arch-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 24px;
    position: relative;
    z-index: 10;
    margin: 28px 0;
  }

  .card {
    background: rgba(15, 23, 42, 0.65);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 26px 28px;
    position: relative;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.35);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 28px;
    right: 28px;
    height: 3px;
    border-radius: 3px;
  }

  /* Distinct Accent Colors */
  .card-react::before { background: linear-gradient(90deg, #38bdf8, #0ea5e9); }
  .card-react { border-color: rgba(56, 189, 248, 0.25); }

  .card-node::before { background: linear-gradient(90deg, #22c55e, #16a34a); }
  .card-node { border-color: rgba(34, 197, 94, 0.25); }

  .card-mongo::before { background: linear-gradient(90deg, #10b981, #059669); }
  .card-mongo { border-color: rgba(16, 185, 129, 0.25); }

  .card-socket::before { background: linear-gradient(90deg, #f59e0b, #d97706); }
  .card-socket { border-color: rgba(245, 158, 11, 0.25); }

  .card-vercel::before { background: linear-gradient(90deg, #818cf8, #6366f1); }
  .card-vercel { border-color: rgba(129, 140, 248, 0.25); }

  .card-cdn::before { background: linear-gradient(90deg, #06b6d4, #0891b2); }
  .card-cdn { border-color: rgba(6, 182, 212, 0.25); }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 14px;
  }

  .card-icon-box {
    width: 48px;
    height: 48px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
  }

  .card-react .card-icon-box { background: rgba(56, 189, 248, 0.15); color: #38bdf8; }
  .card-node .card-icon-box { background: rgba(34, 197, 94, 0.15); color: #22c55e; }
  .card-mongo .card-icon-box { background: rgba(16, 185, 129, 0.15); color: #10b981; }
  .card-socket .card-icon-box { background: rgba(245, 158, 11, 0.15); color: #f59e0b; }
  .card-vercel .card-icon-box { background: rgba(129, 140, 248, 0.15); color: #818cf8; }
  .card-cdn .card-icon-box { background: rgba(6, 182, 212, 0.15); color: #06b6d4; }

  .card-tier {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #94a3b8;
  }

  .card-title {
    font-size: 20px;
    font-weight: 800;
    color: #ffffff;
    margin-top: 2px;
  }

  .card-tech-badge {
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    font-weight: 600;
    padding: 3px 10px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.08);
    color: #cbd5e1;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .card-features {
    list-style: none;
    margin: 14px 0;
  }

  .card-features li {
    font-size: 13.5px;
    color: #cbd5e1;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .card-features li::before {
    content: '▹';
    color: #38bdf8;
    font-size: 14px;
    font-weight: bold;
  }

  .card-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 10px;
  }

  .tag {
    font-size: 11px;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.05);
    color: #94a3b8;
    border: 1px solid rgba(255, 255, 255, 0.08);
  }

  /* Footer KPI Bar */
  .footer-kpis {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 20px;
    position: relative;
    z-index: 10;
    background: rgba(15, 23, 42, 0.7);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    padding: 16px 28px;
  }

  .kpi-item {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .kpi-icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.06);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
  }

  .kpi-title {
    font-size: 14px;
    font-weight: 700;
    color: #ffffff;
  }

  .kpi-subtitle {
    font-size: 11.5px;
    color: #94a3b8;
  }
</style>
</head>
<body>

<div class="glow-1"></div>
<div class="glow-2"></div>
<div class="glow-3"></div>
<div class="grid-pattern"></div>

<!-- HEADER -->
<div class="header">
  <div class="brand-group">
    ${logoBase64 ? `<img src="${logoBase64}" class="brand-logo" alt="Logo" />` : ''}
    <div>
      <div class="brand-subtitle">System Architecture & Tech Stack</div>
      <div class="brand-title">TECH KARMA CLASSES</div>
    </div>
  </div>
  <div class="pill-badge">
    <span class="pill-dot"></span>
    PRODUCTION MERN STACK ECOSYSTEM
  </div>
</div>

<!-- 6-CARD ARCHITECTURE GRID -->
<div class="arch-grid">

  <!-- 1. Frontend -->
  <div class="card card-react">
    <div>
      <div class="card-header">
        <div>
          <div class="card-tier">Tier 1 · Client Presentation</div>
          <div class="card-title">Frontend UI</div>
        </div>
        <div class="card-icon-box">⚛️</div>
      </div>
      <span class="card-tech-badge">React 18 + Vite 5</span>
      <ul class="card-features">
        <li>Single Page Application (SPA Routing)</li>
        <li>Sub-second Hot Module Replacement</li>
        <li>15 Dynamic Themes with LocalStorage</li>
        <li>Lucide React Clean Iconography</li>
      </ul>
    </div>
    <div class="card-tags">
      <span class="tag">React Router DOM</span>
      <span class="tag">Vite HMR</span>
      <span class="tag">CSS3 Variables</span>
    </div>
  </div>

  <!-- 2. Backend API -->
  <div class="card card-node">
    <div>
      <div class="card-header">
        <div>
          <div class="card-tier">Tier 2 · Application Logic</div>
          <div class="card-title">Backend REST API</div>
        </div>
        <div class="card-icon-box">🟢</div>
      </div>
      <span class="card-tech-badge">Node.js + Express.js</span>
      <ul class="card-features">
        <li>Modular RESTful API Endpoints</li>
        <li>Stateless JWT Bearer Token Auth</li>
        <li>bcryptjs Salted Password Hashing</li>
        <li>Multer Document Upload Engine</li>
      </ul>
    </div>
    <div class="card-tags">
      <span class="tag">Express.js</span>
      <span class="tag">JWT Auth</span>
      <span class="tag">bcryptjs</span>
      <span class="tag">MVC Pattern</span>
    </div>
  </div>

  <!-- 3. Database Layer -->
  <div class="card card-mongo">
    <div>
      <div class="card-header">
        <div>
          <div class="card-tier">Tier 3 · Data Persistence</div>
          <div class="card-title">Database Layer</div>
        </div>
        <div class="card-icon-box">🍃</div>
      </div>
      <span class="card-tech-badge">MongoDB + Mongoose</span>
      <ul class="card-features">
        <li>Flexible BSON Document Schemas</li>
        <li>Indexed Student & Course Catalogs</li>
        <li>Atomic Transactions & Query Filters</li>
        <li>Nested Arrays for MCQs & Syllabi</li>
      </ul>
    </div>
    <div class="card-tags">
      <span class="tag">MongoDB Atlas</span>
      <span class="tag">Mongoose ODM</span>
      <span class="tag">BSON Schemas</span>
    </div>
  </div>

  <!-- 4. Realtime Telemetry -->
  <div class="card card-socket">
    <div>
      <div class="card-header">
        <div>
          <div class="card-tier">Tier 4 · Real-Time Telemetry</div>
          <div class="card-title">Live Presence Engine</div>
        </div>
        <div class="card-icon-box">⚡</div>
      </div>
      <span class="card-tech-badge">Socket.io (WebSockets)</span>
      <ul class="card-features">
        <li>Bi-directional Full-Duplex WebSockets</li>
        <li>Real-Time Live Online Students Count</li>
        <li>Smart Multi-Tab De-duplication</li>
        <li>Broadcast Channel to Admin Panel</li>
      </ul>
    </div>
    <div class="card-tags">
      <span class="tag">Socket.io</span>
      <span class="tag">WebSockets</span>
      <span class="tag">Real-Time Sync</span>
    </div>
  </div>

  <!-- 5. Cloud Gateway -->
  <div class="card card-vercel">
    <div>
      <div class="card-header">
        <div>
          <div class="card-tier">Tier 5 · Deployment & Edge</div>
          <div class="card-title">Serverless Hosting</div>
        </div>
        <div class="card-icon-box">▲</div>
      </div>
      <span class="card-tech-badge">Vercel Cloud Platform</span>
      <ul class="card-features">
        <li>Unified Domain (techkarmaclasses.vercel.app)</li>
        <li>Auto Route Gateway (<code>vercel.json</code>)</li>
        <li>Zero-CORS Internal Reverse Proxy</li>
        <li>Global Edge CDN Asset Distribution</li>
      </ul>
    </div>
    <div class="card-tags">
      <span class="tag">Serverless Functions</span>
      <span class="tag">Edge Network</span>
      <span class="tag">Auto-Deploy</span>
    </div>
  </div>

  <!-- 6. Automation & Alerts -->
  <div class="card card-cdn">
    <div>
      <div class="card-header">
        <div>
          <div class="card-tier">Tier 6 · Cloud CDN & Alerts</div>
          <div class="card-title">CDN & Lead Bot</div>
        </div>
        <div class="card-icon-box">☁️</div>
      </div>
      <span class="card-tech-badge">Cloud CDN + WhatsApp Bot</span>
      <ul class="card-features">
        <li>Offloaded Heavy PDFs (HuggingFace/R2)</li>
        <li>0% Server Bandwidth Bottleneck</li>
        <li>Instant Admin Alert via CallMeBot API</li>
        <li>Puppeteer Automated Scrapers</li>
      </ul>
    </div>
    <div class="card-tags">
      <span class="tag">HuggingFace CDN</span>
      <span class="tag">WhatsApp Service</span>
      <span class="tag">Puppeteer</span>
    </div>
  </div>

</div>

<!-- FOOTER METRICS -->
<div class="footer-kpis">
  <div class="kpi-item">
    <div class="kpi-icon">⚡</div>
    <div>
      <div class="kpi-title">&lt; 1.2s Fast FCP</div>
      <div class="kpi-subtitle">Vite 5 & Edge Caching</div>
    </div>
  </div>
  <div class="kpi-item">
    <div class="kpi-icon">🔐</div>
    <div>
      <div class="kpi-title">Stateless Security</div>
      <div class="kpi-subtitle">JWT + Bcrypt Password Hash</div>
    </div>
  </div>
  <div class="kpi-item">
    <div class="kpi-icon">👥</div>
    <div>
      <div class="kpi-title">Live User Telemetry</div>
      <div class="kpi-subtitle">Socket.io Bi-directional Sync</div>
    </div>
  </div>
  <div class="kpi-item">
    <div class="kpi-icon">💰</div>
    <div>
      <div class="kpi-title">Zero Server Choke</div>
      <div class="kpi-subtitle">Decoupled Cloud CDN Storage</div>
    </div>
  </div>
</div>

</body>
</html>
`;

async function renderImage() {
    console.log('Launching Puppeteer browser...');
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    const outputPath = 'd:/Techkarma/TechKarma_Tech_Stack_Architecture.png';
    console.log('Rendering high-res infographic screenshot to:', outputPath);

    await page.screenshot({
        path: outputPath,
        type: 'png',
        clip: { x: 0, y: 0, width: 1920, height: 1080 }
    });

    await browser.close();
    console.log('SUCCESS! Infographic created at:', outputPath);
}

renderImage().catch(err => {
    console.error('Render error:', err);
    process.exit(1);
});
