import {draw_insert_btns, InsertArrowBtn} from './draw_insert_btns'

test('draw_insert_btns(w,h,hide_btn,fn(btn))', ()=>{
  const out = draw_insert_btns<any>(3,3,-1,({x,y,id}: InsertArrowBtn)=>([x,y,id]))
  expect(out).toEqual([
      [0,-1,0],   [1,-1,1],   [2,-1,2],
      [3,0,3],    [3,1,4],    [3,2,5],
      [0,3,6],    [1,3,7],    [2,3,8],
      [-1,0,9],   [-1,1,10],  [-1,2,11],
  ])

})


