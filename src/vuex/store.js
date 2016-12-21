import Vue from 'vue';
import Vuex from 'vuex';

import todolist from './todolist';

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules: {
        todolist
    },
    strict: debug // allows Vuex to print warnings
});
