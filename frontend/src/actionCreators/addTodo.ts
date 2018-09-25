import { ADD_TODO } from '../actionTypes/index'

export const addTodo = (item: APP.TodoItem): { type: string, payload: APP.TodoItem} => {
    return {
        type: ADD_TODO,
        payload: item
    }
};