import * as React from 'react';
import { connect } from "react-redux";

import { updateTodo, removeTodo } from '../actionCreators/index'
import {httpReq} from "../utils";

interface IProps {
    item: APP.TodoItem;
}

interface IDispatchProps {
    markTaskAsDone: (item: APP.TodoItem) => void;
    removeItem: (id: number) => void;
}

type Props = IProps & IDispatchProps

class ToDo extends React.Component<Props, {}> {

    constructor(props: Props) {
        super(props);
        //обработчик установки состояния для задачи
        this.onTaskStatusChange = this.onTaskStatusChange.bind(this);
        //обработчик для кнопки "Удалить"
        this.onRemoveBtnClick = this.onRemoveBtnClick.bind(this);
        // помечает элемент списка
        this.markTask = this.markTask.bind(this);
        // удаляем элемент списка
        this.removeItem = this.removeItem.bind(this);
    }

    markTask(item: APP.TodoItem) {
        httpReq.updateTask(item)
    }

    onTaskStatusChange (e: React.ChangeEvent<HTMLInputElement>) {
        const { item } = this.props;
        item.isDone = !item.isDone;
        // помечает элемент списка в state
        this.props.markTaskAsDone(item);
        // запрос на сервер для модификации элемента
        this.markTask(item);
    };

    removeItem(id: number) {
        // удаляет элемент из списка
        this.props.removeItem(id);
        // запрос на удаление елемента на сервер
        httpReq.removeItem(id);
    };

    onRemoveBtnClick(e: React.MouseEvent<HTMLButtonElement>) {
        const { item } = this.props;
        this.removeItem(item.id);
        this.setState({
            isDeleted: true,
        })
    };

    render() {
        const { item } = this.props;
        console.log(`render todo: id = ${item.id} isDone = ${item.isDone}`);
        return (
            <div className="todo-item">
                <div className={'taskText ' + (item.isDone ? 'taskText--done' : '')}>{item.text}</div>
                <input
                    type="checkbox"
                    name="taskState"
                    checked={item.isDone}
                    onChange={this.onTaskStatusChange}
                />
                <button onClick={this.onRemoveBtnClick}>Удалить</button>
            </div>
        )
    }
}

export default connect(
    null,
    (dispatch):IDispatchProps => ({
        markTaskAsDone: (item: APP.TodoItem) => {
            dispatch(updateTodo(item))
        },
        removeItem: (id: number) => {
            dispatch(removeTodo(id))
        }
    })
)(ToDo)