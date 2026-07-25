import { useState } from 'react';
import { MapPin, Clock, Github, Linkedin, Zap } from 'lucide-react';
import emailjs from '@emailjs/browser';
import './Contact.css';

const EMAILJS_SERVICE_ID = 'service_ge8znab';
const EMAILJS_TEMPLATE_ID = 'template_ywsa3t9';
const EMAILJS_PUBLIC_KEY = 'gmBtwJOlcKZyX1xA2';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [focused, setFocused] = useState(null);
    const [charging, setCharging] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCharging(true);
        setError(false);

        try {
            const res = await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    reply_to: formData.email,
                },
                EMAILJS_PUBLIC_KEY
            );

            if (res.status === 200 || res.text === 'OK') {
                setSent(true);
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setSent(false), 3000);
            } else {
                setError(true);
            }
        } catch (err) {
            console.error('EmailJS error:', err);
            setError(true);
        } finally {
            setCharging(false);
        }
    };

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

                        {/* Location only */}
                        <div className="contact-method">
                            <div className="contact-method-icon">
                                <MapPin size={18} />
                            </div>
                            <div className="contact-method-text">
                                <span className="contact-method-label">Location</span>
                                <span className="contact-method-value">Lahore, Pakistan</span>
                            </div>
                        </div>

                        {/* Social links */}
                        <div className="contact-socials-block">
                            <p className="contact-socials-title">Find me on</p>
                            <div className="contact-socials">
                                {socials.map((s, i) => {
                                    const Icon = s.icon;
                                    return (
                                        <a
                                            key={i}
                                            href={s.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="contact-social-pill"
                                            aria-label={s.label}
                                        >
                                            <Icon size={16} />
                                            <span>{s.label}</span>
                                        </a>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Response time */}
                        <div className="contact-response">
                            <Clock size={14} />
                            <span>Usually responds within 24 hours</span>
                        </div>

                        {/* DBZ scouter card */}
                        <div className="contact-scouter">
                            <span className="scouter-label">SCOUTER READING</span>
                            <span className="scouter-value">POWER LEVEL: ∞</span>
                        </div>

                        {/* Secure note */}
                        <p className="contact-privacy-note">
                            <Zap size={11} />
                            Your message is sent securely. No contact info is shared publicly.
                        </p>
                    </div>

                    {/* Right — Form */}
                    <form className="contact-form scroll-animate delay-2" onSubmit={handleSubmit}>
                        {/* Honeypot — keeps bots out */}
                        <input type="checkbox" name="botcheck" style={{ display: 'none' }} tabIndex={-1} readOnly />

                        <div className={`form-field ${focused === 'name' || formData.name ? 'active' : ''}`}>
                            <label htmlFor="name" className="form-label">Your Name</label>
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
                            <label htmlFor="email" className="form-label">Your Email</label>
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

                        {error && (
                            <p className="form-error">Something went wrong. Please try again.</p>
                        )}

                        <button
                            type="submit"
                            className={`btn btn-primary btn-submit ki-send-btn ${charging ? 'ki-charging' : ''} ${sent ? 'ki-sent' : ''}`}
                            disabled={charging}
                        >
                            {charging ? (
                                <>
                                    <span className="ki-charge-orbs">
                                        <span className="ki-orb-mini" />
                                        <span className="ki-orb-mini" />
                                        <span className="ki-orb-mini" />
                                    </span>
                                    Charging Ki...
                                </>
                            ) : sent ? (
                                <>⚡ Message Sent!</>
                            ) : (
                                <>
                                    <span className="ki-send-icon">⚡</span>
                                    Fire Kamehameha
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
