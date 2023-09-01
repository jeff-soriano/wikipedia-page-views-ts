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
          className="flex justify-between w-full border border-gray-200 px-6 py-5 rounded-lg mb-4"
        >
          <div>
            <span className="text-gray-400 text-sm">{currArticle.rank}</span>
            <span className="ml-10">
              {currArticle.article.replaceAll('_', ' ')}
            </span>
          </div>
          <span className="text-gray-400 font-poppins text-sm">
            {currArticle.views_ceil.toLocaleString()} views
          </span>
        </div>
      ))}
    </>
  )
}
