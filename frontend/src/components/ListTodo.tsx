import * as React from 'react'
import '../styles/main.styl'

import ItemsList from "./ItemsList";
import TaskForm  from "./TaskForm"

interface IState {
    isTaskFormOpen: boolean
}

export default class ListTodo extends React.Component<{}, IState> {

    constructor(props:{}) {
        super(props);
        this.state = {
            isTaskFormOpen: false,
        };
        //показываем форму ввода для новой задачи
        this.onAddTaskBtnClick = this.onAddTaskBtnClick.bind(this);
        //скрываем фому ввода
        this.onTaskFormClose = this.onTaskFormClose.bind(this);
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

    render() {
        console.log('render ListTodo');
        return (
            <div>
                <ItemsList />

                <TaskForm
                    isOpen={this.state.isTaskFormOpen}
                    handleOnClose={this.onTaskFormClose}
                />

                <button onClick={this.onAddTaskBtnClick}>Добавить задачу</button>
            </div>
        )
    }
}