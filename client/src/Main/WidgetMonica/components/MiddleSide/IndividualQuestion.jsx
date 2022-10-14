import React, { useState } from 'react';
import AddAnswer from './AddAnswer.jsx';
var axios = require('axios')

const IndividualQuestion = (props) => {
  // console.log('find answer', props)
  return (

    <span>
      {props.question.question_body} <AddAnswer></AddAnswer>

    </span>

  )

}

export default IndividualQuestion;