namespace APP {
    export interface ApplicationState {
        activeFilter: string,
        todos: APP.TodoItem[],
    }

    export interface TodoItem {
        id: number;
        text: string;
        isDone: boolean;
    }
}