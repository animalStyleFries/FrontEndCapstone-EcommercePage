import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API from '../API.js';
import styled from 'styled-components'

const OutfitCard = ({ outfit, removeKeys }) => {

  const [savedProduct,  setSavedProduct] = useState();

  if (outfit) {
    useEffect(() => {
      const getProductInfo = (axios.get(`${API.server}products/${outfit}`, { headers: {'Authorization': API.gitToken}}))

      const getProductStyles = (axios.get(`${API.server}products/${outfit}/styles`, { headers: {'Authorization': API.gitToken}}))

      Promise.all( [getProductInfo, getProductStyles] )
        .then((results) => {
          let container = {}
          container.productInfo = results[0].data
          container.productStyles = results[1].data
          setSavedProduct(container)
        })
    }, [])
  }

  if (savedProduct) {
    return (
      <div>
        <button onClick={() => (removeKeys(outfit))}>Delete Outfit</button>
        <div>{savedProduct.productInfo.name}</div>
        <OutfitProductImage src={savedProduct.productStyles.results[0].photos[0].thumbnail_url} alt='missing image'></OutfitProductImage>
      </div>
    )
  }

}

const OutfitProductImage = styled.img`
  display: block;
  margin:10px 0 0 10px;
  flex-grow: 1;
  float: left;
  height: 300px;
  width: 240px;
  margin: 20px;
`


export default OutfitCard