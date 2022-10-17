import React from 'react'
import { useState } from 'react'

const AddtoCart = ({ styleArray, style }) => {
  // set a size state (might need to change to not state)
  const [index, setIndex] = useState(0)

  // create an array that contains related information
  let cartInfo = Object.values(styleArray[style].skus) || [];
  for (let i = 0; i < cartInfo.length; i++) {
    cartInfo[i].sku_id = Object.keys(styleArray[style].skus)[i]
  }

  // set up sku id to use in post request
  const sku_id = cartInfo[index].sku_id

  // create a quantity array to map over
  const quantityArray = [...Array(cartInfo[index].quantity).keys()].map(x => x + 1) || []

  // onchange function for size
  const sizeOnChange = (e) => {
    console.log('this is e.target.entryIndex', e.target.value)
    setIndex(e.target.value)
    // const sku_id = cartInfo[index].sku_id
    // const quantityArray = [...Array(cartInfo[index].quantity).keys()].map(x => x + 1)
  }

  // set up an indexCounter for entries
  let indexCounter = 0;

  return (<div>{
    styleArray.length > 0 && <form>
      <select>
        {quantityArray.map(entry => (
          <option value={entry}>Qty: {entry}</option>
        ))}
      </select>
      <select onChange={sizeOnChange}>
        {cartInfo.map(entry => (
          <option value={indexCounter++}>Size: {entry.size}</option>
        ))}
      </select>
    </form>
  }</div>)
}

export default AddtoCart