import { render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CitySearch from '../components/CitySearch';
import App from '../App';
import { extractLocations, getEvents } from '../api';

describe('<CitySearch /> component', () => {
  let CitySearchComponent;
  beforeEach(() => {
    CitySearchComponent = render(<CitySearch allLocations={[]}/>);
  });

  test('renders text input', () => { // Test for text input rendering
    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    expect(cityTextBox).toBeInTheDocument(); // Check if textbox exists
    expect(cityTextBox).toHaveClass('city'); // Check if it has 'city' class
  });

  test('suggestions list is hidden by default', () => { // Test for hidden suggestions
    const suggestionList = CitySearchComponent.queryByRole('list');
    expect(suggestionList).not.toBeInTheDocument(); // Check if list is not in document
  });

  test('renders a list of suggestions when city textbox gains focus', async () => { // Test focus behavior
    const user = userEvent.setup();
    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    await user.click(cityTextBox); // Simulate user click
    const suggestionList = CitySearchComponent.queryByRole('list');
    expect(suggestionList).toBeInTheDocument(); // Check if list appears
    expect(suggestionList).toHaveClass('suggestions'); // Check if it has 'suggestions' class
  });

  test('renders the suggestion text in the textbox upon clicking on the suggestion', async () => {
    const user = userEvent.setup();
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    CitySearchComponent.rerender(<CitySearch
      allLocations={allLocations}
      setCurrentCity={() => { }}
    />);

    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    await user.type(cityTextBox, "Berlin");

    // the suggestion's textContent look like this: "Berlin, Germany"
    const BerlinGermanySuggestion = CitySearchComponent.queryAllByRole('listitem')[0];

    await user.click(BerlinGermanySuggestion);

    expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
  });
  
}); 


describe('<CitySearch /> integration', () => {
  test('renders suggestions list when the app is rendered.', async () => {
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    const CitySearchDOM = AppDOM.querySelector('#city-search');
    const cityTextBox = within(CitySearchDOM).queryByRole('textbox');
    await user.click(cityTextBox);

    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);

    const suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem');
    expect(suggestionListItems.length).toBe(allLocations.length + 1);
 });
});