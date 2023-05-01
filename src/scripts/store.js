import {createStore} from 'vuex'
import createPersistedState from "vuex-persistedstate";

const store = {
    state: {
        token: null
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
        }
    },
    getters: {
        USER_TOKEN_STATE(state) {
            return state.token;
        }
    }
}

export default createStore({
    modules:{
        defaultModule: store
    },
    plugins: [createPersistedState()]
});