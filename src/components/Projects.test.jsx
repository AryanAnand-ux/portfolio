import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Projects from './Projects';
import { projectsData } from '../data/projects';

describe('Projects Slider Component', () => {
  it('renders the projects section with header and slider track', () => {
    render(
      <BrowserRouter>
        <Projects />
      </BrowserRouter>
    );
    
    // Check header elements
    expect(screen.getByRole('heading', { name: /Projects/i })).toBeInTheDocument();
    expect(screen.getByText(/Building intelligent systems and robust architectures/i)).toBeInTheDocument();
    
    // Check navigation buttons are rendered
    expect(screen.getByRole('button', { name: /Previous project/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Next project/i })).toBeInTheDocument();
    
    // Check indicators are rendered
    const indicators = screen.getAllByRole('button', { name: /Go to project/i });
    expect(indicators.length).toBeGreaterThan(0);
  });

  it('initially makes the middle project active and updates classes on navigation click', () => {
    const { container } = render(
      <BrowserRouter>
        <Projects />
      </BrowserRouter>
    );
    
    const mid = Math.floor(projectsData.length / 2);
    const cards = container.querySelectorAll('.slider-card');
    // Middle card is active initially
    expect(cards[mid].className).toContain('active');
    expect(cards[mid + 1].className).toContain('right-1');
    expect(cards[mid - 1].className).toContain('left-1');
    
    // Click Next button
    const nextBtn = screen.getByRole('button', { name: /Next project/i });
    fireEvent.click(nextBtn);
    
    // The next card should now be active
    const nextMid = (mid + 1) % projectsData.length;
    expect(cards[mid].className).toContain('left-1');
    expect(cards[nextMid].className).toContain('active');
  });

  it('updates the active slide when clicking an indicator dot', () => {
    const { container } = render(
      <BrowserRouter>
        <Projects />
      </BrowserRouter>
    );
    const cards = container.querySelectorAll('.slider-card');
    
    // Click the first indicator (index 0)
    const indicators = screen.getAllByRole('button', { name: /Go to project/i });
    fireEvent.click(indicators[0]);
    
    // The first card should now be active
    expect(cards[0].className).toContain('active');
  });

  it('updates the active slide when clicking a non-active background card', () => {
    const { container } = render(
      <BrowserRouter>
        <Projects />
      </BrowserRouter>
    );
    const cards = container.querySelectorAll('.slider-card');
    
    // The second card (index 1) is left-1 (not active). Let's click it.
    fireEvent.click(cards[1]);
    
    // The second card should now become active
    expect(cards[1].className).toContain('active');
  });

  it('supports keyboard ArrowLeft and ArrowRight navigation when slider is focused', () => {
    const { container } = render(
      <BrowserRouter>
        <Projects />
      </BrowserRouter>
    );
    const mid = Math.floor(projectsData.length / 2);
    const cards = container.querySelectorAll('.slider-card');
    const sliderContainer = screen.getByLabelText('Projects slider');

    // Focus slider and press ArrowRight (from active index mid)
    sliderContainer.focus();
    fireEvent.keyDown(sliderContainer, { key: 'ArrowRight', code: 'ArrowRight' });

    // Next card should be active
    expect(cards[mid + 1].className).toContain('active');

    // Press ArrowLeft
    fireEvent.keyDown(sliderContainer, { key: 'ArrowLeft', code: 'ArrowLeft' });

    // Middle card should be active again
    expect(cards[mid].className).toContain('active');
  });
});
