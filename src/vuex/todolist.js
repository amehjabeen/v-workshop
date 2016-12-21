import * as types from './mutation-types';

const state = {
    todos: [],
    filters: [],
    activeFilters: [],
    newItem: ''
};

const mutations = {
    [types.TODO_ADDED]: function(state, todoText) {
        const largestCurrent = _.max(state.todos.map(todo => todo.id)) || 0;
        const newTodo = {
            id: largestCurrent + 1,
            text: todoText,
            due: new Date(),
            starred: false,
            finished: false
        };
        state.todos.push(newTodo);
        state.newItem = '';
    },
    [types.TODO_STATE_TOGGLED]: function(state, toggled) {
        const toggledTodo = state.todos.find(todo => todo.id === toggled.id);
        toggledTodo.finished = !toggledTodo.finished;
    },
    [types.NEW_TODO_UPDATED]: function(state, text) {
        state.newItem = text;
    }
};

export default {
    state,
    mutations
};
