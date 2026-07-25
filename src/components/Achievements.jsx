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
            highlight: true,
            power: 9999
        },
        {
            title: 'Tech Head',
            position: 'Tech Head',
            organization: 'ACM Society, NUML Lahore',
            date: 'Current',
            team: null,
            icon: Award,
            highlight: false,
            power: 8500
        },
        {
            title: 'Competitive Programming Lead',
            position: 'Lead',
            organization: 'HackForge',
            date: '2025',
            team: null,
            icon: Award,
            highlight: false,
            power: 8200
        },
        {
            title: 'Surge UMT Hackathon',
            position: '3rd Position',
            organization: 'UMT',
            date: '2025',
            team: 'Full Stack Four Eyes',
            icon: Medal,
            highlight: false,
            power: 7800
        },
        {
            title: 'Competitive Programming Co-Lead',
            position: 'Co-Lead',
            organization: 'HackForge',
            date: '2024',
            team: null,
            icon: Award,
            highlight: false,
            power: 7500
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
                                    <div className="achievement-footer">
                                        <span className="achievement-date">{item.date}</span>
                                        <span className="achievement-power">
                                            <span className="power-pip" />
                                            {item.power.toLocaleString()}
                                        </span>
                                    </div>
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
