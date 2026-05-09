import { Mail } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from './icons';
import './Contact.css';

const Contact = () => (
  <section id="contact" className="section">
    <div className="container center-wrap">
      <div className="section-header-wrap reveal contact-title-wrap" style={{ marginBottom: '2rem' }}>
        <h2 className="section-title" style={{ backgroundColor: 'var(--accent-pink)' }}>
          Let&apos;s Talk
        </h2>
      </div>

      <div className="contact-card brut-box reveal">
        <div className="contact-copy">
          <h3 className="contact-heading">Got an idea or a project?</h3>
          <p className="contact-text">
            I&apos;m currently open for new opportunities. Whether it&apos;s a full-time role,
            a freelance project, or just a quick chat about AI and web tech, my inbox is always open.
          </p>
        </div>

        <div className="contact-actions">
          <a href="mailto:aryan.anand1806@gmail.com" className="brut-btn btn-large contact-btn">
            <Mail size={24} /> aryan.anand1806@gmail.com
          </a>

          <div className="social-links">
            <a href="https://github.com/AryanAnand-ux" target="_blank" rel="noopener noreferrer" className="social-icon brut-box" aria-label="GitHub">
              <GitHubIcon />
            </a>
            <a href="https://www.linkedin.com/in/aryananand-ux" target="_blank" rel="noopener noreferrer" className="social-icon brut-box" aria-label="LinkedIn">
              <LinkedInIcon />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Contact;
