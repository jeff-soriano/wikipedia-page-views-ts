import { useState } from 'react'
import './App.css'

type ArticleObj = {
  article: string
  rank: number
  views: number
}

function App() {
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10))
  const [numResults, setNumResults] = useState(100)
  const [articles, setArticles] = useState<ArticleObj[]>([])
  const [currentPage, setCurrentPage] = useState(0)

  const numPages = Math.ceil(articles.length / 10)

  const getArticles = (date: string, numResults: number) => {
    const year = date.substring(0, 4)
    const month = date.substring(5, 7)
    const day = date.substring(8, 10)

    fetch(
      `https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access/${year}/${month}/${day}`
    )
      .then((res) => res.json())
      .then((data) => {
        const articles = data.items[0].articles.slice(0, numResults)
        setArticles([...articles])
        setCurrentPage(0)
      })
  }

  const renderArticles = (articles: ArticleObj[], currentPage: number) => {
    const startIndex = currentPage * 10
    const endIndex = startIndex + 10

    return articles.slice(startIndex, endIndex).map((currArticle, index) => (
      <li key={index}>
        <p>{currArticle.rank}</p>
        <p>{currArticle.article}</p>
        <p>{currArticle.views}</p>
      </li>
    ))
  }

  const renderPageNav = (numPages: number) => {
    const pageButtons = []

    for (let i = 0; i < numPages; i++) {
      pageButtons.push(
        <button key={i} onClick={() => setCurrentPage(i)}>
          {i + 1}
        </button>
      )
    }

    return (
      <div>
        <button
          disabled={currentPage === 0}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        {pageButtons.map((pageButton) => pageButton)}
        <button
          disabled={currentPage === numPages - 1}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    )
  }

  return (
    <div>
      <header>
        <h1>Top Wikipedia Articles</h1>
      </header>
      <main>
        <div>
          <input
            type="date"
            id="wikipedia-date"
            name="wikipedia-date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <select
            name="num-articles"
            id="num-articles"
            value={numResults}
            onChange={(e) => setNumResults(+e.target.value)}
          >
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={75}>75</option>
            <option value={100}>100</option>
            <option value={200}>200</option>
          </select>
          <button onClick={() => getArticles(date, numResults)}>Search</button>
        </div>
        <ol>{renderArticles(articles, currentPage)}</ol>
        {renderPageNav(numPages)}
      </main>
    </div>
  )
}

export default App
