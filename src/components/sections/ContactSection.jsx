import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Code2, Share2, Mail, MapPin, Phone } from 'lucide-react';
import { developer } from '../../data/portfolio';
import SectionWrapper, { SectionTitle } from '../ui/SectionWrapper';
import Button from '../ui/Button';
import { useTypingEffect } from '../../hooks/useKonamiCode';

const terminalLines = [
  '> Initializing contact protocol...',
  '> Connection established.',
  '> Ready to receive transmission.',
];

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [activeLine, setActiveLine] = useState(0);
  const typedLine = useTypingEffect(terminalLines[activeLine] || '', 40, 500);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <SectionWrapper id="contact">
      <SectionTitle subtitle="Contact" title="Open a Channel" />

      <div className="content-grid content-grid--2">
        <motion.div
          className="card-base overflow-hidden font-mono text-sm p-0"
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 px-5 py-4 border-b border-white/10 bg-space-900/50">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-2 text-xs text-slate-500">contact@lirisha-terminal</span>
          </div>

          <div className="p-6 md:p-8 space-y-3 min-h-[220px] leading-relaxed">
            {terminalLines.slice(0, activeLine + 1).map((line, i) => (
              <p key={i} className="text-neon-cyan/80">
                {i === activeLine ? typedLine : line}
                {i === activeLine && typedLine.length === line.length && i < terminalLines.length - 1 && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onAnimationComplete={() => setTimeout(() => setActiveLine((l) => l + 1), 300)}
                  />
                )}
              </p>
            ))}
            <p className="text-slate-500 pt-2">
              <span className="text-neon-purple">$</span> awaiting input
              <span className="animate-pulse">_</span>
            </p>
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="section-body"
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          {[
            { name: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
            { name: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
          ].map((field) => (
            <div key={field.name}>
              <label className="type-overline block mb-3 normal-case tracking-wide">
                {field.label}
              </label>
              <input
                type={field.type}
                value={form[field.name]}
                onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                placeholder={field.placeholder}
                required
                className="input-field"
              />
            </div>
          ))}

          <div>
            <label className="type-overline block mb-3 normal-case tracking-wide">Message</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Your message..."
              required
              rows={5}
              className="input-field resize-none"
            />
          </div>

          <div className="pt-2">
            <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto">
              <Send size={16} />
              {submitted ? 'Transmission Sent!' : 'Send Message'}
            </Button>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-3 pt-4">
            {[
              { icon: Mail, href: `mailto:${developer.email}`, label: developer.email },
              { icon: Phone, href: `tel:+91${developer.phone}`, label: developer.phone },
              { icon: Share2, href: developer.linkedin, label: 'LinkedIn' },
              { icon: Code2, href: developer.github, label: 'GitHub' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 type-body-sm text-slate-400 hover:text-neon-cyan transition-colors"
                data-cursor="pointer"
              >
                <Icon size={16} className="shrink-0" />
                {label}
              </a>
            ))}
            <span className="flex items-center gap-2 type-body-sm text-slate-500">
              <MapPin size={16} className="shrink-0" />
              {developer.location}
            </span>
          </div>
        </motion.form>
      </div>
    </SectionWrapper>
  );
}
