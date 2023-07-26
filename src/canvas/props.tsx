import type {ReactSVGElement} from 'react'

export type TileShapeProps = {
  x: number,
  y: nubmer,
  rot: number,
} & ReactSVGElement


export type ActorProps = {
  x: number,
  y: nubmer,
} & ReactSVGElement

export type MoveBtnProps = {
  x: number,
  y: number,
  c: string
} & ReactSVGElement
