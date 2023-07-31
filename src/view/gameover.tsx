
import type {ViewProps} from './props'

export function GameOverView({setRoute}: ViewProps) {

  return (
    <div
    style={{
      display: 'grid',
      justifyContent: 'center',
      alignContent: 'center',
      height: '100%',
      padding: '3rem',
      gap: '3rem',
    }}
    >
      <h1 className="m-auto">GAME OVER</h1>
      <button
      className="btn large red-btn m-auto"
      onClick={()=>{setRoute('game')}}
      >
        PLAY AGAIN
      </button>

      <button
      className="btn large m-auto"
      onClick={()=>{
        setRoute('menu')
      }}
      >Menu
      </button>

      <button
      className="btn large m-auto"
      onClick={()=>{
        setRoute('settings')
      }}
      >Customize
      </button>

    </div>
  )
}

