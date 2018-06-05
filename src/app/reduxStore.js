import { createStore, combineReducers } from 'redux'

export function createReduxStore({ reducers, middlewares, initStore }) {
    const combinedReducers = combineReducers(reducers)

    return createStore(combinedReducers, initStore, middlewares)
}