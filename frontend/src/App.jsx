import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Classes from './pages/Classes';
import Programming from './pages/Programming';
import CoreComputer from './pages/CoreComputer';
import AdvancedTech from './pages/AdvancedTech';
import Exam from './pages/Exam';
import Courses from './pages/Courses';
import Admission from './pages/Admission';
import Notes from './pages/Notes';
import Contact from './pages/Contact';

function App() {
    const [theme, setTheme] = useState("dark");
    const location = useLocation();

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, []);

    useEffect(() => {
        const root = document.documentElement;

        root.classList.remove(
            "light-theme",
            "dark-theme",
            "midnight-theme",
            "charcoal-theme",
            "sunset-theme"
        );

        root.classList.add(theme + "-theme");

        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <div className="app-container">
            <Navbar theme={theme} setTheme={setTheme} />

            <main style={{ minHeight: '80vh', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/classes" element={<Classes />} />
                    <Route path="/classes/:classId" element={<Classes />} />
                    <Route path="/programming" element={<Programming />} />
                    <Route path="/core-computer" element={<CoreComputer />} />
                    <Route path="/advanced-tech" element={<AdvancedTech />} />
                    <Route path="/exam" element={<Exam />} />
                    <Route path="/courses" element={<Courses />} />
                    <Route path="/admission" element={<Admission />} />
                    <Route path="/notes" element={<Notes />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="*" element={
                        <div className="container section" style={{ textAlign: 'center', marginTop: '10vh' }}>
                            <h2 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '1rem' }}>404</h2>
                            <h3>Page Not Found</h3>
                        </div>
                    } />
                </Routes>
            </main>

            <Footer />
        </div>
    );
}

export default App;
