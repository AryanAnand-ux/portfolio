import { Link } from 'react-router-dom';
import './Certificates.css';
import { certificatesData } from '../data/certificates';

export default function Certificates({ isDetailPage = false }) {
  const cardPalettes = [
    { bg: '#fff2d9', border: '#2a2a2a', accent: '#ff9f1c' },
    { bg: '#e7f7ff', border: '#2a2a2a', accent: '#00b4d8' },
    { bg: '#f3e8ff', border: '#2a2a2a', accent: '#a855f7' },
    { bg: '#eaf7ea', border: '#2a2a2a', accent: '#2fb344' },
    { bg: '#ffe9ea', border: '#2a2a2a', accent: '#ef4444' },
    { bg: '#eef1ff', border: '#2a2a2a', accent: '#6366f1' },
  ];

  return (
    <section id="certificates" className="certificates section reveal">
      <div className="container">
        <div className="certificates-panel brut-box">
          <div className="section-header-wrap">
            <h2 className="section-title">Certifications</h2>
            <p className="section-subtitle">Professional credentials and achievements</p>
          </div>

          <div className="cert-grid">
            {(isDetailPage ? certificatesData : certificatesData.slice(0, 3)).map((c, index) => {
              const palette = cardPalettes[index % cardPalettes.length];

              return (
                <article
                  key={c.id}
                  className="cert-card project-card brut-box"
                  style={{
                    backgroundColor: palette.bg,
                    borderColor: palette.border,
                    boxShadow: `10px 10px 0 ${palette.border}`,
                  }}
                >
                  <div className="cert-thumb" style={{ borderColor: palette.accent }}>
                    {c.thumbnail ? (
                      <img src={c.thumbnail} alt={`${c.title} thumbnail`} />
                    ) : c.file ? (
                      <object
                        data={c.file}
                        type="application/pdf"
                        className="pdf-thumb"
                        aria-label={`${c.title} preview`}
                      >
                        <div className="thumb-empty" />
                      </object>
                    ) : (
                      <div className="thumb-empty" />
                    )}
                  </div>

                  <div className="cert-body">
                    <h3 className="cert-title">{c.title}</h3>
                    <div className="cert-issuer">{c.issuer}</div>

                    <div className="cert-meta">
                      <span className="tag date">{c.date}</span>
                    </div>

                    <div className="cert-actions">
                      {c.file ? (
                        <a href={c.file} target="_blank" rel="noopener noreferrer" className="brut-btn">View</a>
                      ) : (
                        <a href="/certificate.html" target="_blank" rel="noopener noreferrer" className="brut-btn">Add / Preview</a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {!isDetailPage && (
            <div className="view-all-container">
              <Link to="/certificates" className="brut-btn view-all-btn">
                View All Certifications
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
