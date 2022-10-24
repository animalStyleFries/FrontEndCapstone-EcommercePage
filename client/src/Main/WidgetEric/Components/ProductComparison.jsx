import React, { useEffect, useState } from 'react';


const ProductComparison = ({ sortedProduct, originalProductFeatures, rating }) => {

  const findFeaturevalue = () => {
    sortedProduct.styleArray
  }

  const getSizes = (productStyle) => {
    let sizes = productStyle.results[0].skus
    let sizeContainer = []
    for (var key in sizes) {
      sizeContainer.push(sizes[key]['size'])
    }
    return sizeContainer
  }

  return (
    <div>
      <h4>Product Comparison</h4>
      {console.log('productcomparison', sortedProduct, originalProductFeatures)}
      <table>
      <tbody>
        <tr>
          <th>Product Name</th>
          <th>Characteristic</th>
          <th>Compared Product Name</th>
        </tr>
        <tr>
          <td>Value</td>
          <td>Char</td>
          <td>Value</td>
        </tr>
        <tr>
          <td>{originalProductFeatures.results[0].sale_price ? <p>true</p> : <p>false</p>}</td>
          <td>On Sale?</td>
          <td>{sortedProduct.styleArray.results[0].sale_price ? <p>true</p> : <p>false</p>}</td>
        </tr>
        <tr>
          <td>{(getSizes(originalProductFeatures).length) > 0 ? <p> true</p> : <p>false</p>}</td>
          <td>Multiple Sizes Available?</td>
          <td>{(getSizes(sortedProduct.styleArray).length) > 0 ? <p> true</p> : <p>false</p>}</td>
        </tr>
        <tr>
          <td>{(originalProductFeatures.results.length > 0) ? <p>true</p> : <p>false</p>}</td>
          <td>Multiple Styles?</td>
          <td>{(sortedProduct.styleArray.results.length > 0) ? <p>true</p> : <p>false</p>}</td>
        </tr>
        <tr>
          <td>4.3</td>
          <td>Rating</td>
          <td>{rating}</td>
        </tr>
      </tbody>
    </table>
    </div>
  )
}

export default ProductComparison