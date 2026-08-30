import { useEffect, useState } from 'react';
import { Users } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from './icons';
import './Footer.css';

const Footer = () => {
  const [visitorCount, setVisitorCount] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const sessionKey = 'has_visited_aryan_portfolio';
    const hasVisited = typeof window !== 'undefined' ? sessionStorage.getItem(sessionKey) : null;
    const endpoint = hasVisited
      ? 'https://countapi.mileshilliard.com/api/v1/get/aryananand_portfolio'
      : 'https://countapi.mileshilliard.com/api/v1/hit/aryananand_portfolio';

    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data && typeof data.value === 'number') {
          setVisitorCount(data.value);
          if (typeof window !== 'undefined') {
            sessionStorage.setItem(sessionKey, 'true');
          }
        }
      })
      .catch(() => {
        if (isMounted) {
          setVisitorCount(1);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <footer className="site-footer">
      <div className="footer-social">
        <a href="https://github.com/AryanAnand-ux" target="_blank" rel="noopener noreferrer" className="footer-icon-link" aria-label="GitHub">
          <GitHubIcon />
        </a>
        <a href="https://www.linkedin.com/in/aryananand-ux" target="_blank" rel="noopener noreferrer" className="footer-icon-link" aria-label="LinkedIn">
          <LinkedInIcon />
        </a>
      </div>

      <div className="visitor-badge brut-box" aria-label={`Visitor count: ${visitorCount ?? 'Loading'}`}>
        <span className="visitor-live-dot" aria-hidden="true" />
        <span className="visitor-label">
          <Users size={14} className="visitor-icon" aria-hidden="true" /> VISITORS
        </span>
        <span className="visitor-number">
          {visitorCount !== null ? visitorCount.toLocaleString() : '...'}
        </span>
      </div>

      <p className="footer-copy">
        Copyright {new Date().getFullYear()} Aryan Anand. Built with React and Vite.
      </p>
    </footer>
  );
};

export default Footer;
