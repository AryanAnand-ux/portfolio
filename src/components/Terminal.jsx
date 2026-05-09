import React, { useState, useRef, useEffect } from 'react';
import './Terminal.css';
import { projectsData } from '../data/projects';

const initialLines = [
  'AryanOS v1.0.0 (tty1)',
  'Type "help" to see available commands.',
  
];

const Terminal = () => {
  const [lines, setLines] = useState(initialLines);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [histIndex, setHistIndex] = useState(-1);
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

  const runCommand = (cmdRaw) => {
    const cmd = cmdRaw.trim();
    if (!cmd) return;

    if (cmd === 'help') {
      setLines((l) => [...l.slice(0, -1), 'Available commands: whoami, skills, projects, clear, sudo', 'Fun commands: game, guess, rps', 'guest@aryan:~$ ']);
      return;
    }

    if (cmd === 'whoami') {
      setLines((l) => [...l.slice(0, -1), 'Aryan Anand | 2nd Year B.Tech CSE @ JUET Guna', 'Status: AI Engineer & FULL_STACK_DEVELOPER()', 'Email: aryan.anand1806@gmail.com', 'guest@aryan:~$ ']);
      return;
    }

    if (cmd === 'skills') {
      setLines((l) => [...l.slice(0, -1), '► React, Node.js, FastAPI, Python, C/C++', '► AI/ML: Transformers, LLMs, Fuzzy Logic', '► Tools: Git, Docker, Postman', 'guest@aryan:~$ ']);
      return;
    }

    if (cmd === 'contact') {
      setLines((l) => [...l.slice(0, -1), 'Email: aryan.anand1806@gmail.com', 'GitHub: https://github.com/AryanAnand-ux', 'LinkedIn: https://www.linkedin.com/in/aryananand-ux', 'guest@aryan:~$ ']);
      return;
    }

    if (cmd === 'resume') {
      setLines((l) => [...l.slice(0, -1), 'Resume: /resume.pdf', 'guest@aryan:~$ ']);
      return;
    }

    if (cmd === 'projects') {
      const titles = projectsData.map((p) => `► ${p.title}`);
      setLines((l) => [...l.slice(0, -1), ...titles, 'guest@aryan:~$ ']);
      return;
    }

    if (cmd === 'clear') {
      setLines(['guest@aryan:~$ ']);
      return;
    }

    if (cmd.startsWith('sudo')) {
      setLines((l) => [...l.slice(0, -1), 'Nice try. This incident will be reported. 🚨', 'guest@aryan:~$ ']);
      return;
    }

    if (cmd === 'game' || cmd === 'guess' || cmd === 'rps') {
      setLines((l) => [...l.slice(0, -1), `Fun command '${cmd}' not implemented in this mock. Try 'help'.`, 'guest@aryan:~$ ']);
      return;
    }

    setLines((l) => [...l.slice(0, -1), `bash: ${cmd}: command not found`, 'guest@aryan:~$ ']);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = input;
    if (!value) return;
    setLines((l) => [...l.slice(0, -1), `guest@aryan:~$ ${value}`]);
    runCommand(value);
    setHistory((h) => [value, ...h].slice(0, 50));
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
        {lines.map((ln, idx) => (
          <div key={idx} className={`terminal-line ${ln.startsWith('guest@aryan') ? 'prompt-line' : ''}`}>{ln}</div>
        ))}
        <form onSubmit={handleSubmit} className="terminal-input-form">
          <label className="prompt">guest@aryan:~$</label>
          <input
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
