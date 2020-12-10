import authReducer from './auth/reducers'
import settingsReducer from './settings/reducer'
import documentReducer from './document/reducers'
import { combineReducers, AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
export const rootReducer = combineReducers({
  auth: authReducer,
  settings: settingsReducer,
  document: documentReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>
