import * as R from 'ramda';
import moment from 'moment';
import axios from 'axios';
import API_ENDPOINT from 'lib/apiConstants';

const initialState = {
  list: []
}

export const GET_ITEMS = 'GET_ITEMS';
export const ADD_ITEM = 'ADD_ITEM';
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const SAVE_ITEM = 'SAVE_ITEM';
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

export const updateItemData = (item) => ({
  type: UPDATE_ITEM,
  payload: item,
});

export const updateItem = (item, time, position) =>
  (dispatch) => {
    let newItem = {...item};
    if (position === 'start') {
      let end = moment(item.end_datetime);
      let start = moment(moment(item.end_datetime).format('YYYY-MM-DD') + ' ' + time);
      // console.log(start, end)
      let duration = end.diff(start) / 1000;
      console.log(duration)
      newItem.duration = duration;
    } else {
      newItem.duration = 18000;
      newItem.end_datetime = moment(moment(item.end_datetime).format('YYYY-MM-DD') + ' ' + time).format('YYYY-MM-DD HH:mm:ss');
    }
    dispatch(updateItemData(newItem));
    // console.log(newItem);
  }

export const saveItemData = (item) => ({
  type: SAVE_ITEM,
  payload: item,
});

export const saveItem = (item) =>
  async (dispatch) => {
    // dispatch(addTask(name));
    try {
      const response = await axios.put(API_ENDPOINT + 'items/' + item.id, item);
      dispatch(saveItemData(response.data));
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
    // case UPDATE_ITEM: {
      const newList = R.append(action.payload, exsistingList);
      return R.assoc('list', newList, state);
    }
    case UPDATE_ITEM: {
      let item = R.find(R.propEq('id', action.payload.id), exsistingList);
      console.log(action.payload);
      console.log(exsistingList);
      let index = R.indexOf(item, exsistingList);
      console.log(index);
      const newList = R.update(index, action.payload, exsistingList);
      // console.log(R.assoc('list', newList, state));
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
