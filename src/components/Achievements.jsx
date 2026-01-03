import { Trophy, Award, Medal } from 'lucide-react';
import './Achievements.css';

const Achievements = () => {
    const achievements = [
        {
            title: "CosmoCon'25 Web Hackathon",
            position: '1st Position',
            organization: 'PUCIT',
            date: 'December 2025',
            team: 'Full Stack Four Eyes',
            icon: Trophy,
            highlight: true
        },
        {
            title: 'Surge UMT Hackathon',
            position: '3rd Position',
            organization: 'UMT',
            date: '2025',
            team: 'Full Stack Four Eyes',
            icon: Medal,
            highlight: false
        },
        {
            title: 'Competitive Programming Co-Lead',
            position: 'Leadership',
            organization: 'HackForge - NUML',
            date: '2024',
            team: null,
            icon: Award,
            highlight: false
        }
    ];

    return (
        <section id="achievements" className="achievements section">
            <div className="container">
                <h2 className="section-title">Achievements</h2>
                <div className="achievements-grid">
                    {achievements.map((item, index) => {
                        const IconComponent = item.icon;
                        return (
                            <div
                                key={index}
                                className={`achievement-card card ${item.highlight ? 'achievement-highlight' : ''}`}
                            >
                                <div className="achievement-icon-wrapper">
                                    <IconComponent size={28} />
                                </div>
                                <div className="achievement-content">
                                    <h3 className="achievement-title">{item.title}</h3>
                                    <div className="achievement-position">{item.position}</div>
                                    <p className="achievement-org">{item.organization}</p>
                                    {item.team && (
                                        <p className="achievement-team">Team: {item.team}</p>
                                    )}
                                    <span className="achievement-date">{item.date}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Achievements;
