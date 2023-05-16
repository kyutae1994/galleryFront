import {createStore} from 'vuex'
import createPersistedState from "vuex-persistedstate";

const store = {
    state: {
        token: null,
        refToken: null
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
        },
        setRefreshToken(state, refreshToken) {
            state.refToken = refreshToken;
        }
    },
    getters: {
        USER_TOKEN_STATE(state) {
            return state.token;
        },
        USER_REFRESHTOKEN_STATE(state) {
            return state.refToken;
        }
    },
    actions: {
        setToken:({commit}, token) => {
            commit('setToken', token);
        },
        setRefreshToken:({commit}, token) => {
            commit('setRefreshToken', token);
        }
    }
}

export default createStore({
    modules:{
        defaultModule: store
    },
    plugins: [createPersistedState()]
});