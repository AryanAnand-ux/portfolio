import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Projects from './Projects';

describe('Projects Slider Component', () => {
  it('renders the projects section with header and slider track', () => {
    render(<Projects />);
    
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
    const { container } = render(<Projects />);
    
    // Find all cards by matching the class
    const cards = container.querySelectorAll('.slider-card');
    // Middle card (index 2) is active initially
    expect(cards[2].className).toContain('active');
    expect(cards[3].className).toContain('right-1');
    expect(cards[1].className).toContain('left-1');
    
    // Click Next button
    const nextBtn = screen.getByRole('button', { name: /Next project/i });
    fireEvent.click(nextBtn);
    
    // The fourth card (index 3) should now be active
    expect(cards[2].className).toContain('left-1');
    expect(cards[3].className).toContain('active');
  });

  it('updates the active slide when clicking an indicator dot', () => {
    const { container } = render(<Projects />);
    const cards = container.querySelectorAll('.slider-card');
    
    // Click the first indicator (index 0)
    const indicators = screen.getAllByRole('button', { name: /Go to project/i });
    fireEvent.click(indicators[0]);
    
    // The first card should now be active
    expect(cards[0].className).toContain('active');
  });

  it('updates the active slide when clicking a non-active background card', () => {
    const { container } = render(<Projects />);
    const cards = container.querySelectorAll('.slider-card');
    
    // The second card (index 1) is left-1 (not active). Let's click it.
    fireEvent.click(cards[1]);
    
    // The second card should now become active
    expect(cards[1].className).toContain('active');
  });

  it('supports keyboard ArrowLeft and ArrowRight navigation when slider is focused', () => {
    const { container } = render(<Projects />);
    const cards = container.querySelectorAll('.slider-card');
    const sliderContainer = screen.getByLabelText('Projects slider');
    
    // Focus slider and press ArrowRight (from active index 2)
    sliderContainer.focus();
    fireEvent.keyDown(sliderContainer, { key: 'ArrowRight', code: 'ArrowRight' });
    
    // Third card (index 3) should be active
    expect(cards[3].className).toContain('active');
    
    // Press ArrowLeft
    fireEvent.keyDown(sliderContainer, { key: 'ArrowLeft', code: 'ArrowLeft' });
    
    // Middle card (index 2) should be active again
    expect(cards[2].className).toContain('active');
  });
});
