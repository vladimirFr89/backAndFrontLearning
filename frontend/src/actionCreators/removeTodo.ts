import { REMOVE_TODO } from '../actionTypes/index'

export const removeTodo = (id: number):{ type: string, payload: number} => {
    return {
        type: REMOVE_TODO,
        payload: id
    }
};