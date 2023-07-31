
import type {InputHTMLAttributes} from 'react'

type Props = InputHTMLAttributes<HTMLInputElement> & {label: string}

export function RangeElement({label,value,...props}: Props) {
  return (
    <div className="input-group">
      <label>
        {label}
        <strong style={{float: 'right'}}>{value}</strong>
      </label>
      <input
      type="range"
      value={value}
      {...props}
      />
    </div>
  )
}

