import * as React from 'react'
import { connect} from "react-redux";
import { addTodo } from '../actionCreators/index'
import {httpReq} from "../utils";

interface IProps {
    isOpen: boolean;
    handleOnClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

interface IState {
    taskValue: string
    isCreateTaskButtonDisabled: boolean,
}

interface IDispatchProps {
    addTodo: (item: APP.TodoItem) => void;
}

type Props = IProps & IDispatchProps

class TaskForm extends React.Component<Props, IState>{
    constructor(props: Props) {
        super(props);
        this.state = {
            taskValue: '',
            isCreateTaskButtonDisabled: true,
        };

        // обработка изменения поля ввода
        this.onInputChange = this.onInputChange.bind(this);
        //добавляем элемент в список
        this.addItem = this.addItem.bind(this);
        // обработчик отправки формы на сервер
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            taskValue: e.target.value
        })
    }

    addItem(value: string) {
        if (value.length) {
            const newId = Date.now();
            const newItem: APP.TodoItem = {
                id: newId,
                text: value,
                isDone: false,
            };
            // добавляет новую задачу в state
            this.props.addTodo(newItem);
            // отправляет на сервер
            httpReq.addItem(newItem);
        }
    };

    onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        this.addItem(this.state.taskValue);
        this.setState({
            taskValue: ''
        })
    }

    render() {
        console.log('render TaskForm');
        return(
            <div className={'form-container ' + (!this.props.isOpen ? 'form-container--disabled' : '')}>
                <form onSubmit={this.onFormSubmit} >
                    <label htmlFor="task">Новая задача:</label>
                    <input
                        type="text"
                        id="task"
                        name="taskValue"
                        placeholder="Название"
                        autoComplete="off"
                        value={this.state.taskValue}
                        onChange={this.onInputChange}
                    />
                    <button className={'button ' + (this.state.taskValue.length ? '' : 'button--disabled')}>Создать задачу</button>
                </form>
                <button className="button button--close-btn" onClick={this.props.handleOnClose}>X</button>
            </div>
        )
    }
}

export default connect(
    null,
    (dispatch):IDispatchProps => {
        return {
            addTodo: (item: APP.TodoItem) => {
                dispatch(addTodo(item))
            }
        }
    }
)(TaskForm);