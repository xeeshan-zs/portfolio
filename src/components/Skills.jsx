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
];

const Skills = () => {
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
