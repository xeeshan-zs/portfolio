import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Box, Hand, RotateCcw } from 'lucide-react';
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
    const [flipped, setFlipped] = useState(false);
    const [dragging, setDragging] = useState(false);
    const rotation = useRef({ x: 0, y: 0 });
    const gesture = useRef({ active: false, moved: false, pointerId: null, startX: 0, startY: 0, rotationX: 0, rotationY: 0 });

    const applyRotation = (x, y) => {
        rotation.current = { x, y };
        const stage = stageRef.current;
        if (!stage) return;
        stage.style.setProperty('--drag-x', `${x}deg`);
        stage.style.setProperty('--drag-y', `${y}deg`);
    };

    const resetView = () => {
        applyRotation(0, 0);
        setFlipped(false);
        setExpanded(false);
        stageRef.current?.style.removeProperty('--look-x');
        stageRef.current?.style.removeProperty('--look-y');
    };

    const handlePointerDown = (event) => {
        if (event.pointerType === 'mouse' && event.button !== 0) return;
        gesture.current = {
            active: true,
            moved: false,
            pointerId: event.pointerId,
            startX: event.clientX,
            startY: event.clientY,
            rotationX: rotation.current.x,
            rotationY: rotation.current.y,
        };
        event.currentTarget.setPointerCapture?.(event.pointerId);
        event.currentTarget.style.removeProperty('--look-x');
        event.currentTarget.style.removeProperty('--look-y');
        setDragging(true);
    };

    const handlePointerMove = (event) => {
        const current = gesture.current;
        if (!current.active || current.pointerId !== event.pointerId) return;
        const dx = event.clientX - current.startX;
        const dy = event.clientY - current.startY;
        if (Math.abs(dx) + Math.abs(dy) > 5) current.moved = true;
        const nextX = Math.max(-24, Math.min(24, current.rotationX - dy * .24));
        const nextY = Math.max(-68, Math.min(68, current.rotationY + dx * .3));
        applyRotation(nextX, nextY);
    };

    const handlePointerUp = (event) => {
        if (gesture.current.pointerId !== event.pointerId) return;
        gesture.current.active = false;
        event.currentTarget.releasePointerCapture?.(event.pointerId);
        setDragging(false);
    };

    const handleStageClick = () => {
        if (gesture.current.moved) {
            gesture.current.moved = false;
            return;
        }
        setFlipped((current) => !current);
    };

    const handleStageKeyDown = (event) => {
        const step = event.shiftKey ? 16 : 8;
        if (event.key === 'ArrowLeft') applyRotation(rotation.current.x, Math.max(-68, rotation.current.y - step));
        else if (event.key === 'ArrowRight') applyRotation(rotation.current.x, Math.min(68, rotation.current.y + step));
        else if (event.key === 'ArrowUp') applyRotation(Math.max(-24, rotation.current.x - step), rotation.current.y);
        else if (event.key === 'ArrowDown') applyRotation(Math.min(24, rotation.current.x + step), rotation.current.y);
        else if (event.key === 'Enter' || event.key === ' ') setFlipped((current) => !current);
        else if (event.key === 'Home') resetView();
        else return;
        event.preventDefault();
    };

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
            if (!motion.matches || event.pointerType === 'touch' || gesture.current.active) return;
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
            <div
                ref={stageRef}
                className={`eclipse-stage${expanded ? ' is-expanded' : ''}${flipped ? ' is-flipped' : ''}${dragging ? ' is-dragging' : ''}`}
                role="button"
                tabIndex="0"
                aria-label="Interactive 3D profile. Drag to rotate, tap to flip, or use arrow keys."
                aria-pressed={flipped}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                onClick={handleStageClick}
                onKeyDown={handleStageKeyDown}
            >
                <div className="eclipse-stage-grid" aria-hidden="true" />
                <span className="eclipse-coordinate eclipse-coordinate-top" aria-hidden="true">FIG. 01 / THE MAKER</span>
                <span className="eclipse-coordinate eclipse-coordinate-side" aria-hidden="true">創造する / CREATE</span>
                <div className="eclipse-ground-shadow" aria-hidden="true" />
                <div className="eclipse-scene" aria-hidden="true">
                    <div className="eclipse-orbit eclipse-orbit-outer"><span /><span /></div>
                    <div className="eclipse-orbit eclipse-orbit-inner"><span /><span /></div>
                    <div className="eclipse-identity">
                        <div className="eclipse-card-back"><span>ZS</span><small>BUILD / SHIP / IMPROVE</small><i>FULL STACK · 2026</i></div>
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
                <div className="eclipse-gesture-guide" aria-hidden="true"><Hand size={13} /><span>DRAG</span><i /> <span>TAP TO FLIP</span></div>
                <span className="eclipse-stage-index" aria-hidden="true">01 — ∞</span>
            </div>
            <div className="eclipse-artwork-controls">
                <span className="eclipse-interaction-hint"><Hand size={13} /> DRAG TO ROTATE · TAP TO FLIP</span>
                <button type="button" className="eclipse-inspect" aria-pressed={expanded} onClick={() => expanded ? resetView() : setExpanded(true)}>
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
