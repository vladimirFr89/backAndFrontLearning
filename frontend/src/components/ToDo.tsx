import * as React from 'react';

interface IProps {
    item: APP.TodoItem;
    removeItem: (id: number) => void;
}

export class ToDo extends React.Component<IProps, {}> {

    constructor(props: IProps) {
        super(props);
        this.onRemoveBtnClick = this.onRemoveBtnClick.bind(this);
    }

    onRemoveBtnClick = function() {
        const { item } = this.props;
        this.props.removeItem(item.id);
    };

    render() {
        const { item } = this.props;
        return (
            <div>
                <div>{item.text}</div>
                <button onClick={this.onRemoveBtnClick}>Удалить</button>
            </div>
        )
    }
}