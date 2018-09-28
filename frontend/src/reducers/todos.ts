import { ADD_TODO, REMOVE_TODO, UPDATE_TODO, FILL_TODO } from "../actionTypes/index"

const initState: APP.TodoItem[] = [];

const todos = (state: APP.TodoItem[] = initState, action: { type: string, payload: APP.TodoItem | number | APP.TodoItem[]}) => {
    switch (action.type) {
        case ADD_TODO:
            return [ ...state, action.payload ];

        case REMOVE_TODO:
            const id: number = action.payload as number;
            const todoList: APP.TodoItem[] = [];
            state.forEach((item: APP.TodoItem) => {
                if (item.id !== id) todoList.push(item)
            });

            return todoList;

        case UPDATE_TODO:
            const updated: APP.TodoItem = { ...action.payload as APP.TodoItem};
            const updatedList: APP.TodoItem[] = [];
            state.forEach((item: APP.TodoItem) => {
                if (item.id !== updated.id) {
                    updatedList.push(item)
                } else {
                    updatedList.push(updated)
                }
            });

            return updatedList;

        case FILL_TODO:
            return [ ...action.payload as APP.TodoItem[]];

        default:
            return state;
    }
};

export default todos;