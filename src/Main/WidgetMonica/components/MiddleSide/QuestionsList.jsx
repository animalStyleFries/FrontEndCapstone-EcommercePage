import React, {useState, useEffect} from 'react';
import axios from 'axios';
import IndividualQuestion from './IndividualQuestion.jsx';

const QuestionsList = (props) => {

  return (
    <div>
      {(props.questions).map((each) => {
        return (
          <IndividualQuestion question={each}></IndividualQuestion>
        )
      })}
    </div>
  )

}

export default QuestionsList;