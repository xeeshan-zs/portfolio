import { useState } from 'react';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        const mailtoLink = `mailto:zeeshan303.3.1@gmail.com?subject=Portfolio Contact from ${formData.name}&body=${formData.message}%0A%0AFrom: ${formData.email}`;
        window.open(mailtoLink, '_blank');
    };

    const contactInfo = [
        {
            icon: '📧',
            label: 'Email',
            value: 'zeeshan303.3.1@gmail.com',
            link: 'mailto:zeeshan303.3.1@gmail.com'
        },
        {
            icon: '📱',
            label: 'Phone',
            value: '+92 310 9233844',
            link: 'tel:+923109233844'
        },
        {
            icon: '📍',
            label: 'Location',
            value: 'Pakistan',
            link: null
        }
    ];

    return (
        <section id="contact" className="contact section">
            <div className="container">
                <div className="contact-shell card">
                    <div className="contact-shell-header">
                        <h2 className="section-title contact-title">Get in Touch</h2>
                        <p className="contact-intro">
                            Have an idea, project, or role in mind? I&apos;d love to hear about it.
                            Send a quick message and I&apos;ll get back to you.
                        </p>
                    </div>
                    <div className="contact-grid">
                        <div className="contact-info">
                            <div className="contact-details">
                                {contactInfo.map((item, index) => (
                                    <div key={index} className="contact-item card-inset">
                                        <span className="contact-icon">{item.icon}</span>
                                        <div className="contact-text">
                                            <span className="contact-label">{item.label}</span>
                                            {item.link ? (
                                                <a href={item.link} className="contact-value">
                                                    {item.value}
                                                </a>
                                            ) : (
                                                <span className="contact-value">{item.value}</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="contact-note card-inset">
                                <p className="contact-note-title">Response time</p>
                                <p className="contact-note-text">Usually within 24 hours.</p>
                            </div>
                        </div>
                        <form className="contact-form card-inset" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="form-input"
                                    placeholder="Your name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="form-input"
                                    placeholder="your@email.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message" className="form-label">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    className="form-input form-textarea"
                                    placeholder="Your message..."
                                    rows="5"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary btn-submit">
                                Send Message
                                <span className="btn-icon">→</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
