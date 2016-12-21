<template>
    <div class="todo">
        <div class="new-item-wrapper">
            <h3>Add a todo</h3>
            <input class="new-item" type="text" v-model="newItem" @keyup.enter="addTodo" ref="newItem">
        </div>
        <ul class="todo-list">
            <h3>Unfinished Todos</h3>
            <li v-for="todo in todoList">
                {{ todo.text }}
            </li>
        </ul>
        <ul class="finished-todo-list">
            <h3>Finished todos</h3>
            <li v-if="finishedTodos.length"></li>
            <span v-else>Oh dear, better get a move on!</span>
        </ul>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            newItem: '',
            finishedTodos: [],
            todoList: [
                {
                    text: 'Add focus functionality on page load',
                    due: new Date('10-10-2016')
                },
                {
                    text: 'Add ability to click on items to complete them (or move them back into in-progress)',
                    due: new Date('09-10-2016')
                },
                {
                    text: 'Add ability to click and sort by date',
                    due: new Date('12-15-2016')
                }
            ]
        }
    },
    methods: {
        addTodo: function(event) {
            this.todoList.push({
                text: this.newItem,
                due: new Date()
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
        this.$nextTick( /* function ... */ )
    }
}
</script>

<style lang="scss" scoped>
    .todo {
        width: 640px;
        margin-left: 400px;
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
        align-content: center;
        > * {
            flex: 1 100%;
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
        }
    }
    .finished-todo-list {
        li {
            text-decoration: line-through;
        }
    }
</style>
