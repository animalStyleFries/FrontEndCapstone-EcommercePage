import React, {useState, useEffect} from 'react';
import axios from 'axios';
import IndividualQuestion from './IndividualQuestion.jsx';
import ReactList from 'react-list';//for scrolling window
import styled from 'styled-components';

const QuestionsList = (props) => {
  if(!props.questions) {
    return null;
  }
  var sortingAll = function () {
    props.questions.sort(function(a,b){
      return a.helpfulness > b.helpfulness ? -1 : a.helpfulness < b.helpfulness ? 1 : 0;
    });
    return props.questions;
  }
  var sortedQ = sortingAll();

  // sort by helpfulness
  //https://github.com/caseywebdev/react-list(use reactlist to map and render each question)
  const itemRenderer = (index, key) => (
    <IndividualQuestion key={key} question={sortedQ[index]} productid={props.productid}></IndividualQuestion>
  );

  return (
    <div>
          <div style={{overflow: 'auto', maxHeight: 800}}>
          <ReactList
            itemRenderer={itemRenderer}
            length={sortedQ.length}
            type='simple'
          />
          </div>
    {/* <div>
      {(sortedQ).map((each, index) => {
        return (
          <IndividualQuestion key={index} question={each} productid={props.productid}></IndividualQuestion>
        )
      })}
    </div> */}
    </div>

  )
}

export default QuestionsList;