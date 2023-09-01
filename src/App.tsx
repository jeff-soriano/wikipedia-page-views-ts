import { useState } from 'react'
import './App.css'
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from './components/DatePicker'
import ResultsPicker from './components/ResultsPicker'
import CountriesPicker from './components/CountriesPicker'
import ArticlesSection from './components/ArticlesSection'

type ArticleObj = {
  article: string
  rank: number
  views_ceil: number
}

function App() {
  const today = new Date()
  const yesterday = new Date(today)

  yesterday.setDate(yesterday.getDate() - 1)

  const [date, setDate] = useState(yesterday)
  const [numResults, setNumResults] = useState(100)
  const [articles, setArticles] = useState<ArticleObj[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [isSelectingDate, setIsSelectingDate] = useState(false)
  const [isSelectingNumResults, setIsSelectingNumResults] = useState(false)
  const [isSelectingCountry, setIsSelectingCountry] = useState(false)
  const [currentCountryCode, setCurrentCountryCode] = useState('US')
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const numPages = Math.ceil(articles.length / 10)

  const getArticles = (date: Date, numResults: number) => {
    const year = date.getFullYear()
    // I got the following from:
    // https://stackoverflow.com/questions/6040515/how-do-i-get-month-and-date-of-javascript-in-2-digit-format
    // This is to get month/day in MM/DD format, which date.get... won't do out of the box
    const month = ('0' + (date.getMonth() + 1)).slice(-2)
    const day = ('0' + date.getDate()).slice(-2)

    setIsLoading(true)
    fetch(
      `https://wikimedia.org/api/rest_v1/metrics/pageviews/top-per-country/${currentCountryCode}/all-access/${year}/${month}/${day}`
    )
      .then((res) => res.json())
      .then((data) => {
        const articles = data.items[0].articles.slice(0, numResults)
        setArticles([...articles])
        setCurrentPage(0)
        setIsError(false)
      })
      .catch(() => {
        setArticles([])
        setIsError(true)
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <div>
      <div className="h-20 bg-white"></div>
      <main className="flex flex-col items-center main-width mx-auto py-8">
        <h1 className="text-4xl mb-10 text-center">Top Wikipedia Articles</h1>
        <div className="bg-white mb-5 flex control-bar justify-between w-full rounded-full px-4 py-3 drop-shadow-lg">
          <DatePicker
            date={date}
            onChange={(date) => date && setDate(date)}
            isSelectingDate={isSelectingDate}
            onClick={() => setIsSelectingDate(true)}
            onCalendarClose={() => setIsSelectingDate(false)}
            onCalendarOpen={() => setIsSelectingDate(true)}
          />
          <ResultsPicker
            isSelectingNumResults={isSelectingNumResults}
            onClick={() => setIsSelectingNumResults(true)}
            numResults={numResults}
            outsideClickHandler={() => setIsSelectingNumResults(false)}
            onClickNumResults={(numResults) => {
              setNumResults(numResults)
              setIsSelectingNumResults(false)
            }}
            resultsOptions={[25, 50, 75, 100, 200]}
          />
          <CountriesPicker
            isSelectingCountry={isSelectingCountry}
            onClick={() => setIsSelectingCountry(true)}
            countryCode={currentCountryCode}
            outsideClickHandler={() => setIsSelectingCountry(false)}
            onClickCountry={(countryCode) => {
              setCurrentCountryCode(countryCode)
              setIsSelectingCountry(false)
            }}
          />
          <button
            className="rounded-full px-3 py-2 font-poppins bg-green-800 text-white w-32 text-center button-width"
            onClick={() => getArticles(date, numResults)}
          >
            Search
          </button>
        </div>
        {isLoading ? (
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : isError ? (
          <div className="bg-white mb-10 p-7 w-full rounded-md bg-red-100 text-red-500 font-poppins">
            There was an error fetching the articles. Either there was no data
            for this country or you picked an invalid date. Please choose a date
            before today.
          </div>
        ) : (
          <ArticlesSection
            articles={articles}
            currentPage={currentPage}
            numPages={numPages}
            onPageButtonClick={(page) => setCurrentPage(page)}
            onNextPageButtonClick={() => setCurrentPage(currentPage + 1)}
            onPrevPageButtonClick={() => setCurrentPage(currentPage - 1)}
          />
        )}
      </main>
    </div>
  )
}

export default App
