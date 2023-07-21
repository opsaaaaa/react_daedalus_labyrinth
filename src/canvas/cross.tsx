import {SIZE} from './const'
import {PathRect} from './_path_rect'
import {TileShapeProps} from './props'

export function Cross({x,y,rot,...props}: TileShapeProps) {
  return (
    <g
    transform={`translate(${x*SIZE},${y*SIZE}) rotate(${rot})`}
    className="tile"
    {...props}
    >
      <PathRect />

      <path
      className="dirt"
      d="m 52,14 c -1,0 -2,-1 -2,-2 V 3 h 5 c 3,0 6,3 6,6 v 5 z"
      />
      <path
      className="dirt"
      d="m 52,50 c -1,0 -2,1 -2,2 v 9 h 5 c 3,0 6,-3 6,-6 v -5 z"
      />
      <path
      className="dirt"
      d="m 12,14 c 1,0 2,-1 2,-2 V 3 H 9 C 6,3 3,6 3,9 v 5 z"
      />
      <path
      className="dirt"
      d="m 12,50 c 1,0 2,1 2,2 v 9 H 9 C 6,61 3,58 3,55 v -5 z"
      />

    </g>
  )
}

