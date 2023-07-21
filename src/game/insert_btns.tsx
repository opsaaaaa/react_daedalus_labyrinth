
export type InsertArrowBtn = {
  rot: number,
  id: number,
  x: number,
  y: number,
  disabled: boolean,
}

export class InsertBtns {
  btns: InsertArrowBtn[];
  dis_btns: InsertArrowBtn[];
  w: number;
  h: number;

  constructor(w:number, h:number) {
    this.w = w
    this.h = h
    this.btns = new Array(w + w + h + h)
    this.init_btns()
    this.dis_btns = []
  }


  disable_opposing_btn(id: number) {
    
    // this.last_insert = 
    this.enable_all_btns()
    const s = this.w + this.h
    const btn = this.btns[(id + s) % (s*2)]
    btn.disabled = true
    this.dis_btns.push(btn)
  }

  enable_all_btns() {
    for(const b of this.dis_btns) {
      b.disabled = false
    }
    this.dis_btns = []
  }

  private init_btns() {

    let id = 0
    let x = 0
    let y = -1
    let rot = 0

    for(; x < this.w; x++) {
      this.btns[id] = {rot,id, x, y, disabled: false} as InsertArrowBtn
      id++;
    }
    y++
    rot += 90
    for(; y < this.h; y++) {
      this.btns[id] = {rot,id, x, y, disabled: false} as InsertArrowBtn
      id++;
    }
    x = 0
    rot += 90
    for(; x < this.w; x++) {
      this.btns[id] = {rot,id, x, y, disabled: false} as InsertArrowBtn
      id++;
    }
    y = 0
    x = -1
    rot += 90
    for(; y < this.h; y++) {
      this.btns[id] = {rot,id, x, y, disabled: false}
      id++;
    }
  }
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



