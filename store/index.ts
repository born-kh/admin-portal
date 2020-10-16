import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { MakeStore, createWrapper, Context } from 'next-redux-wrapper'
import { RootState, rootReducer } from './reducers'

export const makeStore: MakeStore<RootState> = (context: Context) => createStore(rootReducer, applyMiddleware(logger))

export const wrapper = createWrapper<RootState>(makeStore, { debug: true })
