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
  let avg = total / APIResults.review.results.length

  // creating array to map stars over
  let starCount = parseInt(avg)
  const starArray = [...Array(starCount).keys()]

  // check for float, round to nearest 0.25
  let [remainderStar, leftGradient, rightGradient] = [avg - starCount, 0, 0]
  if (remainderStar <= 0.125) { rightGradient = 100 }
  if (remainderStar > 0.125 && remainderStar <= 0.375) { [leftGradient, rightGradient] = [25, 25] }
  if (remainderStar > 0.375 && remainderStar <= 0.625) { [leftGradient, rightGradient] = [50, 50] }
  if (remainderStar > 0.625 && remainderStar <= 0.875) { [leftGradient, rightGradient] = [75, 75] }

  // creating 'empty' star array
  let emptyStarArray = []
  if (Math.ceil(avg) < 5) {
    emptyStarArray = [...Array(5 - Math.ceil(avg)).keys()]
  }

  // check for sales price
  let price = APIResults.styles.results[style].sale_price || APIResults.styles.results[style].original_price

  return (
    <div>
      <StarContainer>
        {starArray.map(entry => (
          <FontAwesomeIcon icon={icon({ name: 'star' })} />
        ))}
        {remainderStar > 0 && <TestStar className="fa-solid fa-star" left={leftGradient} right={rightGradient} />}
        {emptyStarArray.length > 0 && emptyStarArray.map(entry => (
          <TestStar className="fa-solid fa-star" left={0} right={0} />
        ))}
      </StarContainer>
      <h2>{APIResults.product.name}</h2>
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

const TestStar = styled.i`
  background: ${props => `linear-gradient(to right, orange ${props.left}%, grey ${props.right}%)`};
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
`

const SocialMediaContainer = styled.div`
display: grid;
grid-template-columns: 2rem 2rem 2rem;
color: blue;
`
export default ProductInformation