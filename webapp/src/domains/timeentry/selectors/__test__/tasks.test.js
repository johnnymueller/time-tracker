import * as tasks from '../tasks';
import memoize from 'fast-memoize';

const sum = memoize((a, b) => {
  // console.log('Summing', a, b);
  return a + b
});

describe('#getTaskListSelector', () => {
  describe('when there is no list', () => {
    it('should return an empty array', () => {
      sum(2, 2);
      sum(2, 2);
      sum(2, 2);
      expect(tasks.taskListSelector({})).toEqual([]);
    });
  });
  describe('when there is a list', () => {
    it('should return the list', () => {
      const list = [
        {name: "fake"},
        {name: "news"},
      ]
      const state = {
        tasks: {
          list,
        },
      }
      expect(tasks.taskListSelector(state)).toEqual(list);
    });
  });
});
