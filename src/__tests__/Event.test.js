import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Event from '../components/Event';
import { getEvents } from '../api';

describe('<Event /> component', () => {
  let EventComponent;
  let allEvents;

  beforeAll(async () => {
    allEvents = await getEvents();
  });

  beforeEach(() => {
    EventComponent = render(<Event event={allEvents[0]} />);
  });

  test('renders event title', () => {
    const eventTitle = EventComponent.queryByText(allEvents[0].summary);
    expect(eventTitle).toBeInTheDocument();
  });

  test('renders event start time', () => {
    const eventStartTime = EventComponent.queryByText(allEvents[0].created);
    expect(eventStartTime).toBeInTheDocument();
  });

  test('renders event location', () => {
    const eventLocation = EventComponent.queryByText(allEvents[0].location);
    expect(eventLocation).toBeInTheDocument();
  });

  test('renders show details button', () => {
    const detailsButton = EventComponent.queryByRole('button', { name: 'Show Details' });
    expect(detailsButton).toBeInTheDocument();
  });

  test('event details are hidden by default', () => {
    const eventDetails = EventComponent.queryByTestId('event-details');
    expect(eventDetails).not.toBeInTheDocument();
  });

  test('shows details when the show details button is clicked', async () => {
    const user = userEvent.setup();
    const detailsButton = EventComponent.getByRole('button', { name: 'Show Details' });
    await user.click(detailsButton);
    const eventDetails = EventComponent.getByTestId('event-details');
    expect(eventDetails).toBeInTheDocument();
  });

  test('hides details when the hide details button is clicked', async () => {
    const user = userEvent.setup();
    const showDetailsButton = EventComponent.getByRole('button', { name: 'Show Details' });
    await user.click(showDetailsButton);
    const hideDetailsButton = EventComponent.getByRole('button', { name: 'Hide Details' });
    await user.click(hideDetailsButton);
    const eventDetails = EventComponent.queryByTestId('event-details');
    expect(eventDetails).not.toBeInTheDocument();
  });
});