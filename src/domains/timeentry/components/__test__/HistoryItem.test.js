import React from 'react';
import { shallow } from 'enzyme';
import HistoryItem from '../HistoryItem';
import { getDuration } from 'lib/utils/time';
import * as R from 'ramda';

describe('<HistoryItem />', () => {
  const item = {
    id: 1,
    duration: 1800,
    description: 'Task 1',
  }

  it('renders without crashing', () => {
    const wrapper = shallow(<HistoryItem item={item} removeHistoryItem={() => null} />);
    expect(wrapper.exists()).toBe(true);
    const description = wrapper.find('[data-test="description"]');
    expect(description.text()).toEqual(`${item.description} - ${getDuration(item.duration)}`);
  });

  describe('when the user removes the item', () => {
    it('should call removeHistoryItem', () => {
      const removeHistoryItem = jest.fn();
      const wrapper = shallow(<HistoryItem item={item} removeHistoryItem={removeHistoryItem} />);
      expect(wrapper.exists()).toBe(true);
      const button = wrapper.find('button');
      button.simulate('click');
      expect(removeHistoryItem).toHaveBeenCalledWith(item.id);
    });
  });
});
