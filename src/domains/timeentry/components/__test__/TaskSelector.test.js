import React from 'react';
import { shallow } from 'enzyme';
import TaskSelector from '../TaskSelector';
import * as R from 'ramda';

describe('<TaskSelector />', () => {
  const tasks = [
    { id: 0, description: 'Test' },
    { id: 1, description: 'Test 2' },
  ];

  it('renders without crashing', () => {
    const wrapper = shallow(<TaskSelector tasks={tasks} onChange={() => null} />);
    // console.log(wrapper.debug());
    expect(wrapper.exists()).toBe(true);

    tasks.forEach(({ description, id }) => {
      const domOption = wrapper.find(`[data-test="option-${id}"]`);
      // console.log
      expect(domOption.prop('value')).toEqual(id)
      expect(domOption.text()).toEqual(description)
    })
  });
  
  describe('when the user selects a task', () => {
    it('should call onChange', () => {
      const onChange = jest.fn();
      const wrapper = shallow(<TaskSelector tasks={tasks} onChange={onChange} />);
      expect(wrapper.exists()).toBe(true);
      wrapper.simulate('change', {target: {value: '0'}});
      expect(onChange).toHaveBeenCalledWith(0);
    });
  });
});