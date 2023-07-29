import {ReactNode} from 'react'
import {SIZE} from './const'

type Props = {
  children: ReactNode,
  w: number,
  h: number,
}

const PADDING = 4

export function SvgCanvas({children, w, h}: Props) {
  return (
    <svg
    className='canvas'
    viewBox={`${-SIZE - PADDING} ${-SIZE - PADDING} ${((w+2)*SIZE) + (PADDING*2)} ${((h+2)*SIZE) + (PADDING*2)}
    `}
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  )
}


