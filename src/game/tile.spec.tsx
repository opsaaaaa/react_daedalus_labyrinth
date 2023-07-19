import {Tile} from './tile'

test('tile can rotate', ()=>{
  const t = new Tile(4,3)

  expect(t.x).toEqual(1)
  expect(t.y).toEqual(1)
  expect(t.id).toEqual(4)

  const n = t.kind.next
  t.rotate()

  expect(t.kind).toEqual(n)
})

