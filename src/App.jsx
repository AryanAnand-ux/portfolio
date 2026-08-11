import { useEffect, useState, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Education from './components/Education';
import Skills from './components/Skills';
import Contact from './components/Contact';
import BeyondCode from './components/BeyondCode';
import Certificates from './components/Certificates';
import Experience from './components/Experience';
import MarqueeStrip from './components/MarqueeStrip';
import Footer from './components/Footer';
import Loading from './components/Loading';
import { SmoothCursor } from './components/ui/smooth-cursor';
import ProjectsPage from './pages/ProjectsPage';
import ExperiencePage from './pages/ExperiencePage';
import CertificatesPage from './pages/CertificatesPage';

const ScrollProgressBar = () => {
  const progressBarRef = useRef(null);
  const rafIdRef = useRef(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        rafIdRef.current = window.requestAnimationFrame(() => {
          const progressBar = progressBarRef.current;
          if (progressBar) {
            const scrollPosition = window.scrollY;
            const totalScroll =
              document.documentElement.scrollHeight - window.innerHeight;
            let progress = 0;
            if (totalScroll > 0) {
              // Clamp to 0-100 to handle iOS bounce-scroll negative values
              progress = Math.max(
                0,
                Math.min(100, (scrollPosition / totalScroll) * 100)
              );
              if (totalScroll - scrollPosition <= 2) progress = 100;
            }
            progressBar.style.width = `${progress}%`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  return (
    <div
      ref={progressBarRef}
      className="scroll-progress-bar"
      aria-hidden="true"
    />
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Disable browser scroll restoration — we manage it ourselves
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // Scroll to top (or to hash target) on every route change
  useEffect(() => {
    if (location.hash) {
      // Give React time to render the new route before trying to find the element
      const id = location.hash.replace('#', '');
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        else window.scrollTo({ top: 0, behavior: 'instant' });
      });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }

    // Update page title per route
    const titles = {
      '/projects': 'Projects — Portfolio',
      '/experience': 'Experience — Portfolio',
      '/certificates': 'Certifications — Portfolio',
    };
    document.title = titles[location.pathname] ?? 'Portfolio — Aryan Anand';
  }, [location.pathname, location.hash]);

  // Re-run IntersectionObserver on every route change so freshly mounted
  // .reveal elements (e.g. home sections after navigating back) get observed
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [location.pathname]);

  return (
    <>
      {isHomePage && (
        <Loading isComplete={!isLoading} onComplete={() => setIsLoading(false)} />
      )}
      <SmoothCursor />
      <style>{`
        html {
          scroll-padding-top: 80px;
        }
        @media (max-width: 768px) {
          html {
            scroll-padding-top: 70px;
          }
        }
        @media (max-width: 480px) {
          html {
            scroll-padding-top: 60px;
          }
        }
      `}</style>
      <ScrollProgressBar />
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <main id="main-content">
              <Hero />
              <Skills />
              <Projects />
              <Experience />
              <BeyondCode />
              <Education />
              <Certificates />
              <Contact />
            </main>
          }
        />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/certificates" element={<CertificatesPage />} />
      </Routes>

      {isHomePage && <MarqueeStrip />}
      {isHomePage && <Footer />}
      <Analytics />
      <SpeedInsights />
    </>
  );
}

export default App;
