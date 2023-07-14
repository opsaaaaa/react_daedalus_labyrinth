import cornerSvg from '/corner_path.svg'
import jointSvg from '/joint_path.svg'
import lineSvg from '/line_path.svg'
import crossSvg from '/cross_path.svg'

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
    end.x = w
    end.y = h
    
    this.cells = new Array(w*h).fill(0).map((_,i)=>(i))
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

//   get_tile(x:number,y:number): Tile | undefined {
//     return this.tiles[this.get_cell(x,y)]
//   }

//   get_cell(x:number, y:number): number | undefined {
//     return this.cells[pos(x,y)]
//   }

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
    return x + y * width
  }

  private init_tile(i: number): Tile {
      const kind = this.rand_tile_kind()
      return {
        kind: kind,
        x: i % this.width,
        y: Math.floor(i / this.width),
        id: i,
      } as Tile
  }


}
