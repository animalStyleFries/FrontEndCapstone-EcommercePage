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
  // if (Array.isArray(APIResults.styles.results)) { console.log('this is style 0:', APIResults.styles.results[0]) }
  // set initial style
  const [style, setStyle] = useState(0)
  const styleArray = APIResults.styles.results || []

  return (<div>
    {APIResults.product.id === undefined && <div>You aint got nothing yet son</div>}
    {APIResults.product.id !== undefined && <div>
      <ImageGallery styleArray={styleArray} style={style} />
      <ProductInformation APIResults={APIResults} style={style} />
      <StyleSelector styleArray={styleArray} style={style} setStyle={setStyle} />
      <AddtoCart styleArray={styleArray} style={style} />
    </div>}
  </div>)
}

export default MainRandy