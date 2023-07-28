



import type {ViewProps} from './props'

export function MenuView({setRoute}: ViewProps) {

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
      <h1 className="m-auto">Minituar Maze</h1>
      <p className="m-auto" style={{textAlign: 'center', maxWidth: '30em'}}>
        The goal of the <strong>Minotaur</strong> is to capture the players.
        The goal of the remaining players is to be the first to <strong>escape to the flag</strong>.
        Good luck, and have fun!
      </p>
      <button
      className="btn jumbo-btn m-auto"
      onClick={()=>{setRoute('game')}}
      >
        PLAY
      </button>
    </div>
  )
}

