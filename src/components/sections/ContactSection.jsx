import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Send,
  Code2,
  Share2,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  Briefcase,
  Rocket,
  MessageCircle,
  Radio,
} from 'lucide-react';
import { developer } from '../../data/portfolio';
import { sendContactMessage } from '../../services/contactForm';
import SectionWrapper, { SectionTitle } from '../ui/SectionWrapper';
import Button from '../ui/Button';

const reachOutReasons = [
  {
    icon: Briefcase,
    title: 'Opportunities',
    text: 'Open to frontend roles and exciting new challenges.',
  },
  {
    icon: Rocket,
    title: 'Collaboration',
    text: 'Have a product, startup, or side project in mind? Let’s talk.',
  },
  {
    icon: MessageCircle,
    title: 'Questions',
    text: 'Curious about my work, skills, or experience? I’m happy to chat.',
  },
];

const contactLinks = [
  { icon: Mail, href: `mailto:${developer.email}`, label: developer.email },
  { icon: Phone, href: `tel:+91${developer.phone}`, label: developer.phone },
  { icon: Share2, href: developer.linkedin, label: 'LinkedIn' },
  { icon: Code2, href: developer.github, label: 'GitHub' },
];

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (honeypot) return;

    setStatus('sending');
    setError('');

    try {
      await sendContactMessage(form);
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setError(`Could not send your message. Please email me directly at ${developer.email}.`);
    }
  };

  return (
    <SectionWrapper id="contact" className="contact-section">
      <SectionTitle subtitle="Contact" title="Open a Channel" />

      <div className="contact-section__grid content-grid content-grid--2">
        <motion.aside
          className="contact-section__intro"
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="contact-section__intro-glow" aria-hidden="true" />

          <div className="contact-section__status" role="status">
            <span className="contact-section__status-dot" aria-hidden="true" />
            <Radio size={14} className="text-neon-cyan shrink-0" aria-hidden="true" />
            <span>Channel ready — transmission open</span>
          </div>

          <h3 className="contact-section__headline">
            Let&apos;s build something{' '}
            <span className="gradient-text">together</span>
          </h3>

          <p className="contact-section__lead">
            I&apos;m {developer.name}, a {developer.title.toLowerCase()} based in{' '}
            {developer.location}. I love turning ideas into fast, polished web experiences.
          </p>

          <p className="contact-section__invite">
            Whether you&apos;re hiring, collaborating, or just want to say hello — I&apos;d love
            to hear from you.
          </p>

          <ul className="contact-section__reasons" aria-label="Reasons to get in touch">
            {reachOutReasons.map(({ icon: Icon, title, text }, index) => (
              <motion.li
                key={title}
                className="contact-section__reason"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
              >
                <span className="contact-section__reason-icon" aria-hidden="true">
                  <Icon size={18} />
                </span>
                <div>
                  <p className="contact-section__reason-title">{title}</p>
                  <p className="contact-section__reason-text">{text}</p>
                </div>
              </motion.li>
            ))}
          </ul>

          <p className="contact-section__form-hint">
            <ArrowRight size={16} className="contact-section__form-hint-icon" aria-hidden="true" />
            Fill the form to get in touch
          </p>

          <div className="contact-section__links">
            {contactLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-section__link"
                data-cursor="pointer"
              >
                <Icon size={16} className="shrink-0" aria-hidden="true" />
                <span>{label}</span>
              </a>
            ))}
            <span className="contact-section__link contact-section__link--static">
              <MapPin size={16} className="shrink-0" aria-hidden="true" />
              <span>{developer.location}</span>
            </span>
          </div>
        </motion.aside>

        <motion.div
          className="contact-section__form-wrap"
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <form
            onSubmit={handleSubmit}
            className="contact-section__form card-base"
            aria-labelledby="contact-form-title"
            noValidate={false}
          >
            <div className="contact-section__form-header">
              <h3 id="contact-form-title" className="contact-section__form-title">
                Send a message
              </h3>
              <p className="contact-section__form-subtitle">
                Share a few details and I&apos;ll reply as soon as I can.
              </p>
            </div>

            <div className="contact-section__fields section-body">
              {[
                {
                  name: 'name',
                  label: 'Your name',
                  type: 'text',
                  placeholder: 'e.g. Alex Johnson',
                  autoComplete: 'name',
                },
                {
                  name: 'email',
                  label: 'Your email',
                  type: 'email',
                  placeholder: 'you@example.com',
                  autoComplete: 'email',
                },
              ].map((field) => (
                <div key={field.name}>
                  <label htmlFor={`contact-${field.name}`} className="contact-section__label">
                    {field.label}
                  </label>
                  <input
                    id={`contact-${field.name}`}
                    name={field.name}
                    type={field.type}
                    value={form[field.name]}
                    onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                    placeholder={field.placeholder}
                    autoComplete={field.autoComplete}
                    required
                    className="input-field"
                  />
                </div>
              ))}

              <div>
                <label htmlFor="contact-message" className="contact-section__label">
                  Your message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me about your project, role, or question..."
                  required
                  rows={5}
                  className="input-field resize-none"
                />
              </div>
            </div>

            <div className="contact-section__submit">
              <input
                type="text"
                name="_gotcha"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="contact-section__submit-btn w-full"
                disabled={status === 'sending'}
                aria-live="polite"
              >
                <Send size={16} aria-hidden="true" />
                {status === 'sending'
                  ? 'Sending your message...'
                  : status === 'success'
                    ? 'Message sent!'
                    : 'Send Message'}
              </Button>

              {error && (
                <p className="contact-section__feedback contact-section__feedback--error" role="alert">
                  {error}
                </p>
              )}
              {status === 'success' && (
                <p className="contact-section__feedback contact-section__feedback--success" role="status">
                  Thanks for reaching out! I&apos;ll get back to you soon.
                </p>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
