import React, {useState, useEffect} from 'react';
import axios from 'axios';

const MoreAnsweredQuestions = (props) => {
  console.log('the whole current questions we got', props)
  if(props.questions.length <= 2 || props.questionNumber >= Math.min(props.questions.length,20)) {
    return null;
  }

  var handleLoadMore = function () {
    var current = props.questionNumber;
    props.setQuestionNumber(current+2)
  }


  return(
    <button onClick={handleLoadMore}><b> More Answered Questions</b></button>
  )
}

export default MoreAnsweredQuestions;