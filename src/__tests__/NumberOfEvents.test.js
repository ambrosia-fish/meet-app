import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsComponent;

  beforeEach(() => {
    NumberOfEventsComponent = render(<NumberOfEvents />);
  });

  test('renders text input', () => {
    const textInput = screen.getByRole('textbox');
    expect(textInput).toBeInTheDocument();
  });

  test('default value of input is 32', () => {
    const textInput = screen.getByRole('textbox');
    expect(textInput).toHaveValue('32');
  });

  test('value changes when user types', async () => {
    const user = userEvent.setup();
    const textInput = screen.getByRole('textbox');
    await user.type(textInput, '{backspace}{backspace}10');
    expect(textInput).toHaveValue('10');
  });
});
