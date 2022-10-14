import React, {useState, useEffect} from 'react';
import axios from 'axios';
import cors from 'cors';
const SearchBar = (props) => {

const [entry, setEntry] = useState ('')

var handleEntry = function (e) {
  setEntry(e.target.value);
}
  return (
    <form>
      <input value={entry} onChange={handleEntry} placeholder='Have a question? Search for answers…' size="50"></input>
    </form>
  )

}


export default SearchBar;