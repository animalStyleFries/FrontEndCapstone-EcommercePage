import React, {useEffect, useState} from 'react';
import RelatedCard from './RelatedCard.jsx'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

const RelatedList = ({ relatedProducts, originalProductFeatures }) => {

  const [index,  setIndex] = useState(0);

  if (relatedProducts) {
    return (
      <div>
          <Header><h2>Related Cards</h2></Header>

          {(index === 0) ? null :
          <ContainerLeftArrow onClick={() => (setIndex(index - 1))}>
            <FontAwesomeIcon icon={icon({ name: 'circle-arrow-left' })}/>
          </ContainerLeftArrow>}

          {((index + 4 ) === relatedProducts.relatedProductIds.length) ? null :
          <ContainerRightArrow onClick={() => (setIndex(index + 1))}>
            <FontAwesomeIcon icon={icon({ name: 'circle-arrow-right' })}/>
          </ContainerRightArrow>}

          <div>
            <RelatedCardsContainer>
              {(relatedProducts) ? (relatedProducts.relatedProductIds).slice(index, index + 4).map((relatedProductId) => (<RelatedCard relatedProductId={relatedProductId} relatedProducts={relatedProducts}  originalProductFeatures={originalProductFeatures}/>))  : <span>no related</span>}
            </RelatedCardsContainer>
          </div>
      </div>
    )
  }
}

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const RelatedCardsContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const ContainerRightArrow = styled.div`
color: grey;
font-size: x-large;
cursor: pointer;
`

const ContainerLeftArrow = styled.div`
color: grey;
font-size: x-large;
cursor: pointer;
`

export default RelatedList

