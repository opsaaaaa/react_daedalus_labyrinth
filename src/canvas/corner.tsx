import {SIZE} from './const'
import {PathRect} from './_path_rect'
import {TileShapeProps} from './props'

export function Corner({x,y,rot, ...props}: TileShapeProps) {
  return (
    <g
    transform={`translate(${x*SIZE},${y*SIZE}) rotate(${rot})`}
    className="tile"
    {...props}
    >

      <PathRect />

      <path
      className="dirt"
      d="m 52,50 c -1,0 -2,1 -2,2 v 9 h 5 c 3,0 6,-3 6,-6 v -5 z"
      />

      <path
      className="dirt"
      d="M 9,3 C 5.7868,3 3,5.7868 3,9 v 46 c 0,3.2132 2.7868,6 6,6 h 5 V 24 C 14,18 18,14 24,14 H 61 V 9 C 61,5.7868 58.21321,3 55,3 Z"
      />

    </g>
  )
}


export default Corner
