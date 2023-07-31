

/*
  board size
  turn order?
  number of players.
*/

export type SettingsProps = {
  width: number,
  height: number,
  player_count: number,
  player_steps: number,
  minotaur_steps: number,
  // change is to detect when the settins have change within thins like useMemo
  change: boolean,
  sandbox_mode: boolean,

}

export const settings: SettingsProps = {
  width: 5,
  height: 5,
  player_count: 2,
  player_steps: 2,
  minotaur_steps: 4,
  change: false,
  sandbox_mode: false,
}


