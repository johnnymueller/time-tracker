import { createStore, compose } from 'redux';

import rootReducer from 'lib/store/rootReducer';

const composeEnhancers = process.env.NODE_ENV === 'development'
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  : compose;

export default createStore(rootReducer, {}, composeEnhancers());