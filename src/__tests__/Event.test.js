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
    render(<Event event={allEvents[0]} />);

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
    
    // Check if description is present
    const descriptionElement = screen.getByText('About event:');
    expect(descriptionElement).toBeInTheDocument();
    expect(descriptionElement.nextElementSibling).toBeInTheDocument();
    expect(descriptionElement.nextElementSibling.tagName.toLowerCase()).toBe('p');

    // Test hiding details
    fireEvent.click(screen.getByText('Hide Details'));
    expect(screen.getByText('Show Details')).toBeInTheDocument();
    expect(screen.queryByText('About event:')).not.toBeInTheDocument();
  });
});