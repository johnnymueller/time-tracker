import * as R from 'ramda';
import uuid from 'uuid/v4';

const initialState = {
  list: []
}

export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';

export const addItem = (description, duration) => ({
  type: ADD_ITEM,
  payload: {
    description,
    duration
  },
});

export const removeItem = (id) => ({
  type: REMOVE_ITEM,
  payload: id,
});

export default (state = initialState, action) => {
  const exsistingList = R.propOr([], 'list', state);
  switch (action.type) {
    case ADD_ITEM: {
      const {description, duration} = action.payload;
      const newList = R.append({ description, duration, id: uuid() }, exsistingList);
      return R.assoc('list', newList, state);
    }
    case REMOVE_ITEM: {
      const newList = R.reject(R.propEq('id', action.payload), exsistingList);
      return R.assoc('list', newList, state);
    }
    default:
      return state;
  }
}
