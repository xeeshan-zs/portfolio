import { useState } from 'react';
import { Palette, Check } from 'lucide-react';
import './ThemeToggle.css';

const ThemeToggle = ({ theme, setTheme }) => {
    const [isOpen, setIsOpen] = useState(false);

    const themes = [
        { id: 'cream', label: 'Cream', color: '#f5ebe0' },
        { id: 'light', label: 'Light', color: '#e8e8ed' },
        { id: 'dark', label: 'Dark', color: '#1a1a2e' },
        { id: 'ocean', label: 'Ocean', color: '#0a192f' }
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
                                style={{ background: t.color }}
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
