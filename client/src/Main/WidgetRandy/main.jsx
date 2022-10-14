//imports
import React from 'react'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import ImageGallery from './Components/ImageGallery.jsx'
import ProductInformation from './Components/ProductInformation.jsx'
import StyleSelector from './Components/StyleSelector.jsx'
import AddtoCart from './Components/AddtoCart.jsx'
import API from './API.js'

const MainRandy = (props) => {

  const initialState = {
    product: {},
    review: {},
    styles: {},
  };

  // set state of product, this state contains all info of the product
  // (ps, eventually we will want to set product state to the highest level)
  const [APIResults, setAPIResults] = useState(initialState)

  // set initial style
  const [style, setStyle] = useState(0)

  // use effect to get all get requests needed in the beginning.
  useEffect(() => {
    let holder = {}
    axios.get(API.server + 'products', { headers: { "Authorization": API.gitToken } })
      .then(productResult => {
        holder.product = productResult.data[0]

        // get request for reviews
        const getReview = axios.get(API.server + 'reviews/?product_id=' + productResult.data[0].id, { headers: { "Authorization": API.gitToken } })

        // get request for styles
        const getStyles = axios.get(API.server + 'products/' + productResult.data[0].id + '/styles', { headers: { "Authorization": API.gitToken } })

        // wait for all axios requests
        Promise.all([getReview, getStyles])
          .then((resultArray) => {
            holder.review = resultArray[0].data
            holder.styles = resultArray[1].data
            setAPIResults(holder)
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  }, [])

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