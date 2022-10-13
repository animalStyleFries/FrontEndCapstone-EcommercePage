import React from 'react'

const StyleSelectorCard = ({ setStyle, index }) => {

  // onClick, changes the style
  const clicker = () => {
    setStyle(index)
  }
  return (<div onClick={clicker}> hi i am card</div>)
}
export default StyleSelectorCard