import * as React from 'react'
import {connect} from "react-redux"
import {fillTodo} from '../actionCreators/index'
import ToDo from "./ToDo";
import {httpReq} from "../utils";
import Filters from './Filters'
import FilterItem from './FilterItem'

interface IStateProps {
    itemsList: APP.TodoItem[];
    itemListFiltered: APP.TodoItem[];
}

interface IDispatchProps {
    fillItemList: (todos: APP.TodoItem[]) => void ;
}

enum FilterType {
    ALL = "ALL",
    DONE = "DONE",
    WAITING = "WAITING",
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
        const { itemsList, itemListFiltered } = this.props;
        return(
            <div>
                <ul className="todos-list">
                    {itemListFiltered.map((todo: APP.TodoItem)=>{
                        return (
                            <li key={todo.id}>
                                <ToDo item={todo} />
                            </li>
                        )
                    })}
                </ul>
                <Filters>
                    <FilterItem caption="Всего задач:" value={itemsList.length} type={FilterType.ALL}/>&nbsp;
                    <FilterItem caption="Выполненных:" value={this.getDoneCount()} type={FilterType.DONE} />&nbsp;
                    <FilterItem caption="Осталось:" value={this.getWaitingCount()} type={FilterType.WAITING} />
                </Filters>
            </div>
        )
    }
}

export default connect(
    (state: APP.ApplicationState): IStateProps => {
        return {
            itemsList: state.todos,
            itemListFiltered: state.todos.filter((item: APP.TodoItem) => {
                switch (state.activeFilter) {
                    case FilterType.DONE:
                        return item.isDone;
                    case FilterType.WAITING:
                        return !item.isDone;
                    default:
                        return item;
                }
            })
        }
    },
    (dispatch): IDispatchProps => {
        return {
            fillItemList: (todos: APP.TodoItem[]) => {
                dispatch(fillTodo(todos))
            }
        }
    }
)(ItemsList);