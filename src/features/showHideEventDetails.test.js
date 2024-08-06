import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const feature = loadFeature('src/features/showHideEventDetails.feature');

defineFeature(feature, test => {
  test('An event element is collapsed by default', ({ given, when, then }) => {
    let AppComponent;
    given('the user has opened the app', () => {
      AppComponent = render(<App />);
    });

    when('the user views the list of events', async () => {
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');
      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBeGreaterThan(0);
      });
    });

    then('all event elements should be collapsed', () => {
      const AppDOM = AppComponent.container.firstChild;
      const eventDetails = AppDOM.querySelector('.event .details');
      expect(eventDetails).toBeNull();
    });
  });

  test('User can expand an event to see its details', ({ given, when, then }) => {
    let AppComponent;
    given('the user has opened the app and the list of events is displayed', async () => {
      AppComponent = render(<App />);
      const AppDOM = AppComponent.container.firstChild;
      await waitFor(() => {
        const eventList = within(AppDOM).queryAllByRole('listitem');
        expect(eventList.length).toBeGreaterThan(0);
      });
    });

    when('the user clicks on the "show details" button for an event', async () => {
      const AppDOM = AppComponent.container.firstChild;
      const showDetailsButton = AppDOM.querySelector('.event .details-btn');
      await userEvent.click(showDetailsButton);
    });

    then('the event details should be displayed', () => {
      const AppDOM = AppComponent.container.firstChild;
      const eventDetails = AppDOM.querySelector('.event .details');
      expect(eventDetails).not.toBeNull();
    });
  });

  test('User can collapse an event to hide details', ({ given, and, when, then }) => {
    let AppComponent;
    let showDetailsButton;
    given('the user has opened the app and the list of events is displayed', async () => {
      AppComponent = render(<App />);
      const AppDOM = AppComponent.container.firstChild;
      await waitFor(() => {
        const eventList = within(AppDOM).queryAllByRole('listitem');
        expect(eventList.length).toBeGreaterThan(0);
      });
    });

    and('the user has expanded an event to see its details', async () => {
      const AppDOM = AppComponent.container.firstChild;
      showDetailsButton = AppDOM.querySelector('.event .details-btn');
      await userEvent.click(showDetailsButton);
      const eventDetails = AppDOM.querySelector('.event .details');
      expect(eventDetails).not.toBeNull();
    });

    when('the user clicks on the "hide details" button for the event', async () => {
      await userEvent.click(showDetailsButton);
    });

    then('the event details should be hidden', () => {
      const AppDOM = AppComponent.container.firstChild;
      const eventDetails = AppDOM.querySelector('.event .details');
      expect(eventDetails).toBeNull();
    });
  });
});