import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, Github, Linkedin } from 'lucide-react';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [focused, setFocused] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const mailtoLink = `mailto:zeeshan303.3.1@gmail.com?subject=Portfolio Contact from ${formData.name}&body=${formData.message}%0A%0AFrom: ${formData.email}`;
        window.open(mailtoLink, '_blank');
    };

    const contactMethods = [
        { icon: Mail, label: 'Email', value: 'zeeshan303.3.1@gmail.com', link: 'mailto:zeeshan303.3.1@gmail.com' },
        { icon: Phone, label: 'Phone', value: '+92 310 9233844', link: 'tel:+923109233844' },
        { icon: MapPin, label: 'Location', value: 'Lahore, Pakistan', link: null },
    ];

    const socials = [
        { icon: Github, label: 'GitHub', link: 'https://github.com/xeeshan-zs' },
        { icon: Linkedin, label: 'LinkedIn', link: 'https://linkedin.com/in/xeeshan-zs' },
    ];

    return (
        <section id="contact" className="contact section">
            <div className="container">
                <h2 className="section-title scroll-animate">Get in Touch</h2>
                <p className="contact-subtitle scroll-animate">
                    Have an idea, project, or role in mind? Drop a message and I&apos;ll get back to you.
                </p>

                <div className="contact-layout">
                    {/* Left — Info */}
                    <div className="contact-info scroll-animate delay-1">
                        <div className="contact-methods">
                            {contactMethods.map((item, i) => {
                                const Icon = item.icon;
                                const Tag = item.link ? 'a' : 'div';
                                return (
                                    <Tag
                                        key={i}
                                        className="contact-method"
                                        href={item.link || undefined}
                                        target={item.link?.startsWith('http') ? '_blank' : undefined}
                                        rel={item.link?.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    >
                                        <div className="contact-method-icon">
                                            <Icon size={18} />
                                        </div>
                                        <div className="contact-method-text">
                                            <span className="contact-method-label">{item.label}</span>
                                            <span className="contact-method-value">{item.value}</span>
                                        </div>
                                    </Tag>
                                );
                            })}
                        </div>

                        <div className="contact-socials">
                            {socials.map((s, i) => {
                                const Icon = s.icon;
                                return (
                                    <a key={i} href={s.link} target="_blank" rel="noopener noreferrer" className="contact-social" aria-label={s.label}>
                                        <Icon size={18} />
                                    </a>
                                );
                            })}
                        </div>

                        <div className="contact-response">
                            <Clock size={14} />
                            <span>Usually responds within 24 hours</span>
                        </div>
                    </div>

                    {/* Right — Form */}
                    <form className="contact-form scroll-animate delay-2" onSubmit={handleSubmit}>
                        <div className={`form-field ${focused === 'name' || formData.name ? 'active' : ''}`}>
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                type="text" id="name" name="name"
                                className="form-input"
                                placeholder=" "
                                value={formData.name}
                                onChange={handleChange}
                                onFocus={() => setFocused('name')}
                                onBlur={() => setFocused(null)}
                                required
                            />
                        </div>
                        <div className={`form-field ${focused === 'email' || formData.email ? 'active' : ''}`}>
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email" id="email" name="email"
                                className="form-input"
                                placeholder=" "
                                value={formData.email}
                                onChange={handleChange}
                                onFocus={() => setFocused('email')}
                                onBlur={() => setFocused(null)}
                                required
                            />
                        </div>
                        <div className={`form-field ${focused === 'message' || formData.message ? 'active' : ''}`}>
                            <label htmlFor="message" className="form-label">Message</label>
                            <textarea
                                id="message" name="message"
                                className="form-input form-textarea"
                                placeholder=" "
                                rows="5"
                                value={formData.message}
                                onChange={handleChange}
                                onFocus={() => setFocused('message')}
                                onBlur={() => setFocused(null)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary btn-submit">
                            <Send size={16} />
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
