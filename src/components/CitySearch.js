import { useState, useEffect } from "react"; // Import useState hook from React

const CitySearch = ({ allLocations, setCurrentCity }) => { // Define CitySearch component, accepting allLocations prop
  const [showSuggestions, setShowSuggestions] = useState(false); // State for showing/hiding suggestions
  const [query, setQuery] = useState(""); // State for search query
  const [suggestions, setSuggestions] = useState([]); // State for suggestion list

  const handleInputChanged = (event) => { // Function to handle input changes
    const value = event.target.value; // Get input value
    const filteredLocations = allLocations ? allLocations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1; // Case-insensitive filtering
    }) : [];
    setQuery(value); // Update query state
    setSuggestions(filteredLocations); // Update suggestions state
  };

  const handleItemClicked = (event) => {
    const value = event.target.textContent;
    setQuery(value);
    setShowSuggestions(false);
    setCurrentCity(value);
  };

  useEffect(() => {
    setSuggestions(allLocations);
  }, [`${allLocations}`]);



  return (
    <div id="city-search">
      <input
        type="text"
        className="city"
        placeholder="Search for a city"
        value={query}
        onFocus={() => setShowSuggestions(true)}
        onChange={handleInputChanged}
      />
      {showSuggestions ?
        <ul className="suggestions">
          {suggestions.map((suggestion) => {
            return <li onClick={handleItemClicked} key={suggestion}>{suggestion}</li>
          })}
          <li key='See all cities' onClick={handleItemClicked}>
            <b>See all cities</b>
          </li>
        </ul>
        : null
      }
    </div>
 )
}

export default CitySearch; // Export the CitySearch component