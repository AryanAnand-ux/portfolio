import './MarqueeStrip.css';

const MarqueeStrip = () => {
  const text = 'REACT - NODE - MONGODB - PYTHON - BUILDING REAL-WORLD PRODUCTS - AVAILABLE FOR INTERNSHIPS -';

  return (
    <section className="marquee-section" aria-label="Skills and availability ticker">
      <div className="marquee-bar brut-box">
        <div className="marquee-track">
          <span>{text}</span>
          <span>{text}</span>
          <span>{text}</span>
          <span>{text}</span>
        </div>
      </div>
    </section>
  );
};

export default MarqueeStrip;
