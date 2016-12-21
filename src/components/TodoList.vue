<template>
    <ul class="todo-list">
        <h3>{{ title }}</h3>
        <div v-if="Boolean(todos.length)">
            <div class="headers">
                <h5 class="todo-header" @click="applySort('text')">Item <span class="sort-indicator" v-show="isSortActive('text')">sorted</span></h5>
                <h5 class="date-header" @click="applySort('due')">Due <span class="sort-indicator" v-show="isSortActive('due')">sorted</span></h5>
            </div>
            <li v-for="todo in getSortedTodos(todos)" @click="$emit('toggled', todo)">
                <span class="todo-text">{{ todo.text }} <label v-if="todo.starred" class="label-starred">important</label></span>
                <span class="due-date">{{ getFormattedDate(todo.due) }}</span>
            </li>
        </div>
        <span v-else>All done!</span>
    </ul>
</template>

<script>
import { formatDate } from '../filters/filters';
import _ from 'lodash';

export default {
    props: {
        todos: {
            type: Array,
            required: true
        },
        listClass: {
            type: String,
            required: false
        },
        title: {
            type: String,
            default: 'Todo list'
        }
    },
    data: function() {
        return {
            sort: {
                key: '',
                order: 'asc'
            }
        }
    },
    methods: {
        getFormattedDate(dueDate) {
            return formatDate(dueDate);
        },
        getSortedTodos(todos) {
            return Boolean(_.size(this.sort))
                ? this.sort.order === 'asc'
                    ? _.sortBy(todos, this.sort.key)
                    : _.sortBy(todos, this.sort.key).reverse()
                : todos;
        },
        applySort(key) {
            if (this.sort.key === key) {
                if (this.sort.order === 'desc') {
                    this.sort = {};
                } else {
                    this.sort.order = 'desc';
                }
            } else {
                this.sort = {
                    key,
                    order: 'asc'
                };
            }
        },
        isSortActive(key) {
            return this.sort.key === key;
        }
    }
}
</script>

<style lang="scss">
    .todo-list {
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

        h5 {
            margin: 0;
        }
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
    .sort-indicator {
        font-size: 10px;
        padding: 2px;
        background-color: blue;
        color: #fff;
    }
    .label-starred {
        font-size: 10px;
        padding: 2px;
        background-color: red;
        color: #fff;
        font-weight: bold;
    }
    .finished-todo-list {
        li {
            text-decoration: line-through;
        }
    }
</style>
