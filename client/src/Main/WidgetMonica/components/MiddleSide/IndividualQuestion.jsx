import React, { useState } from 'react';
import AddAnswer from './AddAnswer.jsx';
import Answers from './Answers.jsx';
var axios = require('axios')

const IndividualQuestion = (props) => {
  console.log('find answer', props)

  return (

    <span>
      <div style={{display: 'flex'}}>
      <div>Q: {props.question.question_body}</div>
      <p>Helpful?</p>
      <button>Yes</button>
      <p>{props.question.question_helpfulness}</p>
      <AddAnswer></AddAnswer>
      </div>
      <br></br>
      <Answers questionid={props.question.question_id}></Answers>


    </span>

  )

}

export default IndividualQuestion;