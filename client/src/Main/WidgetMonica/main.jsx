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
  // console.log("product_id", product_id);
  // product_id = "40348"
  // setup the whole status;
  const [questions, setQuestions] = useState([])
  // call api to get some data;

  useEffect(() => {

    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions?product_id=${product_id}`, { headers: { "Authorization": gitToken } })
  // const options = {
    // url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions?product_id=${product_id}`,
  //   headers: {
  //     'Authorization': gitToken
  //   },
  //   method: 'get'
  // };
  // console.log('this is ', options)
    .then((response) => {
      console.log('Injected response',response)
      setQuestions(response.data.results);
    })
    .catch((err) => {
      console.log(err);
    })
  }, [product_id])


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