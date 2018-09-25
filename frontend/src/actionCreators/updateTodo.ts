import { UPDATE_TODO } from '../actionTypes/index'

export const updateTodo = (item: APP.TodoItem): { type: string, payload: APP.TodoItem } => {
    return {
        type: UPDATE_TODO,
        payload: item
    }
};