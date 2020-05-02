import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import authReducer from './reducers/authReducer';
import settingsReducer from './reducers/settingsReducer';
import tracerReducer from './reducers/tracerReducer';
import userReducer from './reducers/userReducer';
import sessionReducer from './reducers/sessionReducer';
import presenceInfoReducer from './reducers/presenceInfoReducer';
import themeOptionsReducer from './reducers/themeOptionsReducer';
import { reducer as formReducer } from 'redux-form';
import passportReducer from './reducers/passportReducer';
import apiKeyReducer from './reducers/apiKeyReducer';

const reducers = combineReducers({
  auth: authReducer,
  settings: settingsReducer,
  tracer: tracerReducer,
  user: userReducer,
  session: sessionReducer,
  presence: presenceInfoReducer,
  themeOptions: themeOptionsReducer,
  passport: passportReducer,
  form: formReducer,
  apiKey: apiKeyReducer
});

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
