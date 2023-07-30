

/*
  board size
  turn order?
  number of players.
*/

export type SettingsProps = {
  width: number,
  height: number,
  players: number,
  player_step: number,
  minotaur_step: number,
}

export const settings: GameSettings = {
  width: 7,
  height: 7,
  players: 4,
  player_step: 2,
  minotaur_step: 5,
}


