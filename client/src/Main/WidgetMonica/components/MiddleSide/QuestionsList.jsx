import React, {useState, useEffect} from 'react';
import axios from 'axios';
import IndividualQuestion from './IndividualQuestion.jsx';

const QuestionsList = (props) => {

  return (
    <div>
      {(props.questions).map((each, index) => {
        return (
          <IndividualQuestion key={index} question={each}></IndividualQuestion>
        )
      })}
    </div>
  )

}

export default QuestionsList;