const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

// Directory containing markdown files
const brainDir = "C:\\Users\\sonuk\\.gemini\\antigravity\\brain\\3d92ef3c-ae16-44ad-ae6a-0861391ab347";
const pdfDir = path.join(__dirname, 'public', 'pdfs');

if (!fs.existsSync(pdfDir)) {
    fs.mkdirSync(pdfDir, { recursive: true });
}

// Find all targeted markdown files
const files = fs.readdirSync(brainDir).filter(f => f.startsWith('class_10_science_ch') && f.endsWith('.md') && f !== 'class_10_science_life_processes_notes.md');

async function generateBatch() {
    console.log(`Found ${files.length} markdown file(s) to process.`);
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });

    for (const file of files) {
        // Extract chapter number from filename (e.g., class_10_science_ch6_notes.md)
        const match = file.match(/ch(\d+)/);
        if (!match) continue;
        const chNum = match[1];

        const mdPath = path.join(brainDir, file);
        const pdfPath = path.join(pdfDir, `class10-english-science-ch${chNum}.pdf`);

        console.log(`Processing Chapter ${chNum}...`);

        const markdown = fs.readFileSync(mdPath, 'utf8');
        const contentHtml = marked.parse(markdown);

        const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Class 10 Science Notes - Chapter ${chNum}</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.5.1/github-markdown-light.min.css">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
            <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
            <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
            <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=Poppins:wght@500;700;800&display=swap" rel="stylesheet">
            <style>
                :root {
                    --primary: #4F46E5;
                    --secondary: #10B981;
                    --accent: #F59E0B;
                    --bg-color: #F8FAFC;
                    --text-main: #1E293B;
                }
                body.markdown-body {
                    box-sizing: border-box;
                    min-width: 200px;
                    max-width: 1000px;
                    margin: 0 auto;
                    padding: 40px;
                    font-family: 'Nunito', sans-serif;
                    background-color: white;
                    color: var(--text-main);
                    line-height: 1.7;
                }
                
                /* Headings Modernization */
                .markdown-body h1 {
                    font-family: 'Poppins', sans-serif;
                    text-align: center;
                    border-bottom: none;
                    background: linear-gradient(135deg, var(--primary), #D946EF);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    font-size: 3em;
                    font-weight: 800;
                    margin-bottom: 0.2em;
                    padding-bottom: 0;
                }
                .markdown-body h2 {
                    font-family: 'Poppins', sans-serif;
                    color: white;
                    background: linear-gradient(90deg, var(--primary), #8B5CF6);
                    padding: 12px 20px;
                    border-radius: 10px;
                    border-bottom: none;
                    margin-top: 1.8em;
                    font-size: 1.8em;
                    box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.25);
                }
                .markdown-body h3 {
                    color: #4338ca;
                    border-bottom: 2px solid #E0E7FF;
                    padding-bottom: 5px;
                    font-weight: 800;
                    font-size: 1.4em;
                    margin-top: 1.5em;
                }
                
                /* Emojis styling */
                .emoji { font-size: 1.2em; vertical-align: middle; }

                /* Tables */
                .markdown-body table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 20px 0;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.05);
                    border-radius: 10px;
                    overflow: hidden;
                }
                .markdown-body table th {
                    background-color: var(--primary);
                    color: white;
                    font-family: 'Poppins', sans-serif;
                    font-weight: 600;
                    border: none;
                    text-align: left;
                }
                .markdown-body table td, .markdown-body table th {
                    padding: 14px 18px;
                    border: 1px solid #E2E8F0;
                }
                .markdown-body table tr:nth-child(even) {
                    background-color: #F8FAFC;
                }
                
                /* Alert Boxes */
                .markdown-alert {
                    padding: 22px;
                    margin: 28px 0;
                    border-radius: 12px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
                    border-left: 8px solid;
                }
                .markdown-alert p { margin-bottom: 0; font-size: 1.05em; }
                .markdown-alert-title {
                    display: flex;
                    align-items: center;
                    font-family: 'Poppins', sans-serif;
                    font-size: 1.25em;
                    font-weight: 700;
                    margin-bottom: 12px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
                .markdown-alert-title svg {
                    margin-right: 12px;
                    width: 24px; height: 24px;
                }
                
                /* Specific Alert Colors */
                .markdown-alert-important {
                    border-color: #EF4444; /* Red */
                    background: linear-gradient(to right, #FEF2F2, white);
                }
                .markdown-alert-important .markdown-alert-title { color: #DC2626; }
                .markdown-alert-important svg { fill: #DC2626; }

                .markdown-alert-tip {
                    border-color: var(--secondary); /* Green */
                    background: linear-gradient(to right, #ECFDF5, white);
                }
                .markdown-alert-tip .markdown-alert-title { color: #059669; }
                .markdown-alert-tip svg { fill: #059669; }

                .markdown-alert-note {
                    border-color: #3B82F6; /* Blue */
                    background: linear-gradient(to right, #EFF6FF, white);
                }
                .markdown-alert-note .markdown-alert-title { color: #2563EB; }
                .markdown-alert-note svg { fill: #2563EB; }

                .markdown-alert-warning {
                    border-color: var(--accent); /* Yellow/Orange */
                    background: linear-gradient(to right, #FFFBEB, white);
                }
                .markdown-alert-warning .markdown-alert-title { color: #D97706; }
                .markdown-alert-warning svg { fill: #D97706; }

                /* Mermaid Diagram Center */
                .mermaid {
                    text-align: center;
                    margin: 35px 0;
                    background: #F8FAFC;
                    padding: 25px;
                    border-radius: 12px;
                    border: 2px dashed #CBD5E1;
                }
                
                /* Codeblocks/Tags */
                .markdown-body code {
                    background-color: #EEF2FF;
                    color: #4338ca;
                    padding: 0.25em 0.5em;
                    border-radius: 6px;
                    font-weight: 700;
                    font-family: 'Nunito', sans-serif; /* Override monospace */
                }
                
                /* Lists styling */
                .markdown-body ul, .markdown-body ol {
                    margin-top: 10px;
                    margin-bottom: 10px;
                    padding-left: 2em;
                }
                .markdown-body li {
                    margin-bottom: 8px;
                }
                .markdown-body li::marker {
                    color: var(--primary);
                    font-weight: 800;
                }
            </style>
        </head>
        <body class="markdown-body">
            ${contentHtml}
            <script>
                // Convert markdown alerts (Blockquotes starting with [!IMPORTANT], etc)
                document.querySelectorAll('blockquote').forEach(bq => {
                    const text = bq.innerHTML.trim();
                    const match = text.match(/<p>\\[!(IMPORTANT|TIP|NOTE|WARNING)\\]/i);
                    if (match) {
                        const type = match[1].toLowerCase();
                        const iconMap = {
                            'important': '<svg viewBox="0 0 16 16"><path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v9.5A1.75 1.75 0 0 1 14.25 13H8.06l-2.573 2.573A1.458 1.458 0 0 1 3 14.543V13H1.75A1.75 1.75 0 0 1 0 11.25Zm1.75-.25a.25.25 0 0 0-.25.25v9.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.25-.25Zm7 2.25v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>',
                            'tip': '<svg viewBox="0 0 16 16"><path d="M8 1.5c-2.363 0-4 1.69-4 3.75 0 .984.424 1.625.984 2.304l.214.253c.223.264.47.556.673.848.284.411.537.896.621 1.49a.75.75 0 0 1-1.484.211c-.04-.282-.163-.547-.37-.847a8.456 8.456 0 0 0-.542-.68c-.084-.1-.173-.205-.268-.32C3.201 7.75 2.5 6.766 2.5 5.25 2.5 2.31 4.863 0 8 0s5.5 2.31 5.5 5.25c0 1.516-.701 2.5-1.328 3.259-.095.115-.184.22-.268.319-.207.245-.383.453-.541.681-.208.3-.33.565-.37.847a.751.751 0 0 1-1.485-.212c.084-.594.337-1.079.621-1.489.203-.292.45-.584.673-.848.075-.088.147-.173.213-.253.561-.679.985-1.32.985-2.304 0-2.06-1.637-3.75-4-3.75ZM5.75 12h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5ZM6 15.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z"></path></svg>',
                            'note': '<svg viewBox="0 0 16 16"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>',
                            'warning': '<svg viewBox="0 0 16 16"><path d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>'
                        };
                        const titleWord = type === 'important' ? 'Important Points 📌' 
                                      : type === 'warning' ? 'Common Mistakes ❌' 
                                      : type === 'tip' ? 'Quick Tip 💡' : 'Note 📝';
                        const newHtml = bq.innerHTML.replace(match[0], \`<div class="markdown-alert-title">\${iconMap[type]}\${titleWord}</div><p>\`);
                        const div = document.createElement('div');
                        div.className = \`markdown-alert markdown-alert-\${type}\`;
                        div.innerHTML = newHtml;
                        bq.replaceWith(div);
                    }
                });

                document.querySelectorAll('code.language-mermaid').forEach(block => {
                    const pre = block.parentElement;
                    const div = document.createElement('div');
                    div.className = 'mermaid';
                    div.textContent = block.textContent;
                    pre.replaceWith(div);
                });
                
                mermaid.initialize({ 
                    startOnLoad: true, 
                    theme: 'base', 
                    themeVariables: { 
                        primaryColor: '#EEF2FF', 
                        primaryTextColor: '#1E293B', 
                        primaryBorderColor: '#4F46E5', 
                        lineColor: '#6366F1', 
                        secondaryColor: '#FDF4FF', 
                        tertiaryColor: '#FFFFFF',
                        fontFamily: 'Nunito, sans-serif'
                    } 
                });

                renderMathInElement(document.body, {
                    delimiters: [
                        {left: '$$', right: '$$', display: true},
                        {left: '$', right: '$', display: false},
                        {left: '\\\\(', right: '\\\\)', display: false},
                        {left: '\\\\[', right: '\\\\]', display: true}
                    ],
                    throwOnError : false
                });
            </script>
        </body>
        </html>
        `;

        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: 'networkidle0', timeout: 60000 });
        await page.emulateMediaType('screen');

        console.log(`Waiting for rendering Chapter ${chNum}...`);
        await new Promise(r => setTimeout(r, 4000));

        await page.pdf({
            path: pdfPath,
            format: 'A4',
            printBackground: true,
            margin: { top: '35px', bottom: '35px', left: '35px', right: '35px' }
        });

        await page.close();
        console.log(`Chapter ${chNum} PDF generated successfully at ${pdfPath}!`);
    }

    await browser.close();
    console.log("All files processed!");
}

generateBatch().catch(console.error);
