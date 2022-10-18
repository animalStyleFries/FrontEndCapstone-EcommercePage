import React from 'react'
import StyleSelectorCard from './SmallerComponents/StyleSelectorCard.jsx'

const StyleSelector = ({ styleArray, style, setStyle }) => {
  let count = 0

  const selectStyle = (e) => {
    setStyle(e.target.value)
  }
  // display all but in rows of 4

  return (<select onChange={selectStyle}>
    {styleArray.map(entry => (
      <StyleSelectorCard entry={entry} setStyle={setStyle} index={count++} key={entry.style_id} />
    ))}
  </select>)
}

export default StyleSelector