import * as ActionTypes from './ActionTypes';

export const addEmployees = (employees) => ({
    type: ActionTypes.ADD_EMPLOYEES,
    payload: employees
})
export const addFilters = (filter) => ({
    type: ActionTypes.ADD_FILTERS,
    payload: filter
})
export const deleteFilters = (filter) => ({
    type: ActionTypes.ADD_FILTERS,
    payload: filter
})