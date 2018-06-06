import React from 'react'
import renderer from 'react-test-renderer'

import { Login } from './Home'

it('renders without crashing', () => {
  const rendered = renderer.create(<Login />).toJSON()
  expect(rendered).toBeTruthy()
})