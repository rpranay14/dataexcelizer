import * as ActionTypes from './ActionTypes';
export const EMPLOYEES = (state = { employees: [] }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_EMPLOYEES:
            return { ...state, employees: action.payload }
        default:
            return state;
    }



}