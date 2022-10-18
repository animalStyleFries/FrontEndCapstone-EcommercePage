import React, {useEffect, useState} from 'react';
import API from '../API.js';
import RelatedList from './RelatedList.jsx';
import RelatedCard from './RelatedCard.jsx'
import OutfitList from './OutfitList.jsx';
import axios from 'axios';

const RelatedItemsAndOutfit = () => {

  const originalProductID = 40344;

  const [relatedProducts,  setRelatedProducts] = useState();

  useEffect(() => {
     axios.get(`${API.server}products/${originalProductID}/related`, { headers: {'Authorization': API.gitToken}})
      .then(relatedProducts => {
        let container = {};

        container.relatedProductIds = relatedProducts.data

        const getRelatedProducts = relatedProducts.data.map((relatedId) => {
          return (axios.get(`${API.server}products/${relatedId}`, { headers: {'Authorization': API.gitToken}}))
        })

        const getRelatedStyles = relatedProducts.data.map((relatedId) => {
          return (axios.get(`${API.server}products/${relatedId}/styles`, { headers: {'Authorization': API.gitToken}}))
        })

        const getRelatedReview = relatedProducts.data.map((relatedId) => {
          return (axios.get(`${API.server}reviews/?product_id=${relatedId}`, { headers: {'Authorization': API.gitToken}}))
        })

        Promise.all( getRelatedProducts )
          .then((results) => {
            container.productArrays = results.map((result) => {return result.data})
          })

        Promise.all( getRelatedStyles )
          .then((results) => {
            container.styleArrays = results.map((result) => {return result.data})
          })

          Promise.all( getRelatedReview )
          .then((results) => {
            container.reviewArrays = results.map((result) => {return result.data})
            setRelatedProducts(container)
          })
        })
  }, [])

  return (
    <div>
      <RelatedList relatedProducts={relatedProducts}/>
      <OutfitList originalProductID={originalProductID}/>
    </div>
  )
}

export default RelatedItemsAndOutfit