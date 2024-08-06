Feature: Filter Number of Events

Scenario: When user has not specified a number, 32 events are shown by default
  Given the user has opened the app
  When the user views the list of events without specifying a number
  Then 32 events should be shown by default

Scenario: User can change the number of events displayed
  Given the user has opened the app and the list of events is displayed
  When the user changes the number of events to 10
  Then the number of events displayed should be 10