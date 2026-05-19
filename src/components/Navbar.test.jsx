import { fireEvent, render, screen } from '@testing-library/react';
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
    document.body.innerHTML = `
      <section id="projects"></section>
      <section id="skills"></section>
      <section id="education"></section>
      <section id="beyond-code"></section>
      <section id="contact"></section>
    `;
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('marks a nav item active when section intersects', () => {
    render(<Navbar />);

    const projectsSection = document.getElementById('projects');
    observers[0].callback([{ isIntersecting: true, target: projectsSection }]);

    const projectsLink = screen.getByRole('link', { name: 'Projects' });
    expect(projectsLink.className).toContain('active');
  });

  it('opens mobile menu and closes it with Escape', () => {
    render(<Navbar />);

    const toggle = screen.getByRole('button', { name: /toggle navigation menu/i });
    fireEvent.click(toggle);

    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(document.body.style.overflow).toBe('hidden');

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(document.body.style.overflow).toBe('');
  });

  it('applies and removes hidden class based on scroll direction', () => {
    render(<Navbar />);

    const nav = screen.getByRole('navigation');

    window.scrollY = 100;
    fireEvent.scroll(window);
    expect(nav.className).toContain('scrolled');
    expect(nav.className).toContain('navbar-hidden');

    window.scrollY = 80;
    fireEvent.scroll(window);
    expect(nav.className).toContain('scrolled');
    expect(nav.className).not.toContain('navbar-hidden');
  });
});
