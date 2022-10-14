import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import QuestionsList from './components/MiddleSide/QuestionsList.jsx';
import SearchBar from './components/FrontSide/SearchBar.jsx';
import AddQuestion from './components/BottomSide/AddQuestion.jsx';
import MoreAnsweredQuestions from './components/BottomSide/MoreAnsweredQuestions.jsx';
import cors from 'cors';
// require("dotenv").config();

const MainMonica = (product_id) => {
  product_id = "40348"
  // setup the whole status;
  const [questions, setQuestions] = useState([])
  // call api to get some data;
  let options = {
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions?product_id=${product_id}`,
    headers: {
      'Authorization': process.env.REACT_APP_GITTOKEN
    },
    method: 'get'
  };
  useEffect(() => {
    axios(options)
      .then((response) => {
        console.log('this is the', response);
        setQuestions(response.data.results)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])


  return (<div>
    <h1> Questions & Answers</h1>
    <div>
      <SearchBar></SearchBar>
    </div>
    <br></br>
    <div>
      <QuestionsList questions={questions}></QuestionsList>
    </div>
    <br></br>
    <div>
      <MoreAnsweredQuestions></MoreAnsweredQuestions>
      <AddQuestion></AddQuestion>
    </div>
    <br></br>
  </div>)
}

export default MainMonica