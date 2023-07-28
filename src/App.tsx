import {useState, ReactNode} from 'react'
import {VIEWS} from './view/index'

function App() {
  const [route, setRoute] = useState<string>('menu')

  const View = VIEWS[route]

  return (
    <>
      <View setRoute={setRoute}/>
    </>
  )
}

export default App

