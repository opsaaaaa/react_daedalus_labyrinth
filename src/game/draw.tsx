import { Board } from '../board'

import type { Tile, TileKind } from './tile'
import { TILE_INFO } from './tile'

import type {Actor} from './actor'
import {ACTOR_KIND, ACTOR_INFO} from './actor'


import type {InsertArrowBtn} from './btn'

export function tiles<T>(b: Board, fn: (t: Tile)=>T): T[] {
  let out: T[] = new Array(b.size)
  for(let i = 0; i < b.size; i++){
    out[i] = fn(b.tiles[i])
  }
  return out
}


export function actors<T>(b: Board, fn: (a: Actor)=>T): T[] {
  let out: T[] = new Array(b.actors.length)
  for(let i = 0; i < b.actors.length; i++) {
    out[i] = fn(b.actors[i])
  }
  return out;
}

export function actors_moves<T>(b: Board, fn: (a: Actor, m: Tile)=>T): T[] {
  let out: T[] = new Array(b.size)
  for(let a = 0; a < b.actors.length; a++) {
    const actor = b.actors[a]
    for(let m = 0; m < actor.moves.length; m++) {
      out.push(fn(actor, actor.moves[m]))
    }
  }
  return out;
}


export function rotate_hand_btn<T>(b: Board,fn: (a: {disabled: bool, x: number, y: number})=>T): T {
  return fn({x: b.width, y: b.height, disabled: false})
}

export function insert_btns<T>(b: Board,fn: (a: InsertArrowBtn)=>T): T[] {
    // Walk around the board in a square and output the insert arrows.
    // The order is important because math is used to get the oposite arrow.

    let out: T[] = new Array(b.width*2 + b.height*2)

    let id = 0
    let x = 0
    let y = -1
    let rot = 0

    for(; x < b.width; x++) {
      out[id] = fn({rot,id, x, y, disabled: id === b.last_insert})
      id++;
    }
    y++
    rot += 90
    for(; y < b.height; y++) {
      out[id] = fn({rot,id, x, y, disabled: id === b.last_insert})
      id++;
    }
    x = 0
    rot += 90
    for(; x < b.width; x++) {
      out[id] = fn({rot,id, x, y, disabled: id === b.last_insert})
      id++;
    }
    y = 0
    x = -1
    rot += 90
    for(; y < b.height; y++) {
      out[id] = fn({rot,id, x, y, disabled: id === b.last_insert})
      id++;
    }

    return out
  }



