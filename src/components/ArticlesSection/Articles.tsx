import { ArticleObj } from '.'

interface Props {
  articles: ArticleObj[]
  currentPage: number
}

export default function Articles({ articles, currentPage }: Props) {
  const startIndex = currentPage * 10
  const endIndex = startIndex + 10

  return (
    <>
      {articles.slice(startIndex, endIndex).map((currArticle, index) => (
        <div
          key={index}
          className="flex justify-between w-full border border-neutral-300 px-6 py-5 rounded-lg mb-4"
        >
          <div className="flex w-2/3">
            <span className="text-neutral-500 text-sm">{currArticle.rank}</span>
            <span className="ml-10">
              {currArticle.article.replaceAll('_', ' ')}
            </span>
          </div>
          <div className="text-neutral-600 font-poppins text-sm">
            {currArticle.views_ceil.toLocaleString()} views
          </div>
        </div>
      ))}
    </>
  )
}
