import type {SVGAttributes} from 'react'

// export type SvgProps = SVGAttributes<SVGElement>
export type SvgProps = Omit<SVGAttributes<SVGElement>, 'x' | 'y'>
// type Props = {a: Actor} & 

export type TileShapeProps = {
  x: number,
  y: number,
  rot: number,
} & SvgProps


export type ActorProps = {
  x: number,
  y: number,
  rot: number,
} & SvgProps

export type MoveBtnProps = {
  x: number,
  y: number,
  c: string
} & SvgProps


