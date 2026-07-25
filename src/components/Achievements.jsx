import { Trophy, Award, Medal, Crown, Users } from 'lucide-react';
import './Achievements.css';

const competitionWins = [
    {
        title: "CosmoCon'25 Web Hackathon",
        position: '1st Place',
        organization: 'PUCIT',
        date: 'Dec 2025',
        team: 'Full Stack Four Eyes',
        icon: Trophy,
        highlight: true,
    },
    {
        title: 'Surge Hackathon',
        position: '3rd Place',
        organization: 'UMT',
        date: '2025',
        team: 'Full Stack Four Eyes',
        icon: Medal,
    },
];

const leadershipRoles = [
    {
        title: 'Tech Head',
        organization: 'ACM Society',
        date: 'Current',
        icon: Crown,
    },
    {
        title: 'Competitive Programming Lead',
        organization: 'HackForge',
        date: '2025',
        icon: Users,
    },
    {
        title: 'CP Co-Lead',
        organization: 'HackForge',
        date: '2024',
        icon: Users,
    },
];

const Achievements = () => {
    return (
        <section id="achievements" className="achievements section">
            <div className="container">
                <h2 className="section-title scroll-animate">Achievements</h2>

                {/* Competition Wins */}
                <div className="achievements-category scroll-animate">
                    <div className="category-header">
                        <Trophy size={20} className="category-icon" />
                        <h3 className="category-title">Competition Wins</h3>
                    </div>
                    <div className="achievements-grid">
                        {competitionWins.map((item, index) => {
                            const IconComponent = item.icon;
                            return (
                                <div
                                    key={index}
                                    className={`achievement-card scroll-animate delay-${(index % 4) + 1} ${item.highlight ? 'achievement-highlight' : ''}`}
                                >
                                    <div className="achievement-card-glow" />
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

                {/* Leadership Roles */}
                <div className="achievements-category scroll-animate delay-2">
                    <div className="category-header">
                        <Award size={20} className="category-icon" />
                        <h3 className="category-title">Leadership Roles</h3>
                    </div>
                    <div className="achievements-grid achievements-grid-leadership">
                        {leadershipRoles.map((item, index) => {
                            const IconComponent = item.icon;
                            return (
                                <div
                                    key={index}
                                    className={`achievement-card scroll-animate delay-${(index % 4) + 1}`}
                                >
                                    <div className="achievement-card-glow" />
                                    <div className="achievement-top">
                                        <div className="achievement-icon-wrapper">
                                            <IconComponent size={24} />
                                        </div>
                                    </div>
                                    <h3 className="achievement-title">{item.title}</h3>
                                    <p className="achievement-org">{item.organization}</p>
                                    <div className="achievement-footer">
                                        <span className="achievement-date">{item.date}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Achievements;
