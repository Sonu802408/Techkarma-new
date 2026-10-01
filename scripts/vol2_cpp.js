const getHandwrittenStyles = require('./styles');

module.exports = function generateCPPProgrammingHTML() {
    const primaryColor = '#4f46e5'; // Indigo/Purple for C++

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>C++ Programming — Complete Handwritten Notes</title>
    <style>
        ${getHandwrittenStyles(primaryColor)}
    </style>
</head>
<body>
<div class="notebook-container">

    <!-- COVER PAGE -->
    <div class="cover-page">
        <div>
            <div class="cover-title-badge">Volume 2 • B.Tech CSE Study Series</div>
            <h1 class="cover-title">C++ PROGRAMMING</h1>
            <div class="cover-subtitle">Complete Professional Handwritten Notes</div>
            <p style="font-family: 'Kalam', cursive; font-size: 16px; color: #475569; max-width: 480px; margin: 0 auto;">
                From Foundations to Advanced Object-Oriented Architecture, VTABLE Internals, Modern C++ Smart Pointers & Full STL Mastery
            </p>
        </div>

        <svg width="220" height="140" viewBox="0 0 220 140" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="200" height="120" rx="12" fill="#0f172a" stroke="#818cf8" stroke-width="3"/>
            <text x="25" y="40" fill="#818cf8" font-family="Fira Code" font-size="14" font-weight="bold">#include &lt;iostream&gt;</text>
            <text x="25" y="65" fill="#38bdf8" font-family="Fira Code" font-size="14">class Node { public:</text>
            <text x="45" y="90" fill="#f8fafc" font-family="Fira Code" font-size="14">virtual void draw();</text>
            <text x="25" y="115" fill="#4ade80" font-family="Fira Code" font-size="14">}; // Modern C++</text>
        </svg>

        <div class="cover-features">
            <div class="cover-feature-item">✓ OOP Principles (Encapsulation/Polymorphism)</div>
            <div class="cover-feature-item">✓ VTABLE & VPTR Deep Dive</div>
            <div class="cover-feature-item">✓ Complete STL Containers & Iterators</div>
            <div class="cover-feature-item">✓ Smart Pointers (unique/shared/weak)</div>
            <div class="cover-feature-item">✓ 30+ OOP & STL Interview Q&A</div>
            <div class="cover-feature-item">✓ Real-World OOP Projects</div>
        </div>

        <div class="cover-footer">
            Designed for University Exams, Product Company Placements & Competitive Coding
        </div>
    </div>

    <!-- TABLE OF CONTENTS -->
    <div class="toc-container">
        <div class="toc-title">📖 TABLE OF CONTENTS — C++ PROGRAMMING</div>

        <div class="toc-item"><span>Ch 1. Introduction to C++ & C vs C++ Paradigms</span><span class="toc-dots"></span><span>Page 02</span></div>
        <div class="toc-item"><span>Ch 2. Object-Oriented Programming (OOP) Fundamentals</span><span class="toc-dots"></span><span>Page 06</span></div>
        <div class="toc-item"><span>Ch 3. Constructors, Destructors &amp; &apos;this&apos; Pointer</span><span class="toc-dots"></span><span>Page 11</span></div>
        <div class="toc-item"><span>Ch 4. Inheritance Modes & Multiple Inheritance Pitfalls</span><span class="toc-dots"></span><span>Page 16</span></div>
        <div class="toc-item"><span>Ch 5. Polymorphism, Virtual Functions & VTABLE Mechanism</span><span class="toc-dots"></span><span>Page 22</span></div>
        <div class="toc-item"><span>Ch 6. Abstraction, Pure Virtual Functions & Interfaces</span><span class="toc-dots"></span><span>Page 28</span></div>
        <div class="toc-item"><span>Ch 7. Templates & Generic Programming (Function & Class)</span><span class="toc-dots"></span><span>Page 33</span></div>
        <div class="toc-item"><span>Ch 8. Exception Handling & RAII Pattern</span><span class="toc-dots"></span><span>Page 38</span></div>
        <div class="toc-item"><span>Ch 9. Modern C++: Smart Pointers & Lambdas</span><span class="toc-dots"></span><span>Page 43</span></div>
        <div class="toc-item"><span>Ch 10. Standard Template Library (STL) Complete Guide</span><span class="toc-dots"></span><span>Page 49</span></div>
        <div class="toc-item"><span>Ch 11. Comparison Tables & Mind Maps</span><span class="toc-dots"></span><span>Page 56</span></div>
        <div class="toc-item"><span>Ch 12. Real-World Practical Projects (Bank System, Quiz App)</span><span class="toc-dots"></span><span>Page 61</span></div>
        <div class="toc-item"><span>Ch 13. Practice Problems (Basic → Advanced)</span><span class="toc-dots"></span><span>Page 67</span></div>
        <div class="toc-item"><span>Ch 14. 30+ Important University Viva Questions</span><span class="toc-dots"></span><span>Page 71</span></div>
        <div class="toc-item"><span>Ch 15. 30+ Technical Interview Questions (OOP + STL)</span><span class="toc-dots"></span><span>Page 76</span></div>
        <div class="toc-item"><span>Ch 16. 1-Day Revision & C++ Cheat Sheet</span><span class="toc-dots"></span><span>Page 81</span></div>
    </div>

    <!-- CHAPTER 5: POLYMORPHISM & VTABLE -->
    <h1>CHAPTER 5: POLYMORPHISM & VTABLE MECHANISM</h1>

    <div class="concept-card">
        <div class="concept-title">💡 Runtime Polymorphism & Virtual Function Mechanics</div>

        <div class="step-block">
            <div class="step-heading">1. What is Runtime Polymorphism?</div>
            <div>The capability of a base class pointer or reference to invoke overridden methods in derived classes at runtime, determined dynamically based on the actual object being pointed to.</div>
        </div>

        <!-- DIAGRAM -->
        <div class="diagram-container">
            <div class="diagram-title">SVG DIAGRAM: VTABLE & VPTR ARCHITECTURE IN MEMORY</div>
            <svg width="100%" height="130" viewBox="0 0 520 130" xmlns="http://www.w3.org/2000/svg">
                <!-- Object Instance -->
                <rect x="20" y="30" width="150" height="70" rx="8" fill="#eff6ff" stroke="#3b82f6" stroke-width="2"/>
                <text x="95" y="52" fill="#1e40af" font-family="Kalam" font-size="13" font-weight="bold" text-anchor="middle">Derived Object Instance</text>
                <rect x="35" y="62" width="120" height="25" rx="4" fill="#dbeafe" stroke="#2563eb"/>
                <text x="95" y="79" fill="#1e40af" font-family="Fira Code" font-size="11" text-anchor="middle">vptr ────┐</text>

                <!-- Arrow -->
                <path d="M 155 75 L 290 75" stroke="#ef4444" stroke-width="3" marker-end="url(#arrow)" />

                <!-- VTABLE -->
                <rect x="290" y="25" width="210" height="80" rx="8" fill="#fef2f2" stroke="#ef4444" stroke-width="2"/>
                <text x="395" y="45" fill="#991b1b" font-family="Kalam" font-size="13" font-weight="bold" text-anchor="middle">VTABLE (Virtual Method Table)</text>
                <text x="305" y="68" fill="#7f1d1d" font-family="Fira Code" font-size="11">[0]: &amp;Derived::draw()</text>
                <text x="305" y="88" fill="#7f1d1d" font-family="Fira Code" font-size="11">[1]: &amp;Derived::show()</text>
            </svg>
        </div>

        <div class="step-block">
            <div class="step-heading">2. Complete C++ Code Example</div>
            <div class="code-box">#include &lt;iostream&gt;
using namespace std;

class Shape {
public:
    // Virtual method enables dynamic dispatch
    virtual void draw() {
        cout &lt;&lt; "Drawing Generic Shape" &lt;&lt; endl;
    }
    virtual ~Shape() { cout &lt;&lt; "Shape Destructor" &lt;&lt; endl; }
};

class Circle : public Shape {
public:
    void draw() override {
        cout &lt;&lt; "Drawing Circle 🔴" &lt;&lt; endl;
    }
    ~Circle() { cout &lt;&lt; "Circle Destructor" &lt;&lt; endl; }
};

int main() {
    Shape* shapePtr = new Circle(); // Base pointer to derived object
    shapePtr-&gt;draw();               // Calls Circle::draw() via VTABLE
    delete shapePtr;                // Calls Circle destructor then Shape destructor
    return 0;
}</div>
            <div class="output-box">Output:
Drawing Circle 🔴
Circle Destructor
Shape Destructor</div>
        </div>

        <div class="interview-tip">
            <b>💼 Product Company Interview Question:</b> Why should a base class destructor always be declared <code>virtual</code> when using polymorphism?<br>
            <b>Ans:</b> If the base class destructor is not virtual, deleting a derived object via a base class pointer causes <b>undefined behavior</b> where only the base destructor is called, leading to memory leaks for derived class members!
        </div>
    </div>

    <!-- CHAPTER 10: STL MASTERY -->
    <h1>CHAPTER 10: STANDARD TEMPLATE LIBRARY (STL) MASTERY</h1>
    <div class="concept-card">
        <div class="concept-title">🚀 Complete C++ STL Containers Cheat Sheet</div>
        <table>
            <thead>
                <tr>
                    <th>Container</th>
                    <th>Underlying Data Structure</th>
                    <th>Access Time</th>
                    <th>Insertion/Deletion</th>
                    <th>Use Case</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><code>std::vector</code></td>
                    <td>Dynamic Contiguous Array</td>
                    <td>O(1) random access</td>
                    <td>O(1) amortized end, O(N) middle</td>
                    <td>Default choice for sequential data.</td>
                </tr>
                <tr>
                    <td><code>std::list</code></td>
                    <td>Doubly Linked List</td>
                    <td>O(N) sequential access</td>
                    <td>O(1) anywhere given iterator</td>
                    <td>Frequent insertions/deletions in middle.</td>
                </tr>
                <tr>
                    <td><code>std::set</code></td>
                    <td>Red-Black Tree (Balanced BST)</td>
                    <td>O(log N) search</td>
                    <td>O(log N) insertion</td>
                    <td>Unique sorted elements.</td>
                </tr>
                <tr>
                    <td><code>std::unordered_map</code></td>
                    <td>Hash Table</td>
                    <td>O(1) average search</td>
                    <td>O(1) average insertion</td>
                    <td>Key-value lookup with highest performance.</td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- REAL-WORLD PROJECT -->
    <h1>CHAPTER 12: REAL-WORLD PRACTICAL PROJECT</h1>
    <div class="concept-card">
        <div class="concept-title">🛠️ Project: OOP Bank Account Management System</div>
        <div class="code-box">#include &lt;iostream&gt;
#include &lt;vector&gt;
#include &lt;memory&gt;
using namespace std;

class BankAccount {
private:
    int accNum;
    string holderName;
protected:
    double balance;
public:
    BankAccount(int id, string name, double bal) : accNum(id), holderName(name), balance(bal) {}
    virtual void deposit(double amount) { balance += amount; }
    virtual bool withdraw(double amount) {
        if (amount &gt; balance) return false;
        balance -= amount;
        return true;
    }
    virtual void displayInfo() const {
        cout &lt;&lt; "Acc #" &lt;&lt; accNum &lt;&lt; " | Name: " &lt;&lt; holderName &lt;&lt; " | Balance: $" &lt;&lt; balance &lt;&lt; endl;
    }
    virtual ~BankAccount() = default;
};

class SavingsAccount : public BankAccount {
private:
    double interestRate;
public:
    SavingsAccount(int id, string name, double bal, double rate)
        : BankAccount(id, name, bal), interestRate(rate) {}
    void applyInterest() { balance += balance * (interestRate / 100); }
};

int main() {
    vector&lt;unique_ptr&lt;BankAccount&gt;&gt; bank;
    bank.push_back(make_unique&lt;SavingsAccount&gt;(101, "Alice", 1000.0, 5.0));

    bank[0]-&gt;deposit(500);
    bank[0]-&gt;displayInfo();
    return 0;
}</div>
    </div>

    <!-- VIVA & INTERVIEW -->
    <h1>CHAPTER 14: 30+ UNIVERSITY VIVA & INTERVIEW QUESTIONS</h1>
    <div class="qa-box">
        <div class="qa-question">Q1. What is the difference between shallow copy and deep copy?</div>
        <div class="qa-answer"><b>Ans:</b> Shallow copy duplicates member values as-is (pointer addresses are copied, sharing the same memory block). Deep copy allocates distinct new memory for dynamically allocated pointers and copies the actual values, preventing double-free errors.</div>
    </div>
    <div class="qa-box">
        <div class="qa-question">Q2. What is RAII in C++?</div>
        <div class="qa-answer"><b>Ans:</b> Resource Acquisition Is Initialization (RAII) is a C++ idiom where resource ownership (memory, file handles, mutexes) is tied to object lifetime—resources are acquired in constructor and automatically freed in destructor.</div>
    </div>

</div>
</body>
</html>
    `;
};
