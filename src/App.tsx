import { useState, useMemo } from 'react'
import type { ReactNode } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Board } from './board'
import type { Tile } from './board'
import arrowSvg from '/arrow.svg'
import rotateSvg from '/rotate.svg'
import goalSvg from '/goal.svg'
import './App.css'

import * as draw from './game/draw'

const SIZE = 80

const OFFSET = {X: 1, Y: 1}

function App() {
  const [actionCount, setActionCount] = useState(0)
  const b = useMemo(()=>(new Board(5,5)),[])
  
  function onClickTile(tile: Tile): void {
    if(b.is_hand(tile)) {
    }
  }


  return (
    <>
      <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
      >

        {/* TILES */}
        <div>
          {draw.tiles<ReactNode>(b,(tile)=>(
            <div
            disabled={true}
            className="tile anim-transform"
            key={tile.id}
            data-hand={tile.is_hand}
            style={{
              position: 'absolute',
              transform: `translate(${SIZE * (OFFSET.X + tile.x)}px,${SIZE * (OFFSET.Y + tile.y)}px)`,
              width: SIZE,
              height: SIZE,
            }}
            >
              <img
              src={tile.kind.img}
              className="anim-transform"
              style={{
                transform: `rotate(${tile.kind.rot}deg)`,
                width: '100%',
                height: '100%',
              }}
              />
            </div>
          ))}
        </div>

        {/* goal */}
        <div>
          {draw.goal<ReactNode>(b, (goal)=>(
            <div
            className="actor anim-transform"
            key={goal.id}
            style={{
              position: 'absolute',
              transform: `translate(${SIZE * (OFFSET.X + goal.x)}px,${SIZE * (OFFSET.Y + goal.y)}px)`,
              width: SIZE,
              height: SIZE,
            }} 
            >
              <img
              className="actor-svg"
              src={goalSvg}
              />
            </div>
            
          ))}
        </div>

        {/*  PLAYERS / ACTORS*/}
        <div>
          {draw.actors<ReactNode>(b,(actor)=>(
            <div
            // disabled={actor.disabled}

            className="actor anim-transform"
            key={actor.id}
            style={{
              position: 'absolute',
              transform: `translate(${SIZE * (OFFSET.X + actor.tile.x)}px,${SIZE * (OFFSET.Y + actor.tile.y)}px)`,
              width: SIZE,
              height: SIZE,
            }}
            >
              <img
              className="actor-svg"
              src={actor.kind.img}
              />
            </div>
          ))}

        </div>

        {/* Actor Action / Moves */}
        <div>
          {draw.actor_move_btns<ReactNode>(b, (actor,move)=>(
            <button
              className="actor-move"
              key={`${actor.id}-${move.id}`}
              onClick={()=>{
                b.move_actor(actor,move)
                setActionCount(actionCount+1)
              }}
              style={{
                // background: actor.kind.color,
                color: actor.kind.color,
                position: 'absolute',
                transform: `translate(${SIZE * (OFFSET.X + move.x)}px,${SIZE * (OFFSET.Y + move.y)}px)`,
                width: SIZE,
                height: SIZE,
              }}
            />
          ))}

          {draw.select_actor_btns<ReactNode>(b, (actor)=>(
            <button
              className="actor-move"
              key={actor.id}
              onClick={()=>{
                b.select_actor(actor)
                setActionCount(actionCount+1)
              }}
              style={{
                // background: actor.kind.color,
                color: actor.kind.color,
                position: 'absolute',
                transform: `translate(${SIZE * (OFFSET.X + actor.tile.x)}px,${SIZE * (OFFSET.Y + actor.tile.y)}px)`,
                width: SIZE,
                height: SIZE,
              }}
            />
          ))}
        </div>


        {/* Arrow Buttons */}
        <div>
          {draw.insert_btns<ReactNode>(b,(arrow)=>(
            <button
            className="arrow"
            disabled={arrow.disabled}
            onClick={()=>{
              b.insertSlot(arrow)
              setActionCount(actionCount+1)
            }}
            key={arrow.id}
            style={{
              position: 'absolute',
              transform: `translate(${SIZE * (OFFSET.X + arrow.x)}px,${SIZE * (OFFSET.Y + arrow.y)}px)`,
              width: SIZE,
              height: SIZE,
            }}
            >
              <img
              src={arrowSvg}
              className='arrow-svg'
              style={{
                transform: `rotate(${arrow.rot}deg)`,
              }}
              />
            </button>
          ))}

        {/* Rotate Buttons */}
          {draw.rotate_hand_btn<ReactNode>(b,(hand)=>(
            <button
            disabled={hand.disabled}
            onClick={()=>{{
              b.rotate_hand()
              setActionCount(actionCount+1)
            }}}
            style={{
              position: 'absolute',
              transform: `translate(${SIZE * (OFFSET.X + hand.x)}px,${SIZE * (OFFSET.Y + hand.y)}px)`,
              width: SIZE,
              height: SIZE,
            }}
            key={'hand'}
            >
              <img
              className='rotate-svg anim-hint-rotate'
              src={rotateSvg}
              />
            </button>
          ))}
        </div>

      </div>
    </>
  )
}

export default App


//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}
//         style={{transform: `translateX(${count}em)`, transition: 'transform 150ms'}}
//         >
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
      // </p>
