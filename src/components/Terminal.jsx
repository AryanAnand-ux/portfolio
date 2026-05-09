import { useState, useRef, useEffect } from 'react';
import './Terminal.css';
import { projectsData } from '../data/projects';
import { arsenalData } from '../data/skills';

const PROMPT = 'guest@aryan:~$ ';

const initialLines = [
  'AryanOS v1.0.0 (tty1)',
  'Type "help" to see available commands.',
];

const Terminal = () => {
  const [lines, setLines] = useState(initialLines);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [histIndex, setHistIndex] = useState(-1);
  const [gameMode, setGameMode] = useState(null);
  const guessTarget = useRef(null);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines]);

  const writeLines = (...nextLines) => {
    setLines((current) => [...current, ...nextLines]);
  };

  const handleGuess = (cmd) => {
    const guess = Number(cmd);

    if (!Number.isInteger(guess)) {
      writeLines('Enter a number between 1 and 10.');
      return;
    }

    if (guess < guessTarget.current) {
      writeLines('Too low.');
      return;
    }

    if (guess > guessTarget.current) {
      writeLines('Too high.');
      return;
    }

    setGameMode(null);
    guessTarget.current = null;
    writeLines('Correct! You guessed the number.');
  };

  const handleRps = (cmd) => {
    const choices = ['rock', 'paper', 'scissors'];

    if (!choices.includes(cmd)) {
      writeLines('Type rock, paper, or scissors.');
      return;
    }

    const bot = choices[Math.floor(Math.random() * choices.length)];
    const userWins =
      (cmd === 'rock' && bot === 'scissors') ||
      (cmd === 'paper' && bot === 'rock') ||
      (cmd === 'scissors' && bot === 'paper');
    const result = cmd === bot ? 'Draw.' : userWins ? 'You win.' : 'Bot wins.';

    setGameMode(null);
    writeLines(`You chose: ${cmd}`, `Bot chose: ${bot}`, result);
  };

  const runCommand = (cmdRaw) => {
    const cmd = cmdRaw.trim().toLowerCase();
    if (!cmd) return;

    if (gameMode === 'guess') {
      handleGuess(cmd);
      return;
    }

    if (gameMode === 'rps') {
      handleRps(cmd);
      return;
    }

    if (cmd === 'help') {
      writeLines(
        'Available commands: whoami, skills, projects, contact, resume, clear, sudo',
        'Fun commands: game, guess, rps'
      );
      return;
    }

    if (cmd === 'whoami') {
      writeLines(
        'Aryan Anand | 2nd Year B.Tech CSE @ JUET Guna',
        'Status: AI Engineer & Full Stack Developer',
        'Email: aryan.anand1806@gmail.com'
      );
      return;
    }

    if (cmd === 'skills') {
      writeLines(...arsenalData.map((group) => `> ${group.title}: ${group.tags.join(', ')}`));
      return;
    }

    if (cmd === 'projects') {
      writeLines(...projectsData.map((project, index) => `${index + 1}. ${project.title}`));
      return;
    }

    if (cmd === 'contact') {
      writeLines(
        'Email: aryan.anand1806@gmail.com',
        'GitHub: https://github.com/AryanAnand-ux',
        'LinkedIn: https://www.linkedin.com/in/aryananand-ux'
      );
      return;
    }

    if (cmd === 'resume') {
      writeLines('Resume: /resume.pdf');
      return;
    }

    if (cmd === 'clear') {
      setGameMode(null);
      guessTarget.current = null;
      setLines([]);
      return;
    }

    if (cmd.startsWith('sudo')) {
      writeLines('Nice try. This incident will be reported.');
      return;
    }

    if (cmd === 'game') {
      writeLines(
        'Available games:',
        '- guess -> Number Guessing Game',
        '- rps -> Rock Paper Scissors'
      );
      return;
    }

    if (cmd === 'guess') {
      guessTarget.current = Math.floor(Math.random() * 10) + 1;
      setGameMode('guess');
      writeLines('I picked a number between 1 and 10. Try to guess!');
      return;
    }

    if (cmd === 'rps') {
      setGameMode('rps');
      writeLines('Type rock, paper, or scissors.');
      return;
    }

    writeLines(`bash: ${cmd}: command not found`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = input.trim();
    if (!value) return;

    setLines((current) => [...current, `${PROMPT}${value}`]);
    runCommand(value);
    setHistory((current) => [value, ...current].slice(0, 50));
    setHistIndex(-1);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const nextIndex = Math.min(history.length - 1, histIndex + 1);
      if (history[nextIndex]) {
        setInput(history[nextIndex]);
        setHistIndex(nextIndex);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = Math.max(-1, histIndex - 1);
      setHistIndex(nextIndex);
      setInput(nextIndex === -1 ? '' : history[nextIndex]);
    }
  };

  return (
    <div className="terminal-mock" role="group" aria-label="terminal">
      <div className="terminal-header">
        <span className="dot dot-red" />
        <span className="dot dot-yellow" />
        <span className="dot dot-green" />
      </div>
      <div className="terminal-body" ref={containerRef}>
        {lines.map((line, index) => (
          <div key={`${line}-${index}`} className={`terminal-line ${line.startsWith(PROMPT.trim()) ? 'prompt-line' : ''}`}>
            {line}
          </div>
        ))}
        <form onSubmit={handleSubmit} className="terminal-input-form">
          <label className="prompt" htmlFor="terminal-command-input">{PROMPT.trim()}</label>
          <input
            id="terminal-command-input"
            ref={inputRef}
            className="terminal-input"
            aria-label="Terminal command input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            spellCheck="false"
          />
        </form>
      </div>
    </div>
  );
};

export default Terminal;
