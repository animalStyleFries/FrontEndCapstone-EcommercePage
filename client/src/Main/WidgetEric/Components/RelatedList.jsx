import React, {useEffect, useState} from 'react';
import RelatedCard from './RelatedCard.jsx'

const RelatedList = ({ relatedProductsIds }) => {

  return (
    <div>
      <h2>Related Cards</h2>
      <div>
        {(relatedProductsIds) ? relatedProductsIds.map((relatedProductId) =><RelatedCard relatedProductId={relatedProductId}/>)  : <p>nothing</p>}
        {/* {(relatedProductsIds) ? relatedProductsIds.map((relatedProductId) =><RelatedCard relatedProductId={40345}/>)  : <p>nothing</p>} */}
      </div>
    </div>
  )
}

export default RelatedList

