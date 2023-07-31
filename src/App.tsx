import {useState} from 'react'
import {VIEWS, VIEWSkeys, ViewNode} from './view/index'

function App() {
  const [route, setRoute] = useState<VIEWSkeys>('menu')

  const View: ViewNode = VIEWS[route]

  return (
    <>
      <View setRoute={setRoute}/>
    </>
  )
}

export default App

