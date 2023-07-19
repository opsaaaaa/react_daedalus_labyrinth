import minotaurSvg from '/minotaur.svg'
import playerGreenSvg from '/player_green.svg'
import playerBlueSvg from '/player_blue.svg'
import playerOrangeSvg from '/player_orange.svg'


export type Actor = {
  id: number,
  kind: ActorKind,
  tile: TileType,
  human: boolean,
  moves: TileType[],
}

export type ActorKind = {
  img: typeof minotaurSvg,
  color: string,
  steps: number,
}


export type Move = {
  tile: TileType,
}


export const ACTOR_KIND = {
  MINOTAUR: { img: minotaurSvg, color: 'red', steps: 3 },
  GREEN: { img: playerGreenSvg, color: 'green', steps: 2 },
  BLUE: { img: playerBlueSvg, color: 'blue', steps: 2 },
  ORANGE: { img: playerOrangeSvg, color: 'orange', steps: 2 },
}

// export const ACTOR_INFO: ActorInfo[] = [
//   { img: minotaurSvg, color: 'red', steps: 4 },
//   { img: playerGreenSvg, color: 'green', steps: 2 },
//   { img: playerBlueSvg, color: 'blue', steps: 2 },
//   { img: playerOrangeSvg, color: 'orange', steps: 2 },
// ]

