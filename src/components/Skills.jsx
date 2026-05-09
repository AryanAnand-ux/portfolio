
import { arsenalData } from '../data/skills';
import './Skills.css';

const colorMap = {
  Languages: 'var(--accent-pink)',
  Frontend: 'var(--accent-blue)',
  Backend: 'var(--accent-green)',
  Databases: 'var(--accent-yellow)',
  'Core CS': 'var(--accent-orange)',
  'Tools & Cloud': 'var(--accent-purple)',
};

const Skills = () => (
  <section id="skills" className="section">
    <div className="container">
      <div className="skills-grid reveal">

        <div className="skills-panel brut-box">
          <div className="skills-header">
            <h2 className="section-title skills-title">
              Skills
            </h2>
          </div>

          <div className="skills-cards-grid">
          {arsenalData.map((group) => {
            const labelColor = colorMap[group.title] || 'var(--accent-purple)';

            return (
              <div key={group.id} className="skill-card brut-box">
                <div className="skill-label" style={{ backgroundColor: labelColor }}>{group.title}</div>
                <div className="arsenal-tags">
                  {group.tags.map((t) => (
                    <span key={t} className="bento-pill">{t}</span>
                  ))}
                </div>
              </div>
            );
          })}
          </div>
        </div>

      </div>
    </div>
  </section>
);

export default Skills;
