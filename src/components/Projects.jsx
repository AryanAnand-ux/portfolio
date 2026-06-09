import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProjectCard from './ProjectCard';
import { projectsData } from '../data/projects';
import './Projects.css';

const Projects = () => {
  // Start from the middle index of the projects list
  const [activeIndex, setActiveIndex] = useState(Math.floor(projectsData.length / 2));
  const sliderRef = useRef(null);
  const startX = useRef(0);
  const isDown = useRef(false);
  const lastScrollTime = useRef(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : projectsData.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < projectsData.length - 1 ? prev + 1 : 0));
  };

  // Keyboard navigation when slider is focused
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    }
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
    isDown.current = true;
  };

  const handleTouchMove = (e) => {
    if (!isDown.current) return;
    const currentX = e.touches[0].clientX;
    const diff = startX.current - currentX;
    const threshold = 75; // Swipe distance threshold to slide card
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
      // Update startX to the current position to allow smooth continuous swiping
      startX.current = currentX;
    }
  };

  const handleTouchEnd = () => {
    isDown.current = false;
  };

  // Mouse drag handlers for desktop swipe
  const handleMouseDown = (e) => {
    if (e.button !== 0) return; // Left click only
    startX.current = e.clientX;
    isDown.current = true;
  };

  const handleMouseMove = (e) => {
    if (!isDown.current) return;
    const currentX = e.clientX;
    const diff = startX.current - currentX;
    const threshold = 100; // Drag distance threshold to slide card
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
      // Update startX to the current position to allow smooth continuous dragging
      startX.current = currentX;
    }
  };

  const handleMouseUp = () => {
    isDown.current = false;
  };

  // Hook for mouse wheel scroll navigation
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleWheelEvent = (e) => {
      const now = Date.now();
      // Rate-limit wheel triggers to 400ms for smooth transitions
      if (now - lastScrollTime.current < 400) return;

      if (Math.abs(e.deltaY) > 15 || Math.abs(e.deltaX) > 15) {
        e.preventDefault();
        const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
        if (delta > 0) {
          handleNext();
        } else {
          handlePrev();
        }
        lastScrollTime.current = now;
      }
    };

    slider.addEventListener('wheel', handleWheelEvent, { passive: false });
    return () => {
      slider.removeEventListener('wheel', handleWheelEvent);
    };
  }, []);

  const handleCardClick = (index, e) => {
    if (index !== activeIndex) {
      e.preventDefault();
      e.stopPropagation();
      setActiveIndex(index);
    }
  };

  const getCardClass = (index) => {
    const total = projectsData.length;
    let diff = index - activeIndex;
    
    // Circular index calculation to ensure cards loop infinitely
    // keeping items balanced on both left and right sides
    const half = Math.floor(total / 2);
    while (diff > half) diff -= total;
    while (diff < -half) diff += total;

    if (diff === 0) return 'slider-card active';
    if (diff === -1) return 'slider-card left-1';
    if (diff === 1) return 'slider-card right-1';
    if (diff === -2) return 'slider-card left-2';
    if (diff === 2) return 'slider-card right-2';
    if (diff < -2) return 'slider-card left-far';
    if (diff > 2) return 'slider-card right-far';
    return 'slider-card';
  };

  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="projects-panel brut-box reveal">
          <div className="section-header-wrap projects-header">
            <h2 className="section-title projects-title">
              Projects
            </h2>
            <p className="projects-subtitle">
              Building intelligent systems and robust architectures.
            </p>
          </div>

          <div
            ref={sliderRef}
            className="projects-slider-container reveal"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            aria-label="Projects slider"
          >
            <div className="projects-slider-track">
              {projectsData.map((project, index) => {
                const cardClass = getCardClass(index);
                const isActive = index === activeIndex;
                return (
                  <div
                    key={project.id}
                    className={cardClass}
                    onClick={(e) => handleCardClick(index, e)}
                  >
                    {!isActive && <div className="slider-card-overlay" />}
                    <ProjectCard {...project} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Slider Controls */}
          <div className="slider-controls">
            <button
              onClick={handlePrev}
              className="brut-btn btn-small control-btn"
              aria-label="Previous project"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="slider-indicators">
              {projectsData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`indicator-dot ${index === activeIndex ? 'active' : ''}`}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="brut-btn btn-small control-btn"
              aria-label="Next project"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
