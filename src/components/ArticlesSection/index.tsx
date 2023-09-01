import Articles from './Articles'
import PageNav from './PageNav'

interface Props {
  articles: ArticleObj[]
  currentPage: number
  numPages: number
  onPageButtonClick: (page: number) => void
  onNextPageButtonClick: () => void
  onPrevPageButtonClick: () => void
}

export type ArticleObj = {
  article: string
  rank: number
  views_ceil: number
}

/**
 * Component which renders the list of articles and the pagination navigation below it
 */
export default function ArticlesSection({
  articles,
  currentPage,
  numPages,
  onPageButtonClick,
  onNextPageButtonClick,
  onPrevPageButtonClick,
}: Props) {
  return (
    <>
      {articles.length > 0 && (
        <>
          <div
            className="bg-white mb-10 p-7 w-full rounded-md drop-shadow-lg"
            style={{ zIndex: '-10' }}
          >
            <Articles articles={articles} currentPage={currentPage} />
          </div>
          <PageNav
            currentPage={currentPage}
            numPages={numPages}
            onPageButtonClick={onPageButtonClick}
            onNextPageButtonClick={onNextPageButtonClick}
            onPrevPageButtonClick={onPrevPageButtonClick}
          />
        </>
      )}
    </>
  )
}
