import React from 'react';
import ReactDOM from 'react-dom';

// Service worker
import * as serviceWorker from './common/serviceWorker';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import App from './App';
import userReducer from 'store/reducers/userReducer';
import tracerReducer from 'store/reducers/tracerReducer';
import searchReducer from 'store/reducers/searchReducer';
import sessionReducer from 'store/reducers/sessionReducer';
import authReducer from 'store/reducers/authReducer';
import presenceInfoReducer from 'store/reducers/presenceInfoReducer';

const rootReducer = combineReducers({
  user: userReducer,
  tracer: tracerReducer,
  search: searchReducer,
  session: sessionReducer,
  auth: authReducer,
  presence: presenceInfoReducer
});
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);
ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();
