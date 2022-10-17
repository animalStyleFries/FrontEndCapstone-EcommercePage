import React from 'react'
import axios from 'axios'

//probably need to do some get request here to populate fields

// p.s. not every component needs an import

const ProductInformation = ({ APIResults, style }) => {
  // calculating average stars
  let total = 0;
  for (let i of APIResults.review.results) {
    total += i.rating
  }
  const avg = total / APIResults.review.results.length + 'stars'

  // check for sales price
  let price = APIResults.styles.results[style].sale_price || APIResults.styles.results[style].original_price

  return (
    <div>
      <h1>{APIResults.product.name}</h1>
      <p>{avg}</p>
      <p>{APIResults.product.category}</p>
      <p>${price}</p>
      <p>{APIResults.product.description}</p> {/* maybe add slogan as well eventually */}
      <p>Share on social media</p>
    </div>
  )
}

export default ProductInformation