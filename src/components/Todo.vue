<template>
    <div class="todo">
        <div class="new-item-wrapper">
            <h3>Add a todo</h3>
            <input class="new-item" type="text" v-model="newItem" @keyup.enter="addTodo" ref="newItem">
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
</template>

<script>
import TodoList from './TodoList';
import { formatDate } from '../filters/filters';

export default {
    components: {
        TodoList
    },
    data: function() {
        return {
            newItem: '',
            todos: [
                {
                    text: 'Add focus functionality on page load',
                    due: new Date('10-10-2016'),
                    id: 1,
                    starred: false,
                    finished: false
                },
                {
                    text: 'Add ability to click on items to complete them (or move them back into in-progress)',
                    due: new Date('09-10-2016'),
                    id: 2,
                    starred: true,
                    finished: false
                },
                {
                    text: 'Add ability to click and sort by date',
                    due: new Date('12-15-2016'),
                    id: 3,
                    starred: true,
                    finished: false
                },
                {
                    text: 'Add filtering by text and starred status',
                    due: new Date('12-25-2016'),
                    id: 4,
                    starred: true,
                    finished: false
                }
            ]
        }
    },
    computed: {
        activeTodos() {
            return this.todos.filter(todo => Boolean(!todo.finished));
        },
        finishedTodos() {
            return this.todos.filter(todo => Boolean(todo.finished));
        },
        hasUnfinishedTodos() { return Boolean(this.activeTodos.length); },
        hasFinishedTodos() { return Boolean(this.finishedTodos.length); },
        allIds() {
            return this.activeTodos.concat(this.finishedTodos).map(todo => todo.id);
        }
    },
    methods: {
        toggleTodoState: function(todo) {
            todo.finished = !todo.finished;
        },
        addTodo: function(event) {
            this.todos.push({
                id: Math.max.apply(null, this.allIds) + 1,
                text: this.newItem,
                due: new Date(),
                starred: false
            });
            this.newItem = '';
            this.focusInput();
        },
        focusInput: function() {
            this.$refs.newItem.focus();
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
        width: 800px;
        margin-left: 300px;
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
        align-content: center;
        > * {
            flex: 1 100%;
        }
        h5 {
            margin: 0;
        }
    }
    .new-item-wrapper {
        display: flex;
        flex-flow: row wrap;
        order: 1;

        > * {
            flex: 1 100%;
        }
        h3 {
            margin: 0 0 10px 0;
            text-align: left;
            display: block;
        }
        input {
            height: 20px;
            font-size: 1em;
        }
    }
</style>
