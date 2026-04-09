import './Experience.css';
import { Briefcase } from 'lucide-react';

const Experience = () => {
    const experienceItems = [
        {
            role: 'Flutter Developer Intern',
            company: 'ACME Digital Solutions',
            period: 'Feb 2025 - Mar 2025',
            location: 'Pakistan',
            description: 'Completed a structured Flutter internship building cross-platform mobile UIs using Dart and Flutter framework.',
            achievements: [
                'Integrated Firebase Auth and Firestore for real-time data and user authentication flows.',
                'Gained exposure to professional mobile development workflows, PR-based code review, and deployment pipelines.'
            ],
            icon: Briefcase
        }
    ];

    return (
        <section id="experience" className="experience section">
            <div className="container">
                <h2 className="section-title">Professional Experience</h2>
                <div className="experience-timeline">
                    {experienceItems.map((item, index) => {
                        const IconComponent = item.icon;
                        return (
                            <div key={index} className="experience-item card">
                                <div className="experience-icon-wrapper">
                                    <IconComponent size={24} className="experience-icon" />
                                </div>
                                <div className="experience-content">
                                    <div className="experience-header">
                                        <div>
                                            <h3 className="experience-role">{item.role}</h3>
                                            <p className="experience-company">{item.company} &bull; {item.location}</p>
                                        </div>
                                        <span className="experience-period">{item.period}</span>
                                    </div>
                                    <p className="experience-description">{item.description}</p>
                                    <ul className="experience-achievements">
                                        {item.achievements.map((achievement, achIndex) => (
                                            <li key={achIndex} className="achievement-item">
                                                <span className="achievement-bullet">•</span>
                                                {achievement}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Experience;
