var classNames = require('classnames')

interface Props {
  currentPage: number
  numPages: number
  onPageButtonClick: (page: number) => void
  onNextPageButtonClick: () => void
  onPrevPageButtonClick: () => void
}

export default function PageNav({
  currentPage,
  numPages,
  onPageButtonClick,
  onNextPageButtonClick,
  onPrevPageButtonClick,
}: Props) {
  const pageButtons = []
  const prevBtnDisabled = currentPage === 0
  const nextBtnDisabled = currentPage === numPages - 1

  for (let i = 0; i < numPages; i++) {
    pageButtons.push(
      <button
        key={i}
        onClick={() => onPageButtonClick(i)}
        className={classNames(
          { 'bg-lime-200 border-lime-200 text-green-700': currentPage === i },
          'rounded-full px-2 border mx-1 font-poppins text-base w-10 h-10'
        )}
      >
        {i + 1}
      </button>
    )
  }

  return (
    <div data-testid="page-navigation">
      <button
        data-testid="prev-page-btn"
        disabled={prevBtnDisabled}
        onClick={onNextPageButtonClick}
        className={classNames(
          { 'bg-gray-300': prevBtnDisabled },
          'rounded-full px-2 border mr-4 font-poppins text-base w-10 h-10'
        )}
      >
        {'<'}
      </button>
      {pageButtons.map((pageButton) => pageButton)}
      <button
        data-testid="next-page-btn"
        disabled={nextBtnDisabled}
        onClick={onPrevPageButtonClick}
        className={classNames(
          { 'bg-gray-300': nextBtnDisabled },
          'rounded-full px-2 border ml-4 font-poppins text-base w-10 h-10'
        )}
      >
        {'>'}
      </button>
    </div>
  )
}
