import { FILL_TODO } from '../actionTypes/index'

export const fillTodo = (todoList: APP.TodoItem[]): { type: string, payload: APP.TodoItem[]} => ({
  type: FILL_TODO, payload: todoList
});