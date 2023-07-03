import * as ActionTypes from './ActionTypes';
export const CHARTS = (state = { showChart: false }, action) => {
    switch (action.type) {
        case ActionTypes.TOGGLE_CHART:
            return { ...state, showChart: action.payload }
        default:
            return state;
    }



}