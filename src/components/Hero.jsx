import { ArrowRight, Sparkles, Code2, Bot, Download } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from './icons';
import './Hero.css';

const Hero = () => (
  <section id="hero" className="hero-section">
    <div className="container hero-container">
      <div className="hero-grid">
        <div className="hero-content reveal">
          <div className="floating-tags">
            <span className="brut-box tag tag-blue"><Bot size={16} /> AI Engineer</span>
            <span className="brut-box tag tag-green"><Code2 size={16} /> Full Stack</span>
            <span className="brut-box tag tag-orange"><Sparkles size={16} /> Innovator</span>
          </div>

          <h1 className="hero-title">
            Hi, I'm <span className="highlight-text">Aryan</span>.<br />
            Building intelligent systems<br /> & modern web experiences.
          </h1>

          <div className="hero-actions">
            <a href="#projects" className="brut-btn btn-primary">
              View My Work <ArrowRight size={20} />
            </a>
            <a href="https://github.com/AryanAnand-ux" target="_blank" rel="noopener noreferrer" className="brut-btn btn-secondary social-btn" aria-label="GitHub">
              <GitHubIcon size={24} />
            </a>
            <a href="https://www.linkedin.com/in/aryananand-ux" target="_blank" rel="noopener noreferrer" className="brut-btn btn-secondary social-btn" aria-label="LinkedIn" style={{ backgroundColor: 'var(--accent-blue)' }}>
              <LinkedInIcon size={24} />
            </a>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="brut-btn btn-primary" style={{ backgroundColor: 'var(--accent-green)' }}>
              Resume
            </a>
          </div>
        </div>

        <div className="hero-image-wrap reveal">
          <img
            src="/avatar.png"
            alt="Aryan Anand - Avatar"
            className="brut-box hero-avatar"
            width="350"
            height="350"
            fetchpriority="high"
          />
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
