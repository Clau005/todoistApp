import {createStore} from 'vuex'
import axiosClient from '../axios';

const tempTeams = [
    {
        id: 1,
        name: 'team 1'
    },
    {
        id: 2,
        name: 'team 2'
    },
    {
        id: 3,
        name: 'team 3'
    }
]


const store = createStore({
    state: {
       user : {
        data: {},
        token: sessionStorage.getItem("TOKEN"),
       },
       teams: [...tempTeams]
    },
    getters: {},
    actions: {
        register({ commit }, user) {
            return axiosClient.post('/register', user)
            .then(({data}) => {
                commit('setUser', data)
                return data
            })
        },
        login({ commit }, user) {
            return axiosClient.post('/login', user)
            .then(({data}) => {
                commit('setUser', data)
                return data
            })
        },
        logout({commit}) {
            return axiosClient.post('/logout')
             .then((response) => {
                commit('logout')
                return response;
             })
        }
    },
    mutations: {
        logout: (state) => {
            state.user.data = {}
            state.user.token = null
            sessionStorage.removeItem('TOKEN')
        },
        setUser: (state, userData) => {
            console.log(userData, 'responseUser');
            state.user.token = userData?.token;
            state.user.data = userData?.user; 
            sessionStorage.setItem('TOKEN', userData?.token);
        }
    },
    modules: {}

})

export default store