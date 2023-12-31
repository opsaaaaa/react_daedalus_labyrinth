import {Tile} from './tile'


export type ActorKind = {
  color: string,
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
  {shape: ACTOR_SHAPE.MINOTAUR, color: 'red'},
  {shape: ACTOR_SHAPE.GREEN, color: 'green'},
  {shape: ACTOR_SHAPE.BLUE, color: 'blue'},
  {shape: ACTOR_SHAPE.ORANGE, color: 'orange'},
]

export class Actor {
  id: number;
  state: ACTOR_STATE;
  kind: ActorKind;
  anim: ACTOR_ANIM
  tile: Tile;
  moves: Tile[];

  constructor(tile: Tile, id: number = 0) {
    this.id = id
    this.kind = ACTOR_KIND[id % 4]
    this.tile = tile
    this.moves = []
    this.state = ACTOR_STATE.ALIVE
    this.anim = ACTOR_ANIM.IDLE
  }

  is_minotaur(): boolean {
    return this.kind.shape === ACTOR_SHAPE.MINOTAUR
  }

  is_alive(): boolean {
    return this.state === ACTOR_STATE.ALIVE
  }

  is_dead(): boolean {
    return this.state === ACTOR_STATE.DEAD
  }

  has_won(): boolean {
    return this.state === ACTOR_STATE.WON
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

  revive(): void {
    this.state = ACTOR_STATE.ALIVE
    this.anim = ACTOR_ANIM.IDLE
  }
}

export function create_actor(tile: Tile, id: number = 0) {
  return new Actor(tile, id)
}


export function create_actor_list(tiles: Tile[]) {
  return tiles.map((tile, id)=>(create_actor(tile, id)))
}

