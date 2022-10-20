//imports
import React from 'react'
import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import ImageGallery from './Components/ImageGallery.jsx'
import ProductInformation from './Components/ProductInformation.jsx'
import StyleSelector from './Components/StyleSelector.jsx'
import AddtoCart from './Components/AddtoCart.jsx'
import ExpandImage from './Components/SmallerComponents/ExpandImage.jsx'
import SocialMedia from './Components/SmallerComponents/SocialMedia.jsx'
import Select from "react-select"

const MainRandy = ({ APIResults, setProductSelector }) => {
  // set initial style
  const [style, setStyle] = useState(0)
  const [expand, setExpand] = useState(false)
  const styleArray = APIResults.styles.results || []
  let expandURL = useRef()


  return (<div>
    <NavBar>
      <LogoContainer>
        <Header>R.E.M</Header>
        <Slogan>Remember Every Moment</Slogan>
      </LogoContainer>
    </NavBar>
    <EmptySpace></EmptySpace>
    {APIResults.product.id === undefined && <div>Loading...</div>}
    {APIResults.product.id !== undefined && expand && <ExpandImage setExpand={setExpand} expandURL={expandURL} />}
    {APIResults.product.id !== undefined && !expand && <ContainerGrid>
      <ImageGallery styleArray={styleArray} style={style} setExpand={setExpand} expandURL={expandURL} />
      <CointainerProductInfo>
        <ProductInformation APIResults={APIResults} style={style} />
        <StyleSelector styleArray={styleArray} style={style} setStyle={setStyle} />
        <AddtoCart styleArray={styleArray} style={style} productName={APIResults.product.name} />
        <SocialMedia />
      </CointainerProductInfo>
    </ContainerGrid>}
  </div>)
}

const NavBar = styled.div`
  background-color:lightblue;
  position: fixed;
  top: 0;
  width: 100%;
  height: 4rem;
  z-index: 2;
`

const LogoContainer = styled.div`
`

const Header = styled.h1`
  top: 0;
  margin: 0;
  font-family: 'Brush Script Std';
`
const Slogan = styled.p`
  top: 0;
  margin: 0;
  font-family: 'Snell Roundhand';
`

const EmptySpace = styled.div`
  height: 3.6rem;
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