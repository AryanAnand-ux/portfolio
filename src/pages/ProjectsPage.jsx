import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { GitHubIcon } from '../components/icons';
import { projectsData } from '../data/projects';
import './DetailPage.css';

export default function ProjectsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="detail-page">
      <nav className="detail-nav container">
        <Link to="/" className="back-link">
          <ArrowLeft size={18} />
          Back to Home
        </Link>
      </nav>

      <header className="detail-header">
        <h1>All Projects</h1>
        <p>Building intelligent systems and robust architectures.</p>
      </header>

      <div className="detail-content container">
        <div className="detail-grid">
          {projectsData.map((project) => (
            <article key={project.id} className="detail-card brut-box">
              <div className="detail-card-body">
                <h2 className="detail-card-title">{project.title}</h2>
                <p className="detail-card-desc">{project.description}</p>
                <div className="detail-card-tech">
                  {project.tech.map((t) => (
                    <span key={t} className="bento-pill">{t}</span>
                  ))}
                </div>
              </div>
              <div className="detail-card-actions">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="brut-btn"
                  >
                    <GitHubIcon size={18} /> GitHub
                  </a>
                )}
                {project.projectLink && project.projectLink !== project.github && (
                  <a
                    href={project.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="brut-btn detail-live-btn"
                  >
                    <ExternalLink size={18} /> Live
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
