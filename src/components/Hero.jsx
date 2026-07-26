import { useState, useEffect, useRef, useCallback } from 'react';
import profileImg from '../assets/profile.jpg';
import './Hero.css';

const CODE_LINES = [
  { text: '// Hero.tsx — portfolio intro', stage: 0 },
  { text: '', stage: 0 },
  { text: 'export default function Hero() {', stage: 0 },
  { text: '  return (', stage: 1 },
  { text: '    <section className="hero">', stage: 2 },
  { text: '      <h1>Zeeshan Sarfraz</h1>', stage: 3 },
  { text: '      <p>Full Stack Developer</p>', stage: 4 },
  { text: '      <div className="stack">', stage: 5 },
  { text: '        <span>React</span>', stage: 5 },
  { text: '        <span>Firebase</span>', stage: 5 },
  { text: '        <span>Flutter</span>', stage: 5 },
  { text: '      </div>', stage: 5 },
  { text: '      <a href="#projects">View Work</a>', stage: 6 },
  { text: '    </section>', stage: 7 },
  { text: '  );', stage: 7 },
  { text: '}', stage: 7 },
];

function highlightLine(text) {
  if (!text) return <span>&nbsp;</span>;
  if (text.trim().startsWith('//')) return <span className="code-comment">{text}</span>;

  const keywords = ['import', 'export', 'default', 'function', 'return', 'const', 'from'];
  const parts = [];
  let result = text;

  for (const kw of keywords) {
    result = result.replace(new RegExp(`\\b(${kw})\\b`, 'g'), `<kw>$1</kw>`);
  }
  result = result.replace(/"([^"]*)"/g, '<str>"$1"</str>');
  result = result.replace(/'([^']*)'/g, `<str>'$1'</str>`);
  result = result.replace(/(function\s+)(\w+)/g, '$1<fn>$2</fn>');

  const tokens = result.split(/(<kw>.*?<\/kw>|<str>.*?<\/str>|<fn>.*?<\/fn>)/g);

  return (
    <>
      {tokens.map((token, i) => {
        if (token.startsWith('<kw>')) return <span key={i} className="code-keyword">{token.replace(/<\/?kw>/g, '')}</span>;
        if (token.startsWith('<str>')) return <span key={i} className="code-string">{token.replace(/<\/?str>/g, '')}</span>;
        if (token.startsWith('<fn>')) return <span key={i} className="code-fn">{token.replace(/<\/?fn>/g, '')}</span>;
        return <span key={i}>{token}</span>;
      })}
    </>
  );
}

