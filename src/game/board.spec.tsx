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

    expect(b.width).toBe(2)
    expect(b.height).toBe(3)

    expect(b.inspect_state()).toEqual([
      TILE_KIND.LINE_TB, TILE_KIND.LINE_RL,
      TILE_KIND.CORNER_TR, TILE_KIND.CORNER_LT,
      TILE_KIND.CORNER_TR, TILE_KIND.CORNER_LT,
      TILE_KIND.CROSS ])

    b.insert(2,1)

    expect(b.inspect_state()).toEqual([
      TILE_KIND.LINE_TB, TILE_KIND.LINE_RL,
      TILE_KIND.CORNER_LT, TILE_KIND.CROSS,
      TILE_KIND.CORNER_TR, TILE_KIND.CORNER_LT,
      TILE_KIND.CORNER_TR ])
  })

  test('.get_moves(x,y)', ()=>{
    const b = new Board(3,3, [
      TILE_KIND.LINE_TB, TILE_KIND.LINE_TB, TILE_KIND.LINE_RL,
      TILE_KIND.LINE_TB, TILE_KIND.CROSS,   TILE_KIND.LINE_RL,
      TILE_KIND.LINE_TB, TILE_KIND.LINE_TB, TILE_KIND.LINE_RL,
      TILE_KIND.CROSS ])

    expect(b.get_moves(0,0).map((m)=>(m.id))).toEqual([3,6])
    expect(b.get_moves(2,0).map((m)=>(m.id))).toEqual([])
    expect(b.get_moves(1,1).map((m)=>(m.id))).toEqual([1,5,7])
  })

  test('.get_moves(x,y,depth)', ()=>{
    const b = new Board(3,3, [
      TILE_KIND.CROSS,   TILE_KIND.LINE_RL, TILE_KIND.CROSS,
      TILE_KIND.LINE_TB, TILE_KIND.CROSS,   TILE_KIND.LINE_TB,
      TILE_KIND.CROSS,   TILE_KIND.LINE_RL, TILE_KIND.CROSS,
      TILE_KIND.CROSS ])

    expect(b.get_moves(0,0).map((m)=>(m.id))).toEqual([1,2,5,8,7,6,3])
    expect(b.get_moves(0,0,4).map((m)=>(m.id))).toEqual([1,2,5,8,3,6,7])
    expect(b.get_moves(0,0,3).map((m)=>(m.id))).toEqual([1,2,5,3,6,7])
    expect(b.get_moves(0,0,2).map((m)=>(m.id))).toEqual([1,2,3,6])
    expect(b.get_moves(0,0,1).map((m)=>(m.id))).toEqual([1,3])
    expect(b.get_moves(0,0,0).map((m)=>(m.id))).toEqual([])
  })
})


