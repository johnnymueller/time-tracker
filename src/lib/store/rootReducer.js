import { combineReducers } from 'redux';

import tasks from 'domains/timeentry/ducks/tasks';
import history from 'domains/timeentry/ducks/history';

export default combineReducers({
  tasks,
  history,
});
