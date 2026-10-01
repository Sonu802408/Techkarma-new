const getHandwrittenStyles = require('./styles');

module.exports = function generateHTMLNotesHTML() {
    const primaryColor = '#dc2626'; // Vibrant Red for HTML5

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>HTML & HTML5 — Complete Handwritten Notes</title>
    <style>
        ${getHandwrittenStyles(primaryColor)}
    </style>
</head>
<body>
<div class="notebook-container">

    <!-- COVER PAGE -->
    <div class="cover-page">
        <div>
            <div class="cover-title-badge">Volume 4 • B.Tech CSE Study Series</div>
            <h1 class="cover-title">HTML & HTML5</h1>
            <div class="cover-subtitle">Complete Professional Handwritten Notes</div>
            <p style="font-family: 'Kalam', cursive; font-size: 16px; color: #475569; max-width: 480px; margin: 0 auto;">
                Web Document Architecture, DOM Tree, Semantic Tags, Forms & Input Validation, Media & Accessibility
            </p>
        </div>

        <svg width="220" height="140" viewBox="0 0 220 140" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="200" height="120" rx="12" fill="#0f172a" stroke="#dc2626" stroke-width="3"/>
            <text x="25" y="40" fill="#dc2626" font-family="Fira Code" font-size="14" font-weight="bold">&lt;!DOCTYPE html&gt;</text>
            <text x="25" y="65" fill="#38bdf8" font-family="Fira Code" font-size="14">&lt;main class="web"&gt;</text>
            <text x="45" y="90" fill="#4ade80" font-family="Fira Code" font-size="14">&lt;article&gt;Semantic&lt;/article&gt;</text>
            <text x="25" y="115" fill="#dc2626" font-family="Fira Code" font-size="14">&lt;/main&gt;</text>
        </svg>

        <div class="cover-features">
            <div class="cover-feature-item">✓ HTML Document Structure & DOM Tree</div>
            <div class="cover-feature-item">✓ HTML5 Semantic Layout Tags</div>
            <div class="cover-feature-item">✓ Advanced Form Controls & Validation</div>
            <div class="cover-feature-item">✓ Audio, Video, iFrames & Canvas</div>
            <div class="cover-feature-item">✓ SEO Meta Tags & Accessibility (a11y)</div>
            <div class="cover-feature-item">✓ 30+ Viva & Web Tech Interview Q&A</div>
        </div>

        <div class="cover-footer">
            Designed for University Web Tech Exams & Frontend Engineering Roles
        </div>
    </div>

    <!-- TABLE OF CONTENTS -->
    <div class="toc-container">
        <div class="toc-title">📖 TABLE OF CONTENTS — HTML & HTML5</div>

        <div class="toc-item"><span>Ch 1. Introduction to Web Architecture & HTML5</span><span class="toc-dots"></span><span>Page 02</span></div>
        <div class="toc-item"><span>Ch 2. Document Structure & DOM Tree Visualization</span><span class="toc-dots"></span><span>Page 05</span></div>
        <div class="toc-item"><span>Ch 3. Text Formatting, Links & Images</span><span class="toc-dots"></span><span>Page 09</span></div>
        <div class="toc-item"><span>Ch 4. Lists, Tables & Complex Layout Grids</span><span class="toc-dots"></span><span>Page 13</span></div>
        <div class="toc-item"><span>Ch 5. HTML Forms, Input Types & Native Validation</span><span class="toc-dots"></span><span>Page 18</span></div>
        <div class="toc-item"><span>Ch 6. HTML5 Semantic Architecture (Header, Nav, Section, etc.)</span><span class="toc-dots"></span><span>Page 24</span></div>
        <div class="toc-item"><span>Ch 7. Multimedia (Audio, Video), iFrames & Canvas</span><span class="toc-dots"></span><span>Page 29</span></div>
        <div class="toc-item"><span>Ch 8. Meta Tags, SEO Fundamentals & Accessibility (ARIA)</span><span class="toc-dots"></span><span>Page 34</span></div>
        <div class="toc-item"><span>Ch 9. Comparison Tables & Mind Maps</span><span class="toc-dots"></span><span>Page 39</span></div>
        <div class="toc-item"><span>Ch 10. Real-World Practical Projects (Portfolio & Registration)</span><span class="toc-dots"></span><span>Page 44</span></div>
        <div class="toc-item"><span>Ch 11. Practice Tasks & Coding Challenges</span><span class="toc-dots"></span><span>Page 49</span></div>
        <div class="toc-item"><span>Ch 12. 30+ University Viva Questions & Answers</span><span class="toc-dots"></span><span>Page 53</span></div>
        <div class="toc-item"><span>Ch 13. 30+ Frontend Technical Interview Questions</span><span class="toc-dots"></span><span>Page 58</span></div>
        <div class="toc-item"><span>Ch 14. 1-Day Exam Revision & HTML Tag Cheat Sheet</span><span class="toc-dots"></span><span>Page 63</span></div>
    </div>

    <!-- CHAPTER 2: DOM TREE & STRUCTURE -->
    <h1>CHAPTER 2: HTML DOCUMENT STRUCTURE & DOM TREE</h1>

    <div class="concept-card">
        <div class="concept-title">💡 HTML5 Boilerplate & DOM Hierarchy</div>

        <!-- DIAGRAM -->
        <div class="diagram-container">
            <div class="diagram-title">SVG DIAGRAM: HTML DOCUMENT OBJECT MODEL (DOM) TREE</div>
            <svg width="100%" height="130" viewBox="0 0 500 130" xmlns="http://www.w3.org/2000/svg">
                <!-- Root -->
                <rect x="200" y="10" width="100" height="30" rx="6" fill="#dc2626"/>
                <text x="250" y="30" fill="#fff" font-family="Kalam" font-size="12" text-anchor="middle">&lt;html&gt; (Root)</text>

                <!-- Lines -->
                <line x1="220" y1="40" x2="130" y2="70" stroke="#94a3b8" stroke-width="2"/>
                <line x1="280" y1="40" x2="370" y2="70" stroke="#94a3b8" stroke-width="2"/>

                <!-- Head -->
                <rect x="80" y="70" width="100" height="30" rx="6" fill="#2563eb"/>
                <text x="130" y="90" fill="#fff" font-family="Kalam" font-size="12" text-anchor="middle">&lt;head&gt;</text>

                <!-- Body -->
                <rect x="320" y="70" width="100" height="30" rx="6" fill="#16a34a"/>
                <text x="370" y="90" fill="#fff" font-family="Kalam" font-size="12" text-anchor="middle">&lt;body&gt;</text>
            </svg>
        </div>

        <div class="code-box">&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;CSE Web Page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;header&gt;
        &lt;h1&gt;Welcome to CSE Portal&lt;/h1&gt;
    &lt;/header&gt;
    &lt;main&gt;
        &lt;article&gt;
            &lt;h2&gt;HTML5 Semantics&lt;/h2&gt;
            &lt;p&gt;Semantic markup improves SEO and accessibility.&lt;/p&gt;
        &lt;/article&gt;
    &lt;/main&gt;
&lt;/body&gt;
&lt;/html&gt;</div>
    </div>

    <!-- CHAPTER 6: SEMANTIC HTML5 -->
    <h1>CHAPTER 6: SEMANTIC HTML5 ARCHITECTURE</h1>

    <div class="concept-card">
        <div class="concept-title">🏗️ Semantic vs Non-Semantic Tags</div>
        <table>
            <thead>
                <tr>
                    <th>Tag</th>
                    <th>Type</th>
                    <th>Semantic Purpose</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><code>&lt;header&gt;</code></td>
                    <td>Semantic</td>
                    <td>Represents introductory content, site logo, or top navigation.</td>
                </tr>
                <tr>
                    <td><code>&lt;nav&gt;</code></td>
                    <td>Semantic</td>
                    <td>Defines a section containing navigation links.</td>
                </tr>
                <tr>
                    <td><code>&lt;main&gt;</code></td>
                    <td>Semantic</td>
                    <td>Encapsulates the dominant content unique to the document.</td>
                </tr>
                <tr>
                    <td><code>&lt;article&gt;</code></td>
                    <td>Semantic</td>
                    <td>Self-contained composition (blog post, news story, comment).</td>
                </tr>
                <tr>
                    <td><code>&lt;section&gt;</code></td>
                    <td>Semantic</td>
                    <td>Standalone thematic grouping of content with a heading.</td>
                </tr>
                <tr>
                    <td><code>&lt;div&gt;</code></td>
                    <td>Non-Semantic</td>
                    <td>Generic container for styling purposes without inherent meaning.</td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- VIVA QUESTIONS -->
    <h1>CHAPTER 12: 30+ VIVA & INTERVIEW QUESTIONS</h1>
    <div class="qa-box">
        <div class="qa-question">Q1. What is the purpose of the alt attribute in img tags?</div>
        <div class="qa-answer"><b>Ans:</b> Provides alternative text for screen readers (accessibility) and displays if the image fails to load.</div>
    </div>
    <div class="qa-box">
        <div class="qa-question">Q2. What is the difference between inline and block elements?</div>
        <div class="qa-answer"><b>Ans:</b> Block elements (e.g. <code>&lt;div&gt;, &lt;p&gt;, &lt;h1&gt;</code>) start on a new line and take full container width. Inline elements (e.g. <code>&lt;span&gt;, &lt;a&gt;, &lt;b&gt;</code>) do not start on a new line and take only as much width as necessary.</div>
    </div>

</div>
</body>
</html>
    `;
};
