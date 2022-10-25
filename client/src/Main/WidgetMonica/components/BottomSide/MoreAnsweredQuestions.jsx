import React, {useState, useEffect} from 'react';
import axios from 'axios';
import styled from 'styled-components';

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
    <MoreAnsweredButton onClick={handleLoadMore}>More Answered Questions</MoreAnsweredButton>
  )
}
const MoreAnsweredButton = styled.button`
  display: flex;
  width: 200px;
  margin-left: 5%;
  text-indent: 20px;
  background-color: orange;
  padding: .5rem 0;
  justify-content: left;
`

export default MoreAnsweredQuestions;