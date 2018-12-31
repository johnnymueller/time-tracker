import React from 'react';
import { shallow } from 'enzyme';
import { TaskCreator } from '../TaskCreator';
// import * as R from 'ramda';

describe('<TaskCreator />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<TaskCreator addTask={() => null} />);
    expect(wrapper.exists()).toBe(true);
  });

  describe('when the user adds a task', () => {
    it('should call addTask', () => {
      const addTask = jest.fn();
      const wrapper = shallow(<TaskCreator addTask={addTask} />);
      // console.log(wrapper.debug());
      // console.log('here');
      expect(wrapper.exists()).toBe(true);
      const button = wrapper.find('WithStyles(Button)');
      button.simulate('click');
      expect(addTask).toHaveBeenCalled();
    });
  });
});
