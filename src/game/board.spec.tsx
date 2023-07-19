import {Board} from './board'


test('idk', ()=>{
  const b = new Board(3,3)
  expect(b.inspect_cells()).toEqual([ 
    0,1,2,
    3,4,5,
    6,7,8,  9 ])

  expect(b.hand().id).toEqual(9)

  b.insert_hand(-1,0)

  expect(b.inspect_cells()).toEqual([ 
    9,0,1,
    3,4,5,
    6,7,8,  2 ])

  expect(b.cell(0,0).id).toEqual(9)
  expect(b.hand().id).toEqual(2)

  b.insert_hand(1,3)

  expect(b.inspect_cells()).toEqual([ 
    9,4,1,
    3,7,5,
    6,2,8,  0 ])

})

