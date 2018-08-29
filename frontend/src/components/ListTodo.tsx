import * as React from 'react'

interface Todo {
    id: number;
    text: string;
}

interface IProps {
    todos: Todo[];
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