import React from 'react'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import MainEric from './WidgetEric/main.jsx'
import MainMonica from './WidgetMonica/main.jsx'
import MainRandy from './WidgetRandy/main.jsx'
import axios from 'axios'
import API from '../API.js'

// Shared get requests done at the App level

const App = () => {

  // set up initial state
  const initialState = {
    product: {},
    review: {},
    styles: {},
  };

  // set state of product, this state contains all info of the product
  const [APIResults, setAPIResults] = useState(initialState)

  // use effect to get all get requests needed in the beginning.
  useEffect(() => {
    let holder = {}
    axios.get(API.server + 'products', { headers: { "Authorization": API.gitToken } })
      .then(productResult => {
        holder.product = productResult.data[2]

        // get request for reviews
        const getReview = axios.get(API.server + 'reviews/?product_id=' + productResult.data[2].id, { headers: { "Authorization": API.gitToken } })

        // get request for styles
        const getStyles = axios.get(API.server + 'products/' + productResult.data[2].id + '/styles', { headers: { "Authorization": API.gitToken } })

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

  return (
    <AppContainer>
      <h1>Project Atelier</h1>
      <MainRandy APIResults={APIResults} />
      <MainMonica product_id={APIResults.product.id} />
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
