import axios from "axios";
import store from "@/scripts/store";

const instance = axios.create({
    baseURL: process.env.BASE_URL
})

instance.interceptors.request.use(
    function (config) {
        window.alert(store.getters.USER_TOKEN_STATE);
        if (store.getters.USER_TOKEN_STATE) {
            config.headers.Authorization = "Bearer " + store.getters.USER_TOKEN_STATE;
            window.alert(config.headers.Authorization);
        }

        return config;
    }
)

export default instance;