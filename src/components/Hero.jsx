import DragonBall from './DragonBall';
import './Hero.css';

const Hero = () => {
    return (
        <section id="hero" className="hero section">
            <div className="hero-bg-glow" />
            <div className="container">
                <div className="hero-content">
                    <div className="hero-text">
                        <p className="hero-greeting">
                            <span className="greeting-line"></span>
                            POWER LEVEL OVER
                            <span className="power-level">9000</span>
                        </p>
                        <h1 className="hero-name">
                            Zeeshan
                            <br />
                            <span className="name-highlight">Sarfraz</span>
                        </h1>
                        <p className="hero-title">Full Stack Developer & Saiyan Coder</p>
                        <p className="hero-description">
                            Passionate about building exceptional digital experiences. Specializing in
                            competitive programming, web development, and software engineering. Turning complex
                            ideas into elegant, scalable solutions.
                        </p>
                        <div className="hero-cta">
                            <a href="#projects" className="btn btn-primary">
                                View Projects
                                <span className="btn-arrow">→</span>
                            </a>
                            <a href="/Resume_Zeeshan_Sarfraz.docx" download className="btn btn-primary">
                                Download Resume
                                <span className="btn-arrow">↓</span>
                            </a>
                            <a href="#contact" className="btn btn-outline">
                                Get in Touch
                                <span className="ki-orb"></span>
                            </a>
                        </div>
                        <div className="hero-stats">
                            <div className="stat-item">
                                <span className="stat-value">7+</span>
                                <span className="stat-label">Projects</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-value">1st</span>
                                <span className="stat-label">Hackathon</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-value">3.0+</span>
                                <span className="stat-label">CGPA</span>
                            </div>
                        </div>
                    </div>
                    <div className="hero-visual">
                        <div className="dragon-ball-container">
                            <div className="aura-ring aura-ring-1"></div>
                            <div className="aura-ring aura-ring-2"></div>
                            <div className="dragon-ball-canvas">
                                <DragonBall />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
