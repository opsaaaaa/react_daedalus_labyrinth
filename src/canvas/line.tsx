import {SIZE, STYLE} from './const'
import {PathRect} from './_path_rect'

type Props = {
  x: number,
  y: nubmer,
  rot: number,
}

export function Line({x,y,rot}: Props) {
  return (
    <g
    transform={`translate(${x*SIZE},${y*SIZE}) rotate(${rot})`}
    style={STYLE.TILE_GROUP}
    >
      <PathRect />

      <g 
      style={STYLE.DIRT}
      >
        <path
        d="m 50,61 h 5 c 3.2132,0 6,-2.7868 6,-6 V 9 C 61,5.7868 58.2132,3 55,3 h -5 z"
        />
        <path
        d="m 3,55 c 0,3.2132 2.78681,6 6,6 h 5 V 3 H 9 C 5.78681,3 3,5.7868 3,9 Z"
        />
      </g>
    </g>
  )
}











