import * as React from 'react'
import '../styles/main.styl'

import { ToDo } from './ToDo'
import {ChangeEvent, FormEvent} from "react";

interface IProps {
    todos: APP.TodoItem[];
}

interface IState {
    list: APP.TodoItem[];
    uniqueId: number;
    taskValue: string;
    isTaskFormDisabled: boolean;
    isCreateTaskButtonDisabled: boolean;
}

export class ListTodo extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            list: this.props.todos.slice(),
            uniqueId: this.props.todos.length,
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
        //удаляет элемент списка
        this.removeItem = this.removeItem.bind(this);
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
            const newList = [...this.state.list];
            const newId = this.state.uniqueId + 1;
            newList.push(
                {
                    id: newId,
                    text: this.state.taskValue,
                }
            );
            this.setState({
                list: newList,
                taskValue: '',
                uniqueId: newId,
            })
        }
    };

    removeItem(id: number) {
        let deletedIdx = -1;
        const newList = [...this.state.list];
        for (let i = 0; i < newList.length; i++) {
            if (newList[i].id === id) {
                deletedIdx = i;
                break;
            }
        }
        if (deletedIdx >= 0) {
            newList.splice(deletedIdx,1);
            this.setState({
                list: newList
            })
        }
    };

    render() {
        return (
            <div>
                <ul>
                    {this.state.list.map((todo: APP.TodoItem)=>{
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