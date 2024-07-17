import { useState } from "react";

const CitySearch = ({ allLocations, setCurrentCity }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    const filteredLocations = allLocations ? allLocations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    }) : [];

    setQuery(value);
    setSuggestions(filteredLocations);
    setShowSuggestions(true);
  };

  const handleItemClicked = (suggestion) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    setCurrentCity(suggestion);
  };

  return (
    <div id="city-search">
      <input
        type="text"
        className="city"
        placeholder="Search for a city"
        value={query}
        onChange={handleInputChanged}
      />
      {showSuggestions && (
        <ul className="suggestions">
          {suggestions.map((suggestion) => (
            <li key={suggestion} onClick={() => handleItemClicked(suggestion)}>{suggestion}</li>
          ))}
          <li key='See all cities' onClick={() => handleItemClicked("all")}>
            <b>See all cities</b>
          </li>
        </ul>
      )}
    </div>
  )
}

export default CitySearch;