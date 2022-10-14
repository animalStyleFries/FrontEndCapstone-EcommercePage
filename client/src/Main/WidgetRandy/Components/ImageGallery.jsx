import React from 'react'
import { useState } from 'react'
import SmallerImage from './SmallerComponents/SmallerImage.jsx'

const ImageGallery = ({ styleArray, style }) => {

  // setting up index count
  let count = 0

  // by default, use first image
  const [currentImage, setCurrentImage] = useState(0)


  return (<div>

    {/* main picture */}
    <img src={styleArray[style].photos[currentImage].url}></img>

    {/* map over remainder of entries to smaller images */}
    {styleArray[style].photos.map(entry => (
      <SmallerImage entry={entry} index={count++} setCurrentImage={setCurrentImage} key={count} />
    ))}
  </div>)
}

export default ImageGallery