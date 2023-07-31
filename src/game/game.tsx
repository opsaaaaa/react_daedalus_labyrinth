import {Board} from './board'
import {Tile} from './tile'
import {Actor} from './actor'
import {InsertBtns, InsertArrowBtn} from './insert_btns'
import {create_actor_list} from "../game/actor"
import {settings} from './settings'

export enum GAME_STATE {
  PLAY_MOVE,
  PLAY_SLIDE,
  GAME_OVER,
  SETUP,
}

export class Game {
  board: Board;
  insert_btns: InsertBtns;

  actors: Actor[];
  selected_actor: Actor | undefined;
  turn_actor: Actor;

  goal: Tile;

  state: GAME_STATE;

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
    this.turn_actor = this.actors[0]

    this.goal = this.board.cell( Math.floor((w - 1)/2), Math.floor((h - 1)/2) )

    this.build_actor_moves()

    this.state = GAME_STATE.PLAY_SLIDE
    console.log(settings)
  }

  is_state_play_move(): boolean {
    return this.state === GAME_STATE.PLAY_MOVE
  }

  is_state_play_slide(): boolean {
    return this.state === GAME_STATE.PLAY_SLIDE
  }

  build_actor_moves(): void {
    for(const a of this.actors) {
      if(a.is_alive()) {
        this.build_single_actor_moves(a)
      }
    }
  }

  build_single_actor_moves(a: Actor): void {
    const steps = a.is_minotaur() ? settings.minotaur_steps : settings.player_steps
    a.moves = this.board.get_moves(a.tile.x,a.tile.y,steps)
  }

  select_actor(a: Actor): void {
    if(this.selected_actor && this.selected_actor.id === a.id) {
      this.selected_actor.moves = []
      this.selected_actor = undefined
      this.check_change_state_play_slide()
    } else {
      this.selected_actor = a
    }
  }

  move_selected_actor(m: Tile): void {
    if (!this.is_state_play_move()) {return}
    if (!this.selected_actor) {return}

    this.selected_actor.tile = m
    this.selected_actor.moves = []

    this.check_win(this.selected_actor) ||
    this.check_death(this.selected_actor) ||
    this.check_revive(this.selected_actor)

    this.selected_actor = undefined

    this.check_change_state_play_slide()
  }

  insert_with_btn(btn: InsertArrowBtn): void {
    if (!this.is_state_play_slide()) {return}

    this.board.insert(btn.x,btn.y)
    this.insert_btns.disable_opposing_btn(btn.id)
    this.build_actor_moves()

    this.next_actor_turn()

    this.state = GAME_STATE.PLAY_MOVE
  }

  private next_actor_turn(): void {
    // get the next actor, stating from the current actors turn, who is alive, without creating a infinite loop.
    let i = 0
    do {
      this.turn_actor = this.actors[(this.turn_actor.id + 1) % this.actors.length]
      i++
    } while(i < this.actors.length && !this.turn_actor.is_alive())
  }

  private check_change_state_play_slide(): boolean {
    if (this.actors.find(a=>a.moves.length > 0)) {return false}
    this.state = GAME_STATE.PLAY_SLIDE

    if (!this.turn_actor.is_alive()) {
      this.next_actor_turn()
    }
    return true
  }

  private check_win(a: Actor): boolean {
    if (a.is_minotaur()) {return false }
    if (this.goal.id !== a.tile.id) { return false }
    a.win()
    return true
  }

  private check_death(a: Actor): boolean {
    if(a.is_minotaur()) {
      const kill = this.actors.find(k=>(a.tile.id === k.tile.id && !k.is_minotaur() && k.is_alive()))
      console.log({kill, a, m: 'kill'})
      if (!kill) {return false}
      kill.die()
      return true
    } else {
      const mino = this.get_minotar()
      if(mino && mino.tile.id !== a.tile.id) { return false }
      a.die()
      return true
    }
  }

  check_revive(a: Actor): boolean {
    if (a.is_minotaur()) {return false}
    const r = this.actors.find(r=>(a.tile.id === r.tile.id && r.is_dead()))
    if (!r) {return false}

    r.revive()
    this.build_single_actor_moves(r)
    return true
  }

  get_minotar(): Actor | undefined {
    // this minotaur will be the first element, but im not going to assume that.
    return this.actors.find(a=>a.is_minotaur())
  }

}


