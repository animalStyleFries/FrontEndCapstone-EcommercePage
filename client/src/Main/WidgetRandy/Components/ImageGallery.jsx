// imports
import React from 'react'
import { useState } from 'react'
import SmallerImage from './SmallerComponents/SmallerImage.jsx'
import styled from 'styled-components'

const ImageGallery = ({ styleArray, style }) => {

  // setting up index count
  let count = 0

  // by default, use first image
  const [currentImage, setCurrentImage] = useState(0)


  return (<div>

    {/* main picture */}
    <MainDisplay src={styleArray[style].photos[currentImage].url}></MainDisplay>

    {/* map over remainder of entries to smaller images */}
    <DumbNails>
      {styleArray[style].photos.map(entry => (
        <SmallerImage entry={entry} index={count++} setCurrentImage={setCurrentImage} key={count} />
      ))}
    </DumbNails>
  </div>)
}

const DumbNails = styled.div`
  display: grid;
  width: 50rem;
  grid-gap: 1.5rem;
  grid-template-columns: 7rem 7rem 7rem 7rem 7rem 7rem;
`;

const MainDisplay = styled.img`
height: 30rem;
width: 50rem;
object-fit: cover;
`
export default ImageGallery