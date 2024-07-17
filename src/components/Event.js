import React, { useState } from 'react';

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <ul>
      <li className="event">
        <h2>{event.summary}</h2>
        <p>{event.created}</p>
        <p>{event.location}</p>
        <button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? 'Hide Details' : 'Show Details'}
        </button>
        {showDetails && (
          <div className="event-details">
            <h3>About event:</h3>
            <p>{event.description}</p>
            <p>
              <a href={event.htmlLink} target="_blank" rel="noopener noreferrer">
                See details on Google Calendar
              </a>
            </p>
          </div>
        )}
      </li>
    </ul>
  );
};

export default Event;