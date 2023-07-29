// import { Board } from '../board'

// import type { TileType, TileKind } from './tile'
// import { TILE_INFO } from './tile'

import {Actor} from './actor'
import {Tile} from './Tile'
// import {ACTOR_KIND, ACTOR_INFO} from './actor'
// import 

// import type {InsertArrowBtn} from './btn'

import {Game} from './game'

export class Draw {
  game: Game;

  constructor(g: Game) {
    this.game = g
  }

  select_actor_btns<T = any>(fn: (a: Actor, click: ()=>void)=>T): T[] {
    return this.game.actors
      .filter(a=>(a.moves.length > 0))
      .map(a=>fn(a, ()=>{this.game.select_actor(a)}))
  }

  move_actor_btns<T = any>(fn: (m: Tile, click: ()=>void)=>T): T[] {
    if (!this.game.selected_actor) {return []}
    return this.game.selected_actor.moves
      .map(m=>fn(m,()=>{this.game.move_selected_actor(m)}))
  }
}


// export function tiles<T>(b: Board, fn: (t: TileType)=>T): T[] {
//   let out: T[] = new Array(b.size)
//   for(let i = 0; i < b.size; i++){
//     out[i] = fn(b.tiles[i])
//   }
//   return out
// }


// export function actors<T>(b: Board, fn: (a: Actor)=>T): T[] {
//   let out: T[] = new Array(b.actors.length)
//   for(let i = 0; i < b.actors.length; i++) {
//     out[i] = fn(b.actors[i])
//   }
//   return out;
// }

// export function actor_move_btns<T>(b: Board, fn: (a: Actor, m: TileType)=>T): T[] {
//   let out: T[] = new Array()
//   if(b.selected_actor) {
//     const actor = b.selected_actor
//     for(let m = 0; m < actor.moves.length; m++) {
//       out.push(fn(actor, actor.moves[m]))
//     }
//   }
//   // for(let a = 0; a < b.actors.length; a++) {
//   //   const actor = b.actors[a]
//   //   for(let m = 0; m < actor.moves.length; m++) {
//   //     out.push(fn(actor, actor.moves[m]))
//   //   }
//   // }
//   return out;
// }

// export function goal<T>(b: Board, fn: TileType): T {
//   return fn(b.goal)
// }

// export function select_actor_btns<T>(b: Board, fn: (a: Actor)=>T): T[] {
//   let out: T[] = []
//   if(!b.selected_actor) {
//     for(let i = 0; i < b.actors.length; i++) {
//       const actor = b.actors[i]
//       if (actor.moves.length > 0) {
//         out.push(fn(actor))
//       }
//     }
//     return out
//   } else {
//     return [fn(b.selected_actor)]
//   }
//   // return b.actors.map(fn)
// }

// export function rotate_hand_btn<T>(b: Board,fn: (a: {disabled: bool, x: number, y: number})=>T): T {
//   return fn({x: b.width, y: b.height, disabled: false})
// }

// export function insert_btns<T>(b: Board,fn: (a: InsertArrowBtn)=>T): T[] {
//   // Walk around the board in a square and output the insert arrows.
//   // The order is important because math is used to get the oposite arrow.

//   let out: T[] = new Array(b.width*2 + b.height*2)

//   let id = 0
//   let x = 0
//   let y = -1
//   let rot = 0

//   for(; x < b.width; x++) {
//     out[id] = fn({rot,id, x, y, disabled: id === b.last_insert})
//     id++;
//   }
//   y++
//   rot += 90
//   for(; y < b.height; y++) {
//     out[id] = fn({rot,id, x, y, disabled: id === b.last_insert})
//     id++;
//   }
//   x = 0
//   rot += 90
//   for(; x < b.width; x++) {
//     out[id] = fn({rot,id, x, y, disabled: id === b.last_insert})
//     id++;
//   }
//   y = 0
//   x = -1
//   rot += 90
//   for(; y < b.height; y++) {
//     out[id] = fn({rot,id, x, y, disabled: id === b.last_insert})
//     id++;
//   }

//   return out
// }




