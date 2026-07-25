import { ExternalLink, Zap } from 'lucide-react';
import './Projects.css';

const projects = [
    {
        title: 'ICCS Globalized',
        description: 'Delivered a live production website for a real client, covering full-cycle development from requirements to deployment. Built responsive UI components in React with Firebase backend integration.',
        tags: ['React', 'Firebase', 'Web App'],
        icon: '🌐',
        link: 'https://iccsglobalized.com',
        power: 9200,
        featured: true,
    },
    {
        title: 'Karigar',
        description: 'A hyperlocal services marketplace built during a hackathon connecting local service providers with customers by geolocation. Features user authentication, real-time service listings, and request flows.',
        tags: ['React', 'Firebase', 'Web App'],
        icon: '🛠️',
        link: 'https://karigarpu.web.app',
        power: 8500,
    },
    {
        title: 'Z Student Portal',
        description: 'A student-built initiative to make campus life easier. Features include results management, homework tracking, timetables, and academic tools like grade calculators.',
        tags: ['React', 'Firebase', 'Web App'],
        icon: '🎓',
        link: 'https://portal-numl.web.app',
        power: 8800,
    },
    {
        title: 'RFID Attendance',
        description: 'Modern attendance tracking system using RFID technology for educational institutions with real-time tracking and reporting.',
        tags: ['JavaScript', 'RFID', 'Web App'],
        icon: '📡',
        link: 'https://rfid-numl.web.app',
        power: 7200,
    },
    {
        title: 'Library Management',
        description: 'Library management system built with Swing API in Java. Features book cataloging, member management, and borrowing/return tracking.',
        tags: ['Java', 'Swing', 'Desktop'],
        icon: '📚',
        link: 'https://github.com/xeeshan-zs/Library-Management',
        power: 6800,
    },
    {
        title: 'Z-Nectar',
        description: 'A hyperlocal grocery delivery app connecting customers with nearby stores. Features product browsing, cart management, and seamless checkout.',
        tags: ['Flutter', 'Firebase', 'Mobile'],
        icon: '🛒',
        link: 'https://github.com/xeeshan-zs/z-nectar',
        power: 7800,
    },
    {
        title: 'EduSync',
        description: 'A Flutter-based hierarchical education management platform for institutions with student/teacher management, quizzes, and role-based dashboards.',
        tags: ['Flutter', 'Firebase', 'Mobile'],
        icon: '🎓',
        link: 'https://github.com/xeeshan-zs/EduSync',
        power: 7500,
    },
];

const Projects = () => {
    const featured = projects.find(p => p.featured);
    const rest = projects.filter(p => !p.featured);

    return (
        <section id="projects" className="projects section">
            <div className="container">
                <h2 className="section-title scroll-animate">Featured Projects</h2>

                {/* Featured project — horizontal */}
                {featured && (
                    <div className="project-featured scroll-animate">
                        <div className="project-featured-left">
                            <span className="project-featured-icon">{featured.icon}</span>
                            <div className="project-featured-power">
                                <Zap size={12} />
                                <span>{featured.power.toLocaleString()}</span>
                            </div>
                        </div>
                        <div className="project-featured-content">
                            <h3 className="project-featured-title">{featured.title}</h3>
                            <p className="project-featured-desc">{featured.description}</p>
                            <div className="project-tags">
                                {featured.tags.map((tag, i) => (
                                    <span key={i} className="project-tag">{tag}</span>
                                ))}
                            </div>
                            {featured.link && (
                                <a href={featured.link} target="_blank" rel="noopener noreferrer" className="project-link">
                                    <ExternalLink size={14} />
                                    View Project
                                </a>
                            )}
                        </div>
                    </div>
                )}

                {/* Rest — grid */}
                <div className="projects-grid">
                    {rest.map((project, index) => (
                        <article key={index} className="project-card scroll-animate delay-1">
                            <div className="project-card-top">
                                <span className="project-card-icon">{project.icon}</span>
                                <div className="project-card-power">
                                    <Zap size={10} />
                                    {project.power.toLocaleString()}
                                </div>
                            </div>
                            <h3 className="project-card-title">{project.title}</h3>
                            <p className="project-card-desc">{project.description}</p>
                            <div className="project-tags">
                                {project.tags.map((tag, i) => (
                                    <span key={i} className="project-tag">{tag}</span>
                                ))}
                            </div>
                            {project.link && (
                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                                    <ExternalLink size={14} />
                                    View
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
