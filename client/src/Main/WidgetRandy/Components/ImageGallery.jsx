// imports
import React from 'react'
import { useState } from 'react'
import SmallerImage from './SmallerComponents/SmallerImage.jsx'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

const ImageGallery = ({ styleArray, style, setExpand, currentImage, setCurrentImage, dumbNailArrayIndex, setDumbNailArrayIndex }) => {
  // ---------------------- Set Up ----------------------
  // setting up index count
  let count = 0

  // create thumbnail arrays
  let photosArray = styleArray[style].photos;
  let dumbNailArray = [];
  for (let i = 0; i <= photosArray.length; i += 7) {
    dumbNailArray.push(photosArray.slice(i, i + 7))
  }

  // ---------------------- Functions ----------------------
  // expand function
  const expandClicker = () => {
    setExpand(true)
  }

  // Arrows
  const upArrowClick = () => {
    if (dumbNailArrayIndex > 0) setDumbNailArrayIndex(dumbNailArrayIndex - 1)
  }

  const downArrowClick = () => {
    if (dumbNailArrayIndex < dumbNailArray.length - 1) setDumbNailArrayIndex(dumbNailArrayIndex + 1)
  }

  const leftArrowClick = () => {
    if (currentImage === 0) { return }
    setCurrentImage(currentImage - 1)
    if ((currentImage) % 7 === 0) { setDumbNailArrayIndex(dumbNailArrayIndex - 1) }
  }

  const rightArrowClick = () => {
    if (currentImage < styleArray[style].photos.length - 1) { setCurrentImage(currentImage + 1) }
    if ((currentImage + 1) % 7 === 0) { setDumbNailArrayIndex(dumbNailArrayIndex + 1) }
  }
  // ---------------------- HTML ----------------------
  return (<ContainerImage>

    {/* main picture */}
    <MainDisplay src={styleArray[style].photos[currentImage].url}></MainDisplay>

    {/* map over remainder of entries to smaller images */}
    <DumbNails>
      <ContainerUp end={dumbNailArrayIndex} onClick={upArrowClick}>
        <FontAwesomeIcon icon={icon({ name: 'angle-up' })} />
      </ContainerUp>
      {dumbNailArray[dumbNailArrayIndex].map(entry => (
        <SmallerImage entry={entry} index={count++} setCurrentImage={setCurrentImage} currentImage={currentImage} dumbNailArrayIndex={dumbNailArrayIndex} key={count} />
      ))}
      <ContainerDown end={dumbNailArrayIndex} length={dumbNailArray.length} onClick={downArrowClick}>
        <FontAwesomeIcon icon={icon({ name: 'angle-down' })} />
      </ContainerDown>
    </DumbNails>

    <ContainerLeftArrow onClick={leftArrowClick}>
      <FontAwesomeIcon icon={icon({ name: 'circle-arrow-left' })} />
    </ContainerLeftArrow>

    <ContainerRightArrow onClick={rightArrowClick}>
      <FontAwesomeIcon icon={icon({ name: 'circle-arrow-right' })} />
    </ContainerRightArrow>

    <ContainerExpand onClick={expandClicker}>
      <FontAwesomeIcon icon={icon({ name: 'expand' })} />
    </ContainerExpand>
  </ContainerImage>)
}

// ---------------------- Style ----------------------
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

const ContainerUp = styled.div`
  color: grey;
  text-align: center;
  font-size: large;
  cursor: ${props => props.end === 0 ? `no-drop` : `pointer`}
`

const ContainerDown = styled.div`
color: grey;
text-align: center;
font-size: large;
position: absolute;
bottom: 0;
margin: 0 0 1rem 2rem;
cursor: ${props => props.end === props.length - 1 ? `no-drop` : `pointer`}
`

const ContainerLeftArrow = styled.div`
position: absolute;
top: 45%;
left: 6rem;
color: grey;
font-size: x-large;
cursor: pointer;
`

const ContainerRightArrow = styled.div`
position: absolute;
top: 45%;
right: 5rem;
color: grey;
font-size: x-large;
cursor: pointer;
`
export default ImageGallery