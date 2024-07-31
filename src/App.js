import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [numberOfEvents, setNumberOfEvents] = useState(32);

  return (
    <div className="App">
      <CitySearch />
      <NumberOfEvents setNumberOfEvents={setNumberOfEvents} />
      <EventList />
    </div>
  );
}

export default App;