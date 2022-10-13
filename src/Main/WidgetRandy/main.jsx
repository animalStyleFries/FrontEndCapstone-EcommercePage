import React from 'react'
import styled from 'styled-components'
import ImageGallery from './Components/ImageGallery.jsx'
import ProductInformation from './Components/ProductInformation.jsx'
import StyleSelector from './Components/StyleSelector.jsx'
import AddtoCart from './Components/AddtoCart.jsx'

// const Title = styled.h1`
//   font-size: 1.5em;
//   text-align: center;
//   color: palevioletred;
// `;

const MainRandy = () => {

  return (<div>
    <ImageGallery />
    <ProductInformation />
    <StyleSelector />
    <AddtoCart />
  </div>)
}

export default MainRandy