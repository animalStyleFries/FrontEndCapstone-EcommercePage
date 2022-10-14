import React from 'react'

const StyleSelectorCard = ({ entry, setStyle, index }) => {

  // onClick, changes the style
  const clicker = () => {
    setStyle(index)
  }
  return (<div onClick={clicker}>{entry.name} --- I am Clickable!</div>)
}

export default StyleSelectorCard