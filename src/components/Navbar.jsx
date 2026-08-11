import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const navRef = useRef(null);

  // Re-observe sections on every route change (fixes stale observer after Back to Home)
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
    document.querySelectorAll('section[id]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [location.pathname]);

  // Close mobile menu on route change (fixes body overflow lock on browser back/forward)
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          setScrolled(currentY > 60);

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
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMobileMenuOpen]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (!isMobileMenuOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileMenuOpen]);

  const toggleMenu = () => setIsMobileMenuOpen((o) => !o);
  const closeMenu = () => setIsMobileMenuOpen(false);

  // "Get in Touch" — SPA navigate to home then scroll to #contact
  const handleGetInTouch = (e) => {
    e.preventDefault();
    closeMenu();
    if (location.pathname === '/') {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Navigate to home with hash; App.jsx scroll handler picks it up
      navigate('/#contact');
    }
  };

  const navClass = [
    'navbar',
    scrolled ? 'scrolled' : '',
    hidden && !isMobileMenuOpen ? 'navbar-hidden' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <nav ref={navRef} className={navClass}>
      <div className="container nav-content">
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          Portfolio<span>.</span>
        </Link>
        <div
          id="nav-links"
          className={`nav-links ${isMobileMenuOpen ? 'mobile-active' : ''}`}
        >
          {location.pathname === '/' ? (
            <>
              <a
                href="#projects"
                onClick={closeMenu}
                className={`nav-link brut-box ${activeSection === 'projects' ? 'active' : ''}`}
              >
                Projects
              </a>
              <a
                href="#skills"
                onClick={closeMenu}
                className={`nav-link brut-box ${activeSection === 'skills' ? 'active' : ''}`}
              >
                Skills
              </a>
              <a
                href="#education"
                onClick={closeMenu}
                className={`nav-link brut-box ${activeSection === 'education' ? 'active' : ''}`}
              >
                Education
              </a>
              <a
                href="#beyond-code"
                onClick={closeMenu}
                className={`nav-link brut-box ${activeSection === 'beyond-code' ? 'active' : ''}`}
              >
                Extra-Curriculars
              </a>
            </>
          ) : (
            <>
              <Link to="/" onClick={closeMenu} className="nav-link brut-box">
                Home
              </Link>
              <Link
                to="/projects"
                onClick={closeMenu}
                className={`nav-link brut-box ${location.pathname === '/projects' ? 'active' : ''}`}
              >
                Projects
              </Link>
              <Link
                to="/experience"
                onClick={closeMenu}
                className={`nav-link brut-box ${location.pathname === '/experience' ? 'active' : ''}`}
              >
                Experience
              </Link>
              <Link
                to="/certificates"
                onClick={closeMenu}
                className={`nav-link brut-box ${location.pathname === '/certificates' ? 'active' : ''}`}
              >
                Certificates
              </Link>
            </>
          )}
          {/* Fixed: was <a href="/"> which caused full page reload; now uses SPA navigation */}
          <a
            href="#contact"
            onClick={handleGetInTouch}
            className={`brut-btn nav-cta ${activeSection === 'contact' ? 'active' : ''}`}
          >
            Get in Touch
          </a>
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
