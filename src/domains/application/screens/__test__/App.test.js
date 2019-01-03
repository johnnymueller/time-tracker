import React from 'react';
import { shallow } from 'enzyme';
import { App } from '../App';

it('renders without crashing', () => {
  const changeTask = jest.fn();
  const wrapper = shallow(<App
                            addItem={() => null}
                            tasks={[]}
                            classes={{}}
                            changeTask={changeTask}
                            currentTask={'testId'}
                          />);
  // console.log(wrapper.debug());
  expect(wrapper.exists()).toBe(true);
  const taskSelector = wrapper.find('Connect(WithStyles(TaskSelector))');
  expect(taskSelector.exists()).toBe(true);
});
