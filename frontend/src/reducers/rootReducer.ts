import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from "../actionTypes/index";

const initState: APP.ApplicationState = { todos: [] };

export const rootReducer = (state: APP.ApplicationState = initState, action: { type: string, payload: APP.TodoItem | number}) => {
    switch (action.type) {
        case ADD_TODO:
            return { ...state, todos:[ ...state.todos, action.payload ]};

        case REMOVE_TODO:
            const id: number = action.payload as number;
            const todos: APP.TodoItem[] = [];
            state.todos.forEach((item: APP.TodoItem) => {
                if (item.id !== id) todos.push(item)
            });

            return { ...state, todos:[ ...todos ]};

        case UPDATE_TODO:
            const updated: APP.TodoItem = { ...action.payload as APP.TodoItem};
            const updatedTodos: APP.TodoItem[] = [];
            state.todos.forEach((item: APP.TodoItem) => {
                if (item.id !== updated.id) {
                    updatedTodos.push(item)
                } else {
                    updatedTodos.push(updated)
                }
            });

            return { ...state, todos:[ ...updatedTodos ]};

        default:
            return initState;
    }
};