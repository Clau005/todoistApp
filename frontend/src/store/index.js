import {createStore} from 'vuex'
import axiosClient from '../axios';


const store = createStore({
    state: {
       user : {
        data: {},
        token: sessionStorage.getItem("TOKEN"),
       },
       todos: {
        loading: false,
        data: []
      },
      modal: {
        open: false,
        id: null
      },
    },
    getters: {},
    actions: {
        openModal({commit}, val) {
            return commit('setModal', val);
        },
        register({commit}, user) {
            return axiosClient.post('/register', user)
              .then(({data}) => {
                commit('setUser', data.user);
                commit('setToken', data.token)
                return data;
              })
        },
        login({commit}, user) {
            return axiosClient.post('/login', user)
              .then(({data}) => {
                commit('setUser', data.user);
                commit('setToken', data.token)
                return data;
              })
        },
        logout({commit}) {
            return axiosClient.post('/logout')
              .then(response => {
                commit('logout')
                return response;
              })
        },
        getUser({commit}) {
            return axiosClient.get('/user')
            .then(res => {
              commit('setUser', res.data)
            })
        },
        getTodos({ commit }) {
            commit('setTodosLoading', true);
            return axiosClient.get("/todo").then((res) => {
              commit('setTodosLoading', false)
              commit("setTodos", res.data);
              return res;
            });
        },
        saveTodo({commit}, todo) {
            let response;
            if (todo.id) {
                response = axiosClient
                    .put(`todo/${todo.id}`, todo)
                    .then((res) => {
                        commit("updateTodo", res.data);
                        return res;
                    });
            } else  {
                response = axiosClient
                    .post("/todo", todo)
                    .then((res) => {
                        commit("createTodo", res.data);
                        return res;
                    })
            }
            return response;
        },
        deleteTodo({}, todo) {
            return axiosClient.delete(`todo/${todo.id}`, todo);
        }
    },
    mutations: {
        setModal: (state, val) => {
            state.modal.open = val.open;
            state.modal.id = val.id;
        },
        createTodo: (state, todo) => {
            state.todos = [...state.todos.data, todo.data]
        },
        updateTodo: (state, todo) => {
            state.todos = state.todos.data.map((mappedTodo) =>{
                if(mappedTodo.id ===  todo.data.id) {
                    return todo.data;
                } else {
                    return mappedTodo;
                }
                
            })
        },
        logout: (state) => {
            state.user.data = {}
            state.user.token = null
            sessionStorage.removeItem('TOKEN')
        },
        setUser: (state, user) => {
            state.user.data = user;
        },
        setToken: (state, token) => {
            state.user.token = token;
            sessionStorage.setItem('TOKEN', token);
        },
        setTodosLoading: (state, loading) => {
            state.todos.loading = loading;
        },
        setTodos: (state, todos) => {
            state.todos.data = todos.data
        }
    },
    modules: {}

})

export default store