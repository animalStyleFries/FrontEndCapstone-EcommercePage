import React from 'react';
import axios from 'axios';
import {useState} from 'react';
import gitToken from '../../../../hidden.js'

const MODAL_STYLE = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FFF',
  padding: '50px',
  zIndex: 1000
}

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0, .7)',
  zIndex: 1000
}
function Modal(props) {
  if(props.open === false) {
    return null;
  }
  const [body, setBody] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photos, setPhotos] = useState('')

  var handleclick = function () {
    window.open('','popUpWindow','height=500,width=400,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes')
  }

  var handlesubmit = function() {
    event.preventDefault()
    axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${props.questionid}/answers`, {
      body: body,
      name: name,
      email: email
    }, { headers: { "Authorization": gitToken } })
    .then(function (response) {
      console.log('your AddAnswer succeed');
      setName('');
      setBody('');
      setEmail('');
      props.onClose();
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return(
    <>

    <div style={OVERLAY_STYLES}/>
    <div className ="modelBackGround" style={MODAL_STYLE}>
      <div className="modalContainer">
        <div className="title">
          <h1>Submit your Answer</h1>
          <div className="subtitle">
            <h2>{props.productname}: </h2>
            <h2>{props.questionbody}</h2>
            <form>
              <label className="required">Your Answer *</label>
              <br></br>
              <textarea rows="4" cols="30" maxLength="1000" value={body} onChange={(e) => {setBody(e.target.value)}} required></textarea>
              {/* <input type="text" maxLength="1000" value={body} onChange={(e) => {setBody(e.target.value)}}></input> */}
              <br></br>
              <label> What is your nickname *</label>
              <br></br>
              <input type="text" maxLength="60" placeholder="Example: jack543!" value={name} onChange={(e) => {setName(e.target.value)}} required></input>
              <p><i>"For privacy reasons, do not use your full name or email address”</i> </p>
              <br></br>
              <label>Your email * </label>
              <br></br>
              <input type="text" maxLength="60" placeholder="Example: jack@email.com" value={email} onChange={(e) => {setEmail(e.target.value)}} required></input>
              <p><i>“For authentication reasons, you will not be emailed”</i></p>
              <br></br>
              <button onClick={handleclick}>Upload your photos</button>
              <button onClick={handlesubmit}>Submit answer</button>
              <button onClick={props.onClose}>cancel</button>
            </form>
          </div>
        </div>
        <div className="body"></div>
        <div className="footer"></div>
      </div>
    </div>
    </>
  )
}

export default Modal;