Feature: Show/Hide Event Details

Scenario: An event element is collapsed by default
  Given the user has opened the app
  When the user views the list of events
  Then all event elements should be collapsed

Scenario: User can expand an event to see its details
  Given the user has opened the app and the list of events is displayed
  When the user clicks on the "show details" button for an event
  Then the event details should be displayed

Scenario: User can collapse an event to hide details
  Given the user has opened the app and the list of events is displayed
  And the user has expanded an event to see its details
  When the user clicks on the "hide details" button for the event
  Then the event details should be hidden