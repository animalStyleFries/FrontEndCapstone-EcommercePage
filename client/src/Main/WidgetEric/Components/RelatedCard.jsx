import React, { useEffect, useState } from 'react';
import API from '../API.js';
import axios from 'axios';

const RelatedCard = ({ relatedProductId }) => {

  const [allProductInfo, setAllProductInfo] = useState()

  useEffect(() => {
    const getRelatedProducts = axios.get(`${API.server}products/${relatedProductId}`, { headers: { 'Authorization': API.gitToken } })
    const getRelatedStyles = axios.get(`${API.server}products/${relatedProductId}/styles`, { headers: { 'Authorization': API.gitToken } })
    const getRelatedReview = axios.get(`${API.server}reviews/?product_id=${relatedProductId}`, { headers: { 'Authorization': API.gitToken } })

    Promise.all([getRelatedProducts, getRelatedStyles, getRelatedReview])
      .then((results) => {
        let container = {}
        container.productArrays = results[0].data
        container.styleArrays = results[1].data
        container.reviewArrays = results[2].data
        setAllProductInfo(container)
      })
  }, [])

  const getRating = (allProductInfo) => {
    let sum = 0
    let reviews = allProductInfo.reviewArrays.results
    for (var i = 0; i < reviews.length; i++) {
      sum += reviews[i].rating
    }
    return sum / reviews.length
  }


  // console.log(allProductInfo)

  if (allProductInfo) {
    return (
      <div>
        <h3>Product</h3>
        <button onClick={() => console.log('clickStar')}>Star</button>
        <img src={allProductInfo.styleArrays.results[0].photos[0].thumbnail_url} alt='missing image'></img>
        <div>{allProductInfo.productArrays.name}</div>
        <div>{(allProductInfo.reviewArrays.results.length > 0) ? getRating(allProductInfo) : <p>no reviews</p>}</div>
        <div>{(allProductInfo.styleArrays.results[0].sale_price) ? (allProductInfo.styleArrays.results[0].sale_price, allProductInfo.styleArrays.results[0].original_price) : allProductInfo.styleArrays.results[0].original_price}</div>
        <small>{allProductInfo.productArrays.category}</small>
      </div>
    )
  }

}

export default RelatedCard


