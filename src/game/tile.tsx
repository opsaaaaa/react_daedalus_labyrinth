const cornerSvg = '/corner_path.svg'
const jointSvg = '/joint_path.svg'
const lineSvg = '/line_path.svg'
const crossSvg = '/cross_path.svg'


export type Tile = {
  kind: TileKind,
  x: number,
  y: number,
  id: number,
  is_hand: boolean,
}


export type TileKind = {
  nav: boolean[],
  rot: number,
  img: string,
  next?: TileKind,
}

export const TILE_INFO: TileKind[] = [
  // nav: [ top, right, bottom, left]
  {
    nav: [false, true, true, false],
    rot: 0,
    img: cornerSvg,
  },{
    nav: [false, false, true, true],
    rot: 90,
    img: cornerSvg,
  },{
    nav: [true, false, false, true],
    rot: 180,
    img: cornerSvg,
  },{
    nav: [true, true, false, false],
    rot: 270,
    img: cornerSvg,
  },{
    nav: [true, true, true, false],
    rot: 0,
    img: jointSvg,
  },{
    nav: [false, true, true, true],
    rot: 90,
    img: jointSvg,
  },{
    nav: [true, false, true, true],
    rot: 180,
    img: jointSvg,
  },{
    nav: [true, true, false, true],
    rot: 270,
    img: jointSvg,
  },{
    nav: [true, false, true, false],
    rot: 0,
    img: lineSvg,
  },{
    nav: [false, true, false, true],
    rot: 90,
    img: lineSvg,
  },{
    nav: [true, true, true, true],
    rot: 0,
    img: crossSvg,
  },
]

TILE_INFO[0].next = TILE_INFO[1]
TILE_INFO[1].next = TILE_INFO[2]
TILE_INFO[2].next = TILE_INFO[3]
TILE_INFO[3].next = TILE_INFO[0]

TILE_INFO[4].next = TILE_INFO[5]
TILE_INFO[5].next = TILE_INFO[6]
TILE_INFO[6].next = TILE_INFO[7]
TILE_INFO[7].next = TILE_INFO[4]

TILE_INFO[8].next = TILE_INFO[9]
TILE_INFO[9].next = TILE_INFO[8]

export function rand_tile_kind(): TileKind {
  return TILE_INFO[Math.floor( Math.random()*(TILE_INFO.length) )]
}

export function create_tile(i: number, w: number): Tile {
  return {
    kind: rand_tile_kind(),
    x: i % w,
    y: Math.floor(i / w),
    id: i,
    is_hand: false,
  } as Tile
}



