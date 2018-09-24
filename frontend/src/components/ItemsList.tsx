import * as React from 'react'
import { ToDo } from "./ToDo";
import { httpReq } from "../utils";

interface IProps {
    itemsList: APP.TodoItem[];
    removeItem: (id: number) => void;
}

export class ItemsList extends React.Component<IProps, {}>{

    constructor(props: IProps) {
        super(props);
        //отметить задачу как выполненную
        this.markTask = this.markTask.bind(this);
        //удаляет элемент списка
        this.removeItem = this.removeItem.bind(this);
    }

    markTask(item: APP.TodoItem) {
        httpReq.updateTask(
            item, (data: any) => {
                httpReq.getList((data: APP.TodoItem[]) => {
                    const todos: APP.TodoItem[] = [...data];
                    console.log(todos);
                })
            })
    }

    removeItem(id: number) {
        this.props.removeItem(id);
    };

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
                <div><span>Всего задач: </span><span>{this.props.itemsList.length}</span></div>
            </div>
        )
    }
}