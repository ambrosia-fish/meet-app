import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CitySearch from '../components/CitySearch';
import { extractLocations, getEvents } from '../api';

describe('<CitySearch /> component', () => {
  let CitySearchComponent;
  let allLocations;
  let mockSetCurrentCity;

  beforeEach(async () => {
    const allEvents = await getEvents();
    allLocations = extractLocations(allEvents);
    mockSetCurrentCity = jest.fn();
    CitySearchComponent = render(<CitySearch allLocations={allLocations} setCurrentCity={mockSetCurrentCity} />);
  });

  test('renders text input', () => {
    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    expect(cityTextBox).toBeInTheDocument();
    expect(cityTextBox).toHaveClass('city');
  });

  test('suggestions list is hidden by default', () => {
    const suggestionList = CitySearchComponent.queryByRole('list');
    expect(suggestionList).not.toBeInTheDocument();
  });

  test('renders a list of suggestions when user types in city textbox', async () => {
    const user = userEvent.setup();
    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    await user.type(cityTextBox, "Berlin");

    const suggestionList = CitySearchComponent.queryByRole('list');
    expect(suggestionList).toBeInTheDocument();
    expect(suggestionList).toHaveClass('suggestions');
  });

  test('updates list of suggestions correctly when user types in city textbox', async () => {
    const user = userEvent.setup();
    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    await user.type(cityTextBox, "Berlin");

    const suggestions = allLocations ? allLocations.filter((location) => {
      return location.toUpperCase().indexOf(cityTextBox.value.toUpperCase()) > -1;
    }) : [];

    const suggestionListItems = CitySearchComponent.queryAllByRole('listitem');
    expect(suggestionListItems).toHaveLength(suggestions.length + 1);
    for (let i = 0; i < suggestions.length; i += 1) {
      expect(suggestionListItems[i].textContent).toBe(suggestions[i]);
    }
  });

  test('selecting a city from the suggestions list updates the query', async () => {
    const user = userEvent.setup();
    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    await user.type(cityTextBox, "Berlin");

    const suggestionListItems = CitySearchComponent.queryAllByRole('listitem');
    await user.click(suggestionListItems[0]);

    expect(cityTextBox.value).toBe(suggestionListItems[0].textContent);
    expect(CitySearchComponent.queryByRole('list')).not.toBeInTheDocument();
  });

  test('selecting "See all cities" option works correctly', async () => {
    const user = userEvent.setup();
    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    await user.type(cityTextBox, "Berlin");

    const seeAllCitiesItem = CitySearchComponent.queryAllByRole('listitem').pop();
    await user.click(seeAllCitiesItem);

    expect(cityTextBox.value).toBe("all");
    expect(CitySearchComponent.queryByRole('list')).not.toBeInTheDocument();
    expect(mockSetCurrentCity).toHaveBeenCalledWith("all");
  });

  test('handles the case when allLocations is null', async () => {
    const { rerender } = CitySearchComponent;
    
    rerender(<CitySearch allLocations={null} setCurrentCity={mockSetCurrentCity} />);
    
    const user = userEvent.setup();
    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    await user.type(cityTextBox, "Berlin");
    
    const suggestionList = CitySearchComponent.queryByRole('list');
    expect(suggestionList).toBeInTheDocument();
    const suggestionItems = CitySearchComponent.queryAllByRole('listitem');
    expect(suggestionItems).toHaveLength(1); // Only "See all cities" should be present
    expect(suggestionItems[0].textContent).toBe("See all cities");
  });
});