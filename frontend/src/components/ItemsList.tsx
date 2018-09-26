import * as React from 'react'
import { connect} from "react-redux"
import { fillTodo } from '../actionCreators/index'
import ToDo from "./ToDo";
import { httpReq } from "../utils";

interface IStateProps {
    itemsList: APP.TodoItem[];
}

interface IDispatchProps {
    fillItemList: (todos: APP.TodoItem[]) => void ;
}

type Props = IStateProps & IDispatchProps;

class ItemsList extends React.Component<Props, {}>{

    constructor(props: Props) {
        super(props);
        // считает количество выполненых задач
        this.getDoneCount = this.getDoneCount.bind(this);
        // считает количество невыполненных задач
        this.getWaitingCount = this.getWaitingCount.bind(this);
    }

    componentDidMount() {
        console.log('componentDidMount');
        //получение списка todos с сервера
        httpReq.getList((data: APP.TodoItem[]) => {
            const todos: APP.TodoItem[] = [...data];
            console.log(todos);
            this.props.fillItemList(todos);
        })
    }

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

export default connect(
    (state: APP.ApplicationState): IStateProps => ({ itemsList: state.todos }),
    (dispatch): IDispatchProps => {
        return {
            fillItemList: (todos: APP.TodoItem[]) => {
                dispatch(fillTodo(todos))
            }
        }
    }
)(ItemsList);