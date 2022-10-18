//imports
import React from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro'



const ProductInformation = ({ APIResults, style }) => {
  // calculating average stars
  let total = 0;
  for (let i of APIResults.review.results) {
    total += i.rating
  }
  const avg = total / APIResults.review.results.length

  // creating array to map stars over
  let starCount = parseInt(avg)
  const starArray = [...Array(starCount).keys()]
  // check for float, if true conditional render half star
  let halfStar = false
  if (avg > starCount) { halfStar = true }

  // check for sales price
  let price = APIResults.styles.results[style].sale_price || APIResults.styles.results[style].original_price

  // creating array to hold social media names of interest
  const socialMediaArray = ['facebook', 'twitter', 'pinterest']

  return (
    <div>
      <StarContainer>
        {starArray.map(entry => (
          <FontAwesomeIcon icon={icon({ name: 'star' })} />
        ))}
        {halfStar && <FontAwesomeIcon icon={icon({ name: 'star-half' })} />}
      </StarContainer>
      <h1>{APIResults.product.name}</h1>
      <h3>{APIResults.product.slogan}</h3>
      <p>Category: {APIResults.product.category}</p>
      <p>Price: ${price}</p>
      <p>Description: <br></br>{APIResults.product.description}</p> {/* maybe add slogan as well eventually */}
    </div>
  )
}

const StarContainer = styled.div`
  display: flex;
  color: orange;
  width: 6rem;
`

const Star = styled.span`
  display: inline-block;
  position: relative;
  font-size: 100px;
  color: #ddd;
  &:after{
    font-family: FontAwesome;
    content: "\f005";
    position: absolute;
    left: 0;
    top: 0;
    width: 60%;
    overflow: hidden;
    color: #f80;
  }
`

const SocialMediaContainer = styled.div`
  display: grid;
  grid-template-columns: 2rem 2rem 2rem ;
  color: blue;
`
export default ProductInformation