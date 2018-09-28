import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import rootReducer from '../reducers/index';

import { addTodo, removeTodo, updateTodo } from '../actionCreators/index'

// store.dispatch(addTodo({id: 100, text: 'type', isDone: false }));
// store.dispatch(addTodo({id: 101, text: 'npm', isDone: false }));
// store.dispatch(addTodo({id: 102, text: 'run', isDone: false }));
// store.dispatch(addTodo({id: 103, text: 'start', isDone: false }));

// store.dispatch(updateTodo({id: 100, text: 'type', isDone: true }));
// store.dispatch(updateTodo({id: 102, text: 'run', isDone: true }));
//
// store.dispatch(removeTodo(102));
//
// store.dispatch(updateTodo({id: 100, text: 'type', isDone: false }));

function configureStore() {
    const middlewares = [thunk, logger];
    return createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));
}

const store = configureStore();

export default store