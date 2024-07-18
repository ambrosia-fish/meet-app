import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsComponent;
  beforeEach(() => {
    NumberOfEventsComponent = render(<NumberOfEvents />);
  });

  test('renders number input', () => {
    const numberInput = NumberOfEventsComponent.queryByRole('textbox');
    expect(numberInput).toBeInTheDocument();
    expect(numberInput).toHaveClass('number-of-events');
  });

  test('default value of number input is 32', () => {
    const numberInput = NumberOfEventsComponent.queryByRole('textbox');
    expect(numberInput.value).toBe('32');
  });

  test('number input value changes when user types', async () => {
    const user = userEvent.setup();
    const numberInput = NumberOfEventsComponent.queryByRole('textbox');
    await user.type(numberInput, '{backspace}{backspace}10');
    expect(numberInput.value).toBe('10');
  });
});