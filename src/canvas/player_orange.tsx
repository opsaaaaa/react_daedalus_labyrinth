import {SIZE} from './const'
import {PathRect} from './_path_rect'
import {ActorProps} from './props'

export function PlayerOrange({x,y,rot,className = '',...props}: ActorProps) {
  return (
    <g 
      transform={`translate(${x*SIZE},${y*SIZE - 48}) rotate(0)`}
      className={`actor origin-piece anim-transform click-through ${className}`}
      {...props}
    >
      <path
      className="brown-1"
      d="M 25.187605,41.98774 9.142665,76.43476 c 0,0 5.306381,13.78604 22.110618,13.78604 16.1914,0 24.21468,-16.0574 24.21468,-16.0574 L 35.931059,39.15485 Z"
      />
      <path
      className="brown-1"
      d="M 31.472327,10.89907 35.463915,5.36051 36.242763,12.70498 55.691003,8.2638 44.679962,20.57988 54.886893,31.56333 40.796961,32.74275 7.560691,32.9686 18.502932,21.4341 4.194895,5.37221 Z"
      />
      <ellipse
      className="brown-1"
      cx="31.285645"
      cy="33.127441"
      rx="13.982137"
      ry="13.997669"
      />
      <path
      className="orange-1"
      d="M 26.115028,48.29572 12.160096,76.44024 c 0,0 2.521366,11.82984 19.325605,11.82984 16.191402,0 23.671052,-14.10944 23.671052,-14.10944 L 37.435617,47.53135 c -3.18475,3.00662 -7.320259,1.5696 -11.320589,0.76437 z"
      />
      <ellipse
      className="orange-1"
      cx="31.675484"
      cy="32.863266"
      rx="12.670426"
      ry="12.558393"
      />
      <path
      className="brown-1"
      d="m 22.975526,27.85708 c 2.49328,1.95796 6.132679,2.38793 7.443257,5.92267 l -5.839831,6.55315 z"
      />
      <path
      className="brown-1"
      d="m 33.122891,33.42631 c 1.229944,-3.08416 4.501197,-4.42716 6.941494,-6.47895 l -2.190403,13.524 z"
      />
      <path
      className="brown-1"
      d="m 32.485079,46.32592 -0.442928,-3.56962 8.433274,0.32309 z"
      />
      <path
      className="brown-1"
      d="M 38.892039,49.30012 C 33.156827,57.372 23.997134,60.52237 15.586712,64.74957 l -1.551239,6.2092 c 9.75936,-5.06008 20.788749,-7.57345 28.428684,-16.88345 z"
      /> 
  </g>
  )
}


