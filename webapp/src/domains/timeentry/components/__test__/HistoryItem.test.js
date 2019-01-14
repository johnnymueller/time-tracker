import React from 'react';
import { shallow } from 'enzyme';
import { HistoryItem } from '../HistoryItem';
import { getDuration } from 'lib/utils/time';
import moment from 'moment';
// import * as R from 'ramda';

describe('<HistoryItem />', () => {
  const item = {
    id: '1',
    duration: 1800,
    end: moment(),
    description: 'Task 1',
  }

  it('renders without crashing', () => {
    const wrapper = shallow(<HistoryItem item={item} removeItem={() => null} />);
    // console.log(wrapper.debug());
    expect(wrapper.exists()).toBe(true);
    const description = wrapper.find('[data-test="description"]');
    expect(description.prop('primary')).toEqual(`${item.description} - ${getDuration(item.duration)}`);
  });

  describe('when the user removes the item', () => {
    it('should call removeItem', () => {
      const removeItem = jest.fn();
      const wrapper = shallow(<HistoryItem item={item} removeItem={removeItem} />);
      expect(wrapper.exists()).toBe(true);
      const button = wrapper.find('WithStyles(IconButton)');
      button.simulate('click');
      expect(removeItem).toHaveBeenCalledWith(item.id);
    });
  });
});
