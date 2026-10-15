import { useState } from 'react';
import { Sparkles, X } from 'lucide-react';
import './ThemeToggle.css';

const themes = [
    { id: 'eclipse', label: 'Eclipse', color: '#d5f478', desc: 'Sculptural · interactive 3D' },
    { id: 'editorial', label: 'Anime Editorial', color: '#b53d35', desc: 'Professional · ink & paper' },
    { id: 'ssblue', label: 'SS Blue', color: '#00ccff', desc: 'Godly Energy' },
];

const ThemeToggle = ({ theme, setTheme }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {isOpen && <div className="theme-overlay" onClick={() => setIsOpen(false)} />}
            <div className="theme-toggle-wrapper">
                {isOpen && (
                    <div className="theme-panel">
                        <div className="theme-panel-header">
                            <span className="theme-panel-title">Choose a theme</span>
                            <button className="theme-panel-close" onClick={() => setIsOpen(false)} aria-label="Close theme menu">
                                <X size={16} />
                            </button>
                        </div>
                        <div className="theme-grid">
                            {themes.map((t) => (
                                <button
                                    key={t.id}
                                    className={`theme-card theme-card--${t.id} ${theme === t.id ? 'active' : ''}`}
                                    onClick={() => { setTheme(t.id); setIsOpen(false); }}
                                    aria-label={`${t.label}: ${t.desc}`}
                                    aria-pressed={theme === t.id}
                                >
                                    <div className="theme-card-orb" style={{
                                        background: `radial-gradient(circle at 35% 35%, ${t.color}dd, ${t.color}44)`,
                                        boxShadow: `0 0 20px ${t.color}66, inset 0 0 10px ${t.color}33`,
                                    }}>
                                        {theme === t.id && <span className="theme-card-check">✓</span>}
                                    </div>
                                    <span className="theme-card-name">{t.label}</span>
                                    <span className="theme-card-desc">{t.desc}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                <button
                    className="theme-toggle"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Change theme"
                    aria-expanded={isOpen}
                >
                    <Sparkles size={20} />
                </button>
            </div>
        </>
    );
};

export default ThemeToggle;
