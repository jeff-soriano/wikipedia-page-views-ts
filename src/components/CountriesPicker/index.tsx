import InputButton from '../InputButton'
import globe from '../../images/globe.svg'
import { useRef } from 'react'
import useOutsideClick from '../../hooks/useOutsideClick'
import { countries } from '../../data/countries'

var classNames = require('classnames')

interface Props {
  isSelectingCountry: boolean
  onClick: () => void
  countryCode: string
  outsideClickHandler: () => void
  onClickCountry: (countryCode: string) => void
}

export default function CountriesPicker({
  isSelectingCountry,
  onClick,
  countryCode,
  outsideClickHandler,
  onClickCountry,
}: Props) {
  const countryOptionsRef = useRef(null)
  useOutsideClick(countryOptionsRef, outsideClickHandler)

  return (
    <div>
      <InputButton
        isSelecting={isSelectingCountry}
        onClick={onClick}
        svgSrc={globe}
        svgAlt="globe"
        label="COUNTRY"
        value={countries[countryCode]}
      />

      <ul
        ref={countryOptionsRef}
        className={classNames(
          'bg-white z-10 rounded-3xl py-6 absolute w-52 drop-shadow-lg font-poppins h-72 overflow-scroll',
          {
            hidden: !isSelectingCountry,
          }
        )}
      >
        {Object.entries(countries).map(([key, value]) => (
          <li
            className={classNames(
              'text-center px-4 py-2 md:hover:bg-neutral-100 cursor-pointer'
            )}
            onClick={() => {
              onClickCountry(key)
            }}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  )
}
