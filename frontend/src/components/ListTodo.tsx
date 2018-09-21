import * as React from 'react'
import { httpReq } from '../utils'
import '../styles/main.styl'

import { ItemsList } from "./ItemsList";
import { TaskForm } from "./TaskForm"

interface IState {
    list: APP.TodoItem[];
    uniqueId: number;
    isTaskFormOpen: boolean
}

export class ListTodo extends React.Component<{}, IState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            list: [],
            uniqueId: 0,
            isTaskFormOpen: false,
        };
        //показываем форму ввода для новой задачи
        this.onAddTaskBtnClick = this.onAddTaskBtnClick.bind(this);
        //скрываем фому ввода
        this.onTaskFormClose = this.onTaskFormClose.bind(this);
        //добавляем элемент в список
        this.addItem = this.addItem.bind(this);
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

    onAddTaskBtnClick(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        this.setState({
            isTaskFormOpen: !this.state.isTaskFormOpen
        });
    }

    onTaskFormClose(e: React.MouseEvent<HTMLButtonElement>) {
        this.onAddTaskBtnClick(e)
    }

    addItem(value: string) {
        if (value.length) {
            const newId = this.state.uniqueId + 1;
            const newItem: APP.TodoItem = {
                id: newId,
                text: value,
                isDone: false,
            };

            httpReq.addItem(newItem, (data: any) => {
                //получение списка todos с сервера
                httpReq.getList((data: APP.TodoItem[])=>{
                    const todos: APP.TodoItem[] = [...data];
                    console.log(todos);
                    this.setState({
                        list: todos,
                        uniqueId: newId,
                    })
                })
            })
        }
    };

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
                <ItemsList itemsList={this.state.list} removeItem={this.removeItem}  />

                <TaskForm
                    isOpen={this.state.isTaskFormOpen}
                    handleOnClose={this.onTaskFormClose}
                    handleOnSubmit={this.addItem} />

                <button onClick={this.onAddTaskBtnClick}>Добавить задачу</button>
            </div>
        )
    }
}