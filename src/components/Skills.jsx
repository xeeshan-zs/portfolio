import './Skills.css';

const skillCategories = [
    {
        title: 'Programming',
        icon: '⚡',
        skills: ['C++', 'Java', 'JavaScript', 'Python', 'C#', 'Dart'],
    },
    {
        title: 'Web',
        icon: '🌐',
        skills: ['React', 'Next.js', 'HTML/CSS', 'Firebase'],
    },
    {
        title: 'Backend',
        icon: '🗄️',
        skills: ['Node.js', 'Express.js', 'Supabase', 'SQL Server'],
    },
    {
        title: 'Mobile',
        icon: '📱',
        skills: ['Flutter', 'Dart'],
    },
    {
        title: 'Tools',
        icon: '🛠️',
        skills: ['Git', 'VS Code', 'Cursor AI', 'Vite', 'npm', 'MySQL'],
    },
    {
        title: 'Core',
        icon: '🎯',
        skills: ['OOP', 'Data Structures', 'Algorithms', 'Problem Solving'],
    },
    {
        title: 'Languages',
        icon: '💬',
        skills: ['English', 'Urdu'],
    },
];

const Skills = () => {
    return (
        <section id="skills" className="skills section">
            <div className="container">
                <h2 className="section-title scroll-animate">Skills & Arsenal</h2>
                <div className="skills-layout">
                    {skillCategories.map((category, index) => (
                        <div key={index} className={`skill-block scroll-animate delay-${(index % 4) + 1}`}>
                            <div className="skill-block-header">
                                <span className="skill-block-icon">{category.icon}</span>
                                <h3 className="skill-block-title">{category.title}</h3>
                            </div>
                            <div className="skill-tags">
                                {category.skills.map((skill, si) => (
                                    <span key={si} className="skill-tag">{skill}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
