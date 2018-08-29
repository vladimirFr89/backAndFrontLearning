import * as React from 'react'
import { APP } from './../interfaces/app';

interface IProps {
    todos: APP.TodoItem[];
}

export class ListTodo extends React.Component<IProps,{}> {

    render() {
        return (
            <div>
                <ul>
                    {this.props.todos.map((todo)=>{
                        return <li key={todo.id}>{todo.text}</li>
                    })}
                </ul>
            </div>
        )
    }
}