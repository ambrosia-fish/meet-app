import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Event from '../components/Event';

describe('Event Component', () => {
  const mockEvent = {
    summary: 'Test Event',
    created: '2023-07-20T10:00:00Z',
    location: 'Test Location',
    description: 'Test Description'
  };

  test('event element is collapsed by default', () => {
    render(<Event event={mockEvent} />);
    expect(screen.getByText('Show Details')).toBeInTheDocument();
    expect(screen.queryByText('About event:')).not.toBeInTheDocument();
  });

  test('user can expand an event to see its details', () => {
    render(<Event event={mockEvent} />);
    fireEvent.click(screen.getByText('Show Details'));
    expect(screen.getByText('Hide Details')).toBeInTheDocument();
    expect(screen.getByText('About event:')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });
});