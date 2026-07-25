import { useState, useEffect, useRef } from 'react';
import profileImg from '../assets/profile.jpg';
import './Hero.css';

const CODE_LINES = [
  { type: 'comment', text: '// power_level.ts' },
  { type: 'keyword', text: 'const' },
  { type: 'var', text: ' zeeshan ' },
  { type: 'op', text: '= ' },
  { type: 'bracket', text: '{' },
  { type: 'prop', text: '  role' },
  { type: 'op', text: ': ' },
  { type: 'string', text: '"Full Stack Dev"' },
  { type: 'op', text: ',' },
  { type: 'prop', text: '  power' },
  { type: 'op', text: ': ' },
  { type: 'number', text: '9001' },
  { type: 'op', text: ',' },
  { type: 'prop', text: '  status' },
  { type: 'op', text: ': ' },
  { type: 'string', text: '"transforming..."' },
  { type: 'op', text: ',' },
  { type: 'bracket', text: '}' },
  { type: 'op', text: ';' },
];

const Hero = () => {
    const [typedText, setTypedText] = useState('');
    const [powerFill, setPowerFill] = useState(0);
    const [powerVisible, setPowerVisible] = useState(false);
    const fullText = 'npx zeeshan --power-over-9000';
    const containerRef = useRef(null);
    const dragState = useRef({ id: null, pointerId: null, startX: 0, startY: 0, initialX: 0, initialY: 0 });
    const [offsets, setOffsets] = useState({ cpp: { x: 0, y: 0 }, fullStack: { x: 0, y: 0 }, available: { x: 0, y: 0 } });
    const [draggingId, setDraggingId] = useState(null);

    // Typing effect
    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            if (i <= fullText.length) {
                setTypedText(fullText.slice(0, i));
                i++;
            } else {
                clearInterval(interval);
            }
        }, 60);
        return () => clearInterval(interval);
    }, []);

    // Ki power bar charge animation
    useEffect(() => {
        const timeout = setTimeout(() => {
            setPowerVisible(true);
            let val = 0;
            const step = setInterval(() => {
                val += 1.2;
                if (val >= 100) { val = 100; clearInterval(step); }
                setPowerFill(val);
            }, 20);
            return () => clearInterval(step);
        }, 600);
        return () => clearTimeout(timeout);
    }, []);

    const clamp = (val, min, max) => Math.min(max, Math.max(min, val));

    const handlePointerDown = (id, e) => {
        const cur = offsets[id];
        dragState.current = { id, pointerId: e.pointerId, startX: e.clientX, startY: e.clientY, initialX: cur.x, initialY: cur.y };
        setDraggingId(id);
        e.currentTarget.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e) => {
        const s = dragState.current;
        if (!s.id || s.pointerId !== e.pointerId) return;
        const rect = containerRef.current?.getBoundingClientRect();
        const limX = rect ? Math.max(20, rect.width * 0.2) : 60;
        const limY = rect ? Math.max(20, rect.height * 0.2) : 60;
        const nx = clamp(s.initialX + (e.clientX - s.startX), -limX, limX);
        const ny = clamp(s.initialY + (e.clientY - s.startY), -limY, limY);
        setOffsets(prev => ({ ...prev, [s.id]: { x: nx, y: ny } }));
    };

    const handlePointerUp = (e) => {
        if (dragState.current.pointerId !== e.pointerId) return;
        dragState.current = { id: null, pointerId: null, startX: 0, startY: 0, initialX: 0, initialY: 0 };
        setDraggingId(null);
    };

    const badgeStyle = (id) => ({
        '--drag-x': `${offsets[id].x}px`,
        '--drag-y': `${offsets[id].y}px`,
    });

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

                        {/* Ki Power Meter */}
                        <div className={`ki-meter ${powerVisible ? 'ki-meter-visible' : ''}`}>
                            <div className="ki-meter-label">
                                <span className="ki-meter-text">⚡ KI LEVEL</span>
                                <span className="ki-meter-pct">{Math.round(powerFill)}%</span>
                            </div>
                            <div className="ki-meter-track">
                                <div className="ki-meter-fill" style={{ width: `${powerFill}%` }} />
                                <div className="ki-meter-glow" style={{ width: `${powerFill}%` }} />
                            </div>
                        </div>

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
                        <div className="hero-terminal">
                            <div className="terminal-bar">
                                <span className="terminal-dot" />
                                <span className="terminal-dot" />
                                <span className="terminal-dot" />
                                <span className="terminal-title">power_level.ts</span>
                            </div>
                            <div className="terminal-body">
                                {CODE_LINES.map((token, i) => (
                                    <span key={i} className={`code-${token.type}`}>{token.text}</span>
                                ))}
                                <div className="terminal-cursor-line">
                                    <span className="terminal-prompt">$</span>
                                    <span className="terminal-typed">{typedText}</span>
                                    <span className="terminal-cursor">|</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="hero-visual">
                        <div
                            className="hero-image-container"
                            ref={containerRef}
                            onPointerMove={handlePointerMove}
                            onPointerUp={handlePointerUp}
                            onPointerCancel={handlePointerUp}
                        >
                            {/* SSJ Lightning bolts */}
                            <div className="ssj-lightning ssj-lightning-1" />
                            <div className="ssj-lightning ssj-lightning-2" />
                            <div className="ssj-lightning ssj-lightning-3" />
                            <div className="ssj-lightning ssj-lightning-4" />

                            <div className="aura-ring aura-ring-1"></div>
                            <div className="aura-ring aura-ring-2"></div>
                            <div className="aura-ring aura-ring-3"></div>
                            <div className="hero-image-wrapper">
                                <img src={profileImg} alt="Zeeshan Sarfraz" className="hero-image" />
                            </div>
                            <div
                                className={`floating-badge badge-cpp ${draggingId === 'cpp' ? 'is-dragging' : ''}`}
                                style={badgeStyle('cpp')}
                                onPointerDown={(e) => handlePointerDown('cpp', e)}
                                role="button" tabIndex={0} aria-label="Drag C++ badge"
                            >
                                <span className="badge-dot"></span>
                                C++
                            </div>
                            <div
                                className={`floating-badge badge-fullstack ${draggingId === 'fullStack' ? 'is-dragging' : ''}`}
                                style={badgeStyle('fullStack')}
                                onPointerDown={(e) => handlePointerDown('fullStack', e)}
                                role="button" tabIndex={0} aria-label="Drag Full Stack badge"
                            >
                                <span className="badge-icon">⚡</span>
                                Full Stack
                            </div>
                            <div
                                className={`floating-badge badge-available ${draggingId === 'available' ? 'is-dragging' : ''}`}
                                style={badgeStyle('available')}
                                onPointerDown={(e) => handlePointerDown('available', e)}
                                role="button" tabIndex={0} aria-label="Drag Available badge"
                            >
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
