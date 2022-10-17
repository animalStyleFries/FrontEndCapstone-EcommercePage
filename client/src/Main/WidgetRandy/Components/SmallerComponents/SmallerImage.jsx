import React from 'react'
import styled from 'styled-components'

const SmallerImage = ({ entry, index, setCurrentImage }) => {
  const clicker = () => {
    setCurrentImage(index)
  }
  return (<DumbNail src={entry.thumbnail_url} onClick={clicker}></DumbNail>)
}

const DumbNail = styled.img`
  height: 10rem;
  width: 7rem;
  object-fit: cover;
`;

export default SmallerImage