const Hero = () => {
    const [typedCount, setTypedCount] = useState(0);
    const [previewStage, setPreviewStage] = useState(0);
    const [terminalVisible, setTerminalVisible] = useState(false);
    const [powerFill, setPowerFill] = useState(0);
    const [powerVisible, setPowerVisible] = useState(false);
    const terminalRef = useRef(null);
    const terminalStarted = useRef(false);
    const containerRef = useRef(null);
    const dragState = useRef({ id: null, pointerId: null, startX: 0, startY: 0, initialX: 0, initialY: 0 });
    const [offsets, setOffsets] = useState({ react: { x: 0, y: 0 }, fullStack: { x: 0, y: 0 }, firebase: { x: 0, y: 0 }, available: { x: 0, y: 0 } });
    const [draggingId, setDraggingId] = useState(null);

    useEffect(() => {
        const el = terminalRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !terminalStarted.current) {
                    terminalStarted.current = true;
                    setTerminalVisible(true);
                }
            },
            { threshold: 0.2 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!terminalVisible) return;
        let lineIdx = 0;
        const interval = setInterval(() => {
            lineIdx++;
            if (lineIdx <= CODE_LINES.length) {
                setTypedCount(lineIdx);
                setPreviewStage(CODE_LINES[lineIdx - 1].stage);
            } else {
                clearInterval(interval);
            }
        }, 200);
        return () => clearInterval(interval);
    }, [terminalVisible]);

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

    const handlePointerDown = useCallback((id, e) => {
        const cur = offsets[id];
        dragState.current = { id, pointerId: e.pointerId, startX: e.clientX, startY: e.clientY, initialX: cur.x, initialY: cur.y };
        setDraggingId(id);
        e.currentTarget.setPointerCapture(e.pointerId);
    }, [offsets]);

    const handlePointerMove = useCallback((e) => {
        const s = dragState.current;
        if (!s.id || s.pointerId !== e.pointerId) return;
        const rect = containerRef.current?.getBoundingClientRect();
        const limX = rect ? Math.max(20, rect.width * 0.2) : 60;
        const limY = rect ? Math.max(20, rect.height * 0.2) : 60;
        const nx = clamp(s.initialX + (e.clientX - s.startX), -limX, limX);
        const ny = clamp(s.initialY + (e.clientY - s.startY), -limY, limY);
        setOffsets(prev => ({ ...prev, [s.id]: { x: nx, y: ny } }));
    }, []);

    const handlePointerUp = useCallback((e) => {
        if (dragState.current.pointerId !== e.pointerId) return;
        dragState.current = { id: null, pointerId: null, startX: 0, startY: 0, initialX: 0, initialY: 0 };
        setDraggingId(null);
    }, []);

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
                            Full Stack Developer
                        </p>
                        <h1 className="hero-name">
                            Zeeshan
                            <br />
                            <span className="name-highlight">Sarfraz</span>
                        </h1>
                        <p className="hero-title">Full Stack Developer</p>
                        <p className="hero-description">
                            Passionate about building exceptional digital experiences. Specializing in
                            competitive programming, web development, and software engineering. Turning complex
                            ideas into elegant, scalable solutions.
                        </p>

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
                    </div>
                    <div className="hero-visual">
                        <div
                            className="hero-image-container"
                            ref={containerRef}
                            onPointerMove={handlePointerMove}
                            onPointerUp={handlePointerUp}
                            onPointerCancel={handlePointerUp}
                        >
                            <div className="ssj-lightning ssj-lightning-1" />
                            <div className="ssj-lightning ssj-lightning-2" />
                            <div className="ssj-lightning ssj-lightning-3" />
                            <div className="ssj-lightning ssj-lightning-4" />

                            <div className="aura-ring aura-ring-1"></div>
                            <div className="aura-ring aura-ring-2"></div>
                            <div className="aura-ring aura-ring-3"></div>
                            <div className="hero-image-wrapper">
                                <img src={profileImg} alt="Zeeshan Sarfraz" className="hero-image" fetchPriority="high" loading="eager" width="400" height="400" />
                            </div>
                            <div
                                className={`floating-badge badge-react ${draggingId === 'react' ? 'is-dragging' : ''}`}
                                style={badgeStyle('react')}
                                onPointerDown={(e) => handlePointerDown('react', e)}
                                role="button" tabIndex={0}
                            >
                                <span className="badge-dot"></span>
                                React
                            </div>
                            <div
                                className={`floating-badge badge-fullstack ${draggingId === 'fullStack' ? 'is-dragging' : ''}`}
                                style={badgeStyle('fullStack')}
                                onPointerDown={(e) => handlePointerDown('fullStack', e)}
                                role="button" tabIndex={0}
                            >
                                <span className="badge-icon">⚡</span>
                                Full Stack
                            </div>
                            <div
                                className={`floating-badge badge-firebase ${draggingId === 'firebase' ? 'is-dragging' : ''}`}
                                style={badgeStyle('firebase')}
                                onPointerDown={(e) => handlePointerDown('firebase', e)}
                                role="button" tabIndex={0}
                            >
                                <span className="badge-dot badge-dot-firebase"></span>
                                Firebase
                            </div>
                            <div
                                className={`floating-badge badge-available ${draggingId === 'available' ? 'is-dragging' : ''}`}
                                style={badgeStyle('available')}
                                onPointerDown={(e) => handlePointerDown('available', e)}
                                role="button" tabIndex={0}
                            >
                                <span className="available-dot"></span>
                                Available
                            </div>
                        </div>
                    </div>
                </div>

                {/* Two separate windows: Code + Browser — full width */}
                <div className="hero-dual-window" ref={terminalRef}>
                    <div className="code-window">
                        <div className="window-bar">
                            <span className="window-dot" />
                            <span className="window-dot" />
                            <span className="window-dot" />
                            <span className="window-tab">Hero.tsx</span>
                        </div>
                        <div className="code-body">
                            {CODE_LINES.slice(0, typedCount).map((line, i) => (
                                <div key={i} className="code-line">
                                    <span className="line-number">{i + 1}</span>
                                    <span className="line-content">{highlightLine(line.text)}</span>
                                </div>
                            ))}
                            <div className="code-line code-line-active">
                                <span className="line-number">{typedCount + 1}</span>
                                <span className="cursor-blink">|</span>
                            </div>
                        </div>
                    </div>

                    <div className="browser-window">
                        <div className="window-bar browser-bar">
                            <span className="window-dot" />
                            <span className="window-dot" />
                            <span className="window-dot" />
                            <div className="browser-url">
                                <span className="browser-lock">🔒</span>
                                localhost:3000
                            </div>
                        </div>
                        <div className="browser-body">
                            {previewStage >= 2 ? (
                                <div className="browser-render">
                                    {previewStage >= 3 && (
                                        <h2 className="render-name preview-fade-in">Zeeshan Sarfraz</h2>
                                    )}
                                    {previewStage >= 4 && (
                                        <p className="render-role preview-fade-in">Full Stack Developer</p>
                                    )}
                                    {previewStage >= 5 && (
                                        <div className="render-stack preview-fade-in">
                                            <span className="render-tag">React</span>
                                            <span className="render-tag">Firebase</span>
                                            <span className="render-tag">Flutter</span>
                                        </div>
                                    )}
                                    {previewStage >= 6 && (
                                        <a className="render-btn preview-fade-in" href="#projects">View Work →</a>
                                    )}
                                </div>
                            ) : (
                                <div className="browser-loading">
                                    <div className="loading-spinner" />
                                    <span>Loading...</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
