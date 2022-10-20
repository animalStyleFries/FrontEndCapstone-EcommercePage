import React, {useState, useEffect} from 'react';
import axios from 'axios';
import gitToken from '../../../../hidden.js'

var Answers = function (props) {

  const[answerNumber, setAnswerNumber] =useState(2);
  const[displayAnswer, setDisplayAnswer] = useState([])
  const[helpfulness,setHelpfulness] = useState()
  const[isReport, setIsReport] = useState()

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
        var reportState = {}
        sortedAnswers.forEach((each) => {
          helpful[each.answer_id] = each.helpfulness
          reportState[each.answer_id] = false;
        })
        setHelpfulness(helpful);
        setDisplayAnswer(sortedAnswers);
        setIsReport(reportState);
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
    //copy helpfulness state object
    var newState =JSON.parse(JSON.stringify(helpfulness));
    newState[id] = newState[id]+1;
    setHelpfulness(newState);
    axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/answers/${id}/helpful`, null , { headers: { "Authorization": gitToken } })
    .then ((response) => {
      console.log('update answer helpful succeed')
    }).catch((err) => {
      console.log('there is an error in your update answer helpful', err);
    })
    console.log('event', e)
    e.target.disabled = true
  }

  var handleReport = function (e, id) {
    e.preventDefault()
    axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/answers/${id}/report`, null , { headers: { "Authorization": gitToken } })
    .then ((response) => {
      console.log('report succeed')
      var newState =JSON.parse(JSON.stringify(isReport));
      newState[id] = true;
      setIsReport(newState);
    }).catch((err) => {
      console.log('there is an error in report answer', err);
    })


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
              <p><a href="" onClick={(e) => {handleHelpful(e, each.answer_id)}}>Yes&nbsp;&nbsp;</a></p>
              <p>{helpfulness[each.answer_id]}</p>
              <p>
              {isReport && !isReport[each.answer_id] && <a href="" onClick={(e) => {handleReport(e, each.answer_id)}}>Report</a>}
              {isReport && isReport[each.answer_id] &&  <p>Reported</p>}
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

