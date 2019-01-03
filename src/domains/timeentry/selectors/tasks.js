import * as R from 'ramda';
// import { createSelector } from 'reselect';

const taskSelector = R.prop('tasks');
// const currentTaskSelector = R.prop('currentTask');

export const taskListSelector = (state) => {
  const tasks = taskSelector(state);
  return R.propOr([], 'list', tasks);
};
export const taskCurrentTaskSelector = (state) => {
  const currentTask = taskSelector(state);
  return R.propOr('ADD_NEW', 'currentTask', currentTask);
};
export const historyListSelector = (state) => {
  return R.pathOr([], ['history', 'list'], state);
};

// export const allTheThingsSelector = createSelector(
//   taskListSelector,
//   currentTaskSelector,
//   historyListSelector,
//   (taskList, currentTask, historyList) => ([
//     ...taskList,
//     ...currentTask,
//     ...historyList,
//   ]),
// );
