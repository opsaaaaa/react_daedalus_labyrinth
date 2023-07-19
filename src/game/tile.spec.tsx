import {Tile, TILE_KIND} from './tile'


describe('Tile', ()=>{
  test('new Tile(i,w,k) .rotate()', ()=>{
    const t = new Tile(4,3,TILE_KIND.CORNER_TR)

    expect(t.x).toEqual(1)
    expect(t.y).toEqual(1)
    expect(t.id).toEqual(4)
    expect(t.kind.id).toEqual(3)

    const n = t.kind.next
    t.rotate()

    expect(t.kind).toEqual(n)
  })

  test('new Tile(i,w)', ()=>{
    const t = new Tile(0,3)
    expect(t.kind.id).toBeLessThan(11)
    expect(t.kind.id).toBeGreaterThan(-1)
  })

})

