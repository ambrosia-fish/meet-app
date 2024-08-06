import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const feature = loadFeature('src/features/filterNumberOfEvents.feature');

defineFeature(feature, test => {
  test('When user has not specified a number, 32 events are shown by default', ({ given, when, then }) => {
    let AppComponent;
    given('the user has opened the app', () => {
      AppComponent = render(<App />);
    });

    when('the user views the list of events without specifying a number', async () => {
      const AppDOM = AppComponent.container.firstChild;
      await waitFor(() => {
        const eventList = within(AppDOM).queryAllByRole('listitem');
        expect(eventList.length).toBeGreaterThan(0);
      });
    });

    then('32 events should be shown by default', async () => {
      const AppDOM = AppComponent.container.firstChild;
      await waitFor(() => {
        const eventList = within(AppDOM).queryAllByRole('listitem');
        expect(eventList.length).toBe(32);
      });
    });
  });

  test('User can change the number of events displayed', ({ given, when, then }) => {
    let AppComponent;
    given('the user has opened the app and the list of events is displayed', async () => {
      AppComponent = render(<App />);
      const AppDOM = AppComponent.container.firstChild;
      await waitFor(() => {
        const eventList = within(AppDOM).queryAllByRole('listitem');
        expect(eventList.length).toBeGreaterThan(0);
      });
    });

    when('the user changes the number of events to 10', async () => {
      const AppDOM = AppComponent.container.firstChild;
      const numberOfEventsInput = AppDOM.querySelector('#number-of-events-input');
      await userEvent.clear(numberOfEventsInput);
      await userEvent.type(numberOfEventsInput, '10');
      await userEvent.type(numberOfEventsInput, '{enter}');
    });

    then('the number of events displayed should be 10', async () => {
      const AppDOM = AppComponent.container.firstChild;
      await waitFor(() => {
        const eventList = within(AppDOM).queryAllByRole('listitem');
        expect(eventList.length).toBe(10);
      });
    });
  });
});