import React, {useState, useEffect} from 'react';
import axios from 'axios';
import gitToken from '../../../../hidden.js'

var Answers = function (props) {

  const[answerNumber, setAnswerNumber] =useState(2);
  const[displayAnswer, setDisplayAnswer] = useState([])
  const[helpfulness,setHelpfulness] = useState()

  const fetch = function () {
    const options = {
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${props.questionid}/answers?count=100`,
      headers: {
        'Authorization': gitToken
      },
      method: 'get'
    };
    axios(options)
      .then((response) => {
        console.log('this is the answer', response);
        var sortedAnswers = sortingAnswer(response.data.results);
        var helpful = {}
        sortedAnswers.forEach((each) => {
          helpful[each.answer_id] = each.helpfulness
        })
        setHelpfulness(helpful);
        setDisplayAnswer(sortedAnswers);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {
    fetch()
   },[])

   var sortingAnswer = function (displayAnswer) {

    var res = displayAnswer.slice();
    console.log('res is ', res)
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
      for (var i = 0; i < res.length-1; i++) {
        if(res[i].helpfulness < res[i+1].helpfulness) {
          var originalanswer = res[i]
          res[i] = res[i+1];
          res[i+1] = originalanswer;
        }
      }
      return res;
    }
    var sortedOthers = sortingAll(resOthers);
    var sortedSeller = sortingAll(resSeller);
    var finalRes = sortedSeller.concat(sortedOthers);
    return finalRes;
  }


  var filter = function (number, all) {
    var res = [];
    for (var i = 0; i < Math.min(number,all.length); i++) {
      res.push(all[i]);
    }
    return res;
  }

  var handleloadmore = function () {
    var current = answerNumber;
    setAnswerNumber(current+5)
  }

  var handleHelpful = function (e, id) {
    e.preventDefault()
    if(e.target.disabled === true) {
      return;
    }
    var newState =JSON.parse(JSON.stringify(helpfulness));
    newState[id] = newState[id]+1;
    setHelpfulness(newState);
    axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/answers/${id}/helpful`, null , { headers: { "Authorization": gitToken } })
    .then ((response) => {
      console.log('update answer helpful succeed')
    }).catch((err) => {
      console.log('we found', err);
    })
    console.log('event', e)
    e.target.disabled = true
  }


  var render = function () {

    return (
    <div key={props.questionid}>
      A: {
      filter(answerNumber, displayAnswer).map((each, index) => {
        console.log('ddd', each)
        return(
        <div key={index}>
          <br></br>
          {each.body}
          <br></br>
          <div>
            <div>
            {
              (each.photos).map((eachPhoto) => (
                <img src={eachPhoto.url}></img>
              ))
            }
            </div>
            <div style={{display: 'flex'}}>
              <p>by {each.answerer_name}&nbsp;&nbsp;&nbsp;</p>
              <p>{new Date(each.date.slice(0,10)).toUTCString().substring(0, 16)}&nbsp;&nbsp;&nbsp;</p>
              <p>Helpful?&nbsp;</p>
              <p><a href="" onClick={(e) => {handleHelpful(e, each.answer_id)}}>Yes&nbsp;</a></p>
              <p>{helpfulness[each.answer_id]}</p>
              <p>
                <a href="">Report</a>
              </p>
            </div>
          </div>
        </div>
      )
      })}

      <button onClick={handleloadmore}> LOAD MORE ANSWER</button>
    </div>
    )

  }
  return render();

}

export default Answers;

