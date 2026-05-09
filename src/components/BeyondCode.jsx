import { Star, Trophy } from 'lucide-react';
import './BeyondCode.css';

const BeyondCode = () => (
  <section id="beyond-code" className="section">
    <div className="container">
      <div className="beyond-panel brut-box reveal">
        <div className="beyond-header-wrap">
          <h2 className="section-title beyond-title">
            Beyond Code
          </h2>
        </div>

        <div className="beyond-grid">
          <div className="beyond-left">
            <article className="activity-card brut-box">
              <div className="activity-top">
                <div>
                  <div className="activity-title-row">
                    <span className="activity-icon" aria-hidden="true">ISF</span>
                    <h3>Member @ ISF</h3>
                  </div>
                  <span className="activity-date">2024 - Present</span>
                </div>
                <img src="/avatar.png" alt="Volunteer activity" className="activity-avatar" />
              </div>
              <div className="activity-body">
                
              </div>
            </article>

            
          </div>

          <div className="beyond-right">
            <div className="coding-pill">CODING</div>
            <article className="coding-card brut-box">
              <div className="coding-item">
                <Trophy size={20} />
                <div>
                  <h4>Winner, Elite Hack 1.0</h4>
                  <p>Secured first place among 100+ teams with an innovative AI solution.</p>
                </div>
              </div>

              <div className="coding-item">
                <Star size={20} />
                <div>
                  <h4>Finalist, i.mobilothon 5.0</h4>
                  <p>Recognized for building scalable mobile-first architectures.</p>
                </div>
              </div>

              <div className="coding-item">
                <Star size={20} />
                <div>
                  <h4>Microsoft Elevate AICTE Alumnus</h4>
                  <p>Completed advanced training in cloud computing and AI technologies.</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default BeyondCode;
