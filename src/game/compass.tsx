
export type CompassType = {
  x: number,
  y: number,
  bw: CARDINAL,
  fw: CARDINAL,
}

export const enum CARDINAL {
  TOP,
  RIGHT,
  BOTTOM,
  LEFT,
}

export const COMPASS: CompassType[] = [
  // fw and bw, forwards backwards for a given compass direction
  // ie. nav: [true, false, true, false]
  {x: 0, y: -1, fw: CARDINAL.TOP, bw: CARDINAL.BOTTOM},
  {x: 1, y: 0, fw: CARDINAL.RIGHT, bw: CARDINAL.LEFT},
  {x: 0, y: 1, fw: CARDINAL.BOTTOM, bw: CARDINAL.TOP},
  {x: -1, y: 0, fw: CARDINAL.LEFT, bw: CARDINAL.RIGHT},
]


