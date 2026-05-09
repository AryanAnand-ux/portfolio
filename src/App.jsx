import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Education from './components/Education';
import Skills from './components/Skills';
import Contact from './components/Contact';
import BeyondCode from './components/BeyondCode';
import MarqueeStrip from './components/MarqueeStrip';
import Footer from './components/Footer';
import Loading from './components/Loading';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

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

    // React's useEffect runs after the DOM is committed, so querySelectorAll is safe here.
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Loading isComplete={!isLoading} />
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
      <Navbar />
      <main>
        <Hero />
        <Skills />
        <Projects />
        <BeyondCode />
        <Education />
        <Contact />
      </main>
      <MarqueeStrip />
      <Footer />
    </>
  );
}

export default App;
