import { CHANGE_FILTER } from '../actionTypes/index'

export const changeFilter = (value: APP.FilterType): { type: string, payload: APP.FilterType } => {
    return {
        type: CHANGE_FILTER,
        payload: value
    }
};