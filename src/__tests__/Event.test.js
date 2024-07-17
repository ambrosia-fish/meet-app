import React from 'react';
import { render, within } from '@testing-library/react';
import Event from '../components/Event';
import { getEvents } from '../api';

describe('Event Component', () => {
  let allEvents;

  beforeAll(async () => {
    allEvents = await getEvents();
  });

  test('renders event details correctly', () => {
    const { container, queryByText } = render(<Event event={allEvents[0]} />);

    // Test for event title
    const eventTitle = queryByText(allEvents[0].summary);
    expect(eventTitle).toBeInTheDocument();

    // Test for event start time
    const eventStartTime = queryByText(allEvents[0].created);
    expect(eventStartTime).toBeInTheDocument();

    // Test for event location
    const eventLocation = queryByText(allEvents[0].location);
    expect(eventLocation).toBeInTheDocument();

    // Test for "Show Details" button
    const showDetailsButton = queryByText('Show Details');
    expect(showDetailsButton).toBeInTheDocument();
  });
});