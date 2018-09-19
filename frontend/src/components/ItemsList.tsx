import * as React from 'react'
import { ToDo } from "./ToDo";
import { httpReq } from "../utils";

interface IProps {
    itemsList: APP.TodoItem[];
}

interface IState {
    list: APP.TodoItem[];
}

export class ItemsList extends React.Component<IProps, IState>{

    constructor(props: IProps) {
        super(props);
        this.state = {
            list: this.props.itemsList
        };
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
                    this.setState({
                        list: todos
                    })
                })
            })
    }

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
            </div>
        )
    }
}