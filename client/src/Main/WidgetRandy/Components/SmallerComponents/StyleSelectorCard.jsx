import React from 'react'

const StyleSelectorCard = ({ entry, setStyle, index }) => {

  // onClick, changes the style
  // const clicker = () => {
  //   setStyle(index)
  // }
  return (<option value={index}>Style: {entry.name}</option>)
}

export default StyleSelectorCard