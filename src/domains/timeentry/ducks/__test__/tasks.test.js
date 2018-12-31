import * as tasks from '../tasks';

describe('#addTask', () => {
  it('should return object with type and payload', () => {
    const action = tasks.addTask('First task');
    expect(action).toHaveProperty('type', tasks.ADD_TASK);
    expect(action).toHaveProperty('payload', 'First task');
  });
});

describe('#reducer.addTask', () => {
  describe('when there are no existing tasks', () => {
    it('should add task', () => {
      const action = tasks.addTask('First task');
      const newState = tasks.default({}, action);
      expect(newState).toHaveProperty('list');
      const task = newState.list[0];
      expect(task).toHaveProperty('name', 'First task');
    });
  });
  describe('when there are existing tasks', () => {
    it('should append it to the end of the list', () => {
      const action = tasks.addTask('First task');
      const newState = tasks.default({list: [{name: 'Existing task'}]}, action);
      expect(newState).toHaveProperty('list');
      expect(newState.list[0]).toHaveProperty('name', 'Existing task');
      expect(newState.list[1]).toHaveProperty('name', 'First task');
    });
  });
});
