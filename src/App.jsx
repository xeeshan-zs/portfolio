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

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'saiyan';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .catch(() => { });
    }
  }, []);

  return (
    <div className="app">
      <EnergyParticles />
      <Header />
      <main>
        <Hero />
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
