import minotaurSvg from '/minotaur.svg'
import playerGreenSvg from '/player_green.svg'
import playerBlueSvg from '/player_blue.svg'
import playerOrangeSvg from '/player_orange.svg'


export type Actor = {
  kind: 0 | 1 | 2 | 3,
  tile: Tile,
  human: boolean,
}

export type ActorInfo = {
  img: typeof minotaurSvg
}


export const ACTOR_KIND = {
  MINOTAUR: 0,
  GREEN: 1,
  BLUE: 2,
  ORANGE: 3,
}

export const ACTOR_INFO: ActorInfo[] = [
  { img: minotaurSvg },
  { img: playerGreenSvg },
  { img: playerBlueSvg },
  { img: playerOrangeSvg },
]

