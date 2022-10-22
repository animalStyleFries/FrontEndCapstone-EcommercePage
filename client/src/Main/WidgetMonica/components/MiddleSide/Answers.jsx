import React, {useState, useEffect} from 'react';
import axios from 'axios';
import gitToken from '../../../../hidden.js'

var Answers = function (props) {

  const[answerNumber, setAnswerNumber] =useState(2);
  // const[displayAnswer, setDisplayAnswer] = useState([])
  // const[helpfulness,setHelpfulness] = useState()

  var filter = function (number, all) {
    var res = [];
    for (var i = 0; i < Math.min(number,all.length); i++) {
      res.push(all[i]);
    }
    return res;
  }

  var handleloadmore = function () {
    var current = answerNumber;
    setAnswerNumber(current+5)
  }

  var handleHelpful = function (e, id) {
    e.preventDefault()
    if(e.target.disabled === true) {
      return;
    }
    //copy helpfulness state object
    var newState =JSON.parse(JSON.stringify(props.answerHelpfulness));
    newState[id] = newState[id]+1;
    props.setAnswerHelpfulness(newState);
    axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/answers/${id}/helpful`, null , { headers: { "Authorization": gitToken } })
    .then ((response) => {
      console.log('update answer helpful succeed')
    }).catch((err) => {
      console.log('there is an error in your update answer helpful', err);
    })
    console.log('event', e)
    e.target.disabled = true
  }

  var handleReport = function (e, id) {
    e.preventDefault()
    axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/answers/${id}/report`, null , { headers: { "Authorization": gitToken } })
    .then ((response) => {
      console.log('report succeed')
      var newState =JSON.parse(JSON.stringify(props.isReport));
      newState[id] = true;
      props.setIsReport(newState);
    }).catch((err) => {
      console.log('there is an error in report answer', err);
    })


  }
  var render = function () {
    return (
    <div key={props.questionid}>
      A: {
      filter(answerNumber, props.displayAnswer).map((each, index) => {
        return(
        <div key={index}>
          <br></br>
          {each.body}
          <br></br>
          <div>
            <div>
            {
              each.photos&&(each.photos).map((eachPhoto) => (
                <img src={eachPhoto.url} style={{width:400, height:300}}></img>
              ))
            }
            </div>
            <div style={{display: 'flex'}}>
              <p>by {each.answerer_name}&nbsp;&nbsp;&nbsp;</p>
              <p>{new Date(each.date.slice(0,10)).toUTCString().substring(0, 16)}&nbsp;&nbsp;&nbsp;</p>
              <p>Helpful?&nbsp;</p>
              <p><a href="" onClick={(e) => {handleHelpful(e, each.answer_id)}}>Yes&nbsp;&nbsp;</a></p>
              <p>{props.answerHelpfulness[each.answer_id]}</p>
              <p>
              {props.isReport && !props.isReport[each.answer_id] && <a href="" onClick={(e) => {handleReport(e, each.answer_id)}}>Report</a>}
              {props.isReport && props.isReport[each.answer_id] &&  <p>Reported</p>}
              </p>
            </div>
          </div>
        </div>
        )
      })}

      <button onClick={handleloadmore}> LOAD MORE ANSWER</button>
    </div>
    )

  }
  return render();

}

export default Answers;
