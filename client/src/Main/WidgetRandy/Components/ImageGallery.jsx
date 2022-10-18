// imports
import React from 'react'
import { useState } from 'react'
import SmallerImage from './SmallerComponents/SmallerImage.jsx'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

const ImageGallery = ({ styleArray, style, expandURL, setExpand }) => {

  // setting up index count
  let count = 0

  // by default, use first image
  const [currentImage, setCurrentImage] = useState(0)

  // expand function
  const expandClicker = () => {
    expandURL.current = styleArray[style].photos[currentImage].url;
    setExpand(true)
  }

  // 7 dumbnails per column
  return (<ContainerImage>

    {/* main picture */}
    <MainDisplay src={styleArray[style].photos[currentImage].url}></MainDisplay>

    {/* map over remainder of entries to smaller images */}
    <DumbNails>
      {styleArray[style].photos.map(entry => (
        <SmallerImage entry={entry} index={count++} setCurrentImage={setCurrentImage} currentImage={currentImage} key={count} />
      ))}
    </DumbNails>
    <ContainerExpand onClick={expandClicker}>
      <FontAwesomeIcon icon={icon({ name: 'expand' })} />
    </ContainerExpand>
  </ContainerImage>)
}

const DumbNails = styled.div`
  display: flex;
  flex-direction: column;
  height: 40rem;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
`;

const MainDisplay = styled.img`
height: 40rem;
width: 50rem;
object-fit: cover;
`

const ContainerImage = styled.div`
position:relative
`

const ContainerExpand = styled.div`
left: 48rem;
top: 1rem;
z-index: 1;
position: absolute;
color: grey;
font-size: x-large;
cursor: pointer;
`
export default ImageGallery