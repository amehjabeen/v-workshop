<template>
    <div class="todo">
        <div class="list-wrapper">
            <div class="new-item-wrapper">
                <h3>Add a todo</h3>
                <input class="new-item" type="text" v-model="newItem" @keyup.enter="addTodo(newItem)" ref="newItem">
            </div>
            <todo-list
                :todos=activeTodos
                title="Active todos"
                @toggled="toggleTodoState"
            ></todo-list>
            <todo-list
                class="finished-todo-list"
                title="Finished todos"
                :todos=finishedTodos
                @toggled="toggleTodoState"
            ></todo-list>
        </div>
        <div class="filters">
            <h3>Filters</h3>
            <div class="text-filter-wrapper">
                <label for="text-filter">Enter a search</label>
                <input id="text-filter" type="text" :value="filters.text" @input="updateTextFilter">
            </div>
            <button @click="updateStarredFilter">Important only</button>
        </div>
    </div>
</template>

<script>
import TodoList from './TodoList';
import { formatDate } from '../filters/filters';

import { addTodo , toggleTodoState } from '../vuex/actions';

export default {
    components: {
        TodoList
    },
    data: function() {
        return {
            newItem: '',
            filters: {
                text: '',
                starred: false
            },
            activeFilters: []
        }
    },
    vuex: {
        getters: {
            todos: ({ todolist }) => todolist.todos
        },
        actions: {
            addTodo,
            toggleTodoState
        }
    },
    computed: {
        activeTodos() {
            return this.filteredTodos.filter(todo => Boolean(!todo.finished))
        },
        finishedTodos() {
            return this.filteredTodos.filter(todo => Boolean(todo.finished))
        },
        filteredTodos() {
            return this.todos.filter(todo => this.isValidTodo(todo));
        },
        hasUnfinishedTodos() { return Boolean(this.activeTodos.length); },
        hasFinishedTodos() { return Boolean(this.finishedTodos.length); },
        allIds() {
            return this.activeTodos.concat(this.finishedTodos).map(todo => todo.id);
        }
    },
    methods: {
        focusInput: function() {
            this.$refs.newItem.focus();
        },
        isValidTodo: function(todo) {
            return this.activeFilters.map(filter => this.passesFilter(todo, filter))
                         .reduce((a, b) => a && b, true);
        },
        passesFilter: function(todo, filterKey) {
            const filterValue = this.filters[filterKey];
            const todoValue = todo[filterKey];
            if (filterValue !== null) {
                return _.includes(todoValue, filterValue) || todoValue === filterValue;
            }
            return true;
        },
        updateTextFilter: function(event) {
            const searchText = event.target.value;
            this.filters.text = searchText;
            if (searchText) {
                if (!_.includes(this.activeFilters, 'text')) {
                    this.activeFilters.push('text');
                }
            } else {
                this.activeFilters = _.without(this.activeFilters, 'text');
            }
        },
        updateStarredFilter: function() {
            const onlyStarred = Boolean(!this.filters.starred);
            this.filters.starred = onlyStarred;
            if (onlyStarred) {
                if (!_.includes(this.activeFilters, 'starred')) {
                    this.activeFilters.push('starred');
                }
            } else {
                this.activeFilters = _.without(this.activeFilters, 'starred')
            }
        }
    },
    mounted: function() {
        // put any initialization code here. if function requires dom nodes to
        // exist, wait for dom update using this.$nextTick
        this.$nextTick(this.focusInput)
    }
}
</script>

<style lang="scss" scoped>
    .todo {
        width: 900px;
        margin-left: 300px;
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
        align-content: center;
        text-align: left;

        h3 {
            margin: 0 0 10px 0;
            display: block;
        }
        h5 {
            margin: 0;
        }
        input {
            height: 20px;
            font-size: 1em;
        }

        .list-wrapper {
            flex: 3 75%;
        }
        .filters {
            margin-left: 20px;
            flex: 1 20%;
        }
    }
    .new-item-wrapper {
        display: flex;
        flex-flow: row wrap;
        order: 1;

        > * {
            flex: 1 100%;
        }
    }
</style>
