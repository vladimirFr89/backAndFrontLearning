import * as React from 'react';
import { ListTodo } from './ListTodo'

interface Todo {
    id: number;
    text: string;
}

export class App extends React.Component<{}, {}> {
    render() {
        const todoList: Todo[] = [
            { id: 1, text: 'Изучить js' },
            { id: 2, text: 'Познакомиться с React'},
            { id: 3, text: 'Развернуть express' },
            { id: 4, text: 'Написать todoList' }
        ];
        return (
            <ListTodo todos={todoList}/>
        )
    }
}