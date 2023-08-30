import { useState } from 'react'
import './App.css'

type ArticleObj = {
  article: string
  rank: number
  views: number
}

function App() {
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10))
  const [articles, setArticles] = useState<ArticleObj[]>([])

  const getArticles = (date: string) => {
    const year = date.substring(0, 4)
    const month = date.substring(5, 7)
    const day = date.substring(8, 10)

    fetch(
      `https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access/${year}/${month}/${day}`
    )
      .then((res) => res.json())
      .then((data) => {
        const articles = data.items[0].articles
        setArticles([...articles])
      })
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
          <select name="num-articles" id="num-articles">
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={75}>75</option>
            <option value={100}>100</option>
            <option value={200}>200</option>
          </select>
          <button onClick={() => getArticles(date)}>Search</button>
        </div>
        <ol>
          {articles.map((currArticle) => (
            <li>
              <p>{currArticle.rank}</p>
              <p>{currArticle.article}</p>
              <p>{currArticle.views}</p>
            </li>
          ))}
        </ol>
      </main>
    </div>
  )
}

export default App
