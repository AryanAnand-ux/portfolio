import { Link } from 'react-router-dom';
import { Award, ExternalLink, FileText } from 'lucide-react';
import Shuffle from './Shuffle';
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
            <h2 className="section-title"><Shuffle tag="span" text="Certifications" triggerOnHover={true} duration={2.5} /></h2>
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
                  <a
                    href={c.file || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cert-thumb cert-thumb-link"
                    style={{ borderColor: palette.accent }}
                    aria-label={`Open ${c.title} certificate PDF`}
                  >
                    {c.thumbnail ? (
                      <img src={c.thumbnail} alt={`${c.title} thumbnail`} />
                    ) : (
                      <div className="pdf-certificate-badge" style={{ background: `linear-gradient(135deg, ${palette.bg}, #ffffff)` }}>
                        <div className="cert-badge-top">
                          <Award size={26} className="cert-award-icon" style={{ color: palette.accent }} />
                          <span className="cert-doc-type">
                            <FileText size={12} /> OFFICIAL PDF
                          </span>
                        </div>
                        <div className="cert-badge-bottom">
                          <span className="cert-click-hint">Click to Preview</span>
                          <ExternalLink size={13} className="cert-ext-icon" />
                        </div>
                      </div>
                    )}
                  </a>

                  <div className="cert-body">
                    <h3 className="cert-title">{c.title}</h3>
                    <div className="cert-issuer">{c.issuer}</div>

                    <div className="cert-meta">
                      <span className="tag date">{c.date}</span>
                    </div>

                    <div className="cert-actions">
                      {c.file ? (
                        <a href={c.file} target="_blank" rel="noopener noreferrer" className="brut-btn">
                          View PDF
                        </a>
                      ) : (
                        <a href="/certificate.html" target="_blank" rel="noopener noreferrer" className="brut-btn">
                          Preview
                        </a>
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
