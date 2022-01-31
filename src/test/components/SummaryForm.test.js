import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SummaryForm from '../../components/SummaryForm/SummaryForm';

describe('button state with respect to checkbox', () => {

  test('initial state of checkbox to be unchecked', () => {
    render(<SummaryForm />);

    const termsCheckbox = screen.getByRole(
      'checkbox', 
      { name: /terms and conditions/i 
    });
    expect(termsCheckbox).not.toBeChecked();
  });

  test('button disabled when checkbox is unchecked', () => {
    render(<SummaryForm />);

    const confirmOrderBtn = screen.getByRole(
      'button', 
      { name: /confirm order/i 
    });
    expect(confirmOrderBtn).toBeDisabled();
  });


  test('button enabled once checked and vice versa', () => {
    render(<SummaryForm />);

    const termsCheckbox = screen.getByRole(
      'checkbox', 
      { name: /terms and conditions/i 
    });
    const confirmOrderBtn = screen.getByRole(
      'button', 
      { name: /confirm order/i 
    });

    userEvent.click(termsCheckbox);
    expect(confirmOrderBtn).toBeEnabled();

    userEvent.click(termsCheckbox);
    expect(confirmOrderBtn).toBeDisabled();
  });
  
});

describe('popover with respect different states', () => {
  test('popup is not in DOM on initial render', () => {
    render(<SummaryForm />);
    const popover = screen.queryByText(
      /no ice cream will actually be delivered/i
    );
    expect(popover).not.toBeInTheDocument();
  });

  test('popup is added to DOM on hovering and viceversa', async () => {
    render(<SummaryForm />);
    const termsAndConditions = screen.getByText(
      /terms and conditions/i
    );
    userEvent.hover(termsAndConditions);

    const popover = screen.queryByText(
      /no ice cream will actually be delivered/i
    );
    expect(popover).toBeInTheDocument();

    userEvent.unhover(termsAndConditions);
    await waitForElementToBeRemoved(
      screen.queryByText(/no ice cream will actually be delivered/i)
    );
  });
});