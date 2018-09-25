import { createStore} from "redux";
import { devToolsEnhancer } from 'redux-devtools-extension'
import { rootReducer } from '../reducers/index';

import { addTodo, removeTodo, updateTodo } from '../actionCreators/index'

const store = createStore(rootReducer, devToolsEnhancer());

// store.dispatch(addTodo({id: 100, text: 'type', isDone: false }));
// store.dispatch(addTodo({id: 101, text: 'npm', isDone: false }));
// store.dispatch(addTodo({id: 102, text: 'run', isDone: false }));
// store.dispatch(addTodo({id: 103, text: 'start', isDone: false }));
//
// store.dispatch(updateTodo({id: 100, text: 'type', isDone: true }));
// store.dispatch(updateTodo({id: 102, text: 'run', isDone: true }));
//
// store.dispatch(removeTodo(102));
//
// store.dispatch(updateTodo({id: 100, text: 'type', isDone: false }));

export default store;