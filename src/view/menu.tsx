



import type {ViewProps} from './props'

export function MenuView({setRoute}: ViewProps) {

  return (
    <div>
      <button
      onClick={()=>{setRoute('game')}}
      >
        Play
      </button>
    </div>
  )
}

