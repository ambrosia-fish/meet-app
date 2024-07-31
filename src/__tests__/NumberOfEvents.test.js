import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  test('renders number input', () => {
    render(<NumberOfEvents />);
    const numberInput = screen.getByRole('spinbutton');
    expect(numberInput).toBeInTheDocument();
    expect(numberInput).toHaveClass('number-of-events-input');
  });

  test('default value of the input is 32', () => {
    render(<NumberOfEvents />);
    const numberInput = screen.getByRole('spinbutton');
    expect(numberInput).toHaveValue(32);
  });

  test('value changes when user types in the input', async () => {
    render(<NumberOfEvents />);
    const numberInput = screen.getByRole('spinbutton');
    const user = userEvent.setup();
    await user.type(numberInput, '{backspace}{backspace}10');
    expect(numberInput).toHaveValue(10);
  });
});