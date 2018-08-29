import * as React from 'react';
import { ListTodo } from './ListTodo'
import { getTodoData } from '../data/listTodo'

export class App extends React.Component<{}, {}> {
    render() {
        return (
            <ListTodo todos={getTodoData()}/>
        )
    }
}