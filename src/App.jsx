import { useState, lazy, Suspense, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, Palette, MessageCircle, Gamepad2 } from 'lucide-react';
import { ThemeProvider } from './context/ThemeContext';
import { ModalProvider } from './context/ModalContext';
import { useScrollProgress } from './hooks/useScrollProgress';
import { useKonamiCode } from './hooks/useKonamiCode';
import LoadingScreen from './components/ui/LoadingScreen';
import CustomCursor from './components/ui/CustomCursor';
import Modal from './components/ui/Modal';
import BackgroundGradient from './components/layout/BackgroundGradient';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import SkillsSection from './components/sections/SkillsSection';
import ProjectsSection from './components/sections/ProjectsSection';
import ExperienceSection from './components/sections/ExperienceSection';
import EducationSection from './components/sections/EducationSection';
import ContactSection from './components/sections/ContactSection';
import { useModal } from './context/ModalContext';

const SpaceScene = lazy(() => import('./components/three/SpaceScene'));
const ThemeCustomizer = lazy(() => import('./components/interactive/ThemeCustomizer'));
const ChatAssistant = lazy(() => import('./components/interactive/ChatAssistant'));
const MiniGameZone = lazy(() => import('./components/interactive/MiniGameZone'));

function EasterEgg({ active }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="konami-easter-egg"
          className="konami-easter-egg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          role="status"
          aria-live="polite"
        >
          <motion.div
            className="konami-easter-egg__card"
            initial={{ opacity: 0, scale: 0.9, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: 'spring', stiffness: 280, damping: 22 }}
          >
            <p className="konami-easter-egg__eyebrow">Secret unlocked</p>
            <div className="konami-easter-egg__icon-wrap" aria-hidden="true">
              <Coffee size={36} className="text-neon-cyan" />
              <span className="konami-easter-egg__infinity">∞</span>
            </div>
            <h2 className="konami-easter-egg__title gradient-text neon-text">
              Coffee Level: Infinite
            </h2>
            <p className="konami-easter-egg__message">
              Fun fact: I don&apos;t debug with breakpoints — I debug with espresso.
              The About section says <strong>∞ coffee consumed</strong>, and honestly?
              That stat is still climbing.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function QuickActions() {
  const { openModal } = useModal();

  const actions = [
    { icon: Palette, label: 'Theme', component: ThemeCustomizer, title: 'Appearance' },
    { icon: MessageCircle, label: 'Chat', component: ChatAssistant, title: 'Portfolio Assistant' },
    { icon: Gamepad2, label: 'Games', component: MiniGameZone, title: 'Mini Game Zone' },
  ];

  return (
    <div className="fixed bottom-6 right-4 sm:right-6 z-40 flex flex-col gap-2" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
      {actions.map(({ icon: Icon, label, component, title }) => (
        <motion.button
          key={label}
          onClick={() => openModal(component, title)}
          className="w-12 h-12 rounded-xl glass flex items-center justify-center hover:border-neon-cyan/30 hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] transition-all group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title={title}
          aria-label={title}
          data-cursor="pointer"
        >
          <Icon size={20} className="text-neon-cyan group-hover:text-white transition-colors" />
        </motion.button>
      ))}
    </div>
  );
}

function AppContent() {
  const [loaded, setLoaded] = useState(false);
  const [easterEgg, setEasterEgg] = useState(false);
  const scrollProgress = useScrollProgress();
  const easterEggTimeoutRef = useRef(null);

  const handleKonamiActivate = useCallback(() => {
    setEasterEgg(true);
    if (easterEggTimeoutRef.current) {
      clearTimeout(easterEggTimeoutRef.current);
    }
    easterEggTimeoutRef.current = setTimeout(() => setEasterEgg(false), 5500);
  }, []);

  useEffect(() => {
    return () => {
      if (easterEggTimeoutRef.current) {
        clearTimeout(easterEggTimeoutRef.current);
      }
    };
  }, []);

  useKonamiCode(handleKonamiActivate);

  if (!loaded) {
    return (
      <>
        <EasterEgg active={easterEgg} />
        <LoadingScreen onComplete={() => setLoaded(true)} />
      </>
    );
  }

  return (
    <>
      <CustomCursor />
      <EasterEgg active={easterEgg} />

      <BackgroundGradient />

      <Suspense fallback={null}>
        <SpaceScene scrollProgress={scrollProgress} />
      </Suspense>

      <Navbar />

      <div className="relative z-10 w-full overflow-x-hidden">
        <main className="w-full">
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ExperienceSection />
          <EducationSection />
          <ContactSection />
        </main>
        <Footer />
      </div>

      <QuickActions />
      <Modal />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ModalProvider>
        <AppContent />
      </ModalProvider>
    </ThemeProvider>
  );
}
