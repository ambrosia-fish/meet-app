import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Event from '../components/Event';
import { getEvents } from '../api';

describe('Event Component', () => {
  let allEvents;

  beforeAll(async () => {
    allEvents = await getEvents();
  });

  test('renders event details correctly and handles user interactions', () => {
    const { rerender } = render(<Event event={allEvents[0]} />);

    // Test for event title
    expect(screen.getByText(allEvents[0].summary)).toBeInTheDocument();

    // Test for event start time
    expect(screen.getByText(allEvents[0].created)).toBeInTheDocument();

    // Test for event location
    expect(screen.getByText(allEvents[0].location)).toBeInTheDocument();

    // Test for "Show Details" button
    const showDetailsButton = screen.getByText('Show Details');
    expect(showDetailsButton).toBeInTheDocument();

    // Test button click and additional details display
    fireEvent.click(showDetailsButton);
    expect(screen.getByText('Hide Details')).toBeInTheDocument();
    
    // Check if additional details are displayed
    if (allEvents[0].description) {
      expect(screen.getByText(allEvents[0].description)).toBeInTheDocument();
    }
    
    // Test hiding details
    fireEvent.click(screen.getByText('Hide Details'));
    expect(screen.getByText('Show Details')).toBeInTheDocument();
  });
});