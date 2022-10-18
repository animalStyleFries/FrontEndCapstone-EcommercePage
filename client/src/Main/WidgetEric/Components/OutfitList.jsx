import React from 'react'
import OutfitCard from './OutfitCard.jsx'

const OutfitList = ({ originalProductID }) => {

  return (
    <div>
      <h2>Outfit List</h2>
      <div>
        {/* onclick -> localStorage.setItem(originalProductID: originalProductID); */}
        <h2>Add Outfit Card</h2>
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg0P2958dd3C0jaLaCJl1MuNrIFV2qiFwm15uRHpDG0w&s'></img>
      </div>
      <div>
        <OutfitCard />
        localStorage.getItem()
      </div>
    </div>
  )
}

export default OutfitList