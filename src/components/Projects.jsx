
import ProjectCard from './ProjectCard';
import { projectsData } from '../data/projects';
import './Projects.css';

const Projects = () => (
  <section id="projects" className="section">
    <div className="container">
      <div className="projects-panel brut-box reveal">
        <div className="section-header-wrap" style={{ textAlign: 'left', marginBottom: '2rem' }}>
          <h2 className="section-title" style={{ backgroundColor: 'var(--accent-blue)', transform: 'rotate(-2deg)' }}>
            Projects
          </h2>
          <p style={{ fontSize: '1.2rem', color: '#555', marginTop: '1rem', marginLeft: '0.5rem' }}>
            Building intelligent systems and robust architectures.
          </p>
        </div>

        <div className="projects-grid reveal">
          {projectsData.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Projects;
