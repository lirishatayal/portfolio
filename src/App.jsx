import { useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, MessageCircle, Gamepad2 } from 'lucide-react';
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
          className="fixed inset-0 z-[150] flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="font-display text-4xl md:text-6xl font-black gradient-text neon-text"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2 }}
          >
            🚀 SECRET UNLOCKED 🌟
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

  useKonamiCode(() => {
    setEasterEgg(true);
    setTimeout(() => setEasterEgg(false), 3000);
  });

  if (!loaded) {
    return <LoadingScreen onComplete={() => setLoaded(true)} />;
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
