import * as React from 'react'
import { httpReq } from '../utils'
import '../styles/main.styl'

import { ToDo } from './ToDo'
import {ChangeEvent, FormEvent} from "react";

interface IState {
    list: APP.TodoItem[];
    uniqueId: number;
    taskValue: string;
    isTaskFormDisabled: boolean;
    isCreateTaskButtonDisabled: boolean;
}

export class ListTodo extends React.Component<{}, IState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            list: [],
            uniqueId: 0,
            taskValue: "",
            isTaskFormDisabled: true,
            isCreateTaskButtonDisabled: true,
        };
        //обработка изменения поля ввода
        this.onTaskValueChange = this.onTaskValueChange.bind(this);
        //показываем форму ввода для новой задачи
        this.onAddTaskBtnClick = this.onAddTaskBtnClick.bind(this);
        //скрываем фому ввода для новой задачи
        this.onCloseBtnClick = this.onCloseBtnClick.bind(this);
        //добавляем элемент в список
        this.addItem = this.addItem.bind(this);
        //отметить задачу как выполненную
        this.markTask = this.markTask.bind(this);
        //удаляет элемент списка
        this.removeItem = this.removeItem.bind(this);
    }

    componentDidMount() {
        console.log('componentDidMount');
        //получение списка todos с сервера
        httpReq.getList((data: APP.TodoItem[]) => {
            const todos: APP.TodoItem[] = [...data];
            console.log(todos);
            this.setState({
                list: todos,
                uniqueId: this.getUniqueId(todos),
            })
        })
    }

    private getUniqueId(list: APP.TodoItem[]) {
        let max = 0;
        list.forEach((item) => {
            if (item.id > max) {
                max = item.id;
            }
        });
        return max;
    }

    onTaskValueChange(e: ChangeEvent<HTMLInputElement>){
        e.preventDefault();
        this.setState({
            taskValue: e.target.value
        })
    }

    onAddTaskBtnClick(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        this.setState({
            isTaskFormDisabled: !this.state.isTaskFormDisabled
        })
    }

    onCloseBtnClick(e: React.MouseEvent<HTMLButtonElement>) {
        this.onAddTaskBtnClick(e)
    }

    addItem(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (this.state.taskValue.length) {
            const newId = this.state.uniqueId + 1;
            const newItem: APP.TodoItem = {
                id: newId,
                text: this.state.taskValue,
                isDone: false,
            };

            httpReq.addItem(newItem, (data: any) => {
                //получение списка todos с сервера
                httpReq.getList((data: APP.TodoItem[])=>{
                    const todos: APP.TodoItem[] = [...data];
                    console.log(todos);
                    this.setState({
                        list: todos,
                        taskValue: '',
                        uniqueId: newId,
                    })
                })
            })
        }
    };

    markTask(item: APP.TodoItem) {
        httpReq.updateTask(
            item, (data: any) => {
                httpReq.getList((data: APP.TodoItem[]) => {
                    const todos: APP.TodoItem[] = [...data];
                    console.log(todos);
                    this.setState({
                        list: todos
                    })
                })
            })
    }

    removeItem(id: number) {
        httpReq.removeItem(
            id,
            (data: any) => {
                //получение списка todos с сервера
                httpReq.getList((data: APP.TodoItem[])=>{
                    const todos: APP.TodoItem[] = [...data];
                    console.log(todos);
                    this.setState({
                        list: todos
                    })
                });
            });
    };

    render() {
        console.log('render ListTodo');
        return (
            <div>
                <ul className="todos-list">
                    {this.state.list.map((todo: APP.TodoItem)=>{
                        return (
                            <li key={todo.id}>
                                <ToDo
                                    item={todo}
                                    markTaskAsDone={this.markTask}
                                    removeItem={this.removeItem}
                                />
                            </li>
                        )
                    })}
                </ul>
                <div className={'form-container ' + (this.state.isTaskFormDisabled ? 'form-container--disabled' : '')}>
                    <form onSubmit={this.addItem} >
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
                        <button className={'button ' + (this.state.taskValue.length ? '' : 'button--disabled')}>Создать задачу</button>
                    </form>
                    <button className="button button--close-btn" onClick={this.onCloseBtnClick}>X</button>
                </div>
                <button onClick={this.onAddTaskBtnClick}>Добавить задачу</button>
            </div>
        )
    }
}