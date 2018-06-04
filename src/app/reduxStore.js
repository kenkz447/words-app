import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

const reducers = combineReducers({
    form: formReducer
})

export const reduxStore = createStore(reducers)