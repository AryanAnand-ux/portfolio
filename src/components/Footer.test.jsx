import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Footer from './Footer';

describe('Footer Component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    sessionStorage.clear();
  });

  it('renders footer social links and copyright', () => {
    render(<Footer />);
    expect(screen.getByLabelText('GitHub')).toBeInTheDocument();
    expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument();
    expect(screen.getByText(/Aryan Anand/i)).toBeInTheDocument();
  });

  it('fetches and displays the visitor count', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve({ key: 'aryananand_portfolio', value: 42 }),
    });

    render(<Footer />);

    await waitFor(() => {
      expect(screen.getByText('42')).toBeInTheDocument();
    });
  });
});
