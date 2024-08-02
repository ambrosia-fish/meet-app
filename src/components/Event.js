import { useState } from "react";

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <li className="event">
      <h2>{event.summary}</h2>
      <p>{event.created}</p>
      <p>{event.location}</p>
      <button onClick={handleToggleDetails}>
        {showDetails ? "Hide Details" : "Show Details"}
      </button>
      {showDetails && (
        <div className="details" data-testid="event-details">
          <h3>About event:</h3>
          <p>{event.description}</p>
          <h3>Event start time:</h3>
          <p>{event.start.dateTime}</p>
          <h3>Event time zone:</h3>
          <p>{event.start.timeZone}</p>
        </div>
      )}
    </li>
  );
};

export default Event;