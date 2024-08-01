import React, { useState } from 'react';

const NumberOfEvents = () => {
  const [eventCount, setEventCount] = useState(32);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    setEventCount(value);
  };

  return (
    <div id="number-of-events">
      <label htmlFor="event-count-input">Number of Events:</label>
      <input
        type="text"
        id="event-count-input"
        value={eventCount}
        onChange={handleInputChanged}
      />
    </div>
  );
};

export default NumberOfEvents;