import { useState } from 'react';
import { Palette, X } from 'lucide-react';
import './ThemeToggle.css';

const themes = [
    { id: 'eclipse', label: 'Eclipse', color: '#d5f478', desc: 'Sculptural · interactive 3D' },
    { id: 'editorial', label: 'Anime Editorial', color: '#b53d35', desc: 'Professional · ink & paper' },
    { id: 'ssblue', label: 'SS Blue Goku', color: '#00ccff', desc: 'Dragon Ball · Godly Ki' },
];

const ThemeToggle = ({ theme, setTheme }) => {
    const [isOpen, setIsOpen] = useState(false);
    const currentTheme = themes.find((item) => item.id === theme) || themes[0];

    return (
        <>
            {isOpen && <div className="theme-overlay" onClick={() => setIsOpen(false)} />}
            <div className="theme-toggle-wrapper">
                {isOpen && (
                    <div className="theme-panel">
                        <div className="theme-panel-header">
                            <div className="theme-panel-heading">
                                <span className="theme-panel-title">Visual modes</span>
                                <span className="theme-panel-subtitle">Choose your portfolio atmosphere</span>
                            </div>
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
                                    style={{ '--theme-swatch': t.color }}
                                >
                                    <div className="theme-card-orb">
                                        {theme === t.id && <span className="theme-card-check">✓</span>}
                                    </div>
                                    <span className="theme-card-copy">
                                        <span className="theme-card-name">{t.label}</span>
                                        <span className="theme-card-desc">{t.desc}</span>
                                    </span>
                                    <span className="theme-card-status">{theme === t.id ? 'Active' : 'Select'}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                <button
                    className={`theme-toggle${isOpen ? ' is-open' : ''}`}
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label={`Change theme. Current theme: ${currentTheme.label}`}
                    aria-expanded={isOpen}
                    title={`Theme: ${currentTheme.label}`}
                    style={{ '--theme-swatch': currentTheme.color }}
                >
                    <span className="theme-toggle-mark" aria-hidden="true"><Palette size={16} /></span>
                </button>
            </div>
        </>
    );
};

export default ThemeToggle;
