import * as ActionTypes from './ActionTypes';

export const FILTERS = (state = { filterarray: [] }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_FILTERS:
            const newArray = state.filterarray;
            newArray.push(action.payload)
            return { ...state, filterarray: newArray }

        case ActionTypes.UPDATE_FILTER:
            if (action.payload.status) {
                const newArray = state.filterarray;
                newArray.map((x) => {
                    if (x.status) {
                        x.status = action.payload.status
                    }
                })
                return { ...state, filterarray: newArray }
            }
            else {
                const newArray = state.filterarray;
                newArray.map((x) => {
                    if (x.salary) {
                        x.salary = action.payload.salary
                    }
                })
                return { ...state, filterarray: newArray }

            }

        case ActionTypes.DELETE_FILTERS:
            const farray = state.filterarray.filter(item => item !== action.payload);
            return { ...state, filterarray: farray }

        case ActionTypes.CLEAR_FILTERS:
            return { ...state, filterarray: [] }

        default:
            return state
    }
}