import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const navRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -60% 0px' }
    );
    // Observe only sections with valid IDs to prevent empty active states.
    document.querySelectorAll('section[id]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          setScrolled(currentY > 60);

          // Hide on scroll down, show on scroll up (only after passing 60px)
          if (currentY > 60) {
            setHidden(currentY > lastScrollY.current);
          } else {
            setHidden(false);
          }

          lastScrollY.current = currentY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleOutsideClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setIsMobileMenuOpen(false);
      }
    };
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    // Prevent background scroll when the mobile menu is expanded.
    if (!isMobileMenuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileMenuOpen]);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);

  const navClass = [
    'navbar',
    scrolled ? 'scrolled' : '',
    hidden && !isMobileMenuOpen ? 'navbar-hidden' : '',
  ].filter(Boolean).join(' ');

  return (
    <nav ref={navRef} className={navClass}>
      <div className="container nav-content">
        <a href="#hero" className="nav-logo" onClick={closeMenu}>
          Portfolio<span>.</span>
        </a>
        <div id="nav-links" className={`nav-links ${isMobileMenuOpen ? 'mobile-active' : ''}`}>
          <a href="#projects" onClick={closeMenu} className={`nav-link brut-box ${activeSection === 'projects' ? 'active' : ''}`}>Projects</a>
          <a href="#skills" onClick={closeMenu} className={`nav-link brut-box ${activeSection === 'skills' ? 'active' : ''}`}>Skills</a>
          <a href="#education" onClick={closeMenu} className={`nav-link brut-box ${activeSection === 'education' ? 'active' : ''}`}>Education</a>
          <a href="#beyond-code" onClick={closeMenu} className={`nav-link brut-box ${activeSection === 'beyond-code' ? 'active' : ''}`}>Extra-Curriculars</a>
          <a href="#contact" onClick={closeMenu} className={`brut-btn nav-cta ${activeSection === 'contact' ? 'active' : ''}`}>Get in Touch</a>
        </div>
        <button
          className="mobile-menu-btn brut-box"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="nav-links"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
