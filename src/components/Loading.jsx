import './Loading.css';

const Loading = ({ isComplete }) => {
  if (isComplete) return null;

  return (
    <div className="loading-overlay">
      <div className="loading-container">
        <div className="loading-scanlines"></div>
        <div className="loading-content">
          <h1 className="loading-title">LOADING...</h1>
          <div className="loading-bar-wrapper">
            <div className="loading-bar"></div>
          </div>
          <div className="loading-percent">82%</div>
        </div>
        <div className="loading-device">
          <div className="device-notch"></div>
          <div className="device-speaker"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
