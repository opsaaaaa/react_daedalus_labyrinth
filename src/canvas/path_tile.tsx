import {Tile} from '../game/tile'
import {Corner} from './corner'
import {Joint} from './joint'
import {Line} from './line'
import {Cross} from './cross'
// import {TileShapeProps} from './props'
import type {ReactSVGElement} from 'react'

const TILE_SHAPE = [
  Corner,
  Joint,
  Line,
  Cross,
]

export function PathTile({t,...props}: {t: Tile} & ReactSVGElement) {
  const Tile: typeof Corner = TILE_SHAPE[t.kind.shape] || Corner

  return (
    <Tile x={t.x} y={t.y} rot={t.kind.rot} {...props}/>
  )

}
