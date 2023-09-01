import InputButton from '../InputButton'
import list from '../../images/list.svg'
import { useRef } from 'react'
import useOutsideClick from '../../hooks/useOutsideClick'

var classNames = require('classnames')

interface Props {
  isSelectingNumResults: boolean
  onClick: () => void
  numResults: number
  outsideClickHandler: () => void
  onClickNumResults: (numResults: number) => void
  resultsOptions: number[]
}

/**
 * Component which handles picking the number of results to show after hitting the wikipedia endpoint
 */
export default function ResultsPicker({
  isSelectingNumResults,
  onClick,
  numResults,
  outsideClickHandler,
  onClickNumResults,
  resultsOptions,
}: Props) {
  const numResultsOptionsRef = useRef(null)
  useOutsideClick(numResultsOptionsRef, outsideClickHandler)

  return (
    <div>
      <InputButton
        isSelecting={isSelectingNumResults}
        onClick={onClick}
        svgSrc={list}
        svgAlt="list"
        label="NUM RESULTS"
        value={numResults}
      />
      <ul
        ref={numResultsOptionsRef}
        className={classNames(
          'bg-white z-10 rounded-3xl py-6 absolute w-52 drop-shadow-lg font-poppins',
          {
            hidden: !isSelectingNumResults,
          }
        )}
      >
        {resultsOptions.map((numResults) => (
          <li
            className={classNames(
              'text-center px-4 py-2 md:hover:bg-neutral-100 cursor-pointer'
            )}
            onClick={() => onClickNumResults(numResults)}
          >
            {numResults}
          </li>
        ))}
      </ul>
    </div>
  )
}
