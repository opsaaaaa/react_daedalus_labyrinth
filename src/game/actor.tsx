import {Tile} from './tile'


export type Actor = {
  id: number,
  kind: ActorKind,
  tile: Tile,
  moves: Tile[],
}

export type ActorKind = {
  color: string,
  steps: number,
  shape: ACTOR_SHAPE,
}

export enum ACTOR_SHAPE {
  MINOTAUR,
  GREEN,
  BLUE,
  ORANGE,
}

export const ACTOR_KIND: ActorKind[] = [
  {shape: ACTOR_SHAPE.MINOTAUR, color: 'red', steps: 3 },
  {shape: ACTOR_SHAPE.GREEN, color: 'green', steps: 2 },
  {shape: ACTOR_SHAPE.BLUE, color: 'blue', steps: 2 },
  {shape: ACTOR_SHAPE.ORANGE, color: 'orange', steps: 2 },
]

let id = -1

export function create_actor(tile: Tile) {
  id++;
  return {id, kind: ACTOR_KIND[id % 4], tile, moves: []}
}

