import {MenuView} from './menu'
import {GameView} from './game'
export {MenuView, GameView}

export type VIEWSkeys = 'menu' | 'game'

export const VIEWS = {
  menu: MenuView,
  game: GameView,
}

export type ViewNode = typeof MenuView


