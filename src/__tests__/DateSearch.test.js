import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DateSearch from '../components/DateSearch';

describe('<DateSearch /> component', () => {
  test('User can search for events on a specific date', () => {
    const mockOnSearchChange = jest.fn();
    render(<DateSearch onSearchChange={mockOnSearchChange} />);
   
    const datePicker = screen.getByLabelText('Select date:');
    fireEvent.change(datePicker, { target: { value: '2023-07-20' } });
   
    expect(mockOnSearchChange).toHaveBeenCalledWith('2023-07-20');
  });

  test('User can search for events within a date range', () => {
    const mockOnSearchChange = jest.fn();
    render(<DateSearch onSearchChange={mockOnSearchChange} />);
   
    const startDatePicker = screen.getByLabelText('Start date:');
    const endDatePicker = screen.getByLabelText('End date:');
   
    fireEvent.change(startDatePicker, { target: { value: '2023-07-20' } });
    fireEvent.change(endDatePicker, { target: { value: '2023-07-25' } });
   
    expect(mockOnSearchChange).toHaveBeenCalledWith('2023-07-20', '2023-07-25');
  });
});