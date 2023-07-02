import * as ActionTypes from './ActionTypes';

export const FILTERS = (state = { filterarray: [] }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_FILTERS:

            console.log("5rd", action.payload.status)
            const newArray = state.filterarray;
            newArray.push(action.payload)
            console.log("1st", newArray)
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
            console.log("hii", action.payload)
            const farray = state.filterarray.filter(item => item !== action.payload);
            return { ...state, filterarray: farray }

        default:
            return state

    }



}