import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import avatarImage from '../assets/img/mieow.gif';
import qrImage from '../assets/img/zalome.jpg';
import { footerData } from './data/site';
import { GlowOrb } from './components/background/GlowOrb';
import { GridBackground } from './components/background/GridBackground';
import { ParticleBackground } from './components/background/ParticleBackground';
import { MusicPlayerPanel } from './components/layout/MusicPlayerPanel';
import { TopNav } from './components/layout/TopNav';
import { ZaloModal } from './components/layout/ZaloModal';
import { CustomCursor } from './components/layout/CustomCursor';
import { AboutSection } from './components/sections/AboutSection';
import { BusinessConceptSection } from './components/sections/BusinessConceptSection';
import { ConnectSection } from './components/sections/ConnectSection';
import { FinalCTASection } from './components/sections/FinalCTASection';
import { HeroSection } from './components/sections/HeroSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { RoadmapSection } from './components/sections/RoadmapSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { musicTracks } from './data/music';

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isZaloOpen, setIsZaloOpen] = useState(false);
  const [isAmbientLite, setIsAmbientLite] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('[data-section]');

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        threshold: [0.2, 0.45, 0.7],
        rootMargin: '-26% 0px -38% 0px'
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia('(max-width: 767px), (prefers-reduced-motion: reduce)');
    const syncAmbientMode = () => setIsAmbientLite(mediaQuery.matches);

    syncAmbientMode();

    const addListener = mediaQuery.addEventListener?.bind(mediaQuery);
    const removeListener = mediaQuery.removeEventListener?.bind(mediaQuery);

    if (addListener && removeListener) {
      addListener('change', syncAmbientMode);
      return () => removeListener('change', syncAmbientMode);
    }

    mediaQuery.addListener(syncAmbientMode);
    return () => mediaQuery.removeListener(syncAmbientMode);
  }, []);

  return (
    <div className="relative min-h-screen">
      <GridBackground lite={isAmbientLite} />
      <ParticleBackground lite={isAmbientLite} />

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <GlowOrb
          top="8%"
          left="7%"
          size={isAmbientLite ? 240 : 320}
          tone="pink"
        />
        {isAmbientLite ? null : (
          <GlowOrb
            top="22%"
            right="6%"
            size={280}
            tone="violet"
          />
        )}
        <GlowOrb
          top="68%"
          left="42%"
          size={isAmbientLite ? 240 : 360}
          tone="pink"
        />
      </div>

      <TopNav activeSection={activeSection} />
      {isAmbientLite ? null : <CustomCursor />}
      <MusicPlayerPanel tracks={musicTracks} />

      <main className="relative z-10 pb-16 pt-28 sm:pt-32">
        <HeroSection avatarSrc={avatarImage} />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <RoadmapSection />
        <BusinessConceptSection />
        <ConnectSection onOpenZalo={() => setIsZaloOpen(true)} />
        <FinalCTASection onOpenZalo={() => setIsZaloOpen(true)} />
      </main>

      <footer className="relative z-10 border-t border-white/6 py-8">
        <div className="page-shell text-center">
          <p className="text-sm text-[var(--text-muted)]">
            {footerData.made} • © 2026 EmBeby
          </p>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">{footerData.quote}</p>
        </div>
      </footer>

      <AnimatePresence>
        {isZaloOpen ? (
          <ZaloModal
            imageSrc={qrImage}
            onClose={() => setIsZaloOpen(false)}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default App;
