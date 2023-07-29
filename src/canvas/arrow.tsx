import {SIZE} from './const'
import {TileShapeProps} from './props'

export function Arrow({x,y,rot,...props}: TileShapeProps) {
  return (
    <g 
      transform={`translate(${x*SIZE},${y*SIZE}) rotate(${rot})`}
      className="btn origin"
      {...props}
    >
      <rect
      className="transparent"
      height="64"
      width="64"
      x="0"
      y="0"
      />
      <path
      d="m 8,32 c -2.20105,2.203496 -2.2022748,5.797725 0,8 8,8 24,16 24,16 0,0 16,-8 24,-16 2.202276,-2.202276 2.201052,-5.796504 0,-8 -2.201049,-2.203495 -5.798933,-2.203501 -8,0 -8,8 -14.498349,8 -16,8 -1.501652,0 -8,0 -16,-8 -2.40626,-2.293738 -5.95038,-2.104127 -8,0 z"
      />
    </g>
  )
}


