import * as R from 'ramda';
import { createSelector } from 'reselect';

const taskSelector = R.prop('tasks');

export const taskListSelector = (state) => {
  const tasks = taskSelector(state);
  return R.propOr([], 'list', tasks);
};
export const historyListSelector = (state) => {
  return R.pathOr([], ['history', 'list'], state);
};

export const allTheThingsSelector = createSelector(
  taskListSelector,
  historyListSelector,
  (taskList, historyList) => ([
    ...taskList,
    ...historyList,
  ]),
);
