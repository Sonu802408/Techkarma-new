import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';

const PDF_DIR = path.resolve('public/pdfs');

if (!fs.existsSync(PDF_DIR)) {
    fs.mkdirSync(PDF_DIR, { recursive: true });
}

// Helper to download external PDF
async function downloadFile(url, dest) {
    try {
        console.log(`Downloading: ${url}`);
        const res = await fetch(url, {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const buffer = await res.arrayBuffer();
        fs.writeFileSync(dest, Buffer.from(buffer));
        console.log(`Saved: ${dest} (${buffer.byteLength} bytes)`);
        return true;
    } catch (err) {
        console.warn(`Download failed for ${url} (${err.message}). Will generate custom high-res PDF.`);
        return false;
    }
}

// Template for Tech Karma Branded PDFs
function generateHtmlDoc({ subject, category, chapterTitle, chapterNo, contentHtml, badge = 'CBSE 2025-26 Standard' }) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <style>
        @page {
            size: A4;
            margin: 20mm 15mm 20mm 15mm;
            @bottom-right {
                content: "Page " counter(page) " of " counter(pages);
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                font-size: 9pt;
                color: #64748b;
            }
        }
        * { box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            color: #1e293b;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            font-size: 10.5pt;
        }
        .header-card {
            border: 2px solid #4f46e5;
            background: linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%);
            border-radius: 12px;
            padding: 16px 20px;
            margin-bottom: 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .brand-title {
            font-size: 18pt;
            font-weight: 800;
            color: #4338ca;
            margin: 0;
            letter-spacing: -0.5px;
        }
        .brand-sub {
            font-size: 9pt;
            color: #64748b;
            margin: 2px 0 0 0;
            font-weight: 600;
        }
        .badge {
            background: #4f46e5;
            color: #ffffff;
            font-size: 8.5pt;
            font-weight: 700;
            padding: 6px 14px;
            border-radius: 20px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .meta-strip {
            background: #f1f5f9;
            border-left: 4px solid #4f46e5;
            padding: 10px 14px;
            margin-bottom: 20px;
            font-size: 10pt;
            font-weight: 600;
            color: #334155;
            display: flex;
            justify-content: space-between;
        }
        .chapter-title {
            font-size: 15pt;
            font-weight: 700;
            color: #0f172a;
            border-bottom: 2px solid #e2e8f0;
            padding-bottom: 6px;
            margin: 18px 0 14px 0;
        }
        .q-card {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 14px 16px;
            margin-bottom: 16px;
            page-break-inside: avoid;
        }
        .q-num {
            font-weight: 700;
            color: #4f46e5;
            font-size: 11pt;
            margin-bottom: 6px;
        }
        .q-text {
            font-weight: 600;
            color: #1e293b;
            margin-bottom: 10px;
        }
        .options-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
            margin-bottom: 10px;
        }
        .opt-item {
            background: #f8fafc;
            border: 1px solid #cbd5e1;
            border-radius: 6px;
            padding: 6px 10px;
            font-size: 9.5pt;
        }
        .ans-box {
            background: #f0fdf4;
            border-left: 3px solid #16a34a;
            padding: 8px 12px;
            border-radius: 4px;
            font-size: 9.5pt;
            color: #14532d;
            margin-top: 8px;
        }
        .solution-box {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-left: 3px solid #3b82f6;
            padding: 10px 14px;
            border-radius: 6px;
            margin-top: 8px;
            font-size: 9.5pt;
            white-space: pre-line;
            color: #1e293b;
            line-height: 1.5;
        }
        .formula-tag {
            display: inline-block;
            background: #eef2ff;
            color: #4338ca;
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 8.5pt;
            font-weight: 600;
            margin-top: 6px;
        }
        .footer-note {
            margin-top: 30px;
            text-align: center;
            font-size: 8.5pt;
            color: #94a3b8;
            border-top: 1px solid #e2e8f0;
            padding-top: 10px;
        }
    </style>
</head>
<body>
    <div class="header-card">
        <div>
            <h1 class="brand-title">TECH KARMA CLASSES</h1>
            <p class="brand-sub">Excellence in Senior Secondary Science & Mathematics</p>
        </div>
        <div class="badge">${badge}</div>
    </div>

    <div class="meta-strip">
        <span>Class 12 • ${subject} • ${category}</span>
        <span>${chapterNo ? 'Chapter ' + chapterNo : 'Comprehensive Resource'}</span>
    </div>

    <h2 class="chapter-title">${chapterTitle}</h2>

    ${contentHtml}

    <div class="footer-note">
        © Tech Karma Classes • Verified Educational Portal • Designed for CBSE Board Exams & Competitive Prep
    </div>
</body>
</html>
    `;
}

// Generate PDF from HTML using Puppeteer
async function renderPdf(browser, html, outputPath) {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    await page.pdf({
        path: outputPath,
        format: 'A4',
        printBackground: true,
        margin: { top: '15mm', right: '12mm', bottom: '15mm', left: '12mm' }
    });
    await page.close();
    console.log(`Generated PDF: ${outputPath}`);
}

export {
    PDF_DIR,
    downloadFile,
    generateHtmlDoc,
    renderPdf
};
