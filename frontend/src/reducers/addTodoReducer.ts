import { ADD_TODO } from '../actionTypes/index'

export const addTodoReducer = (state: APP.ApplicationState, action: { type: string, payload: APP.TodoItem}) => {
    switch (action.type) {
        case ADD_TODO:
            const newState: APP.ApplicationState = { ...state };
            newState.todos.push(action.payload);
            return newState;

        default:
            return state;
    }
};