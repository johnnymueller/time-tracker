import * as R from 'ramda';
import uuid from 'uuid/v4';

const initialState = {
  list: [
    {name: 'Lunch', id: uuid()},
    {name: 'PTO', id: uuid()},
    {name: 'Add New...', id: 'ADD_NEW'},
  ],
  currentTask: '',
}

export const ADD_TASK = 'ADD_TASK';
export const CHANGE_TASK = 'CHANGE_TASK';

export const addTask = (name) => ({
  type: ADD_TASK,
  payload: name,
});
export const changeTask = (taskId) => ({
  type: CHANGE_TASK,
  payload: taskId,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      const exsistingList = R.propOr([], 'list', state);
      const newList = R.append({ name: action.payload, id: uuid() }, exsistingList);
      return R.assoc('list', newList, state);
    case CHANGE_TASK:
      // const exsistingList = R.propOr([], 'list', state);
      // const newList = R.append({ name: action.payload, id: uuid() }, exsistingList);
      // return R.assoc('list', newList, state);
      return {
        // R.assoc('list', newList, state),
        list: state.list,
        currentTask: action.payload
      };
    default:
      return state;
  }
}
