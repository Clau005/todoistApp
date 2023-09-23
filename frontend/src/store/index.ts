import { createStore } from 'vuex';

console.log('test')

const store = createStore({
    state () {
        return {
            user : {
                data: {name: "name name" },
                token: null
            }
        }
    },
    getters: {},
    actions: {},
    mutations: {},
    modules: {}
})

export default store