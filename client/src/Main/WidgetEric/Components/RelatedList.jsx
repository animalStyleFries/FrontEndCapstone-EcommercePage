import React, {useEffect, useState} from 'react';
import RelatedCard from './RelatedCard.jsx'

const RelatedList = ({ relatedProducts }) => {


  return (
    <div>
      <h2>Related Cards</h2>
      <div>
        {(relatedProducts) ? relatedProducts.relatedProductIds.map((relatedProductId) => (<RelatedCard relatedProductId={relatedProductId} relatedProducts={relatedProducts}/>))  : <p>nothing</p>}
      </div>
    </div>
  )
}

export default RelatedList

