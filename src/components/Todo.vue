<template>
    <div class="todo">
        <div class="new-item-wrapper">
            <h3>Add a todo</h3>
            <input class="new-item" type="text" v-model="newItem" @keyup.enter="addTodo" ref="newItem">
        </div>
        <ul class="todo-list">
            <h3>Unfinished Todos</h3>
            <div v-if="hasUnfinishedTodos" class="unfinished">
                <div class="headers">
                    <h5 class="todo-header">Item</h5><h5 class="date-header">Due</h5>
                </div>
                <li v-for="todo in todoList">
                    <span class="todo-text">{{ todo.text }}</span><span class="due-date">{{ getFormattedDate(todo.due) }}</span>
                </li>
            </div>
            <span v-else>All done!</span>
        </ul>
        <ul class="finished-todo-list">
            <h3>Finished todos</h3>
            <div class="finished" v-if="hasFinishedTodos">
                <div class="headers">
                    <h5 class="todo-header">Item</h5><h5 class="date-header">Due</h5>
                </div>
                <li v-for="todo in finishedTodos">
                    <span class="todo-text">{{ todo.text }}</span><span class="due-date">{{ getFormattedDate(todo.due) }}</span>
                </li>
            </div>
            <span v-else>Oh dear, better get a move on!</span>
        </ul>
    </div>
</template>

<script>
import { formatDate } from '../filters/filters';

export default {
    data: function() {
        return {
            newItem: '',
            finishedTodos: [],
            todoList: [
                {
                    text: 'Add focus functionality on page load',
                    due: new Date('10-10-2016'),
                    id: 1,
                    starred: false
                },
                {
                    text: 'Add ability to click on items to complete them (or move them back into in-progress)',
                    due: new Date('09-10-2016'),
                    id: 2,
                    starred: true
                },
                {
                    text: 'Add ability to click and sort by date',
                    due: new Date('12-15-2016'),
                    id: 3,
                    starred: true
                },
                {
                    text: 'Add filtering by text and starred status',
                    due: new Date('12-25-2016'),
                    id: 4,
                    starred: true
                }
            ]
        }
    },
    computed: {
        hasUnfinishedTodos() { return Boolean(this.todoList.length); },
        hasFinishedTodos() { return Boolean(this.finishedTodos.length); },
        allIds() {
            return this.todoList.concat(this.finishedTodos).map(todo => todo.id);
        }
    },
    methods: {
        addTodo: function(event) {
            this.todoList.push({
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
        },
        getFormattedDate(dueDate) {
            return formatDate(dueDate);
        }
    },
    mounted: function() {
        // put any initialization code here. if function requires dom nodes to
        // exist, wait for dom update using this.$nextTick
        this.$nextTick( /* function... */)
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
    .todo-list,
    .finished-todo-list {
        list-style-type: none;
        border: 1px solid #ccc;
        order: 2;
        padding: 10px;
        text-align: left;

        h3 {
            margin: 0 0 10px 0;
        }
        li {
            padding: 5px 0;
            cursor: pointer;
            display: flex;
            flex: 1 100%;
        }
    }
    .headers {
        display: flex;
    }
    .todo-text,
    .todo-header {
        flex: 2 75%;
    }
    .due-date,
    .date-header {
        flex: 1 25%;
        padding-left: 5px;
    }
    .finished-todo-list {
        li {
            text-decoration: line-through;
        }
    }
</style>
