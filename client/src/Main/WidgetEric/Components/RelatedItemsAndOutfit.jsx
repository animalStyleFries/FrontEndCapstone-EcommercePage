import React, {useEffect, useState} from 'react';
import API from '../API.js';
import RelatedList from './RelatedList.jsx';
import RelatedCard from './RelatedCard.jsx'
import OutfitList from './OutfitList.jsx';
import axios from 'axios';

const RelatedItemsAndOutfit = () => {

  const originalProductID = 40344;


  const originalProductFeatures = {
    "product_id": "40344",
    "results": [{
                  "style_id": 240500,
                  "name": "Forest Green & Black",
                  "original_price": "140.00",
                  "sale_price": null,
                  "default?": true,
                  "photos": [
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1549831243-a69a0b3d39e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1549831243-a69a0b3d39e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2775&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1527522883525-97119bfce82d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1527522883525-97119bfce82d?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1556648202-80e751c133da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1556648202-80e751c133da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1532543491484-63e29b3c1f5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1532543491484-63e29b3c1f5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
                      }
                  ],
                  "skus": {
                      "1394769": {
                          "quantity": 8,
                          "size": "XS"
                      },
                      "1394770": {
                          "quantity": 16,
                          "size": "S"
                      },
                      "1394771": {
                          "quantity": 17,
                          "size": "M"
                      },
                      "1394772": {
                          "quantity": 10,
                          "size": "L"
                      },
                      "1394773": {
                          "quantity": 15,
                          "size": "XL"
                      },
                      "1394774": {
                          "quantity": 4,
                          "size": "XL"
                      }
                  }
              }]}

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
      <RelatedList relatedProducts={relatedProducts} originalProductFeatures={originalProductFeatures}/>
      <OutfitList originalProductID={originalProductID}/>
    </div>
  )
}

export default RelatedItemsAndOutfit