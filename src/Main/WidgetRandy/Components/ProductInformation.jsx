import React from 'react'
import axios from 'axios'

//probably need to do some get request here to populate fields

// p.s. not every component needs an import

const ProductInformation = (props) => {
  return (
    <div>
      <h1>Product Information</h1>
      <p>Star Ratings go here</p>
      <p>Product Category goes here</p>
      <p>Product Title</p>
      <p>Price</p>
      <p>Product overview</p>
      <p>Share on social media</p>
    </div>
  )
}

export default ProductInformation