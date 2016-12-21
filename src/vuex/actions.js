import * as types from './mutation-types';

export function addTodo(store, todoText) {
    store.dispatch(types.TODO_ADDED, todoText);
}

export function toggleTodoState(store, todo) {
    store.dispatch(types.TODO_STATE_TOGGLED, todo);
}
