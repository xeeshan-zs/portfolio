import { ExternalLink } from 'lucide-react';
import './Projects.css';

const Projects = () => {
    const projects = [
        {
            title: 'Z Student Portal',
            description: 'A student-built initiative to make campus life easier. Features include results management, homework tracking, timetables, and academic tools like grade calculators. Built to automate areas where students struggle the most.',
            tags: ['React', 'Firebase', 'Web App'],
            icon: '🎓',
            link: 'https://portal-numl.web.app'
        },
        {
            title: 'RFID Attendance System',
            description: 'Modern attendance tracking system using RFID technology. Streamlines the attendance process for educational institutions with real-time tracking and reporting.',
            tags: ['JavaScript', 'RFID', 'Web App'],
            icon: '📡',
            link: 'https://rfid-numl.web.app'
        },
        {
            title: 'Library Management System',
            description: 'Library management system built with Swing API in Java. Features book cataloging, member management, and borrowing/return tracking functionality.',
            tags: ['Java', 'Swing', 'Desktop App'],
            icon: '📚',
            link: 'https://github.com/xeeshan-zs/Library-Management'
        }
    ];

    return (
        <section id="projects" className="projects section">
            <div className="container">
                <h2 className="section-title">Featured Projects</h2>
                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <article key={index} className="project-card card">
                            <div className="project-icon-wrapper">
                                <span className="project-icon">{project.icon}</span>
                            </div>
                            <h3 className="project-title">{project.title}</h3>
                            <p className="project-description">{project.description}</p>
                            <div className="project-tags">
                                {project.tags.map((tag, tagIndex) => (
                                    <span key={tagIndex} className="project-tag">{tag}</span>
                                ))}
                            </div>
                            {project.link && project.link !== '#' && (
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="project-link"
                                >
                                    <ExternalLink size={16} />
                                    View Project
                                </a>
                            )}
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
