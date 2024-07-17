import React, { useState } from 'react';

const DateSearch = ({ onSearchChange }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
    onSearchChange(event.target.value, endDate);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
    onSearchChange(startDate, event.target.value);
  };

  return (
    <div className="date-search">
      <label htmlFor="start-date">Start Date:</label>
      <input
        type="date"
        id="start-date"
        value={startDate}
        onChange={handleStartDateChange}
      />
      <label htmlFor="end-date">End Date:</label>
      <input
        type="date"
        id="end-date"
        value={endDate}
        onChange={handleEndDateChange}
      />
    </div>
  );
};

export default DateSearch;