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

  const onChange = jest.fn();
  const wrapper = shallow(<TaskSelector tasks={tasks} onChange={onChange} classes={{}}/>);

  it('renders without crashing', () => {
    // console.log(wrapper.debug());
    expect(wrapper.exists()).toBe(true);

    tasks.forEach(({ name, id }) => {
      const domOption = wrapper.find(`[data-test="option-${id}"]`);
      expect(domOption.prop('value')).toEqual(id);
      expect(domOption.children().text()).toEqual(name);
    })
  });

  describe('when the user selects a task', () => {
    it('should call onChange', () => {
      expect(wrapper.exists()).toBe(true);
      const domSelect = wrapper.find('WithStyles(WithFormControlContext(Select))');
      domSelect.simulate('change', {target: {value: '0'}});
      expect(onChange).toHaveBeenCalledWith('0');
    });
  });
});
