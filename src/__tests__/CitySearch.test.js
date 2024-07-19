import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CitySearch from '../components/CitySearch';
import { extractLocations, getEvents } from '../api';

describe('<CitySearch /> component', () => {
  let CitySearchComponent;
  let allLocations;

  beforeEach(async () => {
    const allEvents = await getEvents();
    allLocations = extractLocations(allEvents);
    CitySearchComponent = render(<CitySearch allLocations={allLocations} setCurrentCity={jest.fn()} />);
  });

  test('shows upcoming events from all cities when user hasn\'t searched', () => {
    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    expect(cityTextBox.value).toBe('');
    const eventList = CitySearchComponent.queryByRole('list');
    expect(eventList).not.toBeInTheDocument();
  });

  test('shows a list of suggestions when user searches for a city', async () => {
    const user = userEvent.setup();
    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    await user.type(cityTextBox, "Berlin");

    const suggestionList = CitySearchComponent.queryByRole('list');
    expect(suggestionList).toBeInTheDocument();
    expect(suggestionList).toHaveClass('suggestions');

    const suggestionListItems = CitySearchComponent.queryAllByRole('listitem');
    expect(suggestionListItems.length).toBeGreaterThan(0);
  });
});
