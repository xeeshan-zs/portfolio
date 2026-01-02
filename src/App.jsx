import './index.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Hero />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Navbar />
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
