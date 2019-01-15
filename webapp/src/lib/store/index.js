import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from 'lib/store/rootReducer';

const composeEnhancers = process.env.NODE_ENV === 'development'
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  : compose;

export default createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    composeEnhancers(),
  )
);
