import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API from '../API.js';

const OutfitCard = ({ outfit }) => {

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
        <h4>Outfit Card</h4>
        <div>{savedProduct.productInfo.name}</div>
        <img src={savedProduct.productStyles.results[0].photos[0].thumbnail_url} alt='missing image'></img>
      </div>
    )
  }

}

export default OutfitCard