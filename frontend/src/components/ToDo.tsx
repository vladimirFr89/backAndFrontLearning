import * as React from 'react';

interface IProps {
    item: APP.TodoItem;
    markTaskAsDone: (item: APP.TodoItem) => void;
    removeItem: (id: number) => void;
}

export class ToDo extends React.Component<IProps, {}> {

    constructor(props: IProps) {
        super(props);
        //обработчик установки состояния для задачи
        this.onTaskStatusChange = this.onTaskStatusChange.bind(this);
        //обработчик для кнопки "Удалить"
        this.onRemoveBtnClick = this.onRemoveBtnClick.bind(this);
    }

    onTaskStatusChange = function(e: React.ChangeEvent<HTMLInputElement>) {
        const { item } = this.props;
        item.isDone = !item.isDone;
        this.props.markTaskAsDone(item);
    };

    onRemoveBtnClick = function(e: React.MouseEvent<HTMLButtonElement>) {
        const { item } = this.props;
        this.props.removeItem(item.id);
    };

    render() {
        const { item } = this.props;
        return (
            <div>
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