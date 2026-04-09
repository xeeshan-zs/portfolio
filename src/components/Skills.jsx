import './Skills.css';

const Skills = () => {
    const skillCategories = [
        {
            title: 'Programming Languages',
            icon: '💻',
            skills: ['C++', 'Java', 'C#', 'Python', 'JavaScript', 'Dart']
        },
        {
            title: 'Web Technologies',
            icon: '🌐',
            skills: ['React', 'Next.js', 'HTML/CSS', 'Firebase']
        },
        {
            title: 'Backend & Databases',
            icon: '🗄️',
            skills: ['Node.js', 'Express.js', 'Supabase', 'SQL Server']
        },
        {
            title: 'Mobile Development',
            icon: '📱',
            skills: ['Flutter', 'Dart']
        },
        {
            title: 'Tools & Technologies',
            icon: '🛠️',
            skills: ['Git', 'VS Code', 'Cursor AI', 'Vite', 'npm', 'MySQL']
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
