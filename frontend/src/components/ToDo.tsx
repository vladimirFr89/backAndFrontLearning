import * as React from 'react';

interface IProps {
    item: APP.TodoItem;
    markTaskAsDone: (item: APP.TodoItem) => void;
    removeItem: (id: number) => void;
}

interface IState {
    isDone: boolean;
    isDeleted: boolean;
}

export class ToDo extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            isDone: this.props.item.isDone,
            isDeleted: false
        };
        //обработчик установки состояния для задачи
        this.onTaskStatusChange = this.onTaskStatusChange.bind(this);
        //обработчик для кнопки "Удалить"
        this.onRemoveBtnClick = this.onRemoveBtnClick.bind(this);
    }

    onTaskStatusChange (e: React.ChangeEvent<HTMLInputElement>) {
        const { item } = this.props;
        item.isDone = !item.isDone;
        this.props.markTaskAsDone(item);
        this.setState({
            isDone: item.isDone
        });
    };

    onRemoveBtnClick(e: React.MouseEvent<HTMLButtonElement>) {
        const { item } = this.props;
        this.props.removeItem(item.id);
        this.setState({
            isDeleted: true,
        })
    };

    render() {
        const { item } = this.props;
        console.log(`render todo: id = ${item.id} isDone = ${item.isDone} isDeleted = ${this.state.isDeleted}`);
        return (
            <div className={'todo-item ' + (this.state.isDeleted ? 'todo-item--deleted' : '')}>
                <div className={'taskText ' + (this.state.isDone ? 'taskText--done' : '')}>{item.text}</div>
                <input
                    type="checkbox"
                    name="taskState"
                    checked={this.state.isDone}
                    onChange={this.onTaskStatusChange}
                />
                <button onClick={this.onRemoveBtnClick}>Удалить</button>
            </div>
        )
    }
}