import { render, waitFor, within } from '@testing-library/react'; // Import testing tools
import EventList from '../components/EventList'; // Import the component to test
import { getEvents } from '../api'; // Import function to get events
import App from "../App"; // Import App component

describe('<EventList /> component', () => { // Group tests for EventList component
  let EventListComponent; // Declare variable to hold rendered component

  test('has an element with "list" role', () => { // Test for list element
    EventListComponent = render(<EventList events={[]} />); // Render component with empty events
    expect(EventListComponent.queryByRole("list")).toBeInTheDocument(); // Check if list exists
  });

  test('renders correct number of events', async () => { // Test event rendering
    const allEvents = await getEvents(); // Get all events
    EventListComponent = render(<EventList events={allEvents} />); // Render with events
    expect(EventListComponent.getAllByRole("listitem")).toHaveLength(allEvents.length); // Check item count
  });
});

describe('<EventList /> integration', () => { // Group integration tests
  test('renders a list of 32 events when the app is mounted and rendered', async () => { // Test full app rendering
    const AppComponent = render(<App />); // Render entire app
    const AppDOM = AppComponent.container.firstChild; // Get app's DOM
    const EventListDOM = AppDOM.querySelector('#event-list'); // Find event list in DOM

    await waitFor(() => { // Wait for async operations
      const EventListItems = within(EventListDOM).queryAllByRole('listitem'); // Get list items
      expect(EventListItems.length).toBe(32); // Check for 32 items
    });
  });
});