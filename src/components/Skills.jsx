import { useState } from 'react';
import './Skills.css';

const skillCategories = [
    {
        title: 'Web Dev',
        icon: '🌐',
        skills: ['React', 'Next.js', 'Node.js', 'Express.js', 'Tailwind CSS', 'Firebase', 'Supabase'],
    },
    {
        title: 'Android App Dev',
        icon: '📱',
        skills: ['Flutter', 'Dart', 'Firebase'],
    },
    {
        title: 'Languages & Tools',
        icon: '⚡',
        skills: ['C++', 'JavaScript', 'Python', 'Git', 'GitHub', 'VS Code', 'Figma'],
    },
];

const Skills = () => {
    const [blasting, setBlasting] = useState(null); // "catIdx-skillIdx"

    const handleKiBlast = (catIdx, skillIdx) => {
        const key = `${catIdx}-${skillIdx}`;
        setBlasting(key);
        setTimeout(() => setBlasting(null), 500);
    };

    return (
        <section id="skills" className="skills section">
            <div className="container">
                <h2 className="section-title scroll-animate">Skills</h2>
                <div className="skills-layout">
                    {skillCategories.map((category, index) => (
                        <div key={index} className={`skill-block scroll-animate delay-${index + 1}`}>
                            <div className="skill-block-header">
                                <span className="skill-block-icon">{category.icon}</span>
                                <h3 className="skill-block-title">{category.title}</h3>
                            </div>
                            <div className="skill-tags">
                                {category.skills.map((skill, si) => {
                                    const key = `${index}-${si}`;
                                    return (
                                        <button
                                            key={si}
                                            className={`skill-tag ${blasting === key ? 'ki-blast' : ''}`}
                                            onClick={() => handleKiBlast(index, si)}
                                            type="button"
                                        >
                                            {skill}
                                            {blasting === key && <span className="ki-ripple" />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
