import React from 'react'
import StyleSelectorCard from './SmallerComponents/StyleSelectorCard.jsx'

const StyleSelector = ({ styleArray, style, setStyle }) => {
  let count = 0
  // display all but in rows of 4

  return (<div>
    {styleArray.map(entry => (
      <StyleSelectorCard entry={entry} setStyle={setStyle} index={count++} key={entry.style_id} />
    ))}
  </div>)
}

export default StyleSelector