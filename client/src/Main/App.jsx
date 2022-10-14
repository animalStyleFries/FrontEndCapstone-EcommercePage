import React from 'react'
import styled from 'styled-components'
import MainEric from './WidgetEric/main.jsx'
import MainMonica from './WidgetMonica/main.jsx'
import MainRandy from './WidgetRandy/main.jsx'

const App = () => {
  return (
    <AppContainer>
      <h1>Project Atelier</h1>
      <MainRandy />
      <MainMonica />
      <MainEric />
    </AppContainer>
  )
}

const AppContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export default App
