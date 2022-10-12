import React from 'react'
import MainEric from './WidgetEric/main.jsx'
import MainMonica from './WidgetMonica/main.jsx'
import MainRandy from './WidgetRandy/main.jsx'

const App = () => {
  return (
    <div>
      <h1>Project Atelier</h1>
      <MainRandy />
      <MainMonica />
      <MainEric />
    </div>
  )
}

export default App