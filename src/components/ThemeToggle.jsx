import { useState } from 'react';
import { Sparkles, X } from 'lucide-react';
import './ThemeToggle.css';

const themes = [
    { id: 'saiyan', label: 'Super Saiyan', color: '#ffd700', desc: 'Legendary Power' },
    { id: 'ssgod', label: 'SS God', color: '#ff2244', desc: 'Divine Ki' },
    { id: 'ssblue', label: 'SS Blue', color: '#00ccff', desc: 'Godly Energy' },
    { id: 'ultra', label: 'Ultra Instinct', color: '#818cf8', desc: 'Autonomous' },
    { id: 'ego', label: 'Ultra Ego', color: '#ff69b4', desc: 'Destruction' },
    { id: 'namek', label: 'Namek', color: '#64ffda', desc: 'DBZ Classic' },
    { id: 'fusion', label: 'Fusion', color: '#39ff14', desc: 'Fused Power' },
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
                            <span className="theme-panel-title">SELECT FORM</span>
                            <button className="theme-panel-close" onClick={() => setIsOpen(false)}>
                                <X size={16} />
                            </button>
                        </div>
                        <div className="theme-grid">
                            {themes.map((t) => (
                                <button
                                    key={t.id}
                                    className={`theme-card ${theme === t.id ? 'active' : ''}`}
                                    onClick={() => { setTheme(t.id); setIsOpen(false); }}
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
                >
                    <Sparkles size={20} />
                </button>
            </div>
        </>
    );
};

export default ThemeToggle;
