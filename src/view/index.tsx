import {MenuView} from './menu'
import {GameView} from './game'
import {SettingsView} from './settings'
export {MenuView, GameView}

export const VIEWS = {
  menu: MenuView,
  game: GameView,
  settings: SettingsView,
}

export type VIEWSkeys = 'menu' | 'game' | 'settings'

export type ViewNode = typeof MenuView


