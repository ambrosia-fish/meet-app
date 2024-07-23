// src/App.js

import CitySearch from './components/CitySearch'; // Import CitySearch component
import EventList from './components/EventList'; // Import EventList component
import NumberOfEvents from './components/NumberOfEvents'; // Import NumberOfEvents component
import { useEffect, useState } from 'react'; // Import React hooks
import { extractLocations, getEvents } from './api'; // Import utility functions

import './App.css'; // Import styles for the App

const App = () => {
  const [events, setEvents] = useState([]); // State for storing events, initially empty
  const [currentNOE, setCurrentNOE] = useState(32); // State for number of events, default 32
  const [allLocations, setAllLocations] = useState([]); // New state for all locations
  const [currentCity, setCurrentCity] = useState("See all cities");

  useEffect(() => {
    fetchData(); // Call fetchData when component mounts
  }, [currentCity]); // Empty dependency array means this runs once on mount

  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents = currentCity === "See all cities" ?
      allEvents :
      allEvents.filter(event => event.location === currentCity)
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  }

  return (
    <div className="App">
      <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity}/> // Pass allLocations to CitySearch
      <NumberOfEvents />
      <EventList events={events}/> // Pass events to EventList
    </div>
  );
}

export default App; // Export the App component