import { ExternalLink } from 'lucide-react';
import { GitHubIcon } from './icons';
import './Projects.css';

const ProjectCard = ({ title, description, details, tech, link, github, layoutClass }) => (
  <div className={`project-card brut-box ${layoutClass}`}>
    <div className="project-content">
      <h3 className="project-title">{title}</h3>
      <p className="project-desc">{description}</p>

      {Array.isArray(details) && details.length > 0 && (
        <ul className="project-details">
          {details.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}

      <div className="project-tech">
        {tech.map((t) => (
          <span key={t} className="bento-pill">{t}</span>
        ))}
      </div>

      <div className="project-links-container">
        <div className="project-links">
          {link && (
            <a href={link} target="_blank" rel="noopener noreferrer" className="brut-btn">
              <ExternalLink size={20} /> Demo
            </a>
          )}
          {github && (
            <a href={github} target="_blank" rel="noopener noreferrer" className="brut-btn" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <GitHubIcon size={20} /> GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default ProjectCard;
