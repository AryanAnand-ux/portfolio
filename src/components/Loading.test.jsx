import { act, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Loading from './Loading';

describe('Loading', () => {
  const FRAME_TIME_MS = 1100;
  let now = 0;

  beforeEach(() => {
    now = 0;
    vi.useFakeTimers();
    vi.spyOn(performance, 'now').mockImplementation(() => now);
    vi.stubGlobal('requestAnimationFrame', (cb) => setTimeout(() => {
      now += FRAME_TIME_MS;
      cb(now);
      return now;
    }, 0));
    vi.stubGlobal('cancelAnimationFrame', (id) => clearTimeout(id));
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('does not render when loading is already complete', () => {
    render(<Loading isComplete onComplete={vi.fn()} />);
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('calls onComplete after animation reaches 100%', () => {
    const onComplete = vi.fn();
    render(<Loading isComplete={false} onComplete={onComplete} />);

    act(() => {
      vi.runAllTimers();
    });

    expect(onComplete).toHaveBeenCalledTimes(1);
  });
});
