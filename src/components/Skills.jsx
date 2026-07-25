import './Skills.css';

const Skills = () => {
    const skillCategories = [
        {
            title: 'Programming Languages',
            icon: '⚡',
            skills: [
                { name: 'C++', level: 90 },
                { name: 'Java', level: 75 },
                { name: 'JavaScript', level: 85 },
                { name: 'Python', level: 70 },
                { name: 'C#', level: 65 },
                { name: 'Dart', level: 80 }
            ]
        },
        {
            title: 'Web Technologies',
            icon: '🌐',
            skills: [
                { name: 'React', level: 88 },
                { name: 'Next.js', level: 72 },
                { name: 'HTML/CSS', level: 92 },
                { name: 'Firebase', level: 85 }
            ]
        },
        {
            title: 'Backend & Databases',
            icon: '🗄️',
            skills: [
                { name: 'Node.js', level: 78 },
                { name: 'Express.js', level: 75 },
                { name: 'Supabase', level: 70 },
                { name: 'SQL Server', level: 68 }
            ]
        },
        {
            title: 'Mobile Development',
            icon: '📱',
            skills: [
                { name: 'Flutter', level: 85 },
                { name: 'Dart', level: 80 }
            ]
        },
        {
            title: 'Tools & Technologies',
            icon: '🛠️',
            skills: [
                { name: 'Git', level: 88 },
                { name: 'VS Code', level: 90 },
                { name: 'Cursor AI', level: 82 },
                { name: 'Vite', level: 78 },
                { name: 'npm', level: 85 },
                { name: 'MySQL', level: 72 }
            ]
        },
        {
            title: 'Core Competencies',
            icon: '🎯',
            skills: [
                { name: 'OOP', level: 90 },
                { name: 'Data Structures', level: 85 },
                { name: 'Algorithms', level: 82 },
                { name: 'Problem Solving', level: 88 }
            ]
        },
        {
            title: 'Languages',
            icon: '💬',
            skills: [
                { name: 'English', level: 85 },
                { name: 'Urdu', level: 95 }
            ]
        }
    ];

    return (
        <section id="skills" className="skills section">
            <div className="container">
                <h2 className="section-title">Skills & Power Levels</h2>
                <div className="skills-grid">
                    {skillCategories.map((category, index) => (
                        <div key={index} className="skill-card card">
                            <div className="skill-card-header">
                                <span className="skill-icon">{category.icon}</span>
                                <h3 className="skill-category-title">{category.title}</h3>
                            </div>
                            <div className="skill-bars">
                                {category.skills.map((skill, skillIndex) => (
                                    <div key={skillIndex} className="skill-bar-item">
                                        <div className="skill-bar-header">
                                            <span className="skill-name">{skill.name}</span>
                                            <span className="skill-level">LV.{skill.level}</span>
                                        </div>
                                        <div className="skill-bar-track">
                                            <div
                                                className="skill-bar-fill"
                                                style={{ width: `${skill.level}%` }}
                                            />
                                        </div>
                                    </div>
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
