import './Hero.css';
import profileImg from '../assets/profile.jpg';

const Hero = () => {
    return (
        <section id="hero" className="hero section">
            <div className="container">
                <div className="hero-content">
                    <div className="hero-text">
                        <p className="hero-greeting">
                            <span className="greeting-line"></span>
                            HELLO, I'M
                        </p>
                        <h1 className="hero-name">
                            Zeeshan
                            <br />
                            <span className="name-highlight">Sarfraz</span>
                        </h1>
                        <p className="hero-title">Computer Science Student & Developer</p>
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
                            <a href="#contact" className="btn btn-outline">
                                Get in Touch
                                <span className="status-dot"></span>
                            </a>
                        </div>
                    </div>
                    <div className="hero-visual">
                        <div className="hero-image-container">
                            <div className="hero-image-wrapper">
                                <img src={profileImg} alt="Zeeshan Sarfraz" className="hero-image" />
                            </div>
                            <div className="floating-badge badge-react">
                                <span className="badge-dot"></span>
                                C++
                            </div>
                            <div className="floating-badge badge-fullstack">
                                <span className="badge-icon">⚡</span>
                                Full Stack
                            </div>
                            <div className="floating-badge badge-available">
                                <span className="available-dot"></span>
                                Available
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
