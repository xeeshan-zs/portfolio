import './Footer.css';

const Footer = () => {
    const quickLinks = [
        { id: 'hero', label: 'About' },
        { id: 'skills', label: 'Skills' },
        { id: 'projects', label: 'Projects' },
        { id: 'contact', label: 'Contact' }
    ];

    const socialLinks = [
        { label: 'GitHub', href: 'https://github.com/xeeshan-zs' },
        { label: 'LinkedIn', href: 'https://linkedin.com/in/xeeshan-zs' },
    ];

    return (
        <footer className="site-footer">
            <div className="container">
                <div className="footer-top card">
                    <div className="footer-brand">
                        <a href="#hero" className="footer-logo">Zeeshan<span className="text-accent">.</span></a>
                        <p className="footer-tagline">
                            Building reliable products with clean code, thoughtful UX, and real-world impact.
                        </p>
                    </div>
                    <div className="footer-links-group">
                        <h3 className="footer-heading">Quick Links</h3>
                        <div className="footer-links">
                            {quickLinks.map((item) => (
                                <a key={item.id} href={`#${item.id}`} className="footer-link">
                                    {item.label}
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="footer-links-group">
                        <h3 className="footer-heading">Connect</h3>
                        <div className="footer-links">
                            {socialLinks.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    target={item.href.startsWith('http') ? '_blank' : undefined}
                                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    className="footer-link"
                                >
                                    {item.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>© 2026 Zeeshan Sarfraz. Crafted with React & Vite.</p>
                    <p className="footer-scouter">
                        <span className="footer-scouter-dot" />
                        SCOUTER: POWER LEVEL ∞
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
