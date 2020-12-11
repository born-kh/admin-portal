import { createStore, applyMiddleware, AnyAction } from 'redux'
import logger from 'redux-logger'
import { MakeStore, createWrapper, Context } from 'next-redux-wrapper'
import { RootState, rootReducer } from './reducers'
import thunk from 'redux-thunk'

export const makeStore: MakeStore<RootState> = (context: Context) => createStore(rootReducer, applyMiddleware(thunk))

export const wrapper = createWrapper<RootState>(makeStore, { debug: true })
