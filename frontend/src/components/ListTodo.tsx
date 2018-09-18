import * as React from 'react'
const axios = require('axios');
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
        //удаляет элемент списка
        this.removeItem = this.removeItem.bind(this);
    }

    componentDidMount() {
        console.log('componentDidMount');
        //получение списка todos с сервера
        axios.get('/api/getList')
            .then((response: any)=> {
                const targetKey = 'data';
                if (response && response.hasOwnProperty(targetKey)) {
                    const todos: APP.TodoItem[] = [...response[targetKey]];
                    console.log(todos);
                    this.setState({
                        list: todos,
                        uniqueId: this.getUniqueId(todos),
                    })
                }
            })
            .catch(function (error: any) {
                console.log(error);
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

            axios.post('/api/getList/addItem', {
                id: newId,
                text: this.state.taskValue,
            })
                .then((response: any) => {
                    console.log(response);
                    //получение списка todos с сервера
                    axios.get('/api/getList')
                        .then((response: any)=> {
                            const targetKey = 'data';
                            if (response && response.hasOwnProperty(targetKey)) {
                                const todos = [...response[targetKey]];
                                console.log(todos);
                                this.setState({
                                    list: todos,
                                    taskValue: '',
                                    uniqueId: newId,
                                })
                            }
                        })
                        .catch(function (error: any) {
                            console.log(error);
                        })
                })
                .catch(function (error: any) {
                    console.log(error);
                });
        }
    };

    addItemOld(e: FormEvent<HTMLFormElement>) {
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
        axios.get(`/api/getList/remove/${id}`)
            .then((responce:any) => {
                console.log(responce);
                //получение списка todos с сервера
                axios.get('/api/getList')
                    .then((response: any)=> {
                        const targetKey = 'data';
                        if (response && response.hasOwnProperty(targetKey)) {
                            const todos = [...response[targetKey]];
                            console.log(todos);
                            this.setState({
                                list: todos
                            })
                        }
                    })
                    .catch(function (error: any) {
                        console.log(error);
                    })

            }).catch(function (error: any) {
            console.log(error)
        });
    };

    removeItemOld(id: number) {
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
        console.log('render ListTodo');
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