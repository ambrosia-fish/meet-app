Meet App

Overview

The Meet App is designed to help event-goers find and manage events based on their preferences. It allows users to filter events by city, view event details, search for events by date, and specify the number of events to display.

Table of Contents

- Installation
- Usage
- Features
- User Stories and Scenarios
- Technologies Used
- License

Installation

1. Clone the repository:
   git clone https://github.com/ambrosia-fish/meet-app.git
   cd meet-app

2. Install dependencies:
   npm install

3. Start the development server:
   npm start

4. Open your browser and navigate to http://localhost:3000 to view the application.

Usage

The Meet App allows users to:
- Filter events by city
- Show or hide event details
- Search for events by specific date or date range
- Specify the number of events to view

Features

1. **Filter Events By City**
   - Users can filter events based on the city they are interested in. If no city is specified, the app displays upcoming events from all cities.

2. **Show/Hide Event Details**
   - Users can expand or collapse event details to view more or less information.

3. **Search Events by Date**
   - Users can search for events occurring on a specific date or within a date range using a date picker.

4. **Specify Number of Events**
   - Users can specify the number of events to display in the list, with a default of 32 events if no number is specified.

User Stories and Scenarios

- **Feature 1: Filter Events By City**
  - User Story: As an event-goer, I should be able to filter events by city.
  - Scenarios:
    - When user hasn't searched for a city, show upcoming events from all cities.
    - User should see a list of suggestions when they search for a city.

- **Feature 2: Show/Hide Event Details**
  - User Story: As an event-goer, I should be able to show/hide event details.
  - Scenarios:
    - An event element is collapsed by default.
    - User can expand an event to see its details.

- **Feature 3: Search Events by Date**
  - User Story: As an event-goer, I should be able to search for events by date.
  - Scenarios:
    - User can search for events on a specific date.
    - User can search for events within a date range.

- **Feature 4: Specify Number of Events**
  - User Story: As an event-goer, I should be able to specify the number of events I want to view.
  - Scenarios:
    - When user hasn't sp
