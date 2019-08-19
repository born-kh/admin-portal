import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import authReducer from './reducers/authReducer';
import settingsReducer from './reducers/settingsReducer';
import tracerReducer from './reducers/tracerReducer';
import userReducer from './reducers/userReducer';
import sessionReducer from './reducers/sessionReducer';
import presenceInfoReducer from './reducers/presenceInfoReducer';

const reducers = combineReducers({
  auth: authReducer,
  settings: settingsReducer,
  tracer: tracerReducer,
  user: userReducer,
  session: sessionReducer,
  presence: presenceInfoReducer
});

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
