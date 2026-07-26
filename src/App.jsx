import { useState, useEffect, lazy, Suspense } from 'react';
import './index.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import ThemeToggle from './components/ThemeToggle';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

const EnergyParticles = lazy(() => import('./components/EnergyParticles'));
const Experience = lazy(() => import('./components/Experience'));
const Projects = lazy(() => import('./components/Projects'));
const Achievements = lazy(() => import('./components/Achievements'));
const Education = lazy(() => import('./components/Education'));
const Contact = lazy(() => import('./components/Contact'));



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
      <Suspense fallback={null}>
        <EnergyParticles />
      </Suspense>
      <Header />
      <main>
        <Hero theme={theme} />
        <Skills />
        <Suspense fallback={null}>
          <Experience />
          <Projects />
          <Achievements />
          <Education />
          <Contact />
        </Suspense>
      </main>
      <Navbar />
      <ThemeToggle theme={theme} setTheme={setTheme} />
      <Footer />
    </div>
  );
}

export default App;
