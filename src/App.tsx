import { useRef, useState } from 'react'
import './App.css'
import 'react-datepicker/dist/react-datepicker.css'
import list from './images/list.svg'
import globe from './images/globe.svg'
import useOutsideClick from './hooks/useOutsideClick'
import { countries } from './data/countries'
import InputButton from './components/InputButton'
import DatePicker from './components/DatePicker'
import ResultsPicker from './components/ResultsPicker'

var classNames = require('classnames')

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
  const [isSelectingCountries, setIsSelectingCountries] = useState(false)
  const [currentCountryCode, setCurrentCountryCode] = useState('US')
  const [isError, setIsError] = useState(false)

  const numPages = Math.ceil(articles.length / 10)

  const getArticles = (date: Date, numResults: number) => {
    const year = date.getFullYear()
    // I got the following from:
    // https://stackoverflow.com/questions/6040515/how-do-i-get-month-and-date-of-javascript-in-2-digit-format
    // This is to get month/day in MM/DD format, which date.get... won't do out of the box
    const month = ('0' + (date.getMonth() + 1)).slice(-2)
    const day = ('0' + date.getDate()).slice(-2)

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
        setIsError(true)
      })
  }

  const renderArticles = (articles: ArticleObj[], currentPage: number) => {
    const startIndex = currentPage * 10
    const endIndex = startIndex + 10

    return articles.slice(startIndex, endIndex).map((currArticle, index) => (
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
    ))
  }

  const renderPageNav = (numPages: number) => {
    const pageButtons = []
    const prevBtnDisabled = currentPage === 0
    const nextBtnDisabled = currentPage === numPages - 1

    for (let i = 0; i < numPages; i++) {
      pageButtons.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
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
      <div>
        <button
          disabled={prevBtnDisabled}
          onClick={() => setCurrentPage(currentPage - 1)}
          className={classNames(
            { 'bg-gray-300': prevBtnDisabled },
            'rounded-full px-2 border mr-4 font-poppins text-base w-10 h-10'
          )}
        >
          {'<'}
        </button>
        {pageButtons.map((pageButton) => pageButton)}
        <button
          disabled={nextBtnDisabled}
          onClick={() => setCurrentPage(currentPage + 1)}
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

  const countryOptionsRef = useRef(null)
  useOutsideClick(countryOptionsRef, () => setIsSelectingCountries(false))

  return (
    <div>
      <div className="h-20 bg-white"></div>
      <main className="flex flex-col items-center w-6/12 mx-auto py-8">
        <h1 className="text-4xl mb-10">Top Wikipedia Articles</h1>
        <div className="bg-white mb-5 flex justify-between w-full rounded-full px-4 py-3">
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
          <div>
            <button
              className={classNames(
                {
                  'bg-slate-100': isSelectingCountries,
                  'hover:bg-slate-50': !isSelectingCountries,
                },
                'flex items-center rounded-full px-3 py-2 font-poppins'
              )}
              onClick={() => setIsSelectingCountries(true)}
            >
              <img src={globe} alt="globe" />
              <div className="text-left ml-4 mr-6">
                <div className="text-xs">COUNTRY ^</div>
                <div>{countries[currentCountryCode]}</div>
              </div>
            </button>
            <ul
              ref={countryOptionsRef}
              className={classNames(
                'bg-white z-10 rounded-3xl py-6 absolute w-52 drop-shadow-lg font-poppins h-72 overflow-scroll',
                {
                  hidden: !isSelectingCountries,
                }
              )}
            >
              {Object.entries(countries).map(([key, value]) => (
                <li
                  className={classNames(
                    'text-center px-4 py-2 md:hover:bg-neutral-100 cursor-pointer'
                  )}
                  onClick={() => {
                    setCurrentCountryCode(key)
                    setIsSelectingCountries(false)
                  }}
                >
                  {value}
                </li>
              ))}
            </ul>
          </div>
          <button
            className="rounded-full px-3 py-2 font-poppins bg-green-800 text-white w-32 text-center"
            onClick={() => getArticles(date, numResults)}
          >
            Search
          </button>
        </div>
        {articles.length > 0 && (
          <>
            <div className="bg-white mb-10 p-7 w-full rounded-md">
              {renderArticles(articles, currentPage)}
            </div>
            {renderPageNav(numPages)}
          </>
        )}
        {isError && (
          <div className="bg-white mb-10 p-7 w-full rounded-md bg-red-100 text-red-500 font-poppins">
            There was an error fetching the articles. Either there was no data
            for this country or you picked an invalid date. Please choose a date
            before today.
          </div>
        )}
      </main>
    </div>
  )
}

export default App
