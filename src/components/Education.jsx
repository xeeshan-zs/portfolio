import './Education.css';

const Education = () => {
    const educationItems = [
        {
            institution: 'National University of Modern Languages (NUML Lahore)',
            degree: 'Bachelor of Science in Computer Science',
            period: 'Current',
            description: 'Actively involved in competitive programming and hackathon communities.',
            achievements: [
                'Tech Head, ACM Society (Current)',
                'Competitive Programming Co-Lead at HackForge (2024)',
                'Compat Prog Lead of Hackforge in 2025',
                'Active participant in university tech events'
            ],
            icon: '🎓'
        },
        {
            institution: 'APS College, Mangla Cantt',
            degree: 'Intermediate - Computer Science',
            period: 'Completed',
            description: 'Foundation in computer science with focus on programming fundamentals.',
            achievements: [
                'Strong foundation in programming',
                'Introduction to algorithms and data structures'
            ],
            icon: '📚'
        }
    ];

    return (
        <section id="education" className="education section">
            <div className="container">
                <h2 className="section-title">Education</h2>
                <div className="education-timeline">
                    {educationItems.map((item, index) => (
                        <div key={index} className="education-item card">
                            <div className="education-icon-wrapper">
                                <span className="education-icon">{item.icon}</span>
                            </div>
                            <div className="education-content">
                                <div className="education-header">
                                    <h3 className="education-institution">{item.institution}</h3>
                                    <span className="education-period">{item.period}</span>
                                </div>
                                <p className="education-degree">{item.degree}</p>
                                <p className="education-description">{item.description}</p>
                                <ul className="education-achievements">
                                    {item.achievements.map((achievement, achIndex) => (
                                        <li key={achIndex} className="achievement-item">
                                            <span className="achievement-bullet">•</span>
                                            {achievement}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
