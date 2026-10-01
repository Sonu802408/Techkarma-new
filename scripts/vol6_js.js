const getHandwrittenStyles = require('./styles');

module.exports = function generateJSNotesHTML() {
    const primaryColor = '#eab308'; // Bright Gold/Yellow for JS

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>JavaScript — Complete Handwritten Notes</title>
    <style>
        ${getHandwrittenStyles(primaryColor)}
    </style>
</head>
<body>
<div class="notebook-container">

    <!-- COVER PAGE -->
    <div class="cover-page">
        <div>
            <div class="cover-title-badge">Volume 6 • B.Tech CSE Study Series</div>
            <h1 class="cover-title">JAVASCRIPT (ES6+)</h1>
            <div class="cover-subtitle">Complete Professional Handwritten Notes</div>
            <p style="font-family: 'Kalam', cursive; font-size: 16px; color: #475569; max-width: 480px; margin: 0 auto;">
                V8 Engine, Execution Context, Closures, DOM Manipulation, Event Loop, Async/Await, Promises & Modern ES6+ Architecture
            </p>
        </div>

        <svg width="220" height="140" viewBox="0 0 220 140" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="200" height="120" rx="12" fill="#0f172a" stroke="#eab308" stroke-width="3"/>
            <text x="25" y="40" fill="#eab308" font-family="Fira Code" font-size="14" font-weight="bold">const fetchTech = async () =&gt; {</text>
            <text x="45" y="65" fill="#38bdf8" font-family="Fira Code" font-size="14">const res = await fetch(url);</text>
            <text x="45" y="90" fill="#4ade80" font-family="Fira Code" font-size="14">return res.json();</text>
            <text x="25" y="115" fill="#eab308" font-family="Fira Code" font-size="14">}; // Event Loop</text>
        </svg>

        <div class="cover-features">
            <div class="cover-feature-item">✓ Execution Context & Call Stack</div>
            <div class="cover-feature-item">✓ Hoisting, Scope & Closures</div>
            <div class="cover-feature-item">✓ Event Loop, Microtasks & Macrotasks</div>
            <div class="cover-feature-item">✓ DOM Manipulation & Event Bubbling</div>
            <div class="cover-feature-item">✓ Promises & Async/Await Architecture</div>
            <div class="cover-feature-item">✓ 30+ Viva & SDE Interview Q&A</div>
        </div>

        <div class="cover-footer">
            Designed for University Exams, Full-Stack Roles & Top Product Company Placements
        </div>
    </div>

    <!-- TABLE OF CONTENTS -->
    <div class="toc-container">
        <div class="toc-title">📖 TABLE OF CONTENTS — JAVASCRIPT</div>

        <div class="toc-item"><span>Ch 1. JavaScript Engine (V8) & Execution Context</span><span class="toc-dots"></span><span>Page 02</span></div>
        <div class="toc-item"><span>Ch 2. Variables (var vs let vs const) & Data Types</span><span class="toc-dots"></span><span>Page 06</span></div>
        <div class="toc-item"><span>Ch 3. Functions, Arrow Functions & Higher-Order Functions</span><span class="toc-dots"></span><span>Page 11</span></div>
        <div class="toc-item"><span>Ch 4. Scope Chain, Hoisting & Temporal Dead Zone (TDZ)</span><span class="toc-dots"></span><span>Page 16</span></div>
        <div class="toc-item"><span>Ch 5. Closures & Practical Encapsulation</span><span class="toc-dots"></span><span>Page 21</span></div>
        <div class="toc-item"><span>Ch 6. Arrays & Array Methods (map, filter, reduce)</span><span class="toc-dots"></span><span>Page 26</span></div>
        <div class="toc-item"><span>Ch 7. Objects, Prototypes & Object-Oriented JS</span><span class="toc-dots"></span><span>Page 32</span></div>
        <div class="toc-item"><span>Ch 8. DOM Tree Manipulation, Events & Delegation</span><span class="toc-dots"></span><span>Page 38</span></div>
        <div class="toc-item"><span>Ch 9. Asynchronous JS: Callbacks, Promises & Async/Await</span><span class="toc-dots"></span><span>Page 45</span></div>
        <div class="toc-item"><span>Ch 10. The Event Loop, Call Stack & Task Queues</span><span class="toc-dots"></span><span>Page 52</span></div>
        <div class="toc-item"><span>Ch 11. Modern ES6+ Features (Destructuring, Modules)</span><span class="toc-dots"></span><span>Page 58</span></div>
        <div class="toc-item"><span>Ch 12. Comparison Tables & Visual Mind Maps</span><span class="toc-dots"></span><span>Page 63</span></div>
        <div class="toc-item"><span>Ch 13. Real-World Practical Projects (Weather API App, To-Do)</span><span class="toc-dots"></span><span>Page 68</span></div>
        <div class="toc-item"><span>Ch 14. Practice Problems (Basic → Advanced)</span><span class="toc-dots"></span><span>Page 74</span></div>
        <div class="toc-item"><span>Ch 15. 30+ University Viva Questions & Answers</span><span class="toc-dots"></span><span>Page 78</span></div>
        <div class="toc-item"><span>Ch 16. 30+ SDE Technical Interview Questions</span><span class="toc-dots"></span><span>Page 83</span></div>
        <div class="toc-item"><span>Ch 17. 1-Day Exam Cheat Sheet & JS Quick Reference</span><span class="toc-dots"></span><span>Page 88</span></div>
    </div>

    <!-- CHAPTER 10: EVENT LOOP -->
    <h1>CHAPTER 10: THE JAVASCRIPT EVENT LOOP & RUNTIME</h1>

    <div class="concept-card">
        <div class="concept-title">💡 Call Stack, Web APIs, Microtasks & Macrotasks</div>

        <!-- DIAGRAM -->
        <div class="diagram-container">
            <div class="diagram-title">SVG DIAGRAM: JAVASCRIPT EVENT LOOP ARCHITECTURE</div>
            <svg width="100%" height="140" viewBox="0 0 520 140" xmlns="http://www.w3.org/2000/svg">
                <!-- Call Stack -->
                <rect x="20" y="20" width="110" height="100" rx="8" fill="#fef9c3" stroke="#ca8a04" stroke-width="2"/>
                <text x="75" y="42" fill="#854d0e" font-family="Kalam" font-size="12" font-weight="bold" text-anchor="middle">Call Stack</text>
                <rect x="30" y="52" width="90" height="22" rx="4" fill="#fef08a"/>
                <text x="75" y="67" fill="#713f12" font-family="Fira Code" font-size="10" text-anchor="middle">funcB()</text>
                <rect x="30" y="80" width="90" height="22" rx="4" fill="#fef08a"/>
                <text x="75" y="95" fill="#713f12" font-family="Fira Code" font-size="10" text-anchor="middle">funcA()</text>

                <!-- Event Loop Circle -->
                <circle cx="200" cy="70" r="28" fill="#eab308"/>
                <text x="200" y="66" fill="#fff" font-family="Kalam" font-size="10" font-weight="bold" text-anchor="middle">EVENT</text>
                <text x="200" y="78" fill="#fff" font-family="Kalam" font-size="10" font-weight="bold" text-anchor="middle">LOOP</text>

                <!-- Microtask Queue -->
                <rect x="290" y="20" width="200" height="42" rx="6" fill="#f0fdf4" stroke="#22c55e" stroke-width="2"/>
                <text x="390" y="38" fill="#15803d" font-family="Kalam" font-size="11" font-weight="bold" text-anchor="middle">Microtask Queue (Promises / Promises.then)</text>

                <!-- Macrotask Queue -->
                <rect x="290" y="75" width="200" height="42" rx="6" fill="#eff6ff" stroke="#3b82f6" stroke-width="2"/>
                <text x="390" y="93" fill="#1d4ed8" font-family="Kalam" font-size="11" font-weight="bold" text-anchor="middle">Callback Queue (setTimeout / DOM)</text>
            </svg>
        </div>

        <div class="remember-box">
            <b>⚡ Priority Order:</b> Call Stack executes first → Then ALL Microtasks (Promise handlers) are drained → Then 1 Macrotask (setTimeout callback) is executed!
        </div>

        <div class="code-box">console.log("1. Start");

setTimeout(() =&gt; {
    console.log("4. Timeout (Macrotask)");
}, 0);

Promise.resolve().then(() =&gt; {
    console.log("3. Promise (Microtask)");
});

console.log("2. End");</div>
        <div class="output-box">Output:
1. Start
2. End
3. Promise (Microtask)
4. Timeout (Macrotask)</div>
    </div>

    <!-- CHAPTER 12: COMPARISON TABLES -->
    <h1>CHAPTER 12: COMPARISON TABLES</h1>

    <div class="concept-card">
        <div class="concept-title">⚖️ var vs let vs const</div>
        <table>
            <thead>
                <tr>
                    <th>Feature</th>
                    <th>var</th>
                    <th>let</th>
                    <th>const</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><b>Scope</b></td>
                    <td>Function Scope</td>
                    <td>Block Scope</td>
                    <td>Block Scope</td>
                </tr>
                <tr>
                    <td><b>Hoisting</b></td>
                    <td>Hoisted with <code>undefined</code></td>
                    <td>Hoisted in Temporal Dead Zone</td>
                    <td>Hoisted in Temporal Dead Zone</td>
                </tr>
                <tr>
                    <td><b>Re-declaration</b></td>
                    <td>Allowed</td>
                    <td>Not Allowed</td>
                    <td>Not Allowed</td>
                </tr>
                <tr>
                    <td><b>Re-assignment</b></td>
                    <td>Allowed</td>
                    <td>Allowed</td>
                    <td>Not Allowed</td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- REAL-WORLD PROJECT -->
    <h1>CHAPTER 13: REAL-WORLD PRACTICAL PROJECT</h1>
    <div class="concept-card">
        <div class="concept-title">🛠️ Project: Asynchronous Weather API Dashboard</div>
        <div class="code-box">async function fetchWeather(city) {
    const apiKey = "demo_key";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + apiKey;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("City not found");
        const data = await response.json();
        
        console.log("City: " + data.name);
        console.log("Temp: " + data.main.temp + "°C");
        console.log("Weather: " + data.weather[0].description);
    } catch (error) {
        console.error("Fetch Error:", error.message);
    }
}</div>
    </div>

    <!-- VIVA & INTERVIEW -->
    <h1>CHAPTER 15: 30+ VIVA & INTERVIEW QUESTIONS</h1>
    <div class="qa-box">
        <div class="qa-question">Q1. What is a Closure in JavaScript?</div>
        <div class="qa-answer"><b>Ans:</b> A closure is a function bundled together with references to its surrounding lexical environment. It gives an inner function access to an outer function's scope even after the outer function has returned.</div>
    </div>
    <div class="qa-box">
        <div class="qa-question">Q2. What is Event Delegation?</div>
        <div class="qa-answer"><b>Ans:</b> Event delegation is a pattern where a single event listener is attached to a parent element instead of multiple child elements, taking advantage of event bubbling.</div>
    </div>

</div>
</body>
</html>
    `;
};
