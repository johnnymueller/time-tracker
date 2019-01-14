import { combineReducers } from 'redux';

import tasks from 'domains/timeentry/ducks/tasks';
import history from 'domains/timeentry/ducks/history';
import modals from 'domains/timeentry/ducks/modals';

export default combineReducers({
  tasks,
  history,
  modals,
});
