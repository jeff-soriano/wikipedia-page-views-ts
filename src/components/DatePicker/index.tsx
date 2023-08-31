import ReactDatePicker from 'react-datepicker'
import calendar from '../../images/calendar.svg'
import InputButton from '../InputButton'

interface Props {
  date: Date
  onChange: (date: Date) => void
  isSelectingDate: boolean
  onClick: () => void
  onCalendarClose: () => void
  onCalendarOpen: () => void
}
export default function DatePicker({
  date,
  onChange,
  isSelectingDate,
  onClick,
  onCalendarClose,
  onCalendarOpen,
}: Props) {
  return (
    <ReactDatePicker
      selected={date}
      onChange={onChange}
      customInput={
        <InputButton
          isSelecting={isSelectingDate}
          onClick={onClick}
          svgSrc={calendar}
          svgAlt="calendar"
          label="DATE"
          value={date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'UTC',
          })}
        />
      }
      onCalendarClose={onCalendarClose}
      onCalendarOpen={onCalendarOpen}
    />
  )
}
