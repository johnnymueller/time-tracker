import * as R from 'ramda';
import uuid from 'uuid/v4';

const initialState = {
  list: [
    {name: 'Lunch', id: uuid()},
    {name: 'PTO', id: uuid()},
  ],
}

export const ADD_TASK = 'ADD_TASK';

export const addTask = (name) => ({
  type: ADD_TASK,
  payload: name,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      const exsistingList = R.propOr([], 'list', state);
      const newList = R.append({ name: action.payload, id: uuid() }, exsistingList);
      return R.assoc('list', newList, state);
    case 'ADD':
      return R.assoc('yes', !state.yes, state);
    default:
      return state;
  }
}
