
import { FileText } from 'lucide-react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="section">
      <div className="container">

        <div className="section-header-wrap reveal" style={{ textAlign: 'left', marginBottom: '2rem' }}>
          <h2 className="section-title" style={{ backgroundColor: 'var(--accent-blue)', transform: 'rotate(-2deg)' }}>About Me</h2>
        </div>

        <div className="about-grid reveal">
          <div className="about-content brut-box">
            <p>
              I'm a 2nd-year B.Tech student (4th Sem) at JUET, deeply passionate about the intersection of Artificial Intelligence and Web Architecture. I specialize in the MERN stack and love building scalable, intelligent systems.
            </p>
            <p>
              When I'm not coding, I'm researching new AI models, participating in hackathons, or exploring neo-brutalist design trends. My goal is to bridge the gap between complex AI research and accessible, modern web experiences.
            </p>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="brut-btn btn-resume">
              <FileText size={20} /> Resume
            </a>
          </div>

          <div className="about-sidebar brut-box">
            <h3>Education</h3>
            <div className="edu-block">
              <strong>Jaypee University of Engineering and Technology (JUET)</strong>
              <span>B.Tech in Computer Science</span>
              <div className="edu-badge brut-box-small">2024 - 2028</div>
            </div>

            <hr className="sidebar-divider" />

            <h3>Focus Areas</h3>
            <div className="focus-tags">
              <span className="brut-box-small tag-rounded">Data Structures</span>
              <span className="brut-box-small tag-rounded">Algorithms</span>
              <span className="brut-box-small tag-rounded">AI/ML</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
