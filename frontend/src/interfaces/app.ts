namespace APP {
    export interface ApplicationState {
        todos: APP.TodoItem[],
    }

    export interface TodoItem {
        id: number;
        text: string;
        isDone: boolean;
    }
}