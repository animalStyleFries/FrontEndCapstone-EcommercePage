import React, {useState, useEffect} from 'react';
import axios from 'axios';
import gitToken from '../../../../hidden.js'
import Modal from './ModalAnswer.jsx';

const AddAnswer = (props) => {
  const [isOpen,setIsOpen] = useState(false)
  const [productname, setProductname] = useState('')
  useEffect(() => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${props.productid}`,
    { headers: { "Authorization": gitToken } })
    .then((response) => {
      console.log('here is addAnswered', response.data)
      setProductname(response.data.name)
    })
    .catch((err) => {
      console.log(err);
    })
  },[])

  return (
    <div>
      <a href="" onClick={(e) => {e.preventDefault();setIsOpen(true)}}>add answer</a>
      <Modal
        productname={productname}
        questionbody={props.questionbody}
        questionid={props.questionid}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      ></Modal>
    </div>

  )

}

export default AddAnswer;