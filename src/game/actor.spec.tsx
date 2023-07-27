import {create_actor, create_actor_list} from "./actor"

import {Tile} from "./tile"

test('create_actor(tile)',()=>{
  const t = new Tile(0,3)
  const a = create_actor(t)
  const b = create_actor(t)

  expect(a.id).toEqual(0)
  expect(a.is_minotaur()).toEqual(true)
  expect(b.id).toEqual(1)
  expect(b.is_minotaur()).toEqual(false)
})

test('create_actor_list(tiles[])',()=>{
  const t = new Tile(0,3)
  const actors = create_actor_list([t,t,t])

  expect(actors[0].id).toEqual(2)
  expect(actors[2].id).toEqual(4)
  expect(actors[2].kind.shape).toEqual(0)
  expect(actors.length).toEqual(3)
})


