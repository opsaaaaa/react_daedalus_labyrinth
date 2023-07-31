

/*
  board size
  turn order?
  number of players.
*/

export type SettingsProps = {
  width: number,
  height: number,
  player_count: number,
  player_step: number,
  minotaur_step: number,
  // change is to detect when the settins have change within thins like useMemo
  change: boolean,
  sandbox_mode: boolean,

}

export const settings: SettingsProps = {
  width: 7,
  height: 7,
  player_count: 4,
  player_step: 2,
  minotaur_step: 5,
  change: false,
  sandbox_mode: false,
}


