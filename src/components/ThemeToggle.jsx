import { useState } from 'react';
import { Palette, Check } from 'lucide-react';
import './ThemeToggle.css';

const ThemeToggle = ({ theme, setTheme }) => {
    const [isOpen, setIsOpen] = useState(false);

    const themes = [
        { id: 'saiyan', label: 'Super Saiyan', color: '#ffd700' },
        { id: 'namek', label: 'Namek', color: '#64ffda' },
        { id: 'ultra', label: 'Ultra Instinct', color: '#818cf8' },
        { id: 'ssblue', label: 'SS Blue', color: '#00bfff' },
        { id: 'ego', label: 'Ultra Ego', color: '#ff69b4' },
        { id: 'fusion', label: 'Fusion', color: '#39ff14' }
    ];

    const selectTheme = (themeId) => {
        setTheme(themeId);
        setIsOpen(false);
    };

    return (
        <div className="theme-toggle-wrapper">
            {isOpen && (
                <div className="theme-menu">
                    {themes.map((t) => (
                        <button
                            key={t.id}
                            className={`theme-option ${theme === t.id ? 'active' : ''}`}
                            onClick={() => selectTheme(t.id)}
                        >
                            <span
                                className="theme-color"
                                style={{ background: t.color, boxShadow: `0 0 8px ${t.color}` }}
                            />
                            <span className="theme-label">{t.label}</span>
                            {theme === t.id && <Check size={16} className="theme-check" />}
                        </button>
                    ))}
                </div>
            )}
            <button
                className="theme-toggle"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Change theme"
            >
                <Palette size={20} />
            </button>
        </div>
    );
};

export default ThemeToggle;
