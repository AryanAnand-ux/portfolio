
import { Code2, Shield, PenTool, Trophy } from 'lucide-react';
import { arsenalData, milestonesData } from '../data/skills';
import './Skills.css';

const ICON_MAP = { Code2, Shield, PenTool };

const Skills = () => (
  <section id="skills" className="section">
    <div className="container">
      <div className="skills-grid reveal">

        {/* Arsenal Column */}
        <div className="arsenal-column">
          <div style={{ marginBottom: '1.5rem' }}>
            <h2
              className="section-title"
              style={{ backgroundColor: 'var(--accent-green)', fontSize: '2.5rem', marginBottom: 0, transform: 'rotate(-1deg)' }}
            >
              Arsenal
            </h2>
          </div>
          <div className="arsenal-box brut-box">
            {arsenalData.map((group) => {
              const Icon = ICON_MAP[group.icon];
              return (
                <div key={group.id} className="arsenal-group">
                  <div className="arsenal-title">
                    {Icon && <Icon size={20} />} {group.title}
                  </div>
                  <div className="arsenal-tags">
                    {group.tags.map((tag) => (
                      <span
                        key={tag.label}
                        className="bento-pill"
                        style={tag.color ? { backgroundColor: tag.color } : undefined}
                      >
                        {tag.label}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Milestones Column */}
        <div className="milestones-column">
          <div style={{ marginBottom: '1.5rem' }}>
            <h2
              className="section-title"
              style={{ backgroundColor: 'var(--accent-orange)', fontSize: '2.5rem', marginBottom: 0, transform: 'rotate(2deg)' }}
            >
              Milestones
            </h2>
          </div>
          <div className="milestones-list">
            {milestonesData.map((m) => (
              <div key={m.id} className="milestone-card brut-box">
                <div className="milestone-icon">
                  <Trophy size={24} color={m.iconColor} />
                </div>
                <div className="milestone-content">
                  <h4>{m.title}</h4>
                  <p>{m.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  </section>
);

export default Skills;
