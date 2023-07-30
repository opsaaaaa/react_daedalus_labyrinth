import {useState} from 'react'
import {VIEWS, VIEWSkeys, ViewNode} from './view/index'

import {settings} from './game/settings'

function App() {
  const [route, setRoute] = useState<VIEWSkeys>('menu')

  const View: ViewNode = VIEWS[route]

  return (
    <>
      <View setRoute={setRoute} settings={settings}/>
    </>
  )
}

export default App

