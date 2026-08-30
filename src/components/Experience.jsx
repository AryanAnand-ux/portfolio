import { Link } from 'react-router-dom';
import Shuffle from './Shuffle';
import './Experience.css';

const Experience = ({ isDetailPage = false }) => (
  <section id="experience" className="section">
    <div className="container">
      <div className="experience-panel brut-box reveal">
        <div className="section-header-wrap experience-header">
          <h2 className="section-title experience-title">
            <Shuffle tag="span" text="Experience" triggerOnHover={true} duration={2.5} />
          </h2>

        </div>

        <div className="experience-grid">
          <article className="experience-card brut-box">
            <div className="experience-top">
              <div>
                <h3>AI/ML Intern, IOCL Mathura</h3>
                <p className="experience-meta">Summer Internship · In-Person · June 2026 - July 2026</p>
              </div>
              <span className="experience-badge">Full-time</span>
            </div>
            <ul>
              <li>Engineered a FastAPI and React application for real-time Heavy Kerosene Flash Point prediction using 41 DCS sensor readings.</li>
              <li>Resolved data leakage and overfitting using regularized linear models and cross-validation.</li>
              <li>Dockerized the stack and optimized SQL queries to significantly reduce memory usage.</li>
            </ul>
          </article>

          <article className="experience-card brut-box">
            <div className="experience-top">
              <div>
                <h3>Power BI Intern, Microsoft Elevate AICTE Program</h3>
                <p className="experience-meta">Remote · Feb 2026 - Mar 2026</p>
              </div>
              <span className="experience-badge">Internship</span>
            </div>
            <ul>
              <li>Built a Power BI dashboard to visualize historical global cybersecurity incidents.</li>
              <li>Cleaned and transformed large datasets to extract actionable security insights.</li>
              <li>Applied data analytics techniques during the 4-week Microsoft Elevate AICTE program.</li>
            </ul>
          </article>
        </div>

        {!isDetailPage && (
          <div className="view-all-container">
            <Link to="/experience" className="brut-btn view-all-btn">
              View All Experience
            </Link>
          </div>
        )}
      </div>
    </div>
  </section>
);

export default Experience;
