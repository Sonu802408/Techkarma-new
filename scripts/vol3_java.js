const getHandwrittenStyles = require('./styles');

module.exports = function generateJavaProgrammingHTML() {
    const primaryColor = '#ea580c'; // Warm Orange for Java

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Java Programming — Complete Handwritten Notes</title>
    <style>
        ${getHandwrittenStyles(primaryColor)}
    </style>
</head>
<body>
<div class="notebook-container">

    <!-- COVER PAGE -->
    <div class="cover-page">
        <div>
            <div class="cover-title-badge">Volume 3 • B.Tech CSE Study Series</div>
            <h1 class="cover-title">JAVA PROGRAMMING</h1>
            <div class="cover-subtitle">Complete Professional Handwritten Notes</div>
            <p style="font-family: 'Kalam', cursive; font-size: 16px; color: #475569; max-width: 480px; margin: 0 auto;">
                JDK, JRE & JVM Internals, Full OOP Paradigm, Collections Framework, Multithreading, Streams & Enterprise Prep
            </p>
        </div>

        <svg width="220" height="140" viewBox="0 0 220 140" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="200" height="120" rx="12" fill="#0f172a" stroke="#ea580c" stroke-width="3"/>
            <text x="25" y="40" fill="#ea580c" font-family="Fira Code" font-size="14" font-weight="bold">public class Main {</text>
            <text x="45" y="65" fill="#38bdf8" font-family="Fira Code" font-size="14">public static void main(String[] args)</text>
            <text x="65" y="90" fill="#4ade80" font-family="Fira Code" font-size="14">System.out.println("JVM Rocks!");</text>
            <text x="25" y="115" fill="#ea580c" font-family="Fira Code" font-size="14">}</text>
        </svg>

        <div class="cover-features">
            <div class="cover-feature-item">✓ JVM Architecture & Memory Model</div>
            <div class="cover-feature-item">✓ OOP Principles (Interfaces & Abstract)</div>
            <div class="cover-feature-item">✓ Java Collections Framework</div>
            <div class="cover-feature-item">✓ Multithreading & Synchronization</div>
            <div class="cover-feature-item">✓ Java 8+ Streams & Lambdas</div>
            <div class="cover-feature-item">✓ 30+ Viva & Enterprise Interview Q&A</div>
        </div>

        <div class="cover-footer">
            Designed for B.Tech Exams, Campus Placements & Enterprise Backend Roles
        </div>
    </div>

    <!-- TABLE OF CONTENTS -->
    <div class="toc-container">
        <div class="toc-title">📖 TABLE OF CONTENTS — JAVA PROGRAMMING</div>

        <div class="toc-item"><span>Ch 1. Java Ecosystem: JDK, JRE, JVM & Bytecode Flow</span><span class="toc-dots"></span><span>Page 02</span></div>
        <div class="toc-item"><span>Ch 2. Variables, Primitives & Memory Allocation</span><span class="toc-dots"></span><span>Page 06</span></div>
        <div class="toc-item"><span>Ch 3. Control Flow & Arrays</span><span class="toc-dots"></span><span>Page 10</span></div>
        <div class="toc-item"><span>Ch 4. Core OOP: Classes, Objects, Methods & Encapsulation</span><span class="toc-dots"></span><span>Page 15</span></div>
        <div class="toc-item"><span>Ch 5. Inheritance, Polymorphism & Dynamic Method Dispatch</span><span class="toc-dots"></span><span>Page 21</span></div>
        <div class="toc-item"><span>Ch 6. Abstraction: Abstract Classes vs Interfaces</span><span class="toc-dots"></span><span>Page 27</span></div>
        <div class="toc-item"><span>Ch 7. Exception Handling & Custom Exceptions</span><span class="toc-dots"></span><span>Page 33</span></div>
        <div class="toc-item"><span>Ch 8. Java Collections Framework (List, Set, Map)</span><span class="toc-dots"></span><span>Page 39</span></div>
        <div class="toc-item"><span>Ch 9. Multithreading, Thread Lifecycle & Synchronization</span><span class="toc-dots"></span><span>Page 46</span></div>
        <div class="toc-item"><span>Ch 10. Modern Java: Lambdas, Functional Interfaces & Streams</span><span class="toc-dots"></span><span>Page 52</span></div>
        <div class="toc-item"><span>Ch 11. Comparison Tables & Mind Maps</span><span class="toc-dots"></span><span>Page 58</span></div>
        <div class="toc-item"><span>Ch 12. Real-World Practical Projects (ATM Simulator)</span><span class="toc-dots"></span><span>Page 63</span></div>
        <div class="toc-item"><span>Ch 13. Practice Problems (Basic → Advanced)</span><span class="toc-dots"></span><span>Page 69</span></div>
        <div class="toc-item"><span>Ch 14. 30+ University Viva Questions & Answers</span><span class="toc-dots"></span><span>Page 73</span></div>
        <div class="toc-item"><span>Ch 15. 30+ Technical Interview Questions</span><span class="toc-dots"></span><span>Page 78</span></div>
        <div class="toc-item"><span>Ch 16. 1-Day Exam Cheat Sheet & Quick Summary</span><span class="toc-dots"></span><span>Page 83</span></div>
    </div>

    <!-- CHAPTER 1: JVM ARCHITECTURE -->
    <h1>CHAPTER 1: JVM ARCHITECTURE & COMPILATION FLOW</h1>

    <div class="concept-card">
        <div class="concept-title">💡 JDK vs JRE vs JVM Architecture</div>

        <!-- DIAGRAM -->
        <div class="diagram-container">
            <div class="diagram-title">SVG DIAGRAM: JVM MEMORY & SUBSYSTEM ARCHITECTURE</div>
            <svg width="100%" height="130" viewBox="0 0 520 130" xmlns="http://www.w3.org/2000/svg">
                <!-- ClassLoader -->
                <rect x="15" y="35" width="100" height="60" rx="6" fill="#ea580c"/>
                <text x="65" y="60" fill="#fff" font-family="Kalam" font-size="12" text-anchor="middle">Class Loader</text>
                <text x="65" y="76" fill="#ffedd5" font-family="Fira Code" font-size="10" text-anchor="middle">Subsystem</text>

                <text x="125" y="65" fill="#ea580c" font-size="16">→</text>

                <!-- JVM Memory Areas -->
                <rect x="140" y="25" width="220" height="80" rx="8" fill="#fff7ed" stroke="#ea580c" stroke-width="2"/>
                <text x="250" y="44" fill="#9a3412" font-family="Kalam" font-size="13" font-weight="bold" text-anchor="middle">JVM Runtime Data Areas</text>
                <text x="150" y="65" fill="#c2410c" font-family="Fira Code" font-size="10">• Method Area</text>
                <text x="250" y="65" fill="#c2410c" font-family="Fira Code" font-size="10">• Heap Memory</text>
                <text x="150" y="85" fill="#c2410c" font-family="Fira Code" font-size="10">• Java Stacks</text>
                <text x="250" y="85" fill="#c2410c" font-family="Fira Code" font-size="10">• PC Registers</text>

                <text x="370" y="65" fill="#ea580c" font-size="16">→</text>

                <!-- Execution Engine -->
                <rect x="385" y="35" width="120" height="60" rx="6" fill="#16a34a"/>
                <text x="445" y="58" fill="#fff" font-family="Kalam" font-size="12" text-anchor="middle">Execution Engine</text>
                <text x="445" y="74" fill="#dcfce7" font-family="Fira Code" font-size="10" text-anchor="middle">(Interpreter + JIT)</text>
            </svg>
        </div>

        <div class="step-block">
            <div class="step-heading">2. Code Example: Platform Independence</div>
            <div class="code-box">public class JVMTest {
    public static void main(String[] args) {
        System.out.println("Write Once, Run Anywhere (WORA)");
    }
}</div>
        </div>
    </div>

    <!-- CHAPTER 8: COLLECTIONS FRAMEWORK -->
    <h1>CHAPTER 8: JAVA COLLECTIONS FRAMEWORK</h1>

    <div class="concept-card">
        <div class="concept-title">🚀 Collections Hierarchy Overview</div>
        <table>
            <thead>
                <tr>
                    <th>Interface</th>
                    <th>Implementation</th>
                    <th>Ordered?</th>
                    <th>Duplicate Allowed?</th>
                    <th>Key Feature</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><code>List</code></td>
                    <td><code>ArrayList</code></td>
                    <td>Yes</td>
                    <td>Yes</td>
                    <td>Fast random access (index-based). Dynamic array resize.</td>
                </tr>
                <tr>
                    <td><code>List</code></td>
                    <td><code>LinkedList</code></td>
                    <td>Yes</td>
                    <td>Yes</td>
                    <td>Doubly-linked list. Fast insertions/deletions.</td>
                </tr>
                <tr>
                    <td><code>Set</code></td>
                    <td><code>HashSet</code></td>
                    <td>No</td>
                    <td>No</td>
                    <td>Backed by HashMap. O(1) average search.</td>
                </tr>
                <tr>
                    <td><code>Set</code></td>
                    <td><code>TreeSet</code></td>
                    <td>Yes (Sorted)</td>
                    <td>No</td>
                    <td>Red-Black tree implementation. Elements sorted.</td>
                </tr>
                <tr>
                    <td><code>Map</code></td>
                    <td><code>HashMap</code></td>
                    <td>No</td>
                    <td>Keys No, Values Yes</td>
                    <td>Key-value pairs. O(1) performance.</td>
                </tr>
            </tbody>
        </table>

        <div class="code-box">import java.util.*;

public class CollectionDemo {
    public static void main(String[] args) {
        List&lt;String&gt; list = new ArrayList&lt;&gt;();
        list.add("Java");
        list.add("Python");
        list.add("C++");

        list.forEach(item -&gt; System.out.println("Tech: " + item));
    }
}</div>
    </div>

    <!-- VIVA & INTERVIEW -->
    <h1>CHAPTER 14: 30+ UNIVERSITY VIVA & INTERVIEW QUESTIONS</h1>
    <div class="qa-box">
        <div class="qa-question">Q1. Why is String immutable in Java?</div>
        <div class="qa-answer"><b>Ans:</b> Security, String Pooling (saving Heap memory), Thread Safety, and Caching HashCode for fast HashMap key lookup.</div>
    </div>
    <div class="qa-box">
        <div class="qa-question">Q2. What is the difference between final, finally, and finalize?</div>
        <div class="qa-answer"><b>Ans:</b> <code>final</code> is a keyword to restrict class/method/variable inheritance or modification. <code>finally</code> is a block used with try-catch for cleanup. <code>finalize()</code> is a method called before Garbage Collection.</div>
    </div>

</div>
</body>
</html>
    `;
};
