import React, { useEffect, useState } from 'react';
import ProductComparison from './ProductComparison.jsx'

const RelatedCard = ({ relatedProductId, relatedProducts, originalProductFeatures }) => {

  const [sortedProduct,  setSortedProduct] = useState();
  const [comparisonToggle,  setComparisonToggle] = useState(false);

  useEffect(() => {
    if (relatedProducts.productArrays && relatedProducts.styleArrays && relatedProducts.reviewArrays) {
      let index = relatedProducts.relatedProductIds.indexOf(relatedProductId)
      let container = {
        productArray: relatedProducts.productArrays[index],
        styleArray: relatedProducts.styleArrays[index],
        reviewArray: relatedProducts.reviewArrays[index],
        id: relatedProducts.relatedProductIds[index]
      };
      setSortedProduct(container);
    }
  }, [])

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
        <button onClick={() => setComparisonToggle(!comparisonToggle)}>Star</button>
        <div>
          {comparisonToggle ? <ProductComparison sortedProduct={sortedProduct}  originalProductFeatures={originalProductFeatures} rating={getRating(sortedProduct)}/> : null}
        </div>
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


