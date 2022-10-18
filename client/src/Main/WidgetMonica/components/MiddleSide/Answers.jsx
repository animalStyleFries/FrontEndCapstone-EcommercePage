import React, {useState, useEffect} from 'react';
import axios from 'axios';
import gitToken from '../../../../hidden.js'

var Answers = function (props) {

  const[answerNumber, setAnswerNumber] =useState(2);
  const[displayAnswer, setDisplayAnswer] = useState([])

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
        setDisplayAnswer(sortingAnswer(response.data.results));
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
    for (var j = 0; j <res.length-1; j++) {
      if(res[j].helpfulness < res[j+1].helpfulness) {
        var originalanswer = res[j]
        res[j] = res[j+1];
        res[j+1] = originalanswer;
      }
    }
    return res;
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

  var render = function () {

    return (
    <div>
      A: {
      filter(answerNumber, displayAnswer).map((each, index) => {
        console.log('ddd', each)
        return(
        <div id ={index}>
          <br></br>
          {each.body}
          <br></br>
          <div style={{display: 'flex'}}>
            <p>by {each.answerer_name}</p>
            {/* {each.date.slice(0,10)} */}
            <p>Helpful?</p>
            <button>Yes</button>
            <p>{each.helpfulness}</p>
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