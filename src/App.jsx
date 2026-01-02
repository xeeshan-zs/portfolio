import { useState, useEffect } from 'react';
import './index.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Education from './components/Education';
import Contact from './components/Contact';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'cream';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className="app">
      <Header />
      <main>
        <Hero />
        <Skills />
        <Projects />
        <Achievements />
        <Education />
        <Contact />
      </main>
      <Navbar />
      <ThemeToggle theme={theme} setTheme={setTheme} />
      <footer className="footer">
        <div className="container">
          <p className="footer-text">
            © 2026 Zeeshan Sarfraz. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
