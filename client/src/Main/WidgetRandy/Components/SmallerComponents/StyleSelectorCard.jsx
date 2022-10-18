import React from 'react'

const StyleSelectorCard = ({ entry, setStyle, index }) => {
  return (<option value={index}>Style: {entry.name}</option>)
}

export default StyleSelectorCard