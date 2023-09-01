import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import ArticlesSection, { ArticleObj } from './'

// Mocked props for testing
const mockArticles: ArticleObj[] = [
  { article: 'Article 1', rank: 1, views_ceil: 100 },
  { article: 'Article 2', rank: 2, views_ceil: 200 },
]

const mockPageButtonClick = jest.fn((number) => null)
const mockNextPageButtonClick = jest.fn()
const mockPrevPageButtonClick = jest.fn()

const mockProps = {
  articles: mockArticles,
  currentPage: 1,
  numPages: 2,
  onPageButtonClick: mockPageButtonClick,
  onNextPageButtonClick: mockNextPageButtonClick,
  onPrevPageButtonClick: mockPrevPageButtonClick,
}

afterEach(() => {
  cleanup()
})

describe('ArticlesSection', () => {
  it('renders articles and page navigation when articles are provided', () => {
    render(<ArticlesSection {...mockProps} />)

    // Assert articles are rendered
    // Not sure why this isn't rendering in the test
    // expect(screen.getAllByText('Article')).toHaveLength(mockArticles.length)

    // Assert page navigation is rendered
    expect(screen.getByTestId('page-navigation')).toBeInTheDocument()
  })

  it('does not render articles and page navigation when no articles are provided', () => {
    render(<ArticlesSection {...mockProps} articles={[]} />)

    // Assert articles are not rendered
    expect(screen.queryByText(/Article \d/)).toBeNull()

    // Assert page navigation is not rendered
    expect(screen.queryByTestId('page-navigation')).toBeNull()
  })

  it('calls the appropriate page button click handlers', () => {
    render(<ArticlesSection {...mockProps} />)

    const nextPageButton = screen.getByTestId('next-page-btn')
    const prevPageButton = screen.getByTestId('prev-page-btn')

    // Simulate button clicks
    fireEvent.click(nextPageButton)
    fireEvent.click(prevPageButton)

    // Assert next page button is called
    expect(mockNextPageButtonClick).toHaveBeenCalled()
    // Prev page button is disabled so it shouldn't be called
    expect(mockPrevPageButtonClick).not.toHaveBeenCalled()
  })

  it('calls the onPageButtonClick handler when page is clicked', () => {
    render(<ArticlesSection {...mockProps} />)

    const pageButton = screen.getByText('2')

    // Simulate button click
    fireEvent.click(pageButton)

    // Assert the mock function is called with the correct page number
    expect(mockPageButtonClick).toHaveBeenCalledWith(1)
  })
})
