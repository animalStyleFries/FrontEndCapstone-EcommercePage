import renderer from 'react-test-renderer';
import React from 'react'
import App from '../src/Main/App.jsx';

it('Should render a title and 3 widgets', () => {
  const component = renderer.create(
    <App />,
  );
  let tree = component.toJSON()
  console.log('this is the tree', tree)
  expect(tree.children.length).toBe(4)
})