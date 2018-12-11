import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';

it('renders without crashing', () => {
  const wrapper = shallow(<App />);
  // console.log(wrapper.debug());
  expect(wrapper.exists()).toBe(true);
  const taskSelector = wrapper.find('TaskSelector');
  expect(taskSelector.exists()).toBe(true);
});