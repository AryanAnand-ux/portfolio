import { Download, Mail, CodeXml } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from './icons';
import GlitchText from './GlitchText';
import TiltedCard from './TiltedCard';
import './Hero.css';
import Terminal from './Terminal';

const Hero = () => (
  <section id="hero" className="hero-section">
    <div className="container hero-container">
      <div className="hero-grid">

        {/* Left: Profile card with 3D Tilt */}
        <TiltedCard
          rotateAmplitude={12}
          scaleOnHover={1.02}
          showMobileWarning={false}
          showTooltip={false}
          className="profile-card-tilted-wrapper"
        >
          <aside className="profile-card reveal">
            <div className="profile-sticker" aria-hidden />
            <div className="profile-avatar-wrap">
              <img src="/avatar.png" alt="Aryan Anand - Avatar" className="hero-avatar" width="300" height="300" fetchpriority="high" />
            </div>
            <h3 className="profile-name">
              <GlitchText
                speed={1}
                enableShadows={true}
                enableOnHover={false}
              >
                ARYAN ANAND
              </GlitchText>
            </h3>
            <div className="profile-subtitle">AI & ML Enthusiast & Web Developer()</div>

            <hr className="profile-divider" />

            <div className="profile-meta">
              <div><span className="meta-key key-location">[LOCATION]</span><span> Bhopal, MP</span></div>
              <div><span className="meta-key key-status">[STATUS]</span><span> 3RD YEAR BTECH STUDENT</span></div>
              <div><span className="meta-key key-mission">[MISSION]</span><span> Code. Play. Chill.</span></div>
            </div>

            <div className="profile-actions">
              <a href="/resume_5th_sem_v4.pdf" target="_blank" rel="noopener noreferrer" className="brut-btn btn-download">
                <Download size={18} />&nbsp; RESUME
              </a>
              <a href="#contact" className="brut-btn btn-contact"><Mail size={18} /> CONTACT ME</a>
            </div>

            <div className="profile-socials">
              <a href="https://github.com/AryanAnand-ux" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GitHubIcon /></a>
              <a href="https://www.linkedin.com/in/aryananand-ux" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedInIcon /></a>
              <a href="#projects" aria-label="Projects code"><CodeXml size={22} /></a>
            </div>
          </aside>
        </TiltedCard>

        {/* Right: big intro card + terminal mock */}
        <div className="hero-right">
          <div className="hero-cta-card reveal">
            <h1 className="hero-title">Hi people!</h1>
            <p className="hero-lead">
              I am a <span className="hero-highlight">B.Tech CSE-AIML student at JUET, Guna</span>, building full-stack and machine learning systems.
            </p>
            <p className="hero-lead hero-lead-secondary">
              I focus on AI/ML, backend engineering, and applied problem-solving with strong communication and leadership.
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
