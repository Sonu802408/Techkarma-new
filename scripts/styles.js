module.exports = function getHandwrittenStyles(titleColor = '#2563eb') {
    return `
    @import url('https://fonts.googleapis.com/css2?family=Kalam:wght@300;400;700&family=Patrick+Hand&family=Fira+Code:wght@400;600&display=swap');

    @page {
        size: A4 portrait;
        margin: 16mm 12mm 16mm 12mm;
    }

    * {
        box-sizing: border-box;
    }

    body {
        font-family: 'Patrick Hand', 'Kalam', cursive;
        font-size: 15px;
        line-height: 1.6;
        color: #1e293b;
        background-color: #fcfbf7;
        background-image: repeating-linear-gradient(transparent, transparent 29px, #e2e8f0 30px);
        margin: 0;
        padding: 0;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
    }

    .notebook-container {
        padding: 10px 15px;
        border-left: 2px solid #f87171;
        margin-left: 10px;
        min-height: 100vh;
    }

    /* Cover Page */
    .cover-page {
        height: 92vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        text-align: center;
        border: 4px dashed ${titleColor};
        border-radius: 20px;
        padding: 40px 20px;
        background: #ffffff;
        box-shadow: 6px 6px 0px rgba(0,0,0,0.06);
        page-break-after: always;
    }

    .cover-title-badge {
        background: ${titleColor};
        color: white;
        padding: 6px 24px;
        border-radius: 30px;
        font-family: 'Kalam', cursive;
        font-size: 14px;
        font-weight: 700;
        letter-spacing: 2px;
        text-transform: uppercase;
    }

    .cover-title {
        font-family: 'Kalam', cursive;
        font-size: 38px;
        font-weight: 700;
        color: #0f172a;
        margin: 20px 0 10px 0;
        line-height: 1.2;
    }

    .cover-subtitle {
        font-family: 'Kalam', cursive;
        font-size: 20px;
        color: ${titleColor};
        margin-bottom: 20px;
    }

    .cover-features {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
        width: 100%;
        max-width: 500px;
        margin: 20px 0;
        text-align: left;
    }

    .cover-feature-item {
        background: #f8fafc;
        border: 1.5px solid #cbd5e1;
        border-radius: 10px;
        padding: 10px 14px;
        font-size: 14px;
        font-family: 'Kalam', cursive;
        color: #334155;
    }

    .cover-footer {
        font-family: 'Kalam', cursive;
        font-size: 14px;
        color: #64748b;
        border-top: 2px dashed #cbd5e1;
        padding-top: 15px;
        width: 100%;
    }

    /* Headings */
    h1, h2, h3, h4 {
        font-family: 'Kalam', cursive;
        color: #0f172a;
        margin-top: 22px;
        margin-bottom: 10px;
    }

    h1 {
        font-size: 26px;
        border-bottom: 2.5px solid ${titleColor};
        padding-bottom: 4px;
        color: ${titleColor};
        page-break-before: always;
    }

    h1:first-of-type {
        page-break-before: auto;
    }

    h2 {
        font-size: 21px;
        color: #1e293b;
        border-left: 4px solid ${titleColor};
        padding-left: 10px;
    }

    h3 {
        font-size: 17px;
        color: #334155;
    }

    /* Section Structure Boxes */
    .concept-card {
        background: #ffffff;
        border: 2px solid #cbd5e1;
        border-radius: 14px;
        padding: 18px;
        margin: 22px 0;
        box-shadow: 4px 4px 0px #e2e8f0;
        page-break-inside: avoid;
    }

    .concept-title {
        font-family: 'Kalam', cursive;
        font-size: 20px;
        font-weight: 700;
        color: ${titleColor};
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        gap: 8px;
        border-bottom: 1.5px dashed #cbd5e1;
        padding-bottom: 6px;
    }

    .step-block {
        margin-bottom: 12px;
    }

    .step-heading {
        font-family: 'Kalam', cursive;
        font-weight: 700;
        font-size: 15px;
        color: #0f172a;
        margin-bottom: 4px;
    }

    /* Callout Boxes */
    .exam-tip {
        background: #fef9c3;
        border: 2px dashed #ca8a04;
        border-radius: 10px;
        padding: 12px 16px;
        margin: 14px 0;
        font-family: 'Kalam', cursive;
        color: #713f12;
        page-break-inside: avoid;
    }

    .interview-tip {
        background: #eff6ff;
        border: 2px solid #3b82f6;
        border-radius: 10px;
        padding: 12px 16px;
        margin: 14px 0;
        font-family: 'Kalam', cursive;
        color: #1e40af;
        page-break-inside: avoid;
    }

    .common-mistake {
        background: #fef2f2;
        border: 2px solid #ef4444;
        border-radius: 10px;
        padding: 12px 16px;
        margin: 14px 0;
        font-family: 'Kalam', cursive;
        color: #991b1b;
        page-break-inside: avoid;
    }

    .remember-box {
        background: #f0fdf4;
        border: 2px solid #22c55e;
        border-radius: 10px;
        padding: 12px 16px;
        margin: 14px 0;
        font-family: 'Kalam', cursive;
        color: #14532d;
        page-break-inside: avoid;
    }

    /* Code Snippets */
    .code-box {
        background: #0f172a;
        color: #f8fafc;
        font-family: 'Fira Code', monospace;
        font-size: 13px;
        line-height: 1.5;
        padding: 14px 18px;
        border-radius: 10px;
        border-left: 4px solid ${titleColor};
        margin: 12px 0;
        white-space: pre-wrap;
        overflow-x: auto;
        page-break-inside: avoid;
    }

    .output-box {
        background: #1e293b;
        color: #4ade80;
        font-family: 'Fira Code', monospace;
        font-size: 12.5px;
        padding: 10px 14px;
        border-radius: 8px;
        margin: 8px 0;
        border: 1px solid #334155;
        page-break-inside: avoid;
    }

    /* Tables */
    table {
        width: 100%;
        border-collapse: collapse;
        margin: 16px 0;
        font-family: 'Kalam', cursive;
        font-size: 14.5px;
        background: #ffffff;
        border-radius: 8px;
        overflow: hidden;
        border: 2px solid #cbd5e1;
        page-break-inside: avoid;
    }

    th {
        background: ${titleColor};
        color: #ffffff;
        padding: 10px 12px;
        text-align: left;
        font-weight: 700;
    }

    td {
        padding: 9px 12px;
        border-bottom: 1px solid #e2e8f0;
        color: #334155;
    }

    tr:nth-child(even) {
        background: #f8fafc;
    }

    /* Diagrams & Visuals */
    .diagram-container {
        background: #ffffff;
        border: 2px dashed #94a3b8;
        border-radius: 12px;
        padding: 16px;
        margin: 18px 0;
        text-align: center;
        page-break-inside: avoid;
    }

    .diagram-title {
        font-family: 'Kalam', cursive;
        font-weight: 700;
        color: #475569;
        font-size: 14px;
        margin-bottom: 10px;
    }

    /* Mind Map Styling */
    .mindmap-box {
        background: #ffffff;
        border: 2.5px solid ${titleColor};
        border-radius: 14px;
        padding: 20px;
        margin: 20px 0;
        font-family: 'Kalam', cursive;
        page-break-inside: avoid;
    }

    .mindmap-tree {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .mindmap-node {
        background: #f1f5f9;
        border: 1.5px solid #94a3b8;
        border-radius: 8px;
        padding: 8px 14px;
        font-weight: 700;
        color: #0f172a;
        display: inline-block;
    }

    .mindmap-subnodes {
        margin-left: 24px;
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 6px;
    }

    .mindmap-subnode {
        background: #ffffff;
        border: 1px solid #cbd5e1;
        border-radius: 6px;
        padding: 4px 10px;
        font-size: 13.5px;
        color: #475569;
    }

    /* Table of Contents */
    .toc-container {
        background: #ffffff;
        border: 2px dashed ${titleColor};
        border-radius: 14px;
        padding: 24px;
        margin: 24px 0;
        page-break-after: always;
    }

    .toc-title {
        font-family: 'Kalam', cursive;
        font-size: 24px;
        font-weight: 700;
        color: ${titleColor};
        text-align: center;
        margin-bottom: 16px;
        border-bottom: 2px solid ${titleColor};
        padding-bottom: 6px;
    }

    .toc-item {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        padding: 8px 0;
        border-bottom: 1px dashed #e2e8f0;
        font-family: 'Kalam', cursive;
        font-size: 15px;
    }

    .toc-dots {
        flex: 1;
        border-bottom: 2px dotted #cbd5e1;
        margin: 0 10px;
    }

    /* Viva & Interview Section */
    .qa-box {
        background: #ffffff;
        border: 1.5px solid #cbd5e1;
        border-radius: 10px;
        padding: 12px 16px;
        margin: 10px 0;
        page-break-inside: avoid;
    }

    .qa-question {
        font-family: 'Kalam', cursive;
        font-weight: 700;
        color: ${titleColor};
        font-size: 15px;
        margin-bottom: 4px;
    }

    .qa-answer {
        font-family: 'Patrick Hand', cursive;
        color: #334155;
        font-size: 14.5px;
    }

    /* Page Footer Header */
    .header-bar {
        display: flex;
        justify-content: space-between;
        font-family: 'Kalam', cursive;
        font-size: 12px;
        color: #94a3b8;
        border-bottom: 1px solid #e2e8f0;
        padding-bottom: 4px;
        margin-bottom: 14px;
    }
    `;
};
