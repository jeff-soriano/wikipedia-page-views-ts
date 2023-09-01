import { render, fireEvent, cleanup } from '@testing-library/react'
import ResultsPicker from './'

afterEach(() => {
  cleanup()
})

describe('ResultsPicker Component', () => {
  const mockProps = {
    isSelectingNumResults: false,
    onClick: jest.fn(),
    numResults: 0,
    outsideClickHandler: jest.fn(),
    onClickNumResults: jest.fn(),
    resultsOptions: [10, 20, 30, 40, 50],
  }

  it('should render the InputButton correctly', () => {
    const { getByText } = render(<ResultsPicker {...mockProps} />)
    expect(getByText('NUM RESULTS ^')).toBeInTheDocument()
  })

  it('should call onClick when the InputButton is clicked', () => {
    const { getByText } = render(<ResultsPicker {...mockProps} />)
    fireEvent.click(getByText('NUM RESULTS ^'))
    expect(mockProps.onClick).toHaveBeenCalledTimes(1)
  })

  it('should display the results options when isSelectingNumResults is true', () => {
    const { getByText } = render(
      <ResultsPicker {...mockProps} isSelectingNumResults={true} />
    )
    expect(getByText('10')).toBeInTheDocument()
    expect(getByText('20')).toBeInTheDocument()
  })

  it('should call onClickNumResults when an option is clicked', () => {
    const { getByText } = render(
      <ResultsPicker {...mockProps} isSelectingNumResults={true} />
    )
    fireEvent.click(getByText('10'))
    expect(mockProps.onClickNumResults).toHaveBeenCalledWith(10)
  })
})
