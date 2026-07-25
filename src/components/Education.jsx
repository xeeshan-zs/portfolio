import './Education.css';

const educationItems = [
    {
        institution: 'NUML Lahore',
        full: 'National University of Modern Languages',
        degree: 'BS Computer Science',
        period: 'Current — Semester 6',
        highlights: [
            'Tech Head, ACM Society',
            'Competitive Programming Lead, HackForge',
            'Active in hackathons & tech events',
        ],
        icon: '🎓',
    },
    {
        institution: 'APS College, Mangla Cantt',
        full: 'Army Public School',
        degree: 'Intermediate — Computer Science',
        period: 'Completed',
        highlights: [
            'Strong CS foundation',
            'Algorithms & data structures intro',
        ],
        icon: '📚',
    },
];

const Education = () => {
    return (
        <section id="education" className="education section">
            <div className="container">
                <h2 className="section-title scroll-animate">Education</h2>
                <div className="edu-timeline">
                    {educationItems.map((item, index) => (
                        <div key={index} className={`edu-item scroll-animate delay-${index + 1}`}>
                            <div className="edu-line">
                                <div className="edu-dot" />
                                {index < educationItems.length - 1 && <div className="edu-connector" />}
                            </div>
                            <div className="edu-card">
                                <div className="edu-card-top">
                                    <span className="edu-icon">{item.icon}</span>
                                    <div className="edu-meta">
                                        <h3 className="edu-school">{item.institution}</h3>
                                        <span className="edu-full">{item.full}</span>
                                    </div>
                                    <span className="edu-period">{item.period}</span>
                                </div>
                                <p className="edu-degree">{item.degree}</p>
                                <ul className="edu-highlights">
                                    {item.highlights.map((h, i) => (
                                        <li key={i} className="edu-highlight">
                                            <span className="edu-bullet" />
                                            {h}
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
