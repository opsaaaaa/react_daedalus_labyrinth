import {ReactNode} from 'react'
import {SIZE} from './const'

type Props = {
  children: ReactNode,
  w: number,
  h: number,
}

export function SvgCanvas({children, w, h}: {children: ReactNode}) {
  return (
    <svg
    className='canvas'
    viewBox={`${-SIZE} ${-SIZE} ${(w+2)*SIZE} ${(h+2)*SIZE}`}
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  )
}


