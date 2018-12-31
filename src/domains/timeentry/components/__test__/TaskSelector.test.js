import React from 'react';
// import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { TaskSelector } from '../TaskSelector';
// import * as R from 'ramda';

describe('<TaskSelector />', () => {
  const tasks = [
    { id: 0, name: 'Test' },
    { id: 1, name: 'Test 2' },
  ];

  it('renders without crashing', () => {
    const wrapper = shallow(<TaskSelector tasks={tasks} onChange={() => null} classes={{}}/>);
    // console.log(wrapper.debug());
    expect(wrapper.exists()).toBe(true);

    tasks.forEach(({ name, id }) => {
      const domOption = wrapper.find(`[data-test="option-${id}"]`);
      // console.log
      expect(domOption.prop('value')).toEqual(id)
      expect(domOption.text()).toEqual(name)
    })
  });

  describe('when the user selects a task', () => {
    it('should call onChange', () => {
      const onChange = jest.fn();
      const wrapper = shallow(<TaskSelector tasks={tasks} onChange={onChange} classes={{}}/>);
      expect(wrapper.exists()).toBe(true);
      wrapper.simulate('change', {target: {value: '0'}});
      expect(onChange).toHaveBeenCalledWith('0');
    });
  });
});
