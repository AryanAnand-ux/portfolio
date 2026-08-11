import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Certificates from '../components/Certificates';
import '../components/Certificates.css';
import './DetailPage.css';

export default function CertificatesPage() {
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
        <h1>Certifications</h1>
        <p>Professional credentials, achievements, and recognitions.</p>
      </header>

      <div className="detail-content">
        <Certificates isDetailPage={true} />
      </div>
    </div>
  );
}
