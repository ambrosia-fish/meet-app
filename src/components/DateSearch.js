import React, { useState } from 'react';

const DateSearch = ({ onSearchChange }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleDateChange = (event) => {
    const { id, value } = event.target;
    if (id === 'date') {
      onSearchChange(value);
    } else if (id === 'start-date') {
      setStartDate(value);
      onSearchChange(value, endDate);
    } else if (id === 'end-date') {
      setEndDate(value);
      onSearchChange(startDate, value);
    }
  };

  return (
    <div className="date-search">
      <label htmlFor="date">Select date:</label>
      <input
        type="date"
        id="date"
        onChange={handleDateChange}
      />
      <label htmlFor="start-date">Start date:</label>
      <input
        type="date"
        id="start-date"
        value={startDate}
        onChange={handleDateChange}
      />
      <label htmlFor="end-date">End date:</label>
      <input
        type="date"
        id="end-date"
        value={endDate}
        onChange={handleDateChange}
      />
    </div>
  );
};

export default DateSearch;