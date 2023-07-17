import type {Actor} from './game/actor'
import {ACTOR_KIND} from './game/actor'

import type {Tile} from './game/tile'
import {TILE_INFO} from './game/tile'

import type {InsertArrowBtn} from './game/btn'

const COMPASS = [
  {x: 0, y: 1},
  {x: -1, y: 0},
  {x: 0, y: -1},
  {x: 1, y: 0},
]


export class Board {

  tiles: Tile[]; // Tiles ordered tile id
  cells: Tile[]; // Tiles ordered by placement on the board.
  // Initiall tiles and cells are they same, but the order changes as the game is played
  // The tiles is used to preserve rendering order
  // while cells is used to query tiles by location.
  // Both point to the same objects.
  // so manipulating the properties of a tile in one list will also update the item on the other.
  
  actors: Actor[]; // the players and the minotaur

  height: number;
  width: number;
  size: number;
  last_insert: number;

  constructor(h: number, w: number) {
    this.height = h
    this.width = w
    this.size = 1 + w*h
    
    this.tiles = new Array(this.size)
    this.cells = new Array(this.size)

    let t: Tile

    for(let i = 0; i < this.size; i++){
      t = this.init_tile(i)
      this.tiles[i] = this.cells[i] = t
    }
    
    t = this.cells[this.size-1]
    t.is_hand = true
    t.x = w
    t.y = h

    this.init_actors()

  }

  rotate_hand(): void {
    const hand = this.get_hand()
    if(hand.kind < 4) {
      hand.kind = (hand.kind + 1) % 4
    } else if (hand.kind < 8) {
      hand.kind = (hand.kind + 1) % 4 + 4
    } else if (hand.kind < 10) {
      hand.kind = (hand.kind + 1) % 2 + 8
    }
  }

  is_hand(tile: Tile): bool {
    return this.get_hand().id === tile.id
  }

  insertSlot({x, y, id}: InsertArrowBtn): void {
    if(this.last_insert !== id) {
      const s = this.width + this.height
      this.last_insert = (id + s) % (s*2)
      this.insert(x,y)
    } else {
      // TODO: display a toast notise to the user
    }
  }

  private insert(x:number, y:number): void {
    let compass = this.get_compass(x,y)
    console.log({compass})
    if(!compass) {return}
    x += compass.x
    y += compass.y

    let push: Tile = this.cells[this.size-1]
    let pull: Tile

    let p = 0;

    push.is_hand = false

    do {
      p = this.pos(x,y)

      push.y = y
      push.x = x

      pull = this.cells[p]
      this.cells[p] = push
      push = pull

      x += compass.x
      y += compass.y
    } while(this.in_bounds(x, y))

    push.is_hand = true
    push.x = this.width
    push.y = this.height
    this.cells[this.size-1] = push
  }

  private get_compass(x: number, y: number): {x: number, y: number} | undefined {
    if(y < 0) { return COMPASS[0] }
    if(x >= this.width) { return COMPASS[1] }
    if(y >= this.height) { return COMPASS[2] }
    if(x < 0) { return COMPASS[3] }
    return undefined;
  }

  private in_bounds(x: number, y: number): boolean {
    return x >= 0 && x < this.width && y >= 0 && y < this.height
  }

  get_hand(): Tile {
    return this.cells[this.size-1]
  }

  get_tile(id: number): Tile {
    return this.tiles[id]
  }

  get_cell(x:number, y:number): Tile {
    return this.cells[pos(x,y)]
  }

  get_last_cell(): Tile {
    return this.cells[this.size-1]
  }

  private rand_tile_kind(): number {
    return Math.floor( Math.random()*(TILE_INFO.length) )
    // the math shinanigans is to even out the wieghts for lines and corners
    // const v = Math.floor( Math.random()*(TILE_INFO.length+2) )
    // if(v >= TILE_INFO.length) {
    //   return v-3
    // }
    // return v 
  }

  private pos(x:number,y:number): number {
    return x + y * this.width
  }

  private init_tile(i: number): Tile {
      const kind = this.rand_tile_kind()
      return {
        kind: kind,
        x: i % this.width,
        y: Math.floor(i / this.width),
        id: i,
        is_hand: false,
      } as Tile
  }

  private init_actors(count: number = 4): void {
    this.actors = new Array(4)
    this.actors[0] = this.init_actor(ACTOR_KIND.MINOTAUR, 0, 0, true)
    this.actors[1] = this.init_actor(ACTOR_KIND.GREEN, this.width - 1, 0, true)
    this.actors[2] = this.init_actor(ACTOR_KIND.BLUE, 0, this.height - 1, true)
    this.actors[3] = this.init_actor(ACTOR_KIND.ORANGE, this.width - 1, this.height - 1, true)
  }

  private init_actor(kind: 0 | 1 | 2 | 3, x: number, y: number, human: boolean = true): Actor {
    return {kind, tile: this.cells[this.pos(x,y)], human }
  }

}
