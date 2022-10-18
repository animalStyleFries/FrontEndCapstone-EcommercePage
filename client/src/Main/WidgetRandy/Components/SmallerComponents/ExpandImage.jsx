import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

const ExpandImage = ({ expandURL, setExpand }) => {

  return (
    <ContainerExpandImage>
      <ExpandedImage src={expandURL.current}></ExpandedImage>
      <ContainerExpand onClick={() => setExpand(false)}>
        <FontAwesomeIcon icon={icon({ name: 'xmark' })} />
      </ContainerExpand>
    </ContainerExpandImage>
  )
}

const ContainerExpandImage = styled.div`
  width:100%;
  height:40rem;
  position:relative;
`

const ExpandedImage = styled.img`
  width:100%;
  height:40rem;
  object-fit: contain;
`

const ContainerExpand = styled.div`
right: 1rem;
top: 1rem;
z-index: 1;
position: absolute;
color: grey;
font-size: x-large;
cursor: pointer;
`

export default ExpandImage