import React, { useEffect, useState } from 'react';
import OutfitCard from './OutfitCard.jsx'

const OutfitList = ({ originalProductID }) => {

  const [outfitList,  setOutfitList] = useState();
  const [listUpdater, setListUpdater] = useState(true);
  const idContainer = [];

  useEffect(() => {
    getKeys(localStorage)
  }, [listUpdater])

  const getKeys = (localStorage) => {
    let idContainer = [];
    for (var key in localStorage) {
      idContainer.push(key)
    }
     return setOutfitList(idContainer.splice(0, localStorage.length))
  }

  return (
    <div>
      <h2>Outfit List</h2>
      <div>
        <button onClick={() => (localStorage.setItem(originalProductID, originalProductID), setListUpdater(!listUpdater))}>Add Outfit</button>
        {/* <button onClick={() => (getKeys(localStorage), console.log('see storage', getKeys(localStorage)))}>Real Click to Add</button> */}
        <h2>Add Outfit Card</h2>
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg0P2958dd3C0jaLaCJl1MuNrIFV2qiFwm15uRHpDG0w&s'></img>
      </div>
      <div>
        {(outfitList) ? outfitList.map((outfit) => <OutfitCard outfit={outfit}/>) : <p>Add Some Outfits</p>}
      </div>
    </div>
  )
}

export default OutfitList