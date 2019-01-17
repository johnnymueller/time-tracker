import * as R from 'ramda';
import axios from 'axios';

import API_ENDPOINT from 'lib/apiConstants';
// import { Promise } from 'core-js';

const initialState = {
  list: [
    {name: 'Add New...', id: 'ADD_NEW'},
  ],
  currentTask: '',
}

export const GET_TASKS = 'GET_TASKS';
export const ADD_TASK = 'ADD_TASK';
export const CHANGE_TASK = 'CHANGE_TASK';

export const getTasksData = (tasks) => ({
  type: GET_TASKS,
  payload: tasks,
});

export const getTasks = () =>
  async (dispatch) => {
    // dispatch(addTaskData(name));
    try {
      const response = await axios.get(API_ENDPOINT + 'tasks');
      dispatch(getTasksData(response.data));
    } catch (error) {
      console.log(error);
    }
  }

export const addTaskData = (name) => ({
  type: ADD_TASK,
  payload: name,
});

// export const addTask = (name) => (dispatch) =>
//   axios.get('https://jsonplaceholder.typicode.com/todos/1').then(
//     response => dispatch(addTaskData(response.data.title)),
//     error => console.log(error)
//   );

export const addTask = (name) =>
  async (dispatch) => {
    // dispatch(addTaskData(name));
    try {
      const response = await axios.post(API_ENDPOINT + 'tasks', {name});
      dispatch(addTaskData(response.data));
    } catch (error) {
      console.log(error);
    }
  }

export const changeTask = (taskId) => ({
  type: CHANGE_TASK,
  payload: taskId,
});

export default (state = initialState, action) => {
  const exsistingList = R.propOr([], 'list', state);
  switch (action.type) {
    case GET_TASKS:
      const getList = [...action.payload, ...exsistingList];
      return {
        list: getList,
        currentTask: '',
      }
    case ADD_TASK:
      let id = action.payload.id;
      let newList = R.prepend({
        name: action.payload.name,
        id,
      }, exsistingList);
      return {
        list: newList,
        currentTask: id,
      }
    case CHANGE_TASK:
      return R.assoc('currentTask', action.payload, state)
    default:
      return state;
  }
}
