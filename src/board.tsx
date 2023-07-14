import cornerSvg from '/corner_path.svg'
import jointSvg from '/joint_path.svg'
import lineSvg from '/line_path.svg'
import crossSvg from '/cross_path.svg'
import arrowSvg from '/arrow.svg'

export type TileKind = {
  nav: bool[],
  rot: number,
  img: crossSvg | jointSvg | lineSvg | cornerSvg,
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

export type InsertArrow = {
  rot: number,
  id: number,
  dir: 0 | 1 | 2 | 3,
  x: number,
  y: number,
  img: arrowSvg,
}

const DIR = {
  TOP: 0,
  RIGHT: 1,
  BOTTOM: 2,
  LEFT: 3,
}

const COMPASS = [
  {x: 0, y: 1},
  {x: -1, y: 0},
  {x: 0, y: -1},
  {x: 1, y: 0},
]

// const ARROWS = [
//   {rot: 0}
//   {rot: 0}
//   {rot: 0}
//   {rot: 0}
// ]

export type Tile = {
  kind: number,
  x: number,
  y: number,
  id: number,
}


export class Board {
  // the tileID assiciated with 
  tiles: Tile[]; // the tile type associated with a tile id.
  cells: number[]; // the uniq id for each individual tile.
  height: number;
  width: number;
  size: number;

  constructor(h: number, w: number) {
    this.height = h
    this.width = w
    this.size = 1 + w*h
    
    this.tiles = new Array(this.size)
    for(let i = 0; i < this.size; i++){
      this.tiles[i] = this.init_tile(i) 
    }
    const end = this.tiles[this.size-1]
    end.x = w+1
    end.y = h+1
    
    this.cells = new Array(this.size).fill(0).map((_,i)=>(i))
  }

  mapTiles<T>(fn: (t: Tile & TileKind)=>T): T[] {
    let out: T[] = new Array(this.size)
    for(let i = 0; i < this.size; i++){
      const tile = this.tiles[i]
      const tileInfo = TILE_INFO[tile.kind]
      out[i] = fn({...tile, ...tileInfo})
    }
    return out
  }

  mapInsertSlots<T>(fn: (a: InsertArrow)=>T): T[] {
    // Walk around the board in a square and output the insert arrows.

    let out: T[] = new Array(this.width*2 + this.height*2)

    let i = 0
    let x = 0
    let y = 0

    const ARROW_GROUPS = [
      { dir: DIR.TOP, rot: 0,
        con: ()=>x < this.width+1,
        iter: ()=>x++,
      },
      { dir: DIR.RIGHT, rot: 90,
        con: ()=>y < this.height+1,
        iter: ()=>y++,
      },
      { dir: DIR.BOTTOM, rot: 180,
        con: ()=>x > 0,
        iter: ()=>x--,
      },
      { dir: DIR.LEFT, rot: 270,
        con: ()=>y > 0,
        iter: ()=>y--,
      },
    ]

    ARROW_GROUPS.forEach(({con, iter, ...group})=>{
      iter()
      while(con()) {
        out[i] = fn({id: i, x, y, img: arrowSvg, ...group})
        iter()
        i++
      }
    })

    return out
  }

  insertSlot({x, y}: InsertArrow): void {
    // console.log(x,y)
    const end = this.get_hand()
    end.x = x
    end.y = y
    this.insert(x - 1,y - 1)
  }

  private insert(x:number, y:number): void {
    let compass = this.get_compass(x,y)
    if(!compass) {return}
    x += compass.x
    y += compass.y

    let push_cell: number = this.get_last_cell()
    let pull_cell: number
    let tile: Tile
    let p = 0;

    do {
      p = this.pos(x,y)
      x += compass.x
      y += compass.y

      tile = this.tiles[push_cell]

      tile.y += compass.y
      tile.x += compass.x

      pull_cell = this.cells[p]
      this.cells[p] = push_cell
      push_cell = pull_cell

    } while(this.in_bounds(x, y))


    tile = this.tiles[push_cell]
    tile.x = this.width+1
    tile.y = this.height+1
    this.cells[this.size-1] = push_cell

    // if(y === 0) {
    //   console.log(DIR.TOP)
    //   this.insert_top(x-1)
    // } else if(y === this.height + 1) {
    //   console.log(DIR.BOTTOM)
    // }
    // if(x === 0) {console.log(DIR.LEFT)}
    // if(x === this.width + 1) {console.log(DIR.RIGHT)}
  }

  // private insert_top(x): void {
  //   let push_cell: number = this.get_last_cell()
  //   let pull_cell: number
  //   let tile: Tile
  //   let p = 0;

  //   for(let y = 0; y < this.height; y++) {
  //     p = this.pos(x,y)

  //     tile = this.tiles[push_cell]
  //     tile.y = y + 1

  //     pull_cell = this.cells[p]
  //     this.cells[p] = push_cell
  //     push_cell = pull_cell
  //   }

  //   tile = this.tiles[push_cell]
  //   tile.x = this.width+1
  //   tile.y = this.height+1
  //   this.cells[this.size-1] = push_cell

  // }

  private get_compass(x: number, y: number): {x: number, y: number} | undefined {
    if(y < 0) { return COMPASS[0] }
    if(x >= this.width) { return COMPASS[1] }
    if(y >= this.height) { return COMPASS[2] }
    if(x < 0) { return COMPASS[3] }
    return undefined;
  }

  private in_bounds(x: number, y: number): boolean {
    return x >= 0 && x < this.width && y >= 0 && y < this.height
  }

  get_hand(): Tile {
    return this.tiles[this.cells[this.size-1]]
  }

  get_tile(x:number,y:number): Tile {
    return this.tiles[this.get_cell(x,y)]
  }

  get_cell(x:number, y:number): number {
    return this.cells[pos(x,y)]
  }

  get_last_cell(): number {
    return this.cells[this.size-1]
  }

  private rand_tile_kind(): number {
    return Math.floor( Math.random()*(TILE_INFO.length) )
    // the math shinanigans is to even out the wieghts for lines and corners
    // const v = Math.floor( Math.random()*(TILE_INFO.length+2) )
    // if(v >= TILE_INFO.length) {
    //   return v-3
    // }
    // return v 
  }

  private pos(x:number,y:number): number {
    return x + y * this.width
  }

  private init_tile(i: number): Tile {
      const kind = this.rand_tile_kind()
      return {
        kind: kind,
        x: i % this.width + 1,
        y: Math.floor(i / this.width) + 1,
        id: i,
      } as Tile
  }


}
