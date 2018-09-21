import * as React from 'react'

interface IProps {
    isOpen: boolean;
    handleOnClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
    handleOnSubmit: (value: string) => void;
}

interface IState {
    taskValue: string
    isCreateTaskButtonDisabled: boolean,
}

export class TaskForm extends React.Component<IProps, IState>{
    constructor(props: IProps) {
        super(props);
        this.state = {
            taskValue: '',
            isCreateTaskButtonDisabled: true,
        };

        // обработка изменения поля ввода
        this.onInputChange = this.onInputChange.bind(this);
        // обработчик отправки формы на сервер
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            taskValue: e.target.value
        })
    }

    onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        this.props.handleOnSubmit(this.state.taskValue);
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