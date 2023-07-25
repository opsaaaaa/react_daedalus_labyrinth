import {create_actor, ACTOR_SHAPE} from "./actor"

import {Tile} from "./tile"

test('create_actor',()=>{
  const t = new Tile(0,3)
  const a = create_actor(t)
  const b = create_actor(t)

  expect(a.id).toEqual(0)
  expect(a.kind.shape).toEqual(ACTOR_SHAPE.MINOTAUR)
  expect(b.id).toEqual(1)
  expect(b.kind.shape).toEqual(ACTOR_SHAPE.GREEN)
})


