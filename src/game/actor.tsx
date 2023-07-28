import {Tile} from './tile'


export type ActorKind = {
  color: string,
  steps: number,
  shape: ACTOR_SHAPE,
}

export enum ACTOR_ANIM {
  IDLE = 'anim-idle',
  DEATH = 'anim-death',
  WIN = 'anim-win',
  WALK = 'anim-walk',
}

export enum ACTOR_STATE {
  ALIVE,
  DEAD,
  WON,
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

let id = 0

export class Actor {
  id: number;
  state: ACTOR_STATE;
  kind: ActorKind;
  anim: ACTOR_ANIM
  tile: Tile;
  moves: Tile[];

  constructor(tile: Tile) {
    this.id = id
    this.kind = ACTOR_KIND[id % 4]
    this.tile = tile
    this.moves = []
    this.state = ACTOR_STATE.ALIVE
    this.anim = ACTOR_ANIM.IDLE
    id++;
  }

  is_minotaur(): boolean {
    return this.kind.shape === ACTOR_SHAPE.MINOTAUR
  }

  is_alive(): boolean {
    return this.state === ACTOR_STATE.ALIVE
  }

  win(): void {
    this.state = ACTOR_STATE.WON
    this.anim = ACTOR_ANIM.WIN
    this.moves = []
  }

  die(): void {
    this.state = ACTOR_STATE.DEAD
    this.anim = ACTOR_ANIM.DEATH
    this.moves = []
  }
}

export function create_actor(tile: Tile) {
  return new Actor(tile)
}


export function create_actor_list(tiles: Tile[]) {
  return tiles.map((tile)=>(create_actor(tile)))
}

