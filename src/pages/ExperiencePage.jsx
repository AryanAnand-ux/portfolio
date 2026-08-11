import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Briefcase, MapPin, Calendar } from 'lucide-react';
import './DetailPage.css';

const experiences = [
  {
    id: 'iocl',
    role: 'AI/ML Intern',
    company: 'IOCL Mathura',
    type: 'Summer Internship · In-Person',
    period: 'June 2026 – July 2026',
    badge: 'Full-time',
    badgeColor: '#00b4d8',
    highlights: [
      'Engineered a FastAPI and React application for real-time Heavy Kerosene Flash Point prediction using 41 DCS sensor readings.',
      'Resolved data leakage and overfitting using regularized linear models and cross-validation.',
      'Dockerized the stack and optimized SQL queries to significantly reduce memory usage.',
    ],
    skills: ['Python', 'FastAPI', 'React', 'Docker', 'Machine Learning', 'SQL'],
  },
  {
    id: 'microsoft',
    role: 'Power BI Intern',
    company: 'Microsoft Elevate AICTE Program',
    type: 'Remote',
    period: 'Feb 2026 – Mar 2026',
    badge: 'Internship',
    badgeColor: '#a855f7',
    highlights: [
      'Built a Power BI dashboard to visualize historical global cybersecurity incidents.',
      'Cleaned and transformed large datasets to extract actionable security insights.',
      'Applied data analytics techniques during the 4-week Microsoft Elevate AICTE program.',
    ],
    skills: ['Power BI', 'Data Analytics', 'DAX', 'Data Visualization'],
  },
];

export default function ExperiencePage() {
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
        <h1>Experience</h1>
        <p>My professional journey and hands-on internships.</p>
      </header>

      <div className="detail-content container">
        <div className="exp-timeline">
          {experiences.map((exp) => (
            <article key={exp.id} className="exp-detail-card brut-box">
              <div className="exp-detail-header">
                <div className="exp-detail-icon">
                  <Briefcase size={22} />
                </div>
                <div className="exp-detail-meta">
                  <h2 className="exp-detail-role">{exp.role}</h2>
                  <div className="exp-detail-company">{exp.company}</div>
                  <div className="exp-detail-info">
                    <span><MapPin size={13} /> {exp.type}</span>
                    <span><Calendar size={13} /> {exp.period}</span>
                  </div>
                </div>
                <span
                  className="exp-detail-badge"
                  style={{ background: exp.badgeColor }}
                >
                  {exp.badge}
                </span>
              </div>

              <ul className="exp-detail-list">
                {exp.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>

              <div className="exp-detail-skills">
                {exp.skills.map((s) => (
                  <span key={s} className="bento-pill">{s}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
