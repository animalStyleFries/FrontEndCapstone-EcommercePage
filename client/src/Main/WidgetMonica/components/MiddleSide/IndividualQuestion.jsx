import React, { useState, useEffect } from 'react';
import AddAnswer from './AddAnswer.jsx';
import Answers from './Answers.jsx';
import axios from 'axios'
import gitToken from '../../../../hidden.js'

const IndividualQuestion = (props) => {
  if(!props.question) {
    return null;
  }
  //number
  const [questionHelpfulness, setQuestionHelpfulness] = useState(props.question.question_helpfulness)
  //object{answerid: helpfulness}
  const [answerHelpfulness, setAnswerHelpfulness] = useState()
  const [isReport, setIsReport] = useState()
  const [displayAnswer, setDisplayAnswer] = useState([])

  var sortingAnswer = function (displayAnswer) {
    var res = displayAnswer.slice();
    var resOthers = []
    var resSeller = [];
    for (var j = 0; j <res.length; j++) {
      if(res[j].answerer_name === 'seller' || res[j].answerer_name === 'Seller' || res[j].answerer_name === 'SELLER') {
        resSeller.push(res[j])
      } else {
        resOthers.push(res[j])
      }
    }
    var sortingAll = function (res) {
      res.sort(function(a,b){
        return a.helpfulness > b.helpfulness ? -1 : a.helpfulness < b.helpfulness ? 1 : 0;
      });
      return res;
    }
    var sortedOthers = sortingAll(resOthers);
    var sortedSeller = sortingAll(resSeller);
    var finalRes = sortedSeller.concat(sortedOthers);
    return finalRes;
  }

  useEffect(() => {
    const options = {
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${props.question.question_id}/answers?count=100`,
      headers: {
        'Authorization': gitToken
      },
      method: 'get'
    };
    axios(options)
      .then((response) => {
        var sortedAnswers = sortingAnswer(response.data.results);
        var helpful = {}
        var reportState = {}
        sortedAnswers.forEach((each) => {
          helpful[each.answer_id] = each.helpfulness
          reportState[each.answer_id] = false;
        })
        setAnswerHelpfulness(helpful);
        setDisplayAnswer(sortedAnswers);
        setIsReport(reportState);
      })
      .catch((err) => {
        console.log(err);
      })
   },[])

  var handleHelpful = function (e, id) {
    e.preventDefault();
    if(e.target.disabled === true) {
      return;
    }
    var currentState = props.question.question_helpfulness +1;
    setQuestionHelpfulness(currentState);
    axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${id}/helpful`, null , { headers: { "Authorization": gitToken } })
    .then ((response) => {
      console.log('update question helpful succeed')
    }).catch((err) => {
      console.log('there is an error in your update question helpful', err);
    })
    e.target.disabled = true
  }

  return (

    <span>
      <div style={{display: 'flex'}}>
        <p>Q: {props.question.question_body}</p>
        <p>Helpful?</p>
        <a href="" onClick={(e) => {handleHelpful(e, props.question.question_id)}}>Yes</a>
        <p>{questionHelpfulness}</p>
        <AddAnswer
          productid={props.productid}
          questionbody={props.question.question_body}
          questionid={props.question.question_id}
          displayAnswer={displayAnswer}
          setDisplayAnswer={setDisplayAnswer}
          answerHelpfulness={answerHelpfulness}
          setAnswerHelpfulness={setAnswerHelpfulness}
          isReport={isReport}
          setIsReport={setIsReport}
          >
        </AddAnswer>
      </div>
      <br></br>
      <Answers
        questionid={props.question.question_id}
        displayAnswer={displayAnswer}
        setDisplayAnswer={setDisplayAnswer}
        answerHelpfulness={answerHelpfulness}
        setAnswerHelpfulness={setAnswerHelpfulness}
        isReport={isReport}
        setIsReport={setIsReport}
      ></Answers>
    </span>

  )

}

export default IndividualQuestion;