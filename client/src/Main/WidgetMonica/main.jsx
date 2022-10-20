import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import QuestionsList from './components/MiddleSide/QuestionsList.jsx';
import SearchBar from './components/FrontSide/SearchBar.jsx';
import AddQuestion from './components/BottomSide/AddQuestion.jsx';
import MoreAnsweredQuestions from './components/BottomSide/MoreAnsweredQuestions.jsx';
import cors from 'cors';
import gitToken from '../../hidden.js' // dotenv substitute

// console.log(gitToken)
const MainMonica = ({ product_id }) => {
  const [questions, setQuestions] = useState([])
  const [questionNumber, setQuestionNumber] = useState(2)
  // call api to get some data;

  useEffect(() => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions?product_id=${product_id}`,
     { headers: { "Authorization": gitToken } })
    .then((response) => {
      console.log('Injected response',response)
      setQuestions(response.data.results);
    })
    .catch((err) => {
      console.log(err);
    })
  }, [product_id])

  var filter = function (number, all) {
    var res = [];
    for (var i = 0; i < Math.min(number,all.length); i++) {
      res.push(all[i]);
    }
    console.log(res)
    return res;
  }

  return (<div>
    <h1> Questions & Answers</h1>
    <div>
      <SearchBar></SearchBar>
    </div>
    <br></br>
    <div>
      <QuestionsList questions={filter(questionNumber,questions)} productid={product_id}></QuestionsList>
    </div>
    <br></br>
    <div>
      <MoreAnsweredQuestions questionNumber={questionNumber} setQuestionNumber={setQuestionNumber}></MoreAnsweredQuestions>
      <AddQuestion productid={product_id}></AddQuestion>
    </div>
    <br></br>
  </div>)
}

export default MainMonica