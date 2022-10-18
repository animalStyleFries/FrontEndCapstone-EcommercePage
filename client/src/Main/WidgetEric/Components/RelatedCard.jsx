import React, { useEffect, useState } from 'react';
import API from '../API.js';
import axios from 'axios';

const RelatedCard = ({ relatedProductId, relatedProducts }) => {

  const [sortedProduct,  setSortedProduct] = useState();

  if (relatedProducts) {
    useEffect(() => {
      let index = relatedProducts.relatedProductIds.indexOf(relatedProductId)
      let container = {
        productArray: relatedProducts.productArrays[index],
        styleArray: relatedProducts.styleArrays[index],
        reviewArray: relatedProducts.reviewArrays[index],
        id: relatedProducts.relatedProductIds[index]
      };
      setSortedProduct(container);
    }, [])
  }


   const getRating = (sortedProduct) => {
    let sum = 0
    let reviews = sortedProduct.reviewArray.results
    for (var i = 0; i < reviews.length; i++) {
      sum += reviews[i].rating
    }
    return sum / reviews.length
  }


  if (sortedProduct) {
    return (
      <div>
        <h3>Product</h3>
        <button onClick={() => console.log('clickStar')}>Star</button>
        <img src={sortedProduct.styleArray.results[0].photos[0].thumbnail_url} alt='missing image'></img>
        <div>{sortedProduct.productArray.name}</div>
        <div>{(sortedProduct.reviewArray.results.length > 0) ? getRating(sortedProduct) : <p>no reviews</p>}</div>
        <div>{(sortedProduct.styleArray.results[0].sale_price) ? (sortedProduct.styleArray.results[0].sale_price, sortedProduct.styleArray.results[0].original_price) : sortedProduct.styleArray.results[0].original_price}</div>
        <small>{sortedProduct.productArray.category}</small>
      </div>
    )
  }

}

export default RelatedCard


