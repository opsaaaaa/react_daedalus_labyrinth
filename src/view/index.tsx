import {MenuView} from './menu'
import {GameView} from './game'
import {SettingsView} from './settings'
import {GameOverView} from './gameover'

export const VIEWS = {
  menu: MenuView,
  game: GameView,
  settings: SettingsView,
  gameover: GameOverView,
}

// Aw the joys of typescript...
export type VIEWSkeys = 'menu' | 'game' | 'settings' | 'gameover'

export type ViewNode = typeof MenuView


