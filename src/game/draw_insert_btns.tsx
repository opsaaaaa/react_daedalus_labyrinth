
export type InsertArrowBtn = {
  rot: number,
  id: number,
  x: number,
  y: number,
  disabled: boolean,
}

export function draw_insert_btns<T>(w: number, h: number, hide_btn_id: number ,fn: (a: InsertArrowBtn)=>T): T[] {
  // Walk around the board in a square and output the insert arrows.
  // The order is important because math is used to get the opposing arrow/btn.

  let out: T[] = new Array(w*2 + h*2)

  let id = 0
  let x = 0
  let y = -1
  let rot = 0

  for(; x < w; x++) {
    out[id] = fn({rot,id, x, y, disabled: id === hide_btn_id})
    id++;
  }
  y++
  rot += 90
  for(; y < h; y++) {
    out[id] = fn({rot,id, x, y, disabled: id === hide_btn_id})
    id++;
  }
  x = 0
  rot += 90
  for(; x < w; x++) {
    out[id] = fn({rot,id, x, y, disabled: id === hide_btn_id})
    id++;
  }
  y = 0
  x = -1
  rot += 90
  for(; y < h; y++) {
    out[id] = fn({rot,id, x, y, disabled: id === hide_btn_id})
    id++;
  }

  return out
}



