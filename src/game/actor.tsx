import minotaurSvg from '/minotaur.svg'
import playerGreenSvg from '/player_green.svg'
import playerBlueSvg from '/player_blue.svg'
import playerOrangeSvg from '/player_orange.svg'


export type Actor = {
  kind: 0 | 1 | 2 | 3,
  tile: Tile,
  human: boolean,
  moves: Tile[],
}

export type ActorInfo = {
  img: typeof minotaurSvg,
  color: string,
  steps: number,
}


export type Move = {
  tile: Tile,
  quality
}


export const ACTOR_KIND = {
  MINOTAUR: 0,
  GREEN: 1,
  BLUE: 2,
  ORANGE: 3,
}

export const ACTOR_INFO: ActorInfo[] = [
  { img: minotaurSvg, color: 'red', steps: 4 },
  { img: playerGreenSvg, color: 'green', steps: 2 },
  { img: playerBlueSvg, color: 'blue', steps: 2 },
  { img: playerOrangeSvg, color: 'orange', steps: 2 },
]

