
import {useState, useMemo} from 'react'
import type {ViewProps} from './props'
import {RangeElement} from '../element/range'

export function SettingsView({setRoute, settings}: ViewProps) {
  const [updater, setUpdater] = useState(1)

  function edit(key: 'width' | 'height', val: number): void {
    settings[key] = val
    setUpdater(updater + 1)
  }

  const max_step = useMemo(()=>{
    const m = settings.width + settings.height
    settings.player_step = Math.min(m, settings.player_step)
    settings.minotaur_step = Math.min(m, settings.minotaur_step)
    return m
  }, [settings.width, settings.height])

  return (
    <div
    style={{
      display: 'grid',
      justifyContent: 'center',
      alignContent: 'center',
      gridTemplateColumns: 'minmax(auto, 15em)',
      height: '100%',
      padding: '3rem',
      gap: '1rem',
    }}
    >
      <h1 style={{textAlign: 'center'}}>
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
      
      <RangeElement
        label="Width"
        min="2" max="20" step="1"
        value={settings.width}
        onChange={(e)=>{ edit('width', Number(e.target.value)) }}
      />

      <RangeElement
        label="Height"
        min="2" max="20" step="1"
        value={settings.height}
        onChange={(e)=>{ edit('height', Number(e.target.value)) }}
      />


      <RangeElement
        label="Player Steps"
        min="1" max={max_step} step="1"
        value={settings.player_step}
        onChange={(e)=>{ edit('player_step', Number(e.target.value)) }}
      />

      <RangeElement
        label="Minotaur Steps"
        min="1" max={max_step} step="1"
        value={settings.minotaur_step}
        onChange={(e)=>{ edit('minotaur_step', Number(e.target.value)) }}
      />




      <button
      style={{position: 'absolute', bottom: 0, right: 0, margin: '1em'}}
      className="btn large red-btn"
      onClick={()=>{
        setRoute('game')
      }}
      >PLAY
      </button>


    </div>
  )
}

