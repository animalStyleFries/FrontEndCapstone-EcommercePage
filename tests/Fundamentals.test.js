import renderer from 'react-test-renderer';
import React from 'react'
import App from '../client/src/Main/App.jsx';
import StyleSelectorCard from "../client/src/Main/WidgetRandy/Components/SmallerComponents/StyleSelectorCard.jsx";
// const axios = require('axios');
// jest.mock('axios')
// axios.get.mockResolvedValue([])

it('Should be able to render', () => {
  const component = renderer.create(<StyleSelectorCard entry={{ name: 'hi' }} />)
  let tree = component.toJSON()
  console.log(tree)
})

// it('Should render a title and 3 widgets', () => {
//   const component = renderer.create(
//     <App />,
//   );
//   let tree = component.toJSON()
//   expect(tree.children.length).toBe(4)
// })
