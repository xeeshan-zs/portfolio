import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Box, RotateCcw } from 'lucide-react';
import portrait from '../assets/profile.webp';
import '../eclipse.css';

const Cuboid = ({ className }) => (
    <div className={`eclipse-cube ${className}`}>
        {['front', 'back', 'right', 'left', 'top', 'bottom'].map(face => (
            <span key={face} className={`eclipse-cube-${face}`} />
        ))}
    </div>
);

function IdentitySculpture() {
    const stageRef = useRef(null);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        const stage = stageRef.current;
        const motion = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
        let frame = 0;
        let bounds;
        let point;

        // One frame per pointer update; no render loop, sensors, or scroll listener.
        const reset = () => {
            cancelAnimationFrame(frame);
            frame = 0;
            bounds = null;
            stage.style.removeProperty('--look-x');
            stage.style.removeProperty('--look-y');
        };
        const move = (event) => {
            if (!motion.matches || event.pointerType === 'touch') return;
            bounds ||= stage.getBoundingClientRect();
            point = { x: event.clientX, y: event.clientY };
            if (frame) return;
            frame = requestAnimationFrame(() => {
                const x = Math.max(-.5, Math.min(.5, (point.x - bounds.left) / bounds.width - .5));
                const y = Math.max(-.5, Math.min(.5, (point.y - bounds.top) / bounds.height - .5));
                stage.style.setProperty('--look-x', `${-y * 14}deg`);
                stage.style.setProperty('--look-y', `${x * 20}deg`);
                frame = 0;
            });
        };
        stage.addEventListener('pointermove', move, { passive: true });
        stage.addEventListener('pointerleave', reset);
        motion.addEventListener('change', reset);
        window.addEventListener('resize', reset, { passive: true });
        return () => {
            reset();
            stage.removeEventListener('pointermove', move);
            stage.removeEventListener('pointerleave', reset);
            motion.removeEventListener('change', reset);
            window.removeEventListener('resize', reset);
        };
    }, []);

    return (
        <div className="eclipse-artwork">
            <div ref={stageRef} className={`eclipse-stage${expanded ? ' is-expanded' : ''}`} aria-hidden="true">
                <div className="eclipse-stage-grid" />
                <span className="eclipse-coordinate eclipse-coordinate-top">FIG. 01 / THE MAKER</span>
                <span className="eclipse-coordinate eclipse-coordinate-side">創造する / CREATE</span>
                <div className="eclipse-ground-shadow" />
                <div className="eclipse-scene">
                    <div className="eclipse-orbit eclipse-orbit-outer"><span /><span /></div>
                    <div className="eclipse-orbit eclipse-orbit-inner"><span /><span /></div>
                    <div className="eclipse-identity">
                        <div className="eclipse-card-back"><span>ZS</span></div>
                        <div className="eclipse-card-edge eclipse-card-edge-right" />
                        <div className="eclipse-card-edge eclipse-card-edge-bottom" />
                        <div className="eclipse-identity-front">
                            <div className="eclipse-id-top"><span>ZS — CREATOR SERIES</span><span>✳</span></div>
                            <div className="eclipse-id-portrait">
                                <img src={portrait} alt="" width="820" height="1024" draggable="false" />
                                <span className="eclipse-id-kanji">創</span>
                                <span className="eclipse-id-cross">+</span>
                            </div>
                            <div className="eclipse-id-bottom">
                                <strong>Zeeshan<br />Sarfraz.</strong>
                                <span>FULL STACK<br />DEVELOPER ↗</span>
                            </div>
                            <div className="eclipse-id-barcode"><i /><span>31.52° N / 74.35° E</span></div>
                        </div>
                    </div>
                    <Cuboid className="eclipse-cube-lime" />
                    <Cuboid className="eclipse-cube-chrome" />
                    <div className="eclipse-satellite"><span>WEB</span><i /> <span>MOBILE</span></div>
                </div>
                <span className="eclipse-stage-index">01 — ∞</span>
            </div>
            <div className="eclipse-artwork-controls">
                <span className="eclipse-interaction-hint">A DIFFERENT DIMENSION</span>
                <button type="button" className="eclipse-inspect" aria-pressed={expanded} onClick={() => setExpanded(!expanded)}>
                    {expanded ? <RotateCcw size={14} /> : <Box size={14} />}
                    {expanded ? 'Reset view' : 'Explore in 3D'}
                </button>
            </div>
        </div>
    );
}

export default function EclipseHero() {
    return (
        <section id="hero" className="eclipse-hero section" aria-labelledby="eclipse-name">
            <div className="container">
                <div className="eclipse-intro-line">
                    <span><i /> CODE. CRAFT. CHARACTER.</span>
                    <span>LAHORE, PK <span className="eclipse-intro-plus">+</span> WORKING EVERYWHERE</span>
                </div>
                <div className="eclipse-hero-grid">
                    <div className="eclipse-hero-copy">
                        <p className="eclipse-eyebrow">FULL STACK DEVELOPER</p>
                        <h1 id="eclipse-name">Zeeshan<br /><span>Sarfraz</span><em>.</em></h1>
                        <p className="eclipse-hero-statement">A little imagination.<br />A lot of engineering.</p>
                        <p className="eclipse-hero-description">I turn ideas into considered web and mobile experiences. Built with React, Flutter, and a focus on the people using them.</p>
                        <div className="eclipse-actions">
                            <a className="btn btn-primary" href="#projects">Discover my work <ArrowUpRight size={19} /></a>
                            <a className="eclipse-resume" href="/Zeeshan_Sarfraz_Resume.pdf" target="_blank" rel="noopener noreferrer">View résumé <ArrowUpRight size={16} /></a>
                        </div>
                        <div className="eclipse-signature"><span>設計と開発</span><span>THOUGHTFULLY DESIGNED. PURPOSEFULLY BUILT.</span></div>
                    </div>
                    <IdentitySculpture />
                </div>
                <div className="eclipse-proof-strip">
                    <div><span className="eclipse-proof-number">01</span><span><strong>Ideas → production</strong><small>Live websites for real clients</small></span></div>
                    <div><span className="eclipse-proof-number">1st</span><span><strong>CosmoCon ’25</strong><small>Web Hackathon · PUCIT</small></span></div>
                    <a href="#skills" className="eclipse-scroll-link"><span>EXPLORE THE<br />FULL PICTURE</span><ArrowDown size={21} /></a>
                </div>
            </div>
        </section>
    );
}
