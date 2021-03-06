import * as history from '../history';

describe('#addItem', () => {
  it('should return object with type and payload', () => {
    // const action = history.addItem('First item', 3);
    const action = history.addItem({
      task_id: 3,
      task_name: 'First Task',
      duration: 1800,
    });
    expect(action).toHaveProperty('type', history.ADD_ITEM);
    expect(action).toHaveProperty('payload', {
      task_id: 3,
      task_name: 'First Task',
      duration: 1800,
    });
  });
});

describe('#removeItem', () => {
  it('should return object with type and payload', () => {
    const action = history.removeItem(3);
    expect(action).toHaveProperty('type', history.REMOVE_ITEM);
    expect(action).toHaveProperty('payload', 3);
  });
});

describe('#reducer.addItem', () => {
  describe('when there is no existing history', () => {
    it('should add item', () => {
      const action = history.addItem('First item', 4);
      const newState = history.default({}, action);
      expect(newState).toHaveProperty('list');
      const item = newState.list[0];
      expect(item).toHaveProperty('description', 'First item');
      expect(item).toHaveProperty('duration', 4);
      expect(item).toHaveProperty('end');
      expect(item).toHaveProperty('id');
    });
  });
  describe('when there is existing history', () => {
    it('should append it to the end of the list', () => {
      const action = history.addItem('First item', 4);
      const newState = history.default({list: [{description: 'Existing item'}]}, action);
      expect(newState).toHaveProperty('list');
      expect(newState.list[0]).toHaveProperty('description', 'Existing item');
      expect(newState.list[1]).toHaveProperty('description', 'First item');
      expect(newState.list[1]).toHaveProperty('end');
      expect(newState.list[1]).toHaveProperty('duration', 4);
      expect(newState.list[1]).toHaveProperty('id');
    });
  });
});

describe('#reducer.removeItem', () => {
  describe('when the item does not exit', () => {
    it('should remove item', () => {
      const action = history.removeItem(4);
      const newState = history.default({}, action);
      expect(newState).toHaveProperty('list');
      expect(newState.list).toEqual([]);
    });
  });
  describe('when the item does exist', () => {
    it('should remove it from the list', () => {
      const action = history.removeItem(4);
      const newState = history.default({list: [{id: 4}]}, action);
      expect(newState).toHaveProperty('list');
      expect(newState.list).toEqual([]);
    });
  });
});
