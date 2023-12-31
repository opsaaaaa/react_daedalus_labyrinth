import {SIZE} from './const'
import {TileShapeProps} from './props'

export function Rotate({x,y,rot,...props}: TileShapeProps) {
  return (
    <g 
      transform={`translate(${x*SIZE},${y*SIZE}) rotate(${rot})`}
      className="btn origin"
      {...props}
      tabIndex={0}
    >
      <rect
      className="transparent"
      height="64"
      width="64"
      x="0"
      y="0"
      />
      <path
      d="M 58,32 C 58,21.501224 51.64882,11.996223 41.94922,7.9785156 32.24961,3.9608077 21.03899,6.1914785 13.615234,13.615234 6.191478,21.03899 3.960808,32.249614 7.978516,41.949219 11.996223,51.648823 21.50122,58 32,58 c 3.31371,0 6,-2.686292 6,-6 0,-3.313708 -2.68629,-6 -6,-6 C 26.3203,46 21.23993,42.604778 19.066406,37.357422 16.89288,32.110066 18.083457,26.115762 22.09961,22.099609 26.11576,18.083457 32.11007,16.89288 37.35742,19.066406 42.60478,21.239932 46,26.320303 46,32 c -3,0 -4,1 -4,4 0,2 10,9 10,9 0,0 10,-7 10,-9 0,-3 -1,-4 -4,-4 z"
      />
    </g>
  )
}




