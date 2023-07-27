import {Board} from './board'
import {Tile} from './tile'
import {Actor} from './actor'
import {InsertBtns} from './insert_btns'
import {create_actor_list} from "../game/actor"

// TODO: implement some kind of settings for board size.
// export const board = new Board(5,5)

// export const turns = 0

// export function insert

export class Game {
  board: Board;
  insert_btns: InsertBtns;

  actors: Actor[];
  selected_actor: Actor | undefined;

  goal: Tile;

  constructor(w:number,h:number) {
    this.board = new Board(w,h)
    this.insert_btns = new InsertBtns(w,h)
    
    this.actors = create_actor_list([
      this.board.cell(0,0),
      this.board.cell(w - 1, 0),
      this.board.cell(0, h - 1),
      this.board.cell(w - 1, h - 1)
    ])

    this.selected_actor = undefined

    this.goal = this.board.cell( Math.floor((w - 1)/2), Math.floor((h - 1)/2) )

    this.build_actor_moves()
  }

  build_actor_moves(): void {
    for(const a of this.actors) {
      a.moves = this.board.get_moves(a.tile.x,a.tile.y,a.kind.steps)
    }
  }

  select_actor(a: Actor): void {
    if(this.selected_actor && this.selected_actor.id === a.id) {
      this.selected_actor = undefined
    } else {
      this.selected_actor = a
    }
  }

  move_selected_actor(m: Tile): void {
    this.selected_actor.tile = m
    this.selected_actor.moves = []
    this.selected_actor = undefined
  }

  insert_with_btn(btn: InsertBtns): void {
    this.board.insert(btn.x,btn.y)
    this.insert_btns.disable_opposing_btn(btn.id)
    this.build_actor_moves()
  }


}



  // const goal = useMemo(()=>(board.cell( Math.floor((b.width - 1)/2), Math.floor((b.height - 1)/2) )),[b])

  // const hand = board.hand()



// start or resume game
