import {Board} from './board'
import {TILE_KIND} from './tile'

describe('Board', ()=>{

  test('new Board(w,h) .insert(x,y) .hand() .cell(x,y) .inspect_cells()', ()=>{
    const b = new Board(3,3)
    expect(b.inspect_cells()).toEqual([ 
      0,1,2,
      3,4,5,
      6,7,8,  9 ])

    expect(b.hand().id).toEqual(9)

    b.insert(-1,0)

    expect(b.inspect_cells()).toEqual([ 
      9,0,1,
      3,4,5,
      6,7,8,  2 ])

    expect(b.cell(0,0).id).toEqual(9)
    expect(b.hand().id).toEqual(2)

    b.insert(1,3)

    expect(b.inspect_cells()).toEqual([ 
      9,4,1,
      3,7,5,
      6,2,8,  0 ])
  })
  
  test('new Board(w,h,state) .inspect_state()', ()=>{
    const b = new Board(2,3, [
      TILE_KIND.LINE_TB, TILE_KIND.LINE_RL,
      TILE_KIND.CORNER_TR, TILE_KIND.CORNER_LT,
      TILE_KIND.CORNER_TR, TILE_KIND.CORNER_LT,
      TILE_KIND.CROSS ])
    
    expect(b.inspect_state()).toEqual([
      TILE_KIND.LINE_TB, TILE_KIND.LINE_RL,
      TILE_KIND.CORNER_TR, TILE_KIND.CORNER_LT,
      TILE_KIND.CORNER_TR, TILE_KIND.CORNER_LT,
      TILE_KIND.CROSS ])
  })
})


