import { useState } from 'react'
import type { ReactNode } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Board } from './board'
import './App.css'

const SIZE = 80

function App() {
  const [actionCount, setActionCount] = useState(0)
  const [b, setBoard] = useState(new Board(5,5))

  return (
    <>
      <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
      >

        {/* Arrow Buttons */}
        <div>
          {b.mapInsertSlots((arrow)=>(
            <button
            // onMouseDown={()=>{
            //   b.insertPreview(arrow.x,arrow.y)
            //   setActionCount(actionCount+1)
            // }}
            className="arrow"
            disabled={arrow.disabled}
            onClick={()=>{
              b.insertSlot(arrow)
              setActionCount(actionCount+1)
            }}
            key={arrow.id}
            style={{
              position: 'absolute',
              transform: `translate(${SIZE * (arrow.x)}px,${SIZE * (arrow.y)}px)`,
              width: SIZE,
              height: SIZE,
            }}
            >
              <img
              src={arrow.img}
              style={{
                transform: `rotate(${arrow.rot}deg)`,
                width: '100%',
                height: '100%',
                zIndex: 100,
              }}
              />
            </button>
          ))}
        </div>

        {/* TILES */}
        <div>
          {b.mapTiles<ReactNode>((tile)=>(
            <button
            className='tile'
            onClick={()=>{console.log(tile)}}
            key={tile.id}
            style={{
              position: 'absolute',
              transform: `translate(${SIZE * (tile.x)}px,${SIZE * (tile.y)}px)`,
              width: SIZE,
              height: SIZE,
            }}
            >
              <img
              src={tile.img}
              style={{
                transform: `rotate(${tile.rot}deg)`,
                width: '100%',
                height: '100%',
              }}
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
