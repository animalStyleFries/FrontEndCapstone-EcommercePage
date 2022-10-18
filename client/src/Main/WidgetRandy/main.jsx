//imports
import React from 'react'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import ImageGallery from './Components/ImageGallery.jsx'
import ProductInformation from './Components/ProductInformation.jsx'
import StyleSelector from './Components/StyleSelector.jsx'
import AddtoCart from './Components/AddtoCart.jsx'

const MainRandy = ({ APIResults }) => {
  // set initial style
  const [style, setStyle] = useState(0)
  const styleArray = APIResults.styles.results || []

  return (<div>
    <NavBar>
      <Header>R.E.M</Header>
    </NavBar>
    <EmptySpace></EmptySpace>
    {APIResults.product.id === undefined && <div>Loading...</div>}
    {APIResults.product.id !== undefined && <ContainerGrid>
      <ImageGallery styleArray={styleArray} style={style} />
      <CointainerProductInfo>
        <ProductInformation APIResults={APIResults} style={style} />
        <StyleSelector styleArray={styleArray} style={style} setStyle={setStyle} />
        <AddtoCart styleArray={styleArray} style={style} />
      </CointainerProductInfo>
    </ContainerGrid>}
  </div>)
}

const Header = styled.h1`
  position: fixed;
  top: 0;
  margin: 0;
  font-family: 'Brush Script Std';
`

const NavBar = styled.div`
  background-color:lightblue;
  position: fixed;
  top: 0;
  width: 100%;
  height: 2.5rem;
`
const EmptySpace = styled.div`
  height: 2.3rem;
`

const ContainerGrid = styled.div`
  display: grid;
  grid-template-columns: 6fr 4fr;
`

const CointainerProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default MainRandy