import * as React from 'react'

import { ToDo } from './ToDo'
import {ChangeEvent, FormEvent} from "react";

interface IProps {
    todos: APP.TodoItem[];
}

interface IState {
    taskValue: string;
}

export class ListTodo extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            taskValue: "",
        };
        //обработка изменения поля ввода
        this.onTaskValueChange = this.onTaskValueChange.bind(this);
        //добавляем элемент в список
        this.addItem = this.addItem.bind(this);
        //удаляет элемент списка
        this.removeItem = this.removeItem.bind(this);
    }

    onTaskValueChange(e: ChangeEvent<HTMLInputElement>){
        e.preventDefault();
        this.setState({
            taskValue: e.target.value
        })
    }

    addItem(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(e);
    };

    removeItem(id: number) {
        console.log(id);
    };

    render() {
        console.log('render ListTodo');
        return (
            <div>
                <ul>
                    {this.props.todos.map((todo: APP.TodoItem)=>{
                        return (
                            <li key={todo.id}>
                                <ToDo
                                    item={todo}
                                    removeItem={this.removeItem}
                                />
                            </li>
                        )
                    })}
                </ul>
                <div>
                    <form onSubmit={this.addItem}>
                        <label htmlFor="task">Новая задача:</label>
                        <input
                            type="text"
                            id="task"
                            name="taskValue"
                            placeholder="Название"
                            autoComplete="off"
                            value={this.state.taskValue}
                            onChange={this.onTaskValueChange}
                        />
                        <button>Создать задачу</button>
                    </form>
                </div>
                <button>Добавить задачу</button>
            </div>
        )
    }
}