
import ProjectCard from './ProjectCard';
import { projectsData } from '../data/projects';
import './Projects.css';

const Projects = () => (
  <section id="projects" className="section">
    <div className="container">
      <div className="projects-panel brut-box reveal">
        <div className="section-header-wrap projects-header">
          <h2 className="section-title projects-title">
            Projects
          </h2>
          <p className="projects-subtitle">
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
