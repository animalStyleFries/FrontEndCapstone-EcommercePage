import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Modal from './ModalQuestion.jsx';
import gitToken from '../../../../hidden.js';

const AddQuestion = (props) => {
  console.log('this is the add question part', props.productid)
  const [isOpen,setIsOpen] = useState(false)
  const [productname, setProductname] = useState('')

  useEffect(() => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${props.productid}`,
    { headers: { "Authorization": gitToken } })
    .then((response) => {
      console.log('here is question', response.data)
      setProductname(response.data.name)
    })
    .catch((err) => {
      console.log(err);
    })
  },[])

  return(
    <div>
        <button onClick={(e) => {e.preventDefault();setIsOpen(true)}}><b>Add a question +</b></button>
        <Modal
        productid={props.productid}
        productname={productname}
        open={isOpen}
        onClose={() => setIsOpen(false)}
        ></Modal>

    </div>

  )
}

export default AddQuestion;