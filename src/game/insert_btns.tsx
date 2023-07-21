
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
      this.btns[id] = {rot,id, x, y, disabled: false}
      id++;
    }
    y++
    rot += 90
    for(; y < this.h; y++) {
      this.btns[id] = {rot,id, x, y, disabled: false}
      id++;
    }
    x = 0
    rot += 90
    for(; x < this.w; x++) {
      this.btns[id] = {rot,id, x, y, disabled: false}
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

