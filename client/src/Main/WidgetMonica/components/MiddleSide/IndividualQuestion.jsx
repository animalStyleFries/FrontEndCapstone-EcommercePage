import React, { useState } from 'react';
import AddAnswer from './AddAnswer.jsx';
import Answers from './Answers.jsx';
import axios from 'axios'
import gitToken from '../../../../hidden.js'

const IndividualQuestion = (props) => {

  const [helpfulness, setHelpfulness] = useState(props.question.question_helpfulness)

  var handleHelpful = function (e, id) {
    e.preventDefault();
    if(e.target.disabled === true) {
      return;
    }
    var currentState = props.question.question_helpfulness +1;
    setHelpfulness(currentState);
    axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${id}/helpful`, null , { headers: { "Authorization": gitToken } })
    .then ((response) => {
      console.log('update question helpful succeed')
    }).catch((err) => {
      console.log('there is an error in your update question helpful', err);
    })
    e.target.disabled = true
  }

  return (

    <span>
      <div style={{display: 'flex'}}>
        <p>Q: {props.question.question_body}</p>
        <p>Helpful?</p>
        <a href="" onClick={(e) => {handleHelpful(e, props.question.question_id)}}>Yes</a>
        <p>{helpfulness}</p>
        <AddAnswer productid={props.productid} questionbody={props.question.question_body}  questionid={props.question.question_id}></AddAnswer>
      </div>
      <br></br>
      <Answers questionid={props.question.question_id}></Answers>


    </span>

  )

}

export default IndividualQuestion;