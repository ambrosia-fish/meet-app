# Meet App Features

## Feature 1: Filter Events By City

### User Story
As an event-goer,
I should be able to filter events by city
So that I can see a list of events taking place in that city.

### Scenarios (Gherkin Syntax)

Scenario 1: When user hasn't searched for a city, show upcoming events from all cities
Given user hasn't searched for any city
When the user opens the app
Then the user should see a list of upcoming events

Scenario 2: User should see a list of suggestions when they search for a city
Given the main page is open
When user starts typing in the city textbox
Then the user should receive a list of cities (suggestions) that match what they've typed

## Feature 2: Show/Hide Event Details

### User Story
As an event-goer,
I should be able to show/hide event details
So that I can see more/less information about an event.

### Scenarios (Gherkin Syntax)

Scenario 1: An event element is collapsed by default
Given the user is on the main page
When the user views the list of events
Then all event elements should be collapsed

Scenario 2: User can expand an event to see its details
Given the user is viewing a collapsed event element
When the user clicks on the "Show Details" button for an event
Then the event element should expand to show the event details

## Feature 3: Search Events by Date

### User Story
As an event-goer,
I should be able to search for events by date
So that I can find events happening on a specific day or within a date range.

### Scenarios (Gherkin Syntax)

Scenario 1: User can search for events on a specific date
Given the user is on the main page
When the user selects a specific date in the date picker
Then the app should display a list of events happening on that date

Scenario 2: User can search for events within a date range
Given the user is on the main page
When the user selects a start date and an end date in the date picker
Then the app should display a list of events happening within that date range

## Feature 4: Bookmark Favorite Events

### User Story
As an event-goer,
I should be able to bookmark events I'm interested in
So that I can easily find and keep track of events I want to attend.

### Scenarios (Gherkin Syntax)

Scenario 1: User can bookmark an event
Given the user is viewing an event's details
When the user clicks on the "Bookmark" button
Then the event should be added to the user's bookmarked events list

Scenario 2: User can view their bookmarked events
Given the user has bookmarked one or more events
When the user navigates to the "Bookmarked Events" section
Then the app should display a list of all events the user has bookmarked

## Feature 5: Create and Manage Events

### User Story
As an event planner,
I should be able to create and manage events
So that I can organize and promote my events to potential attendees.

### Scenarios (Gherkin Syntax)

Scenario 1: Event planner can create a new event
Given the event planner is logged in to their account
When the planner clicks on "Create New Event" and fills in the event details
Then the new event should be created and added to the list of upcoming events

Scenario 2: Event planner can edit an existing event
Given the event planner is viewing the details of an event they organized
When the planner clicks on "Edit Event" and modifies the event details
Then the changes should be saved and reflected in the event listing
