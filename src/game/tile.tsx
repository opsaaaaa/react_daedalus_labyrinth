
export type TileKind = {
  nav: boolean[],
  rot: number,
  shape: TILE_SHAPE,
  next?: TileKind,
  id: TILE_KIND,
}

export const enum TILE_SHAPE {
  CORNER,
  JOINT,
  LINE,
  CROSS,
}

export const enum TILE_KIND {
  CORNER_RB,
  CORNER_BL,
  CORNER_LT,
  CORNER_TR,

  JOINT_TRB,
  JOINT_RBL,
  JOINT_BLT,
  JOINT_LTR,

  LINE_TB,
  LINE_RL,

  CROSS,
}

export const TILE_INFO: TileKind[] = [
  // nav: [ top, right, bottom, left]
  {
    id: TILE_KIND.CORNER_RB,
    nav: [false, true, true, false],
    rot: 0,
    shape: TILE_SHAPE.CORNER,
  },{
    id: TILE_KIND.CORNER_BL,
    nav: [false, false, true, true],
    rot: 90,
    shape: TILE_SHAPE.CORNER,
  },{
    id: TILE_KIND.CORNER_LT,
    nav: [true, false, false, true],
    rot: 180,
    shape: TILE_SHAPE.CORNER,
  },{
    id: TILE_KIND.CORNER_TR,
    nav: [true, true, false, false],
    rot: 270,
    shape: TILE_SHAPE.CORNER,
  },{
    id: TILE_KIND.JOINT_TRB,
    nav: [true, true, true, false],
    rot: 0,
    shape: TILE_SHAPE.JOINT,
  },{
    id: TILE_KIND.JOINT_RBL,
    nav: [false, true, true, true],
    rot: 90,
    shape: TILE_SHAPE.JOINT,
  },{
    id: TILE_KIND.JOINT_BLT,
    nav: [true, false, true, true],
    rot: 180,
    shape: TILE_SHAPE.JOINT,
  },{
    id: TILE_KIND.JOINT_LTR,
    nav: [true, true, false, true],
    rot: 270,
    shape: TILE_SHAPE.JOINT,
  },{
    id: TILE_KIND.LINE_TB,
    nav: [true, false, true, false],
    rot: 0,
    shape: TILE_SHAPE.LINE,
  },{
    id: TILE_KIND.LINE_RL,
    nav: [false, true, false, true],
    rot: 90,
    shape: TILE_SHAPE.LINE,
  },{
    id: TILE_KIND.CROSS,
    nav: [true, true, true, true],
    rot: 0,
    shape: TILE_SHAPE.CROSS,
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

export function create_tile(i: number, w: number, k: number = -1): Tile {
  return new Tile(i,w,k)
}

export class Tile {
  kind: TileKind;
  x: number;
  y: number;
  id: number;
  is_hand: boolean;

  constructor(i: number, w: number, k: number = -1) {
    if(k === -1) {
      this.kind = rand_tile_kind()
    } else {
      this.kind = TILE_INFO[k]
    }
    this.x = i % w
    this.y = Math.floor(i / w)
    this.id = i
    this.is_hand = false
  }

  rotate(): void {
    if (this.kind.next) {
      this.kind = this.kind.next
    }
  }

  can_rotate(): boolean {
    return !!this.kind.next
  }
}


