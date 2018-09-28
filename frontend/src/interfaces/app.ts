namespace APP {
    export interface ApplicationState {
        activeFilter: APP.FilterType,
        todos: APP.TodoItem[],
    }

    export interface TodoItem {
        id: number;
        text: string;
        isDone: boolean;
    }

    export enum FilterType {
        ALL = "ALL",
        DONE = "DONE",
        WAITING = "WAITING",
    }
}