import React from 'react';
import axios from 'axios';
import {useState} from 'react';
import {Image} from 'cloudinary-react';
import gitToken from '../../../../hidden.js';
import styled from 'styled-components';

const PIC_STYLE = {
  border: '1px solid #ddd', /* Gray border */
  'border-radius': '4px', /* Rounded border */
  padding: '5px',/* Some padding */
  width: '150px'
}

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
  const [photos, setPhotos] = useState([]);
  const [fileUrl, setFileUrl] = useState();
  // const [imageSelected, setImageSelected] = useState([])

  var sortingAnswer = function (displayAnswer) {
    var res = displayAnswer.slice();
    console.log('res is ', res)
    var resOthers = []
    var resSeller = [];
    for (var j = 0; j <res.length; j++) {
      if(res[j].answerer_name === 'seller' || res[j].answerer_name === 'Seller' || res[j].answerer_name === 'SELLER') {
        resSeller.push(res[j])
      } else {
        resOthers.push(res[j])
      }
    }
    var sortingAll = function (res) {
      res.sort(function(a,b){
        return a.helpfulness > b.helpfulness ? -1 : a.helpfulness < b.helpfulness ? 1 : 0;
      });
      return res;
    }
    var sortedOthers = sortingAll(resOthers);
    var sortedSeller = sortingAll(resSeller);
    var finalRes = sortedSeller.concat(sortedOthers);
    return finalRes;
  }

  var handlesubmit = function() {
    event.preventDefault();
    console.log('1111')
    var uploadImagePromise = uploadImage();
    var photoArr= []
    uploadImagePromise.then((response) => {
      console.log('test for promise',response)
      response.forEach((each) => {
        photoArr.push(each.data.url)
      })
      console.log('photoArr', photoArr);
      axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${props.questionid}/answers`, {
      body: body,
      name: name,
      email: email,
      photos: photoArr
    }, { headers: { "Authorization": gitToken } })
    .then(function (response) {
      console.log('your AddAnswer succeed');
      axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${props.questionid}/answers?count=100`,
      { headers: { "Authorization": gitToken } })
      .then((res) => {
        var helpful = {}
        var reportState = {}
        var sortedAnswer = sortingAnswer(res.data.results)
        sortedAnswer.forEach((each) => {
          helpful[each.answer_id] = each.helpfulness
          // reportState[each.answer_id] = false;
        })
        props.setAnswerHelpfulness(helpful);
        props.setDisplayAnswer(sortedAnswer)
        setName('');
        setBody('');
        setEmail('');
        props.onClose();
        }
      )
      .catch((error) => {
        console.log(error);
      })
    })
    .catch(function (error) {
      console.log(error);
    });
    }).catch((err) => {
      console.log('test for promise err', err)
    })
    console.log('2222')
  }

  const uploadImage = function () {
    // open chrome disk full authority at first
    var res = []
    photos.forEach((each) => {
      // var promise = new Promise(
      //   (resolve, reject) => {
          const formData = new FormData();
          formData.append("file", each)
          formData.append("upload_preset", "FEC_QandA")
          formData.append("cloud_name", "dqlxf5j8e")
          var promise = axios.post("http://api.cloudinary.com/v1_1/dqlxf5j8e/image/upload", formData)
        // .then(axiosResolve).catch(axiosreject)
        // })
        // .then((response) => {
        //   resolve(response)
        //   ///func1 function
        // }).catch((err) => {
        //   reject(err);
        // })
        // promise.then(func1).catch(reject1);
        res.push(promise);
        }
      )
      return Promise.all(res)
  }

  const handleImageAdd = function (e) {
    var store = e.target.files
    var res = photos.slice();
    for (var i = store.length-1; i >= 0; i--) {
      res = res.concat(store[i]);
    }

    if (res.length > 5) {
      res = res.slice(0,5)
    }
     setPhotos(res);
     console.log('res', res)
    //  setImageSelected(res);
     const url = [];
     if(res.length === 5) {
      e.target.hidden = true;
     }
     res.forEach((each) => {
      url.push(URL.createObjectURL(each))
     })
     setFileUrl(url)
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
              <div>
                {/* <button id='uploadButton' onClick={uploadImage}>Upload your photos</button> */}
                <input id='fileInput' type="file" multiple accept="image/*" onChange={(e) => handleImageAdd(e)}></input>
                { fileUrl && fileUrl.map((each) => {
                  return (
                    <img src={each} style={PIC_STYLE}/>
                  )
                })}
              </div>
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