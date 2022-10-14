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

  return (<div>
    {APIResults.product.id === undefined && <div>You aint got nothing yet son</div>}
    {APIResults.product.id !== undefined && <div>
      <ImageGallery styleArray={APIResults.styles.results} style={style} />
      <ProductInformation APIResults={APIResults} style={style} />
      <StyleSelector styleArray={APIResults.styles.results} style={style} setStyle={setStyle} />
      <AddtoCart />
    </div>}
  </div>)
}

export default MainRandy