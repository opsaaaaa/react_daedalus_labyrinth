import {useState, useMemo} from 'react'
import {Game} from '../game/game'
import {Draw} from '../game/draw'
import type {ViewProps} from './props'
import {PathTile} from '../canvas/path_tile'
import {ActorPiece} from '../canvas/actor_piece'
import {Flag} from '../canvas/flag'
import {MoveBtn} from '../canvas/move_btn'
import {SvgCanvas} from '../canvas/svg'
import {Arrow} from '../canvas/arrow'
import {Rotate} from '../canvas/rotate'
import '../canvas/style.css'

import {settings} from '../game/settings'

export function GameView({setRoute}: ViewProps) {
  const [actionCount, setActionCount] = useState(0)

  const [g,b,actors,insert_btns, draw] = useMemo(()=>{
    const g = new Game(settings.width,settings.height)
    const d = new Draw(g)
    return [g, g.board, g.actors, g.insert_btns, d]
  },[])

  const hand = b.hand()

  function update() {
    setActionCount(actionCount + 1)
  }

  return (
    <div className='game'>
      <SvgCanvas
      w={b.width}
      h={b.height}
      style={{position: 'absolute', inset: 0, margin: 'auto'}}
      >
        <g>
          {b.tiles.map(t=>(
            <PathTile key={t.id} t={t}/>
          ))}
        </g>

        <g>
          {g.is_state_play_slide() && insert_btns.btns.map((btn)=>(
            !btn.disabled && (
              <Arrow x={btn.x} y={btn.y} rot={btn.rot}
              key={btn.id}
              onClick={()=>{
                g.insert_with_btn(btn)
                update()
              }}
              tabIndex={0}
              />
            )
          ))}
          <MoveBtn x={hand.x} y={hand.y} c={g.turn_actor.kind.color}/>
          {g.is_state_play_slide() && hand.can_rotate() && (
            <Rotate x={hand.x} y={hand.y} rot={hand.kind.rot}
            tabIndex={0}
            onClick={()=>{
              hand.rotate()
              update()
            }}
            />
          )}
        </g>

        { g.is_state_play_move() && (
          <>
          <g>
            {draw.select_actor_btns((a, click)=>(
              <MoveBtn
              x={a.tile.x}
              y={a.tile.y}
              c={a.kind.color}
              key={a.id}
              onClick={()=>{
                click()
                update()
              }}
              />
            ))}
          </g>

          <g>

            {draw.move_actor_btns((m, click)=>(
              <MoveBtn
              x={m.x}
              y={m.y}
              c={g.selected_actor && g.selected_actor.kind.color || ''}
              key={m.id}
              onClick={()=>{
                click()
                update()
              }}
              />
            ))}
          </g>
          </>
        )}

        <g>
          {actors.map(a=>(
            <ActorPiece a={a} key={a.id}/>
          ))}
        </g>

        <g>
          <Flag rot={0} x={g.goal.x} y={g.goal.y} />
        </g>

      </SvgCanvas>

      <button
      style={{position: 'absolute', top: 0, left: 0, marginTop: '1em'}}
      className="btn plain-btn"
      onClick={()=>{
        setRoute('menu')
      }}
      >Exit
      </button>
    </div>
  )
}


