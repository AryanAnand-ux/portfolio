import { GitHubIcon, LinkedInIcon } from './icons';
import './Footer.css';

const Footer = () => (
  <footer className="site-footer">
    <div className="footer-social">
      <a href="https://github.com/AryanAnand-ux" target="_blank" rel="noopener noreferrer" className="footer-icon-link" aria-label="GitHub">
        <GitHubIcon />
      </a>
      <a href="https://www.linkedin.com/in/aryananand-ux" target="_blank" rel="noopener noreferrer" className="footer-icon-link" aria-label="LinkedIn">
        <LinkedInIcon />
      </a>
    </div>
    <p className="footer-copy">
      Copyright {new Date().getFullYear()} Aryan Anand. Built with React and Vite.
    </p>
  </footer>
);

export default Footer;
