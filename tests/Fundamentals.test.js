/**
 * @jest-environment jsdom
 */
//https://jestjs.io/docs/configuration#testenvironment-string (By adding a @jest-environment docblock at the top of the file, you can specify another environment to be used for all tests in that file)
//each test files line 1 to line 4 and line 6 to define a test environment
//https://github.com/testing-library/jest-dom#installation
import '@testing-library/jest-dom'
import renderer from 'react-test-renderer';
import React from 'react'
import App from '../client/src/Main/App.jsx';
import StyleSelectorCard from "../client/src/Main/WidgetRandy/Components/SmallerComponents/StyleSelectorCard.jsx";
import Question1 from "./Q&A/testQuestionData.js";
import Answer1 from "./Q&A/testAnswerData.js";
import MainMonica from "../client/src/Main/WidgetMonica/main.jsx";
import axios from "axios";
//third party testing library (https://github.com/testing-library/react-testing-library)
import {screen, render} from '@testing-library/react'


jest.mock('axios')

it('Should be able to render', () => {
  const component = renderer.create(<StyleSelectorCard entry={{ name: 'hi' }} />)
  let tree = component.toJSON()
  console.log(tree)
})


it("should fetch correct product questions and answers", async () => {
  var product_id = '40346';
  axios.get.mockImplementation((url) => {
    switch (url) {
      case `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions?product_id=${product_id}`:
          {
            // console.log("resolve 1",Question1)
            return Promise.resolve({ data: Question1})
          }
      default:
        return Promise.reject(new Error('not found'));
    }
  });

  axios.mockImplementation((options) => {
    switch (options.url) {
      case 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/426049/answers?count=100':
          {
            return Promise.resolve({ data: Answer1})
          }
          default:
            return Promise.reject(new Error('not found'));
        }
  })

  render(<MainMonica product_id={product_id}/>);
  expect(await screen.findByText(/awesome, but how much/i)).toBeInTheDocument()
  expect(await screen.findByText(/Answer 1/i)).toBeInTheDocument()
});


// it('Should render a title and 3 widgets', () => {
//   const component = renderer.create(
//     <App />,
//   );
//   let tree = component.toJSON()
//   expect(tree.children.length).toBe(4)
// })