import { Trophy, Award, Medal } from 'lucide-react';
import './Achievements.css';

const achievements = [
    {
        title: "CosmoCon'25 Web Hackathon",
        position: '1st Place',
        organization: 'PUCIT',
        date: 'Dec 2025',
        team: 'Full Stack Four Eyes',
        icon: Trophy,
        highlight: true,
        power: 9999,
    },
    {
        title: 'Tech Head',
        position: 'ACM Society',
        organization: 'NUML Lahore',
        date: 'Current',
        team: null,
        icon: Award,
        highlight: false,
        power: 8500,
    },
    {
        title: 'CP Lead',
        position: 'HackForge',
        organization: '2025',
        date: '2025',
        team: null,
        icon: Award,
        highlight: false,
        power: 8200,
    },
    {
        title: 'Surge Hackathon',
        position: '3rd Place',
        organization: 'UMT',
        date: '2025',
        team: 'Full Stack Four Eyes',
        icon: Medal,
        highlight: false,
        power: 7800,
    },
    {
        title: 'CP Co-Lead',
        position: 'HackForge',
        organization: '2024',
        date: '2024',
        team: null,
        icon: Award,
        highlight: false,
        power: 7500,
    },
];

const Achievements = () => {
    return (
        <section id="achievements" className="achievements section">
            <div className="container">
                <h2 className="section-title scroll-animate">Achievements</h2>
                <div className="achievements-grid">
                    {achievements.map((item, index) => {
                        const IconComponent = item.icon;
                        return (
                            <div
                                key={index}
                                className={`achievement-card scroll-animate delay-${(index % 4) + 1} ${item.highlight ? 'achievement-highlight' : ''}`}
                            >
                                <div className="achievement-card-glow" />
                                {/* Golden burst rays for highlighted card */}
                                {item.highlight && (
                                    <div className="achievement-burst">
                                        {[...Array(8)].map((_, i) => (
                                            <div key={i} className="burst-ray" style={{ '--ray-angle': `${i * 45}deg` }} />
                                        ))}
                                    </div>
                                )}
                                <div className="achievement-top">
                                    <div className="achievement-icon-wrapper">
                                        <IconComponent size={24} />
                                    </div>
                                    <div className="achievement-power">
                                        <span className="power-pip" />
                                        {item.power.toLocaleString()}
                                    </div>
                                </div>
                                <h3 className="achievement-title">{item.title}</h3>
                                <div className="achievement-position">{item.position}</div>
                                <p className="achievement-org">{item.organization}</p>
                                {item.team && (
                                    <p className="achievement-team">Team: {item.team}</p>
                                )}
                                <div className="achievement-footer">
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
