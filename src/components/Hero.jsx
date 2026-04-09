import { useRef, useState } from 'react';
import './Hero.css';
import profileImg from '../assets/profile.jpg';

const Hero = () => {
    const containerRef = useRef(null);
    const dragState = useRef({
        id: null,
        pointerId: null,
        startX: 0,
        startY: 0,
        initialX: 0,
        initialY: 0
    });
    const [offsets, setOffsets] = useState({
        cpp: { x: 0, y: 0 },
        fullStack: { x: 0, y: 0 },
        available: { x: 0, y: 0 }
    });
    const [draggingId, setDraggingId] = useState(null);

    const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

    const handlePointerDown = (id, event) => {
        const current = offsets[id];
        dragState.current = {
            id,
            pointerId: event.pointerId,
            startX: event.clientX,
            startY: event.clientY,
            initialX: current.x,
            initialY: current.y
        };
        setDraggingId(id);
        event.currentTarget.setPointerCapture(event.pointerId);
    };

    const handlePointerMove = (event) => {
        const state = dragState.current;
        if (!state.id || state.pointerId !== event.pointerId) {
            return;
        }

        const containerRect = containerRef.current?.getBoundingClientRect();
        const limitX = containerRect ? Math.max(20, containerRect.width * 0.2) : 60;
        const limitY = containerRect ? Math.max(20, containerRect.height * 0.2) : 60;

        const nextX = clamp(state.initialX + (event.clientX - state.startX), -limitX, limitX);
        const nextY = clamp(state.initialY + (event.clientY - state.startY), -limitY, limitY);

        setOffsets((prev) => ({
            ...prev,
            [state.id]: { x: nextX, y: nextY }
        }));
    };

    const handlePointerUp = (event) => {
        if (dragState.current.pointerId !== event.pointerId) {
            return;
        }

        dragState.current = {
            id: null,
            pointerId: null,
            startX: 0,
            startY: 0,
            initialX: 0,
            initialY: 0
        };
        setDraggingId(null);
    };

    const badgeStyle = (id) => ({
        '--drag-x': `${offsets[id].x}px`,
        '--drag-y': `${offsets[id].y}px`
    });

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
                            <a href="/Resume_Zeeshan_Sarfraz.docx" download className="btn btn-primary">
                                Download Resume
                                <span className="btn-arrow">↓</span>
                            </a>
                            <a href="#contact" className="btn btn-outline">
                                Get in Touch
                                <span className="status-dot"></span>
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
                            <div className="hero-image-wrapper">
                                <img src={profileImg} alt="Zeeshan Sarfraz" className="hero-image" />
                            </div>
                            <div
                                className={`floating-badge badge-react ${draggingId === 'cpp' ? 'is-dragging' : ''}`}
                                style={badgeStyle('cpp')}
                                onPointerDown={(event) => handlePointerDown('cpp', event)}
                                role="button"
                                tabIndex={0}
                                aria-label="Drag C++ badge"
                            >
                                <span className="badge-dot"></span>
                                C++
                            </div>
                            <div
                                className={`floating-badge badge-fullstack ${draggingId === 'fullStack' ? 'is-dragging' : ''}`}
                                style={badgeStyle('fullStack')}
                                onPointerDown={(event) => handlePointerDown('fullStack', event)}
                                role="button"
                                tabIndex={0}
                                aria-label="Drag Full Stack badge"
                            >
                                <span className="badge-icon">⚡</span>
                                Full Stack
                            </div>
                            <div
                                className={`floating-badge badge-available ${draggingId === 'available' ? 'is-dragging' : ''}`}
                                style={badgeStyle('available')}
                                onPointerDown={(event) => handlePointerDown('available', event)}
                                role="button"
                                tabIndex={0}
                                aria-label="Drag Available badge"
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
