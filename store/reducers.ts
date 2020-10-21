import authReducer from './auth/reducers'
import settingsReducer from './settings/reducer'
import { combineReducers, AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
export const rootReducer = combineReducers({
  authStatus: authReducer,
  settings: settingsReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>
