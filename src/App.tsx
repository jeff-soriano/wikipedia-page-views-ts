import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10))

  const getArticles = (date: string) => {
    const year = date.substring(0, 4)
    const month = date.substring(5, 7)
    const day = date.substring(8, 10)

    fetch(
      `https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access/${year}/${month}/${day}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
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
          <p>1</p>
          <p>The Last of Us (TV Show)</p>
          <p>5,555,555 views</p>
        </ol>
        <ol>
          <p>1</p>
          <p>The Last of Us (TV Show)</p>
          <p>5,555,555 views</p>
        </ol>
        <ol>
          <p>1</p>
          <p>The Last of Us (TV Show)</p>
          <p>5,555,555 views</p>
        </ol>
        <ol>
          <p>1</p>
          <p>The Last of Us (TV Show)</p>
          <p>5,555,555 views</p>
        </ol>
        <ol>
          <p>1</p>
          <p>The Last of Us (TV Show)</p>
          <p>5,555,555 views</p>
        </ol>
        <ol>
          <p>1</p>
          <p>The Last of Us (TV Show)</p>
          <p>5,555,555 views</p>
        </ol>
        <ol>
          <p>1</p>
          <p>The Last of Us (TV Show)</p>
          <p>5,555,555 views</p>
        </ol>
        <ol>
          <p>1</p>
          <p>The Last of Us (TV Show)</p>
          <p>5,555,555 views</p>
        </ol>
        <ol>
          <p>1</p>
          <p>The Last of Us (TV Show)</p>
          <p>5,555,555 views</p>
        </ol>
        <ol>
          <p>1</p>
          <p>The Last of Us (TV Show)</p>
          <p>5,555,555 views</p>
        </ol>
      </main>
    </div>
  )
}

export default App
