import React from 'react'

const SmallerImage = ({ entry, index, setCurrentImage }) => {
  const clicker = () => {
    setCurrentImage(index)
  }
  return (<img src={entry.thumbnail_url} onClick={clicker}></img>)
}

export default SmallerImage