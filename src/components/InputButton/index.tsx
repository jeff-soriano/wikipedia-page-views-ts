var classNames = require('classnames')

interface Props {
  isSelecting: boolean
  onClick: () => void
  svgSrc: string
  svgAlt: string
  label: string
  value: string | number
}

export default function InputButton({
  isSelecting,
  onClick,
  svgSrc,
  svgAlt,
  label,
  value,
}: Props) {
  return (
    <button
      className={classNames(
        {
          'bg-slate-100': isSelecting,
          'hover:bg-slate-50': !isSelecting,
        },
        'flex items-center rounded-full px-3 py-2 font-poppins'
      )}
      onClick={onClick}
    >
      <img src={svgSrc} alt={svgAlt} />
      <div className="text-left ml-4 mr-6">
        <div className="text-xs">{label} ^</div>
        <div>{value}</div>
      </div>
    </button>
  )
}
