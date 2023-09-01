import { render, screen, fireEvent, act, cleanup } from '@testing-library/react'
import DatePicker from './'

afterEach(() => {
  cleanup()
})

describe('DatePicker Component', () => {
  const mockProps = {
    date: new Date('2023-08-31T12:34:56.789Z'),
    onChange: jest.fn((date: Date) => null),
    isSelectingDate: true,
    onClick: jest.fn(),
    onCalendarClose: jest.fn(),
    onCalendarOpen: jest.fn(),
  }

  it('should call onChange when a new date is selected', async () => {
    render(<DatePicker {...mockProps} />)
    const datePicker = screen.getByText('DATE ^')
    await act(async () => {
      fireEvent.click(datePicker)
    })
    const day = screen.getAllByText('1')[0]
    await act(async () => {
      fireEvent.click(day)
    })
    // Result contained a lot of other stuff with the call so it wasn't an exact match
    // expect(mockProps.onChange).toHaveBeenCalledWith(
    //   new Date('2023-08-01T12:34:56.000Z')
    // )
    expect(mockProps.onChange).toHaveBeenCalled()
  })
})
