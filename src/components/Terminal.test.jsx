import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Terminal from './Terminal';

const submitCommand = (input, value) => {
  fireEvent.change(input, { target: { value } });
  fireEvent.submit(input.closest('form'));
};

describe('Terminal', () => {
  it('renders initial boot lines and responds to basic commands', () => {
    render(<Terminal />);
    const input = screen.getByLabelText('Terminal command input');

    expect(screen.getByText('AryanOS v1.0.0 (tty1)')).toBeInTheDocument();
    expect(screen.getByText('Type "help" to see available commands.')).toBeInTheDocument();

    submitCommand(input, 'help');
    expect(screen.getByText(/Available commands:/)).toBeInTheDocument();

    submitCommand(input, 'unknown');
    expect(screen.getByText('bash: unknown: command not found')).toBeInTheDocument();
  });

  it('supports guess game flow and rock-paper-scissors', () => {
    const randomSpy = vi.spyOn(Math, 'random').mockReturnValueOnce(0.4).mockReturnValueOnce(0);
    render(<Terminal />);
    const input = screen.getByLabelText('Terminal command input');

    submitCommand(input, 'guess');
    expect(screen.getByText('I picked a number between 1 and 10. Try to guess!')).toBeInTheDocument();

    submitCommand(input, '3');
    expect(screen.getByText('Too low.')).toBeInTheDocument();

    submitCommand(input, '7');
    expect(screen.getByText('Too high.')).toBeInTheDocument();

    submitCommand(input, '5');
    expect(screen.getByText('Correct! You guessed the number.')).toBeInTheDocument();

    submitCommand(input, 'rps');
    submitCommand(input, 'paper');
    expect(screen.getByText('You chose: paper')).toBeInTheDocument();
    expect(screen.getByText('Bot chose: rock')).toBeInTheDocument();
    expect(screen.getByText('You win.')).toBeInTheDocument();

    randomSpy.mockRestore();
  });

  it('supports command history navigation with arrow keys', () => {
    render(<Terminal />);
    const input = screen.getByLabelText('Terminal command input');

    submitCommand(input, 'help');
    submitCommand(input, 'contact');

    fireEvent.keyDown(input, { key: 'ArrowUp' });
    expect(input).toHaveValue('contact');

    fireEvent.keyDown(input, { key: 'ArrowUp' });
    expect(input).toHaveValue('help');

    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(input).toHaveValue('contact');

    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(input).toHaveValue('');
  });
});
