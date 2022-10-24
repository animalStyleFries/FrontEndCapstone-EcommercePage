import React from 'react'
import RelatedItemsAndOutfit from './Components/RelatedItemsAndOutfit.jsx'

const MainEric = ({ APIResults }) => {

  return (
  <div>
    {(APIResults.product.id) ? <RelatedItemsAndOutfit APIResults={APIResults} /> : null}
  </div>
  )
}

export default MainEric