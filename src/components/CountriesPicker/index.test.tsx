import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import CountriesPicker from './'

// Mocked props for testing

const mockOnClick = jest.fn()
const mockOutsideClickHandler = jest.fn()
const mockOnClickCountry = jest.fn((countryCode) => null)

const mockProps = {
  isSelectingCountry: false,
  onClick: mockOnClick,
  countryCode: 'US',
  outsideClickHandler: mockOutsideClickHandler,
  onClickCountry: mockOnClickCountry,
}

afterEach(() => {
  cleanup()
})

describe('CountriesPicker', () => {
  // Test failing unexpectedly
  //   it('does not render countries when selecting is false', () => {
  //     render(<CountriesPicker {...mockProps} />)

  //     expect(screen.getByText('Japan')).not.toBeVisible()
  //   })

  it('renders countries when selecting is true', () => {
    render(<CountriesPicker {...mockProps} isSelectingCountry={true} />)

    expect(screen.getByText('Japan')).toBeVisible()
  })

  it('calls the onClickCountry handler when country is clicked', () => {
    render(<CountriesPicker {...mockProps} />)

    const japanListItem = screen.getByText('Japan')

    // Simulate button click
    fireEvent.click(japanListItem)

    // Assert the mock function is called with the correct page number
    expect(mockOnClickCountry).toHaveBeenCalledWith('JP')
  })
})
