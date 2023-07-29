import {SIZE} from './const'
import {ActorProps} from './props'

export function Flag({x,y,rot,...props}: ActorProps) {
  return (
    <g 
      transform={`translate(${x*SIZE},${y*SIZE - 48}) rotate(0)`}
      className="actor origin-piece anim-transform click-through"
      {...props}
    >
      <ellipse
      className="brown-1"
      cx="24"
      cy="81.125"
      rx="11"
      ry="6.8749943"
      />
      <circle
      className="brown-1"
      cx="16"
      cy="25"
      r="2"
      />
      <path
      className="brown-1"
      d="m 17,27 c 24,-3 13,17 38,13 -3,4 -3,9 -11,11 4,5 7,2 13,1 -16,22 -16,0 -36,11 z"
      />
      <path
      className="white-1"
      d="m 17,27 c 24,-3 13,17 38,13 -3,4 -4,7 -12,9 4,5 8,4 14,3 -17,20 -16,-5 -36,6 z"
      />
      <path
      className="gray-1"
      d="M 22,80 16,24 h 2 l 8,56 c -1.36155,1.37978 -2.69297,1.28621 -4,0 z"
      />
      <circle
      className="white-1"
      cx="17"
      cy="24"
      r="2"
      />
      <path
      className="brown-1"
      d="M 22,80 18,71 16,24 Z"
      />
    </g>
  )
}


