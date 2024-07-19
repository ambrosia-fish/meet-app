import { useState } from "react";

const CitySearch = ({ allLocations }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    const filteredLocations = allLocations ? allLocations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    }) : [];

    setQuery(value);
    setSuggestions(filteredLocations);
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
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((suggestion) => (
            <li key={suggestion}>{suggestion}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default CitySearch;