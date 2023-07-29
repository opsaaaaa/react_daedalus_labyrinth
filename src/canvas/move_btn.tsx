// import {Tile} from '../game/Tile'
// import {Actor} from '../game/Actor'

import {SIZE} from './const'
import {MoveBtnProps} from './props'

// export function MoveBtn({actor, tile}: {actor: Actor, tile: Tile}) {
export function MoveBtn({x,y,c,...props}: MoveBtnProps ) {
  return (
    <rect
    style={{
      color: c,
    }}
    className="move-btn"
    width="64"
    height="64"
    x={x * SIZE}
    y={y * SIZE}
    ry="14"
    rx="14"
    {...props}
    />
  )
}
