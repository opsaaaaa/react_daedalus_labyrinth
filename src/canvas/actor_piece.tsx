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
import type {ReactSVGElement} from 'react'

const ACTOR_SHAPE = [
  Minotaur,
  PlayerGreen,
  PlayerBlue,
  PlayerOrange,
]

export function ActorPiece({a,...props}: {a: Actor} & ReactSVGElement) {
  const Piece: typeof Minotaur = ACTOR_SHAPE[a.kind.shape] || Minotaur

  return (
    <Piece x={a.tile.x} y={a.tile.y} {...props}/>
  )

}
