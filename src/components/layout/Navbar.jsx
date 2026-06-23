import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { cn } from '../../utils/helpers';
import { useScrollProgress } from '../../hooks/useScrollProgress';

const primaryLinks = [
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Education', href: '#education', id: 'education' },
];

const sectionIds = ['hero', ...primaryLinks.map((l) => l.id), 'contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const scrollProgress = useScrollProgress();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);

      for (const id of [...sectionIds].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 160) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleNavClick = (href) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      className={cn('site-header', scrolled && 'site-header--scrolled')}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.55, ease: 'easeOut' }}
    >
      <div className="site-header__inner page-container">
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#hero');
          }}
          className="site-header__brand"
          data-cursor="pointer"
          aria-label="Lirisha Tayal — Home"
        >
          <span className="site-header__logo gradient-text">LT</span>
          <span className="site-header__name">
            <span className="site-header__name-title">Lirisha Tayal</span>
            <span className="site-header__name-sub">Frontend Developer</span>
          </span>
        </a>

        <nav className="site-header__nav hidden lg:flex" aria-label="Main">
          <div className="site-header__pill">
            {primaryLinks.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={cn('site-header__link', isActive && 'site-header__link--active')}
                  data-cursor="pointer"
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="site-header__underline"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => handleNavClick('#contact')}
            className="site-header__cta btn btn-primary"
            data-cursor="pointer"
          >
            Contact
            <ArrowUpRight size={14} aria-hidden="true" />
          </button>
        </nav>

        <button
          type="button"
          className="site-header__menu-btn flex lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          data-cursor="pointer"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <motion.div
        className="site-header__progress"
        style={{ scaleX: scrollProgress }}
        aria-hidden="true"
      />

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button
              type="button"
              className="site-header__backdrop lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            />
            <motion.div
              className="site-header__drawer lg:hidden"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22 }}
            >
              <nav className="site-header__drawer-nav" aria-label="Mobile">
                <a
                  href="#hero"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('#hero');
                  }}
                  className={cn(
                    'site-header__drawer-link',
                    activeSection === 'hero' && 'site-header__drawer-link--active'
                  )}
                >
                  Home
                </a>
                {primaryLinks.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className={cn(
                      'site-header__drawer-link',
                      activeSection === item.id && 'site-header__drawer-link--active'
                    )}
                  >
                    {item.label}
                  </a>
                ))}
                <button
                  type="button"
                  onClick={() => handleNavClick('#contact')}
                  className="site-header__drawer-cta btn btn-primary w-full mt-2"
                  data-cursor="pointer"
                >
                  Contact
                  <ArrowUpRight size={14} aria-hidden="true" />
                </button>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}