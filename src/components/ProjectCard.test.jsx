import { render, screen } from '@testing-library/react';
import ProjectCard from './ProjectCard';

describe('ProjectCard', () => {
  const baseProps = {
    title: 'Demo Project',
    description: 'Project description',
    tech: ['React', 'Vite'],
    layoutClass: 'bento-third',
  };

  it('renders full project metadata including optional links/details', () => {
    render(
      <ProjectCard
        {...baseProps}
        details={['Fast', 'Accessible']}
        projectLink="https://example.com/live"
        github="https://github.com/example/repo"
      />
    );

    expect(screen.getByText('Demo Project')).toBeInTheDocument();
    expect(screen.getByText('Project description')).toBeInTheDocument();
    expect(screen.getByText('Fast')).toBeInTheDocument();
    expect(screen.getByText('Accessible')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Vite')).toBeInTheDocument();
    expect(screen.getByLabelText('Open live demo of Demo Project')).toHaveAttribute('href', 'https://example.com/live');
    expect(screen.getByLabelText('View Demo Project source code on GitHub')).toHaveAttribute('href', 'https://github.com/example/repo');
  });

  it('omits optional sections when props are not provided', () => {
    render(<ProjectCard {...baseProps} />);

    expect(screen.queryByText('live project')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('View Demo Project source code on GitHub')).not.toBeInTheDocument();
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });
});
