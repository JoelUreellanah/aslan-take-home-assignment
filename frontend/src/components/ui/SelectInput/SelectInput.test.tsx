import { describe, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SelectInput from '@/components/ui/SelectInput/SelectInput';

describe('SelectInput Component', () => {
  const mockOnChange = vi.fn();
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
  });

  it('renders correctly', () => {
    render(
      <SelectInput value="option1" onChange={mockOnChange} options={options} />,
    );
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('calls onChange when a new option is selected', async () => {
    render(
      <SelectInput value="option1" onChange={mockOnChange} options={options} />,
    );

    fireEvent.click(screen.getByRole('combobox'));

    const dropdownOptions = await screen.findAllByText('Option 2');
    fireEvent.click(dropdownOptions[dropdownOptions.length - 1]);

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith('option2');
  });

  it('renders all options when dropdown is open', async () => {
    render(
      <SelectInput value="option1" onChange={mockOnChange} options={options} />,
    );

    fireEvent.click(screen.getByRole('combobox'));

    for (const option of options) {
      const dropdownOptions = await screen.findAllByText(option.label);
      expect(dropdownOptions[dropdownOptions.length - 1]).toBeInTheDocument();
    }
  });
});
