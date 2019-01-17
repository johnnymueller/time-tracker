import * as R from 'ramda';
import moment from 'moment';
import axios from 'axios';
import API_ENDPOINT from 'lib/apiConstants';

const initialState = {
  list: []
}

export const GET_ITEMS = 'GET_ITEMS';
export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';

export const getItemsData = (items) => ({
  type: GET_ITEMS,
  payload: items,
});

export const getItems = () =>
  async (dispatch) => {
    // dispatch(addTask(name));
    try {
      const response = await axios.get(API_ENDPOINT + 'items');
      dispatch(getItemsData(response.data));
    } catch (error) {
      console.log(error);
    }
  }

export const addItemData = (item) => ({
  type: ADD_ITEM,
  payload: item,
});

export const addItem = (item) =>
  async (dispatch) => {
    // dispatch(addTask(name));
    try {
      item.end_datetime = moment().format('YYYY-MM-DD HH:mm:ss');
      console.log(item)
      const response = await axios.post(API_ENDPOINT + 'items', item);
      dispatch(addItemData(response.data));
    } catch (error) {
      console.log(error);
    }
  }

export const removeItemData = (id) => ({
  type: REMOVE_ITEM,
  payload: id,
});

export const removeItem = (id) =>
  async (dispatch) => {
    // dispatch(addTask(name));
    try {
      const response = await axios.delete(API_ENDPOINT + 'items/' + id);
      dispatch(removeItemData(id));
    } catch (error) {
      console.log(error);
    }
  }

export default (state = initialState, action) => {
  const exsistingList = R.propOr([], 'list', state);
  switch (action.type) {
    case GET_ITEMS:
      const getList = [...action.payload, ...exsistingList];
      return R.assoc('list', getList, state);
    case ADD_ITEM: {
      const {id, description, duration, end_datetime} = action.payload;
      const newList = R.append({ description, end_datetime, duration, id }, exsistingList);
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
