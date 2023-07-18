import type {Actor, Moves, ActorKind} from './game/actor'
import {ACTOR_KIND, ACTOR_INFO} from './game/actor'

import type {Tile, TileKind} from './game/tile'
import {TILE_INFO} from './game/tile'

import type {InsertArrowBtn} from './game/btn'

type CompassType = {
  x: number,
  y: number,
  bw: number,
  fw: number,
}

const COMPASS = [
  // top, right, bottom, left
  // fw and bw, forwards backwards;
  // fw and bw are indexes for on array of valid direction given a kind of tile.
  // ie. nav: [true, false, true, false]
  {x: 0, y: -1, fw: 0, bw: 2},
  {x: 1, y: 0, fw: 1, bw: 3},
  {x: 0, y: 1, fw: 2, bw: 0},
  {x: -1, y: 0, fw: 3, bw: 1},
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
 
  selected_actor: Actor | undefined;

  goal: Tile;

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

    this.selected_actor = undefined

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

    this.build_actors_moves()


    this.goal = this.cells[Math.floor((this.size-1) /2)]
  }

  rotate_hand(): void {
    const hand = this.get_hand()
    if (hand.kind.next) {
      hand.kind = hand.kind.next
    }
  }

  is_hand(tile: Tile): bool {
    return this.get_hand().id === tile.id
  }

  move_actor(actor, tile): void {
    if(actor.moves.includes(tile)) {
      actor.tile = tile
      // this.build_actor_moves(actor)
      actor.moves = []
      this.selected_actor = undefined
    }
  }

  select_actor(actor: Actor) {
    if (this.selected_actor && this.selected_actor.id === actor.id) {
      this.selected_actor = undefined
    } else {
      this.selected_actor = actor
    }
  }

  build_actors_moves(): void {
    this.actors.forEach((actor)=>{
      this.build_actor_moves(actor)
    })
  }

  build_actor_moves(actor: Actor): void {

    const seen = new Array(this.size).fill(false)

    // get the area of a dimond shape by its radious on a grid
    // new Array(Math.ceil((((actor.steps - .5)*2)**2)/2))
    
    actor.moves = []
    seen[this.pos(actor.tile.x,actor.tile.y)] = true
    this.build_actor_moves_r(actor, actor.tile, seen, 0)
  }

  private build_actor_moves_r(actor: Actor, tile: Tile, seen: bool[], depth: number): void {
    // base case
    if (depth >= actor.kind.steps) { return }

    let cursor: Tile
    let x: number = 0
    let y: number = 0
    let p: number = 0
    let compass: CompassType

    for(let i = 0; i < COMPASS.length; i++) {
      compass = COMPASS[i]
      x = compass.x + tile.x
      y = compass.y + tile.y
      p = this.pos(x,y)

      if(this.in_bounds(x,y) && !seen[p]) {
        cursor = this.cells[p]
        
        if(tile.kind.nav[compass.fw] && cursor.kind.nav[compass.bw]) {
          seen[p] = true
          actor.moves.push(cursor)
          this.build_actor_moves_r(actor, cursor, seen, depth + 1)
        }
      }


    }

  }

  insertSlot({x, y, id}: InsertArrowBtn): void {
    if(this.last_insert !== id) {
      const s = this.width + this.height
      this.last_insert = (id + s) % (s*2)
      this.insert(x,y)
      this.build_actors_moves()
      this.selected_actor = undefined
    } else {
      // TODO: display a toast notise to the user
    }
  }

  private insert(x:number, y:number): void {
    let compass = this.get_compass(x,y)
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
    if(y < 0) { return COMPASS[2] }
    if(x >= this.width) { return COMPASS[3] }
    if(y >= this.height) { return COMPASS[0] }
    if(x < 0) { return COMPASS[1] }
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

  private rand_tile_kind(): TileKind {
    return TILE_INFO[Math.floor( Math.random()*(TILE_INFO.length) )]
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
    this.actors[0] = this.init_actor(0,ACTOR_KIND.MINOTAUR, 0, 0, true)
    this.actors[1] = this.init_actor(1,ACTOR_KIND.GREEN, this.width - 1, 0, true)
    this.actors[2] = this.init_actor(2,ACTOR_KIND.BLUE, 0, this.height - 1, true)
    this.actors[3] = this.init_actor(3,ACTOR_KIND.ORANGE, this.width - 1, this.height - 1, true)
  }

  private init_actor(id: number, kind: ActorKind, x: number, y: number, human: boolean = true): Actor {
    return {moves: [],id, kind, tile: this.cells[this.pos(x,y)], human }
  }

}
