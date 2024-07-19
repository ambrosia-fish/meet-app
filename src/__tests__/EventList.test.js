import { render } from '@testing-library/react';
import EventList from '../components/EventList';

describe('<EventList /> component', () => {
  test('renders a list of events', () => {
    const { getByRole } = render(<EventList events={[{ id: 1 }, { id: 2 }, { id: 3 }]} />);
    const eventList = getByRole("list");
    expect(eventList).toBeInTheDocument();
    expect(eventList.children).toHaveLength(3);
  });
});