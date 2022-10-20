import React, {useState, useEffect} from 'react';
import axios from 'axios';
import IndividualQuestion from './IndividualQuestion.jsx';

const QuestionsList = (props) => {
  // console.log('questionlist', props.questions)
  var sortingAll = function () {
    props.questions.sort(function(a,b){
      return a.helpfulness > b.helpfulness ? -1 : a.helpfulness < b.helpfulness ? 1 : 0;
    });
    return props.questions;
  }
  var sortedQ = sortingAll();

  return (
    <div>
      {(sortedQ).map((each, index) => {
        return (
          <IndividualQuestion key={index} question={each} productid={props.productid}></IndividualQuestion>
        )
      })}
    </div>
  )

}

export default QuestionsList;