import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import API from '../../../API.js'

const AddtoCart = ({ styleArray, style }) => {

  // ----------------------- Set Up -----------------------
  // set a size state (might need to change to not state)
  const [index, setIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)

  // create an array that contains related information
  let cartInfo = Object.values(styleArray[style].skus) || [];
  for (let i = 0; i < cartInfo.length; i++) {
    cartInfo[i].sku_id = Object.keys(styleArray[style].skus)[i]
  }

  // set up sku id to use in post request
  const sku_id = cartInfo[index].sku_id

  // create a quantity array to map over
  const quantityArray = [...Array(cartInfo[index].quantity).keys()].map(x => x + 1) || []

  // ----------------------- Functions -----------------------

  //onchange function for quantity
  const quantityOnChange = (e) => {
    setQuantity(e.target.value)
  }

  // onchange function for size
  const sizeOnChange = (e) => {
    setIndex(e.target.value)
    setQuantity(1)
  }

  // add to cart button
  const addToCart = (e) => {
    e.preventDefault()
    for (let i = 0; i < quantity; i++) {
      axios.post(API.server + 'cart', { sku_id: sku_id }, { headers: { 'Authorization': API.gitToken } })
        .catch(err => console.log(err))
    }
    console.log('this is quantity and id', quantity, sku_id)
  }

  // ----------------------- Return Div -----------------------

  // set up an indexCounter for entries
  let indexCounter = 0;
  return (<div>{
    styleArray.length > 0 && <form>
      <select value={quantity} onChange={quantityOnChange}>
        {quantityArray.map(entry => (
          <option value={entry}>Qty: {entry}</option>
        ))}
      </select>
      <select onChange={sizeOnChange}>
        {cartInfo.map(entry => (
          <option value={indexCounter++}>Size: {entry.size}</option>
        ))}
      </select>
      <button onClick={addToCart}>Add to Cart</button>
    </form>
  }</div>)
}

export default AddtoCart