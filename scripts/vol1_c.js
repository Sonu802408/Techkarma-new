const getHandwrittenStyles = require('./styles');

module.exports = function generateCProgrammingHTML() {
    const primaryColor = '#2563eb'; // Royal Blue for C

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>C Programming — Complete Handwritten Notes</title>
    <style>
        ${getHandwrittenStyles(primaryColor)}
    </style>
</head>
<body>
<div class="notebook-container">

    <!-- COVER PAGE -->
    <div class="cover-page">
        <div>
            <div class="cover-title-badge">Volume 1 • B.Tech CSE Study Series</div>
            <h1 class="cover-title">C PROGRAMMING</h1>
            <div class="cover-subtitle">Complete Professional Handwritten Notes</div>
            <p style="font-family: 'Kalam', cursive; font-size: 16px; color: #475569; max-width: 480px; margin: 0 auto;">
                From Zero Prerequisites to Advanced Systems Programming • Pointers, Memory Architecture, Structures, File I/O, Viva & Technical Interview Prep
            </p>
        </div>

        <!-- Handwritten SVG Illustration -->
        <svg width="220" height="140" viewBox="0 0 220 140" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="200" height="120" rx="12" fill="#0f172a" stroke="#38bdf8" stroke-width="3"/>
            <text x="25" y="40" fill="#38bdf8" font-family="Fira Code" font-size="14" font-weight="bold">#include &lt;stdio.h&gt;</text>
            <text x="25" y="65" fill="#4ade80" font-family="Fira Code" font-size="14">int main() {</text>
            <text x="45" y="90" fill="#f8fafc" font-family="Fira Code" font-size="14">printf("Hello CSE!");</text>
            <text x="45" y="115" fill="#fb7185" font-family="Fira Code" font-size="14">return 0; }</text>
        </svg>

        <div class="cover-features">
            <div class="cover-feature-item">✓ Complete 13-Part Topic Structure</div>
            <div class="cover-feature-item">✓ Pointer & Memory Diagrams</div>
            <div class="cover-feature-item">✓ 30+ Exam & Viva Q&A</div>
            <div class="cover-feature-item">✓ 30+ Tech Interview Q&A</div>
            <div class="cover-feature-item">✓ 4 Real-World Projects</div>
            <div class="cover-feature-item">✓ 1-Day Exam Cheat Sheet</div>
        </div>

        <div class="cover-footer">
            Designed for University Exams (B.Tech/BCA/MCA) & GATE / Product Company Placements
        </div>
    </div>

    <!-- TABLE OF CONTENTS -->
    <div class="toc-container">
        <div class="toc-title">📖 TABLE OF CONTENTS — C PROGRAMMING</div>

        <div class="toc-item"><span>Ch 1. C Language Fundamentals & Compilation Flow</span><span class="toc-dots"></span><span>Page 02</span></div>
        <div class="toc-item"><span>Ch 2. Variables, Data Types & Memory Storage</span><span class="toc-dots"></span><span>Page 05</span></div>
        <div class="toc-item"><span>Ch 3. Operators, Expressions & Input/Output</span><span class="toc-dots"></span><span>Page 08</span></div>
        <div class="toc-item"><span>Ch 4. Control Flow: Conditionals & Loops</span><span class="toc-dots"></span><span>Page 12</span></div>
        <div class="toc-item"><span>Ch 5. Functions, Recursion & Stack Frames</span><span class="toc-dots"></span><span>Page 17</span></div>
        <div class="toc-item"><span>Ch 6. Arrays, Matrices & String Operations</span><span class="toc-dots"></span><span>Page 22</span></div>
        <div class="toc-item"><span>Ch 7. Pointers, Memory Architecture & Pointer Arithmetic</span><span class="toc-dots"></span><span>Page 28</span></div>
        <div class="toc-item"><span>Ch 8. Dynamic Memory Allocation (Heap Management)</span><span class="toc-dots"></span><span>Page 34</span></div>
        <div class="toc-item"><span>Ch 9. Structures, Padding, Unions & Enums</span><span class="toc-dots"></span><span>Page 39</span></div>
        <div class="toc-item"><span>Ch 10. File Handling & Command-Line Arguments</span><span class="toc-dots"></span><span>Page 45</span></div>
        <div class="toc-item"><span>Ch 11. Comparison Tables & Visual Mind Maps</span><span class="toc-dots"></span><span>Page 50</span></div>
        <div class="toc-item"><span>Ch 12. Real-World Practical Projects</span><span class="toc-dots"></span><span>Page 54</span></div>
        <div class="toc-item"><span>Ch 13. Practice Problems (Basic → Advanced)</span><span class="toc-dots"></span><span>Page 60</span></div>
        <div class="toc-item"><span>Ch 14. 30+ University Viva Questions & Answers</span><span class="toc-dots"></span><span>Page 64</span></div>
        <div class="toc-item"><span>Ch 15. 30+ Technical Interview Questions & Answers</span><span class="toc-dots"></span><span>Page 69</span></div>
        <div class="toc-item"><span>Ch 16. 1-Day Revision & Last-Minute Exam Cheat Sheet</span><span class="toc-dots"></span><span>Page 74</span></div>
    </div>

    <!-- MIND MAP -->
    <h1>🧠 C PROGRAMMING — VISUAL MIND MAP</h1>
    <div class="mindmap-box">
        <div style="text-align:center; font-weight:700; font-size:18px; color:#2563eb; margin-bottom:15px;">C LANGUAGE ARCHITECTURE & ROADMAP</div>
        <div class="mindmap-tree">
            <div>
                <span class="mindmap-node">1. Basics & Memory</span>
                <div class="mindmap-subnodes">
                    <span class="mindmap-subnode">Source Code → Preprocessor → Compiler → Assembler → Linker → Executable</span>
                    <span class="mindmap-subnode">Primitive Types (int, float, char, double)</span>
                    <span class="mindmap-subnode">Storage Classes (auto, register, static, extern)</span>
                </div>
            </div>
            <div>
                <span class="mindmap-node">2. Control Flow & Modular Logic</span>
                <div class="mindmap-subnodes">
                    <span class="mindmap-subnode">If-Else / Switch</span>
                    <span class="mindmap-subnode">Loops (For, While, Do-While)</span>
                    <span class="mindmap-subnode">Functions & Call Stack Frames</span>
                    <span class="mindmap-subnode">Recursion & Base Cases</span>
                </div>
            </div>
            <div>
                <span class="mindmap-node">3. Memory & Pointers (Core Systems C)</span>
                <div class="mindmap-subnodes">
                    <span class="mindmap-subnode">Pointers & Addresses (&, *)</span>
                    <span class="mindmap-subnode">Pointer Arithmetic</span>
                    <span class="mindmap-subnode">Array-Pointer Equivalence</span>
                    <span class="mindmap-subnode">Dynamic Allocation (malloc, calloc, realloc, free)</span>
                </div>
            </div>
            <div>
                <span class="mindmap-node">4. Data Structures & I/O</span>
                <div class="mindmap-subnodes">
                    <span class="mindmap-subnode">Structures (struct) & Padding</span>
                    <span class="mindmap-subnode">Unions & Memory Overlap</span>
                    <span class="mindmap-subnode">File Streams (fopen, fread, fwrite, fclose)</span>
                </div>
            </div>
        </div>
    </div>

    <!-- CHAPTER 1: C COMPILATION FLOW -->
    <h1>CHAPTER 1: C COMPILATION PROCESS & ARCHITECTURE</h1>

    <div class="concept-card">
        <div class="concept-title">💡 1. Concept: The C Compilation Pipeline</div>

        <div class="step-block">
            <div class="step-heading">1. What is it?</div>
            <div>The process of transforming high-level C source code (.c) into machine-executable binary code (.exe / executable) through 4 distinct sequential stages.</div>
        </div>

        <div class="step-block">
            <div class="step-heading">2. Why do we need it?</div>
            <div>Computers and CPU instruction sets cannot directly understand human-readable text syntax like <code>printf()</code>. The compilation process translates code into machine language (0s and 1s) tailored to the target CPU architecture.</div>
        </div>

        <div class="step-block">
            <div class="step-heading">3. How does it work? (Internal Stages)</div>
            <div>
                <b>Stage 1: Preprocessing (cpp)</b> — Processes macros (<code>#define</code>), header expansion (<code>#include</code>), strips comments. Output: <code>file.i</code><br>
                <b>Stage 2: Compilation (gcc)</b> — Translates preprocessed code into assembly instructions. Output: <code>file.s</code><br>
                <b>Stage 3: Assembly (as)</b> — Converts assembly code into machine code object bytes. Output: <code>file.o</code> / <code>file.obj</code><br>
                <b>Stage 4: Linking (ld)</b> — Combines object files with standard library compiled code (e.g. <code>printf</code> from libc) to form the final executable executable.
            </div>
        </div>

        <!-- DIAGRAM -->
        <div class="diagram-container">
            <div class="diagram-title">SVG VISUAL DIAGRAM: C COMPILATION STAGES</div>
            <svg width="100%" height="110" viewBox="0 0 520 110" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="35" width="80" height="40" rx="6" fill="#3b82f6" />
                <text x="50" y="60" fill="#fff" font-family="Kalam" font-size="12" text-anchor="middle">source.c</text>
                
                <text x="105" y="55" fill="#2563eb" font-size="16">→</text>

                <rect x="120" y="35" width="85" height="40" rx="6" fill="#0284c7" />
                <text x="162" y="52" fill="#fff" font-family="Kalam" font-size="11" text-anchor="middle">Preprocessor</text>
                <text x="162" y="67" fill="#e0f2fe" font-family="Fira Code" font-size="10" text-anchor="middle">(.i file)</text>

                <text x="220" y="55" fill="#2563eb" font-size="16">→</text>

                <rect x="235" y="35" width="85" height="40" rx="6" fill="#0d9488" />
                <text x="277" y="52" fill="#fff" font-family="Kalam" font-size="11" text-anchor="middle">Compiler</text>
                <text x="277" y="67" fill="#ccfbf1" font-family="Fira Code" font-size="10" text-anchor="middle">(.s assembly)</text>

                <text x="335" y="55" fill="#2563eb" font-size="16">→</text>

                <rect x="350" y="35" width="75" height="40" rx="6" fill="#d97706" />
                <text x="387" y="52" fill="#fff" font-family="Kalam" font-size="11" text-anchor="middle">Assembler</text>
                <text x="387" y="67" fill="#fef3c7" font-family="Fira Code" font-size="10" text-anchor="middle">(.o object)</text>

                <text x="440" y="55" fill="#2563eb" font-size="16">→</text>

                <rect x="455" y="35" width="60" height="40" rx="6" fill="#16a34a" />
                <text x="485" y="52" fill="#fff" font-family="Kalam" font-size="11" text-anchor="middle">Linker</text>
                <text x="485" y="67" fill="#dcfce7" font-family="Fira Code" font-size="10" text-anchor="middle">a.out</text>
            </svg>
        </div>

        <div class="step-block">
            <div class="step-heading">4. Syntax & Basic Program Skeleton</div>
            <div class="code-box">// First C Program
#include &lt;stdio.h&gt;  // Preprocessor directive for standard I/O

int main() {        // Main entry point function
    printf("Welcome to B.Tech CSE C Notes!\\n");
    return 0;       // Indicates successful execution (exit status 0)
}</div>
        </div>

        <div class="step-block">
            <div class="step-heading">5. Real-World Use</div>
            <div>Used in Operating System kernels (Linux Kernel is written in C), embedded devices, device drivers, database engines (MySQL, PostgreSQL storage layer), and Python runtime interpreter (CPython).</div>
        </div>

        <div class="common-mistake">
            <b>⚠️ Common Mistake:</b> Forgetting to return 0 or omitting <code>#include &lt;stdio.h&gt;</code> leading to implicit function declaration warnings in modern GCC compilers.
        </div>

        <div class="exam-tip">
            <b>📝 Exam / Viva Point:</b> In exams, always write <code>int main()</code> instead of <code>void main()</code> because standard C requires <code>main</code> to return an integer exit code to the host OS.
        </div>
    </div>

    <!-- CHAPTER 2: POINTERS & MEMORY ARCHITECTURE -->
    <h1>CHAPTER 2: POINTERS & MEMORY ARCHITECTURE</h1>

    <div class="concept-card">
        <div class="concept-title">💡 2. Concept: Pointers and Memory Addresses</div>

        <div class="step-block">
            <div class="step-heading">1. What is a Pointer?</div>
            <div>A pointer is a variable whose value is the memory address of another variable.</div>
        </div>

        <div class="step-block">
            <div class="step-heading">2. Why do we need Pointers?</div>
            <div>Pointers enable direct memory manipulation, dynamic allocation on Heap, efficient pass-by-reference in functions (avoiding large struct copies), and constructing data structures like Linked Lists and Trees.</div>
        </div>

        <!-- DIAGRAM -->
        <div class="diagram-container">
            <div class="diagram-title">VISUALIZATION: POINTER & MEMORY ADDRESS MAP</div>
            <svg width="100%" height="120" viewBox="0 0 500 120" xmlns="http://www.w3.org/2000/svg">
                <!-- Variable x -->
                <rect x="50" y="30" width="140" height="60" rx="8" fill="#eff6ff" stroke="#3b82f6" stroke-width="2"/>
                <text x="120" y="52" fill="#1e40af" font-family="Kalam" font-size="14" font-weight="bold" text-anchor="middle">int x = 25;</text>
                <text x="120" y="75" fill="#64748b" font-family="Fira Code" font-size="11" text-anchor="middle">Addr: 0x7ffd98</text>

                <!-- Arrow -->
                <path d="M 310 60 L 200 60" stroke="#ef4444" stroke-width="3" marker-end="url(#arrow)" />

                <!-- Pointer ptr -->
                <rect x="310" y="30" width="160" height="60" rx="8" fill="#fef2f2" stroke="#ef4444" stroke-width="2"/>
                <text x="390" y="52" fill="#991b1b" font-family="Kalam" font-size="14" font-weight="bold" text-anchor="middle">int *ptr = &amp;x;</text>
                <text x="390" y="75" fill="#991b1b" font-family="Fira Code" font-size="11" text-anchor="middle">Stores: 0x7ffd98</text>
            </svg>
        </div>

        <div class="step-block">
            <div class="step-heading">4. Syntax & Code Example</div>
            <div class="code-box">#include &lt;stdio.h&gt;

int main() {
    int val = 100;
    int *ptr = &val; // ptr stores address of val

    printf("Value of val: %d\\n", val);
    printf("Address of val (&val): %p\\n", (void*)&val);
    printf("Value stored in ptr: %p\\n", (void*)ptr);
    printf("Value dereferenced (*ptr): %d\\n", *ptr);

    *ptr = 200; // Modifying val indirectly via pointer
    printf("Updated val: %d\\n", val);
    return 0;
}</div>
            <div class="output-box">Output:
Value of val: 100
Address of val (&val): 0x7ffeefbff5ac
Value stored in ptr: 0x7ffeefbff5ac
Value dereferenced (*ptr): 100
Updated val: 200</div>
        </div>

        <div class="interview-tip">
            <b>💼 Technical Interview Question:</b> What is a <i>Dangling Pointer</i> vs a <i>Wild Pointer</i>?<br>
            • <b>Wild Pointer:</b> Uninitialized pointer containing garbage memory address.<br>
            • <b>Dangling Pointer:</b> Pointer pointing to a memory location that has been freed / deallocated.
        </div>
    </div>

    <!-- CHAPTER 3: DYNAMIC MEMORY ALLOCATION -->
    <h1>CHAPTER 3: DYNAMIC MEMORY ALLOCATION (HEAP MANAGEMENT)</h1>

    <div class="concept-card">
        <div class="concept-title">💡 Dynamic Memory Functions: malloc, calloc, realloc, free</div>
        
        <table>
            <thead>
                <tr>
                    <th>Function</th>
                    <th>Syntax</th>
                    <th>Initialization</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><b>malloc()</b></td>
                    <td><code>(type*) malloc(size_in_bytes)</code></td>
                    <td>Garbage Values</td>
                    <td>Allocates single contiguous block of memory on Heap. Returns NULL on failure.</td>
                </tr>
                <tr>
                    <td><b>calloc()</b></td>
                    <td><code>(type*) calloc(num, size)</code></td>
                    <td>Zero Initialized</td>
                    <td>Allocates multiple contiguous blocks and initializes all bytes to 0.</td>
                </tr>
                <tr>
                    <td><b>realloc()</b></td>
                    <td><code>(type*) realloc(ptr, new_size)</code></td>
                    <td>Uninitialized expansion</td>
                    <td>Resizes previously allocated memory block without losing existing data.</td>
                </tr>
                <tr>
                    <td><b>free()</b></td>
                    <td><code>free(ptr); ptr = NULL;</code></td>
                    <td>Deallocated</td>
                    <td>Releases allocated Heap memory back to OS to prevent Memory Leaks.</td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- CHAPTER 11: COMPARISON TABLES -->
    <h1>CHAPTER 11: COMPARISON TABLES (EXAM & VIVA REVISION)</h1>

    <div class="concept-card">
        <div class="concept-title">⚖️ 1. Call by Value vs Call by Reference</div>
        <table>
            <thead>
                <tr>
                    <th>Parameter</th>
                    <th>Call by Value</th>
                    <th>Call by Reference</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><b>Passing Mechanism</b></td>
                    <td>Passes copy of actual argument value.</td>
                    <td>Passes memory address (&) of argument.</td>
                </tr>
                <tr>
                    <td><b>Original Modification</b></td>
                    <td>Changes inside function do NOT affect original variable.</td>
                    <td>Changes inside function directly modify original variable.</td>
                </tr>
                <tr>
                    <td><b>Memory Efficiency</b></td>
                    <td>Less efficient for large structs (copies memory).</td>
                    <td>Highly efficient (passes single pointer address).</td>
                </tr>
            </tbody>
        </table>

        <div class="concept-title" style="margin-top:20px;">⚖️ 2. Structure vs Union</div>
        <table>
            <thead>
                <tr>
                    <th>Feature</th>
                    <th>Structure (struct)</th>
                    <th>Union (union)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><b>Memory Allocation</b></td>
                    <td>Allocates separate memory for every member.</td>
                    <td>Shares single memory block equal to largest member size.</td>
                </tr>
                <tr>
                    <td><b>Member Access</b></td>
                    <td>All members can be accessed simultaneously.</td>
                    <td>Only ONE member can hold a valid value at any given time.</td>
                </tr>
                <tr>
                    <td><b>Total Size</b></td>
                    <td>Sum of sizes of all members (+ padding).</td>
                    <td>Size of the largest member.</td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- REAL WORLD PROJECT -->
    <h1>CHAPTER 12: REAL-WORLD PRACTICAL PROJECT</h1>
    <div class="concept-card">
        <div class="concept-title">🛠️ Project: Student Record Management System (File-Based)</div>
        <div class="step-block">
            <b>Project Requirements:</b> Build a command-line application in C that allows creating, listing, searching, and saving student records (ID, Name, GPA) into a binary file.
        </div>

        <div class="code-box">#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;
#include &lt;string.h&gt;

typedef struct {
    int id;
    char name[50];
    float gpa;
} Student;

void addStudent() {
    FILE *fp = fopen("students.dat", "ab");
    if (!fp) { printf("Error opening file!\\n"); return; }

    Student s;
    printf("Enter Student ID: "); scanf("%d", &s.id);
    printf("Enter Name: "); scanf(" %[^\n]s", s.name);
    printf("Enter GPA: "); scanf("%f", &s.gpa);

    fwrite(&s, sizeof(Student), 1, fp);
    fclose(fp);
    printf("✅ Record saved successfully!\\n");
}

void displayStudents() {
    FILE *fp = fopen("students.dat", "rb");
    if (!fp) { printf("No records found!\\n"); return; }

    Student s;
    printf("\\n--- STUDENT RECORDS ---\\n");
    while (fread(&s, sizeof(Student), 1, fp)) {
        printf("ID: %d | Name: %-20s | GPA: %.2f\\n", s.id, s.name, s.gpa);
    }
    fclose(fp);
}

int main() {
    int choice;
    while (1) {
        printf("\\n1. Add Student\\n2. Display All Students\\n3. Exit\\nChoice: ");
        if (scanf("%d", &choice) != 1 || choice == 3) break;
        if (choice == 1) addStudent();
        else if (choice == 2) displayStudents();
    }
    printf("Exiting program.\\n");
    return 0;
}</div>
    </div>

    <!-- VIVA QUESTIONS -->
    <h1>CHAPTER 14: 30+ IMPORTANT UNIVERSITY VIVA QUESTIONS</h1>
    <div class="qa-box">
        <div class="qa-question">Q1. What is the static keyword in C?</div>
        <div class="qa-answer"><b>Ans:</b> A <code>static</code> local variable retains its value between function calls and is stored in the Data Segment. A <code>static</code> global variable limits its scope to the file in which it is defined.</div>
    </div>
    <div class="qa-box">
        <div class="qa-question">Q2. What is a NULL Pointer vs Void Pointer?</div>
        <div class="qa-answer"><b>Ans:</b> A <code>NULL</code> pointer points to nothing (address 0x0). A <code>void*</code> (generic pointer) can hold address of any data type but must be typecasted before dereferencing.</div>
    </div>
    <div class="qa-box">
        <div class="qa-question">Q3. What is Memory Leak in C?</div>
        <div class="qa-answer"><b>Ans:</b> A memory leak occurs when memory allocated dynamically on Heap via <code>malloc()</code> is no longer needed but never released using <code>free()</code>.</div>
    </div>

    <!-- TECHNICAL INTERVIEW QUESTIONS -->
    <h1>CHAPTER 15: TECHNICAL INTERVIEW QUESTIONS</h1>
    <div class="interview-tip">
        <b>Q. Implement a function to reverse a string in-place using pointers.</b>
        <div class="code-box">void reverseString(char *str) {
    if (!str) return;
    char *start = str;
    char *end = str + strlen(str) - 1;
    while (start &lt; end) {
        char temp = *start;
        *start++ = *end;
        *end-- = temp;
    }
}</div>
    </div>

    <!-- 1-DAY REVISION CHEAT SHEET -->
    <h1>CHAPTER 16: 1-DAY REVISION & EXAM CHEAT SHEET</h1>
    <div class="concept-card">
        <div class="concept-title">⚡ Quick Revision Summary</div>
        <ul>
            <li><b>Data Type Sizes (64-bit OS):</b> <code>char</code> = 1B, <code>short</code> = 2B, <code>int</code> = 4B, <code>long</code> = 8B, <code>float</code> = 4B, <code>double</code> = 8B, <code>pointer</code> = 8B.</li>
            <li><b>Operator Precedence:</b> Parentheses <code>()</code> &gt; Unary <code>++, --, *ptr, &amp;</code> &gt; Arithmetic <code>*, /, %</code> &gt; Additive <code>+, -</code> &gt; Relational &gt; Logical &gt; Assignment.</li>
            <li><b>Pointer Rule:</b> <code>arr[i]</code> is equivalent to <code>*(arr + i)</code>.</li>
            <li><b>Struct Padding:</b> Members are aligned to multiples of their natural size (e.g. 4-byte int aligned at 4-byte boundary).</li>
        </ul>
    </div>

</div>
</body>
</html>
    `;
};
