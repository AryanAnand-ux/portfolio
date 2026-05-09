import { Download, Mail, CodeXml } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from './icons';
import './Hero.css';
import Terminal from './Terminal';

const Hero = () => (
  <section id="hero" className="hero-section">
    <div className="container hero-container">
      <div className="hero-grid">

        {/* Left: Profile card */}
        <aside className="profile-card reveal">
          <div className="profile-sticker" aria-hidden />
          <div className="profile-avatar-wrap">
            <img src="/avatar.png" alt="Aryan Anand - Avatar" className="hero-avatar" width="300" height="300" />
          </div>
          <h3 className="profile-name">ARYAN ANAND</h3>
          <div className="profile-subtitle">AI Engineer & FULL_STACK_DEVELOPER()</div>

          <hr className="profile-divider" />

          <div className="profile-meta">
            <div><span className="meta-key key-location">[LOCATION]</span><span> Guna, MP</span></div>
            <div><span className="meta-key key-status">[STATUS]</span><span> 2ND YEAR BTECH STUDENT</span></div>
            <div><span className="meta-key key-mission">[MISSION]</span><span> Code. Play. Chill.</span></div>
          </div>

          <div className="profile-actions">
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="brut-btn btn-download">
              <Download size={18} />&nbsp; RESUME
            </a>
            <a href="mailto:aryan.anand1806@gmail.com" className="brut-btn btn-contact"><Mail size={18} /> CONTACT ME</a>
          </div>

          <div className="profile-socials">
            <a href="https://github.com/AryanAnand-ux" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GitHubIcon /></a>
            <a href="https://www.linkedin.com/in/aryananand-ux" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedInIcon /></a>
            <a href="#projects" aria-label="Projects code"><CodeXml size={22} /></a>
          </div>
        </aside>

        {/* Right: big intro card + terminal mock */}
        <div className="hero-right">
          <div className="hero-cta-card reveal">
            <h1 className="hero-title">Hi people!</h1>
            <p className="hero-lead">
              I am a <span className="hero-highlight">2nd-year student at JUET, Guna</span>, pursuing Bachelor of Technology in Computer Science and Engineering.
            </p>
            <p className="hero-lead hero-lead-secondary">
              I have strong aptitude, technical, and communication skills, and a logical approach to problem-solving. My diverse schooling across India has made me adaptable and eager to create.
            </p>

            <div className="hero-cta-actions">
              <a href="#contact" className="brut-btn btn-primary">Open to Software and Research Internships</a>
            </div>
          </div>

          <div className="reveal">
            {/* interactive terminal component */}
            <Terminal />
          </div>
        </div>

      </div>
    </div>
  </section>
);

export default Hero;
