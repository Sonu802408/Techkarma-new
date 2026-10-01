const getHandwrittenStyles = require('./styles');

module.exports = function generateCSSNotesHTML() {
    const primaryColor = '#0284c7'; // Sky Blue for CSS3

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>CSS & CSS3 — Complete Handwritten Notes</title>
    <style>
        ${getHandwrittenStyles(primaryColor)}
    </style>
</head>
<body>
<div class="notebook-container">

    <!-- COVER PAGE -->
    <div class="cover-page">
        <div>
            <div class="cover-title-badge">Volume 5 • B.Tech CSE Study Series</div>
            <h1 class="cover-title">CSS & CSS3</h1>
            <div class="cover-subtitle">Complete Professional Handwritten Notes</div>
            <p style="font-family: 'Kalam', cursive; font-size: 16px; color: #475569; max-width: 480px; margin: 0 auto;">
                Box Model, Specificity & Cascade, Flexbox & Grid Layouts, Responsive Media Queries, Animations & CSS Variables
            </p>
        </div>

        <svg width="220" height="140" viewBox="0 0 220 140" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="200" height="120" rx="12" fill="#0f172a" stroke="#0284c7" stroke-width="3"/>
            <text x="25" y="40" fill="#0284c7" font-family="Fira Code" font-size="14" font-weight="bold">.container {</text>
            <text x="45" y="65" fill="#38bdf8" font-family="Fira Code" font-size="14">display: flex;</text>
            <text x="45" y="90" fill="#4ade80" font-family="Fira Code" font-size="14">justify-content: center;</text>
            <text x="25" y="115" fill="#0284c7" font-family="Fira Code" font-size="14">}</text>
        </svg>

        <div class="cover-features">
            <div class="cover-feature-item">✓ Box Model & Box Sizing Mechanics</div>
            <div class="cover-feature-item">✓ Flexbox Complete Architecture</div>
            <div class="cover-feature-item">✓ CSS Grid 2D Layout System</div>
            <div class="cover-feature-item">✓ Specificity Calculation Rules</div>
            <div class="cover-feature-item">✓ Responsive Design & Breakpoints</div>
            <div class="cover-feature-item">✓ 30+ Viva & UI Interview Q&A</div>
        </div>

        <div class="cover-footer">
            Designed for University Exams, UI/UX Engineering & Modern Web Development
        </div>
    </div>

    <!-- TABLE OF CONTENTS -->
    <div class="toc-container">
        <div class="toc-title">📖 TABLE OF CONTENTS — CSS & CSS3</div>

        <div class="toc-item"><span>Ch 1. Introduction to CSS: Inline, Internal & External</span><span class="toc-dots"></span><span>Page 02</span></div>
        <div class="toc-item"><span>Ch 2. CSS Selectors, Pseudo-Classes & Pseudo-Elements</span><span class="toc-dots"></span><span>Page 06</span></div>
        <div class="toc-item"><span>Ch 3. Specificity, Inheritance & The Cascade Rule</span><span class="toc-dots"></span><span>Page 11</span></div>
        <div class="toc-item"><span>Ch 4. Units (px, rem, em, %, vh, vw) & Color Models</span><span class="toc-dots"></span><span>Page 15</span></div>
        <div class="toc-item"><span>Ch 5. The CSS Box Model (Content, Padding, Border, Margin)</span><span class="toc-dots"></span><span>Page 20</span></div>
        <div class="toc-item"><span>Ch 6. Display, Positioning (Static, Relative, Absolute, Fixed, Sticky)</span><span class="toc-dots"></span><span>Page 25</span></div>
        <div class="toc-item"><span>Ch 7. Flexbox Deep Dive (Axis, Alignment, Growth)</span><span class="toc-dots"></span><span>Page 31</span></div>
        <div class="toc-item"><span>Ch 8. CSS Grid Layout System (Grids, Areas, Fr Units)</span><span class="toc-dots"></span><span>Page 37</span></div>
        <div class="toc-item"><span>Ch 9. Responsive Web Design & Media Queries</span><span class="toc-dots"></span><span>Page 43</span></div>
        <div class="toc-item"><span>Ch 10. Transitions, Transforms, Keyframe Animations & Variables</span><span class="toc-dots"></span><span>Page 48</span></div>
        <div class="toc-item"><span>Ch 11. Comparison Tables & Visual Mind Maps</span><span class="toc-dots"></span><span>Page 54</span></div>
        <div class="toc-item"><span>Ch 12. Real-World Practical Projects (Responsive Landing Page)</span><span class="toc-dots"></span><span>Page 59</span></div>
        <div class="toc-item"><span>Ch 13. Practice Tasks & Layout Challenges</span><span class="toc-dots"></span><span>Page 64</span></div>
        <div class="toc-item"><span>Ch 14. 30+ University Viva Questions & Answers</span><span class="toc-dots"></span><span>Page 68</span></div>
        <div class="toc-item"><span>Ch 15. 30+ Technical Frontend Interview Questions</span><span class="toc-dots"></span><span>Page 73</span></div>
        <div class="toc-item"><span>Ch 16. 1-Day Exam Cheat Sheet & CSS Quick Reference</span><span class="toc-dots"></span><span>Page 78</span></div>
    </div>

    <!-- CHAPTER 5: BOX MODEL -->
    <h1>CHAPTER 5: THE CSS BOX MODEL</h1>

    <div class="concept-card">
        <div class="concept-title">💡 CSS Box Model Anatomy</div>

        <!-- DIAGRAM -->
        <div class="diagram-container">
            <div class="diagram-title">SVG DIAGRAM: CSS BOX MODEL ARCHITECTURE</div>
            <svg width="100%" height="150" viewBox="0 0 450 150" xmlns="http://www.w3.org/2000/svg">
                <!-- Margin -->
                <rect x="25" y="10" width="400" height="130" rx="10" fill="#ffedd5" stroke="#f97316" stroke-width="2"/>
                <text x="45" y="30" fill="#c2410c" font-family="Kalam" font-size="12">Margin (Outer Space)</text>

                <!-- Border -->
                <rect x="55" y="35" width="340" height="80" rx="8" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
                <text x="75" y="52" fill="#b45309" font-family="Kalam" font-size="12">Border</text>

                <!-- Padding -->
                <rect x="85" y="58" width="280" height="42" rx="6" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
                <text x="105" y="74" fill="#15803d" font-family="Kalam" font-size="11">Padding</text>

                <!-- Content -->
                <rect x="155" y="66" width="140" height="26" rx="4" fill="#3b82f6"/>
                <text x="225" y="83" fill="#fff" font-family="Fira Code" font-size="11" text-anchor="middle">Content Area</text>
            </svg>
        </div>

        <div class="remember-box">
            <b>💡 Pro Tip: Box-Sizing</b><br>
            Always set <code>* { box-sizing: border-box; }</code> so that padding and border are included inside the specified width and height instead of expanding the element size!
        </div>

        <div class="code-box">/* Standard Box Model Reset */
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

.card {
    width: 300px;
    padding: 20px;
    border: 2px solid #0284c7;
    margin: 15px auto;
}</div>
    </div>

    <!-- CHAPTER 7: FLEXBOX VS GRID -->
    <h1>CHAPTER 7: FLEXBOX VS CSS GRID</h1>

    <div class="concept-card">
        <div class="concept-title">⚖️ Flexbox (1D) vs CSS Grid (2D) Comparison</div>
        <table>
            <thead>
                <tr>
                    <th>Feature</th>
                    <th>Flexbox (Flexible Box)</th>
                    <th>CSS Grid</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><b>Dimensions</b></td>
                    <td>1-Dimensional (Row OR Column at a time).</td>
                    <td>2-Dimensional (Rows AND Columns simultaneously).</td>
                </tr>
                <tr>
                    <td><b>Primary Focus</b></td>
                    <td>Content-driven alignment (component level).</td>
                    <td>Layout-driven structure (page level layout).</td>
                </tr>
                <tr>
                    <td><b>Key Container Props</b></td>
                    <td><code>display: flex; justify-content; align-items;</code></td>
                    <td><code>display: grid; grid-template-columns; gap;</code></td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- VIVA QUESTIONS -->
    <h1>CHAPTER 14: 30+ VIVA & INTERVIEW QUESTIONS</h1>
    <div class="qa-box">
        <div class="qa-question">Q1. What is CSS Specificity and how is it calculated?</div>
        <div class="qa-answer"><b>Ans:</b> Specificity decides which CSS rule applies when multiple rules target the same element. Calculated as: Inline Style (1000) &gt; ID Selector (100) &gt; Class/Attribute/Pseudo-class (10) &gt; Element/Pseudo-element (1).</div>
    </div>
    <div class="qa-box">
        <div class="qa-question">Q2. What is the difference between position: absolute and position: relative?</div>
        <div class="qa-answer"><b>Ans:</b> <code>relative</code> positions an element relative to its normal document flow. <code>absolute</code> removes element from document flow and positions it relative to its nearest ancestor with a non-static position.</div>
    </div>

</div>
</body>
</html>
    `;
};
