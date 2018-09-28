import { CHANGE_FILTER } from '../actionTypes/index'

export const changeFilter = (value: string): { type: string, payload: string } => {
    return {
        type: CHANGE_FILTER,
        payload: value
    }
};