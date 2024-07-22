import React, { useEffect, useState } from 'react'; // Import React and necessary hooks
import CitySearch from './components/CitySearch'; // Import CitySearch component
import EventList from './components/EventList'; // Import EventList component
import NumberOfEvents from './components/NumberOfEvents'; // Import NumberOfEvents component
import { getEvents } from './api'; // Import function to fetch events
import './App.css'; // Import styles for the App

const App = () => { // Define the main App component
  const [events, setEvents] = useState([]); // State to store events, initially empty
  const [currentNOE, setCurrentNOE] = useState(32); // State for number of events, default 32

  const fetchData = async () => { // Function to fetch event data
    const allEvents = await getEvents(); // Get all events from API
    setEvents(allEvents.slice(0, currentNOE)); // Update events state with slice of all events
  }

  useEffect(() => { // Effect hook to run on component mount
    fetchData(); // Call fetchData when component mounts
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="App">
      <CitySearch /> // Render CitySearch component
      <NumberOfEvents /> // Render NumberOfEvents component
      <EventList events={events} /> // Render EventList component, passing events as prop
    </div>
  );
};

export default App; // Export the App component for use in other parts of the application