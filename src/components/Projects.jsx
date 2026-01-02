import './Projects.css';

const Projects = () => {
    const projects = [
        {
            title: "CosmoCon'25 Web Hackathon",
            description: 'First place winning project at PUCIT CosmoCon December 2025 with team "Full Stack Four Eyes". Built a cutting-edge web application showcasing modern development practices.',
            tags: ['Web Development', 'React', 'Full Stack', 'Team Project'],
            icon: '🥇',
            featured: true,
            position: '1st Position',
            link: '#'
        },
        {
            title: 'Surge UMT Hackathon',
            description: 'Award-winning web development project that secured 3rd position at Surge UMT Hackathon with team "Full Stack Four Eyes". Built with modern web technologies focusing on user experience.',
            tags: ['Web Development', 'HTML/CSS', 'JavaScript', 'Team Project'],
            icon: '🏆',
            featured: true,
            position: '3rd Position',
            link: '#'
        },
        {
            title: 'Attendance Management System',
            description: 'A comprehensive Java-based application for managing student and employee attendance with GUI interface, database integration, and reporting features.',
            tags: ['Java', 'GUI Design', 'MySQL', 'OOP'],
            icon: '📋',
            link: '#'
        },
        {
            title: 'Competitive Programming Solutions',
            description: 'Collection of algorithmic solutions and data structure implementations from various competitive programming platforms and contests.',
            tags: ['C++', 'Algorithms', 'Data Structures'],
            icon: '🧩',
            link: '#'
        }
    ];

    return (
        <section id="projects" className="projects section">
            <div className="container">
                <h2 className="section-title">Featured Projects</h2>
                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <article
                            key={index}
                            className={`project-card card ${project.featured ? 'project-featured' : ''}`}
                        >
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
                            {project.featured && (
                                <div className={`project-badge ${project.position === '1st Position' ? 'badge-gold' : ''}`}>
                                    <span className="badge-star">{project.position === '1st Position' ? '🥇' : '⭐'}</span>
                                    {project.position}
                                </div>
                            )}
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
