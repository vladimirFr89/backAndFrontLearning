import * as React from 'react'
import { ToDo } from "./ToDo";

interface IProps {
    itemsList: APP.TodoItem[];
    markAsDone: (item: APP.TodoItem) => void;
    removeItem: (id: number) => void;
}

export class ItemsList extends React.Component<IProps, {}>{

    constructor(props: IProps) {
        super(props);
        //отметить задачу как выполненную
        this.markTask = this.markTask.bind(this);
        //удаляет элемент списка
        this.removeItem = this.removeItem.bind(this);
        // считает количество выполненых задач
        this.getDoneCount = this.getDoneCount.bind(this);
        // считает количество невыполненных задач
        this.getWaitingCount = this.getWaitingCount.bind(this);
    }

    markTask(item: APP.TodoItem) {
        this.props.markAsDone(item);
    }

    removeItem(id: number) {
        this.props.removeItem(id);
    };

    private getDoneCount() {
        const { itemsList } = this.props;
        let doneCount: number = 0;

        itemsList.forEach((item: APP.TodoItem) => {
            if (item.isDone) doneCount += 1;
        });

        return doneCount;
    }

    private getWaitingCount(){
        const { itemsList } = this.props;
        return itemsList.length - this.getDoneCount();
    }

    render() {
        console.log('render ItemsList');
        const { itemsList } = this.props;
        return(
            <div>
                <ul className="todos-list">
                    {itemsList.map((todo: APP.TodoItem)=>{
                        return (
                            <li key={todo.id}>
                                <ToDo
                                    item={todo}
                                    markTaskAsDone={this.markTask}
                                    removeItem={this.removeItem}
                                />
                            </li>
                        )
                    })}
                </ul>
                <div>
                    <span>Всего задач: </span><span>{this.props.itemsList.length}</span>
                    <span> (выполненных: <span>{this.getDoneCount()}</span>, осталось: <span>{this.getWaitingCount()}</span>)</span>
                </div>
            </div>
        )
    }
}