import {Tile} from './tile' 


type CompassType = {
  x: number,
  y: number,
  bw: number,
  fw: number,
}

enum CARDINAL {
  TOP,
  RIGHT,
  BOTTOM,
  LEFT,
}

const COMPASS: CompassType[] = [
  // fw and bw, forwards backwards for a given compass direction
  // ie. nav: [true, false, true, false]
  {x: 0, y: -1, fw: CARDINAL.TOP, bw: CARDINAL.BOTTOM},
  {x: 1, y: 0, fw: CARDINAL.RIGHT, bw: CARDINAL.LEFT},
  {x: 0, y: 1, fw: CARDINAL.BOTTOM, bw: CARDINAL.TOP},
  {x: -1, y: 0, fw: CARDINAL.LEFT, bw: CARDINAL.RIGHT},
]

export class Board {
  tiles: Tile[]; // Tiles ordered tile id
  cells: Tile[]; // Tiles ordered by placement on the board.


  height: number;
  width: number;
  size: number;

  constructor(h: number, w: number) {
    this.height = h
    this.width = w
    this.size = 1 + w*h
    
    this.tiles = new Array(this.size)
    this.cells = new Array(this.size)

    this.init_tiles()
  }

  inspect_cells(): number[] {
    return this.cells.map((c)=>(c.id))
  }

  cell(x:number, y:number): Tile {
    return this.cells[this.pos(x,y)]
  }

  insert_hand(x:number, y:number): void {
    let compass = this.get_compass(x,y)
    if(!compass) {return}
    x += compass.x
    y += compass.y

    let push: Tile = this.cells[this.size-1]
    let pull: Tile

    let p = 0;

    push.is_hand = false

    do {
      p = this.pos(x,y)

      push.y = y
      push.x = x

      pull = this.cells[p]
      this.cells[p] = push
      push = pull

      x += compass.x
      y += compass.y
    } while(this.in_bounds(x, y))

    push.is_hand = true
    push.x = this.width
    push.y = this.height
    this.cells[this.size-1] = push
  }

  private get_compass(x: number, y: number): {x: number, y: number} | undefined {
    if(y < 0) { return COMPASS[2] }
    if(x >= this.width) { return COMPASS[3] }
    if(y >= this.height) { return COMPASS[0] }
    if(x < 0) { return COMPASS[1] }
    return undefined;
  }

  private pos(x:number,y:number): number {
    return x + y * this.width
  }

  hand(): Tile {
    return this.cells[this.size-1]
  }

  private in_bounds(x: number, y: number): boolean {
    return x >= 0 && x < this.width && y >= 0 && y < this.height
  }

  private init_tiles(): void {
   let t: Tile

    for(let i = 0; i < this.size; i++){
      t = new Tile(i, this.width)
      this.tiles[i] = this.cells[i] = t
    }

    t = this.cells[this.size-1]
    t.is_hand = true
    t.x = this.width
    t.y = this.height
  }

}

