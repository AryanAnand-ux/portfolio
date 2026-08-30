import { Star, Trophy } from 'lucide-react';
import Shuffle from './Shuffle';
import './BeyondCode.css';

const BeyondCode = () => (
  <section id="beyond-code" className="section">
    <div className="container">
      <div className="beyond-panel brut-box reveal">
        <div className="beyond-header-wrap">
          <h2 className="section-title beyond-title">
            <Shuffle tag="span" text="Beyond Code" triggerOnHover={true} duration={2.5} />
          </h2>
        </div>

        <div className="beyond-grid">
          <div className="beyond-left">
            <article className="activity-card brut-box">
              <div className="activity-top">
                <div>
                  <div className="activity-title-row">
                    <span className="activity-icon" aria-hidden="true">LEAD</span>
                    <h3>Community Lead @ Developer Student Clubs VR-AR-MR</h3>
                  </div>
                  <span className="activity-date">Jun 2024 - Present</span>
                </div>
                <img src="/avatar.png" alt="Aryan Anand - community lead activity" className="activity-avatar" width="80" height="80" />
              </div>
              <div className="activity-body">
                <p>
                  Contributed to immersive club projects including VR Golf, AR Escape Room, and multiple AR shooters.
                </p>
              </div>
            </article>

            <article className="activity-card brut-box">
              <div className="activity-top">
                <div>
                  <div className="activity-title-row">
                    <span className="activity-icon" aria-hidden="true">LEAD</span>
                    <h3>Community Lead @ DSC Rospinot & ISF Club</h3>
                  </div>
                  <span className="activity-date">Jun 2024 - Present</span>
                </div>
                <img src="/avatar.png" alt="Aryan Anand - community lead activity" className="activity-avatar" width="80" height="80" />
              </div>
              <div className="activity-body">
                <p>
                  Built hardware projects using EV3, Arduino, and Raspberry Pi, and hosted the CodeSrijan Hackathon.
                </p>
              </div>
            </article>
          </div>

          <div className="beyond-right">
            <div className="coding-pill">CODING</div>
            <article className="coding-card brut-box">
              <div className="coding-item">
                <Trophy size={20} />
                <div>
                  <h4>Joint Secretary, IETE Student’s Forum</h4>
                  <p>Organizing campus tech events and student initiatives.</p>
                </div>
              </div>

              <div className="coding-item">
                <Star size={20} />
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

              <div className="coding-item">
                <Star size={20} />
                <div>
                  <h4>Oracle Certified AI Foundations Associate</h4>
                  <p>Completed Oracle's AI Foundations certification in 2025.</p>
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
