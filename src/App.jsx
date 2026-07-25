import { useState, useEffect } from 'react';
import './index.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Education from './components/Education';
import Contact from './components/Contact';
import ThemeToggle from './components/ThemeToggle';
import Footer from './components/Footer';
import EnergyParticles from './components/EnergyParticles';
import CustomCursor from './components/CustomCursor';

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'saiyan';
  });
  const [scouterScan, setScouterScan] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }
  }, []);

  // Scouter scan on load
  useEffect(() => {
    const t = setTimeout(() => {
      setScouterScan(true);
      setTimeout(() => setScouterScan(false), 1600);
    }, 300);
    return () => clearTimeout(t);
  }, []);

  // Scroll animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.scroll-animate').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="app">
      {scouterScan && <div className="scouter-scan-overlay" />}
      <CustomCursor />
      <EnergyParticles />
      <Header />
      <main>
        <Hero theme={theme} />
        <Skills />
        <Experience />
        <Projects />
        <Achievements />
        <Education />
        <Contact />
      </main>
      <Navbar />
      <ThemeToggle theme={theme} setTheme={setTheme} />
      <Footer />
    </div>
  );
}

export default App;
