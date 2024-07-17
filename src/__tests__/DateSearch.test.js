import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DateSearch from '../components/DateSearch';

describe('<DateSearch /> component', () => {
  test('renders date search inputs', () => {
    render(<DateSearch onSearchChange={() => {}} />);
    const startDateInput = screen.getByLabelText('Start Date:');
    const endDateInput = screen.getByLabelText('End Date:');
    expect(startDateInput).toBeInTheDocument();
    expect(endDateInput).toBeInTheDocument();
  });

  test('calls onSearchChange when a specific date is selected', () => {
    const mockOnSearchChange = jest.fn();
    render(<DateSearch onSearchChange={mockOnSearchChange} />);
    const startDateInput = screen.getByLabelText('Start Date:');
    fireEvent.change(startDateInput, { target: { value: '2023-07-20' } });
    expect(mockOnSearchChange).toHaveBeenCalledWith('2023-07-20', '');
  });

  test('calls onSearchChange when a date range is selected', () => {
    const mockOnSearchChange = jest.fn();
    render(<DateSearch onSearchChange={mockOnSearchChange} />);
    const startDateInput = screen.getByLabelText('Start Date:');
    const endDateInput = screen.getByLabelText('End Date:');
    fireEvent.change(startDateInput, { target: { value: '2023-07-20' } });
    fireEvent.change(endDateInput, { target: { value: '2023-07-25' } });
    expect(mockOnSearchChange).toHaveBeenCalledWith('2023-07-20', '2023-07-25');
  });
});
