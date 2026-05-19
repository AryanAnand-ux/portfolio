import { act, fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Navbar from './Navbar';

describe('Navbar', () => {
  const observers = [];

  beforeEach(() => {
    observers.length = 0;

    class MockIntersectionObserver {
      constructor(callback) {
        this.callback = callback;
        observers.push(this);
      }
      observe = vi.fn();
      disconnect = vi.fn();
    }

    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      cb();
      return 1;
    });
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true, configurable: true });
    ['projects', 'skills', 'education', 'beyond-code', 'contact'].forEach((id) => {
      const section = document.createElement('section');
      section.id = id;
      document.body.appendChild(section);
    });
  });

  afterEach(() => {
    document.body.innerHTML = '';
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('marks a nav item active when section intersects', () => {
    render(<Navbar />);

    const projectsSection = document.getElementById('projects');
    act(() => {
      observers[0].callback([{ isIntersecting: true, target: projectsSection }]);
    });

    const projectsLink = screen.getByRole('link', { name: 'Projects' });
    expect(projectsLink.className).toContain('active');
  });

  it('opens mobile menu and closes it with Escape', () => {
    render(<Navbar />);

    const toggle = screen.getByLabelText('Toggle navigation menu');
    fireEvent.click(toggle);

    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(document.body.style.overflow).toBe('hidden');

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(document.body.style.overflow).toBe('');
  });

  it('applies scrolled class after passing scroll threshold', () => {
    render(<Navbar />);

    const nav = screen.getByRole('navigation');

    act(() => {
      window.scrollY = 100;
      fireEvent.scroll(window);
    });
    expect(nav.className).toContain('scrolled');
  });
});
