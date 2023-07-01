import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { EMPLOYEES } from './employees';
import { FILTERS } from './filter';
export const configureStore = () => {
    const store = createStore(
        combineReducers({
            employees: EMPLOYEES,
            filter: FILTERS
        }), applyMiddleware(thunk, logger)
    )
    return store
}