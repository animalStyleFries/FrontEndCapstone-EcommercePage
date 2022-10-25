import React, { useEffect, useState } from 'react';
import ProductComparison from './ProductComparison.jsx'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro'

const RelatedCard = ({ relatedProductId, relatedProducts, originalProductFeatures }) => {

  const [comparisonToggle,  setComparisonToggle] = useState(false);

  let index = relatedProducts.relatedProductIds.indexOf(relatedProductId)
  const sortedProduct = {
    productArray: relatedProducts.productArrays[index],
    styleArray: relatedProducts.styleArrays[index],
    reviewArray: relatedProducts.reviewArrays[index],
    id: relatedProducts.relatedProductIds[index]
  };

  const getRating = (sortedProduct) => {
    let sum = 0
    let reviews = sortedProduct.reviewArray.results
    for (var i = 0; i < reviews.length; i++) {
      sum += reviews[i].rating
    }
    return sum / reviews.length
  }

  return (
    <div>
      <TitleContainer>
        <h4>{sortedProduct.productArray.name}</h4>
        <Star onClick={() => setComparisonToggle(!comparisonToggle)}>
          <FontAwesomeIcon icon={icon({ name: 'star' })} />
        </Star>
      </TitleContainer>

      <div>
        {comparisonToggle ? <ProductComparison sortedProduct={sortedProduct}  originalProductFeatures={originalProductFeatures} rating={getRating(sortedProduct)}/> : null}
      </div>
      <RelatedProductImage src={sortedProduct.styleArray.results[0].photos[0].thumbnail_url} alt='missing image'></RelatedProductImage>
      <div>Rating {(sortedProduct.reviewArray.results.length > 0) ? getRating(sortedProduct) : <p>no reviews</p>}</div>
      <div>Price {(sortedProduct.styleArray.results[0].sale_price) ? (sortedProduct.styleArray.results[0].sale_price, sortedProduct.styleArray.results[0].original_price) : sortedProduct.styleArray.results[0].original_price}</div>
      <small>Category {sortedProduct.productArray.category}</small>
    </div>

  )
}

const RelatedProductImage = styled.img`
  display: block;
  margin:10px 0 0 10px;
  flex-grow: 1;
  float: left;
  height: 300px;
  width: 240px;
  margin: 20px;
`

const Star = styled.div`
  color: blue;
`

// const nameContainer = styled.div`
//   font-weight: bold;
// `

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`


export default RelatedCard



