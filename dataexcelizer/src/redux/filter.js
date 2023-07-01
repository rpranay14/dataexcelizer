import * as ActionTypes from './ActionTypes';

export const FILTERS = (state = { filterarray: [] }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_FILTERS:
            if (state.filterarray.length !== 0) {
                state.filterarray.map((x) => {
                    if (action.payload.status) {
                        console.log("2nd")
                        if (x.status) {
                            console.log("3rd", action.payload.status)
                            const newArray = state.filterarray;
                            newArray.map((x) => {
                                if (x.status) {
                                    x.status = action.payload.status;
                                    return { ...state, filterarray: newArray }

                                }

                            })
                            // const s = { ...state, filterarray: { ...state.filterarray, status: action.payload.status } }
                            console.log(newArray)

                        }
                        else {
                            console.log("4rd", action.payload.status)
                            const newArray = state.filterarray;
                            newArray.push(action.payload)
                            return { ...state, filterarray: newArray }
                        }
                    }
                    if (action.payload.salary) {
                        console.log("2nd")
                        if (x.salary) {
                            console.log("3rd", action.payload.salary)
                            const newarray = state.filterarray;
                            newarray.map((x) => {
                                if (x.salary) {
                                    x.salary = action.payload.salary;
                                    return { ...state, filterarray: newarray }

                                }

                            })
                            // const s = { ...state, filterarray: { ...state.filterarray, status: action.payload.status } }

                        }
                        else {
                            console.log("4rd", action.payload.salary)
                            let n = [...state.filterarray];
                            n.push(action.payload)
                            console.log(n)
                            return { ...state, filterarray: n }
                        }
                    }
                })

            }
            else {
                console.log("5rd", action.payload.status)
                const newArray = state.filterarray;
                newArray.push(action.payload)
                console.log("1st", newArray)
                return { ...state, filterarray: newArray }
            }







        case ActionTypes.DELETE_FILTERS:
            const farray = state.filterarray.filter(item => item !== action.payload);
            return { ...state, filterarray: farray }

        default:
            return state

    }



}