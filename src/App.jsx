import { useState, useEffect, lazy, Suspense } from 'react';
import './index.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import ThemeToggle from './components/ThemeToggle';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import EditorialCursor from './components/EditorialCursor';
import './editorial.css';

const EnergyParticles = lazy(() => import('./components/EnergyParticles'));
const EclipseHero = lazy(() => import('./components/EclipseHero'));
const Experience = lazy(() => import('./components/Experience'));
const Projects = lazy(() => import('./components/Projects'));
const Achievements = lazy(() => import('./components/Achievements'));
const Education = lazy(() => import('./components/Education'));
const Contact = lazy(() => import('./components/Contact'));



function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('portfolio-theme-v2') || 'editorial';
  });
  const [scouterScan, setScouterScan] = useState(false);
  const isStudioTheme = theme === 'editorial' || theme === 'eclipse';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme-v2', theme);
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

    const observeElements = () => {
      document.querySelectorAll('.scroll-animate:not(.scroll-visible)').forEach((el) => {
        observer.observe(el);
      });
    };

    observeElements();

    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return (
    <div className="app">
      {!isStudioTheme && scouterScan && <div className="scouter-scan-overlay" />}
      {!isStudioTheme && <CustomCursor />}
      {theme === 'editorial' && <EditorialCursor />}
      {!isStudioTheme && <Suspense fallback={null}><EnergyParticles /></Suspense>}
      <Header />
      <main>
        {theme === 'eclipse' ? (
          <Suspense fallback={<section className="eclipse-loading section" aria-label="Loading Eclipse theme" />}>
            <EclipseHero />
          </Suspense>
        ) : <Hero theme={theme} />}
        <Skills theme={theme} />
        <Suspense fallback={null}>
          <Experience />
          <Projects theme={theme} />
          <Achievements />
          <Education />
          <Contact theme={theme} />
        </Suspense>
      </main>
      <Navbar />
      <ThemeToggle theme={theme} setTheme={setTheme} />
      <Footer />
    </div>
  );
}

export default App;
