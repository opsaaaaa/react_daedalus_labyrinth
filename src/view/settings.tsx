
import {useState} from 'react'
import type {ViewProps} from './props'

export function SettingsView({setRoute, settings}: ViewProps) {
  const [updater, setUpdater] = useState(1)

  function edit(key: 'width' | 'height', val: number): void {
    settings[key] = val
    setUpdater(updater + 1)
  }

  return (
    <div
    style={{
      display: 'grid',
      justifyContent: 'center',
      alignContent: 'center',
      height: '100%',
      padding: '3rem',
      gap: '1rem',
    }}
    >
      <h1>
        SETTINGS
      </h1>
      <button
      style={{position: 'absolute', top: 0, left: 0, marginTop: '1em'}}
      className="btn plain-btn"
      onClick={()=>{
        setRoute('menu')
      }}
      >Back
      </button>

      <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto auto',
        gap: '2rem',
      }}
      >

        <label>Width</label>
        <div>
          <span className="num-cir">{settings.width}</span>
          <input
          type="range"
          min="2" max="20"
          value={settings.width}
          step="1"
          onChange={(e)=>{ edit('width', Number(e.target.value)) }}
          />
        </div>
        <label>Height</label>
        <div>
          <span className="num-cir">{settings.height}</span>
          <input
          type="range"
          min="2" max="20"
          value={settings.height}
          step="1"
          onChange={(e)=>{ edit('height', Number(e.target.value)) }}
          />
        </div>
        
      </div>
      <button
      style={{position: 'absolute', bottom: 0, right: 0, marginTop: '1em'}}
      className="btn large red-btn"
      onClick={()=>{
        setRoute('game')
      }}
      >PLAY
      </button>


    </div>
  )
}

