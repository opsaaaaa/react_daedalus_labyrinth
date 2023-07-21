import {draw_insert_btns, InsertArrowBtn, InsertBtns} from './insert_btns'

test('draw_insert_btns(w,h,hide_btn,fn(btn))', ()=>{
  const out = draw_insert_btns<any>(3,3,-1,({x,y,id}: InsertArrowBtn)=>([x,y,id]))
  expect(out).toEqual([
      [0,-1,0],   [1,-1,1],   [2,-1,2],
      [3,0,3],    [3,1,4],    [3,2,5],
      [0,3,6],    [1,3,7],    [2,3,8],
      [-1,0,9],   [-1,1,10],  [-1,2,11],
  ])
})


describe('InsertBtns', ()=>{
  test('new InsertBtns(w,h)', ()=>{
    const ib = new InsertBtns(3,3)
    expect(ib.btns.map(({x,y,id})=>([x,y,id]))).toEqual([
      [0,-1,0],   [1,-1,1],   [2,-1,2],
      [3,0,3],    [3,1,4],    [3,2,5],
      [0,3,6],    [1,3,7],    [2,3,8],
      [-1,0,9],   [-1,1,10],  [-1,2,11],
    ])
  })

  test('.disable_opposing_btn(id)',()=>{
    const ib = new InsertBtns(3,3)
    ib.disable_opposing_btn(0)
    expect(ib.dis_btns.length).toEqual(1)
    expect(ib.dis_btns[0].disabled).toEqual(true)
    expect(ib.dis_btns[0].id).toEqual(6)
    expect(ib.btns[6].disabled).toEqual(true)
    ib.disable_opposing_btn(9)
    expect(ib.btns[6].disabled).toEqual(false)
    expect(ib.btns[3].disabled).toEqual(true)
    expect(ib.dis_btns.length).toEqual(1)
  })

})
