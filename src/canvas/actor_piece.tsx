// import {Tile} from '../game/tile'
// import {Corner} from './corner'
// import {Joint} from './joint'
// import {Line} from './line'
// import {Cross} from './cross'
// import {TileShapeProps} from './props'
import {Actor} from '../game/actor'
import {Minotaur} from './minotaur'
import {PlayerGreen} from './player_green'
import {PlayerBlue} from './player_blue'
import {PlayerOrange} from './player_orange'
import {SvgProps} from './props'

const ACTOR_SHAPE = [
  Minotaur,
  PlayerGreen,
  PlayerBlue,
  PlayerOrange,
]

// React.ButtonHTMLAttributes<HTMLButtonElement>
// HTMLAttributes<HTMLDivElement>
// HTMLAttributes<HTMLDivElement>

// SVGAttributes<SVGElement>
type Props = {a: Actor} & SvgProps

export function ActorPiece({a,...props}:  Props) {
  const Piece: typeof Minotaur = ACTOR_SHAPE[a.kind.shape] || Minotaur

  return (
    <Piece x={a.tile.x} y={a.tile.y} rot={0} className={a.anim} {...props}/>
  )

}
