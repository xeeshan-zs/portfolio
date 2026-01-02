import './Skills.css';

const Skills = () => {
    const skillCategories = [
        {
            title: 'Programming Languages',
            icon: '💻',
            skills: ['C++', 'Java', 'C#', 'Python', 'JavaScript']
        },
        {
            title: 'Tools & Technologies',
            icon: '🛠️',
            skills: ['Git', 'Visual Studio', 'Eclipse', 'VS Code', 'MySQL']
        },
        {
            title: 'Core Competencies',
            icon: '🎯',
            skills: ['Object-Oriented Programming', 'Data Structures', 'Algorithms', 'GUI Design', 'Problem Solving']
        },
        {
            title: 'Languages',
            icon: '🌐',
            skills: ['English', 'Urdu']
        }
    ];

    return (
        <section id="skills" className="skills section">
            <div className="container">
                <h2 className="section-title">Skills & Expertise</h2>
                <div className="skills-grid">
                    {skillCategories.map((category, index) => (
                        <div key={index} className="skill-card card">
                            <div className="skill-card-header">
                                <span className="skill-icon">{category.icon}</span>
                                <h3 className="skill-category-title">{category.title}</h3>
                            </div>
                            <div className="skill-tags">
                                {category.skills.map((skill, skillIndex) => (
                                    <span key={skillIndex} className="skill-tag">
                                        {skill}
                                    </span>
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
