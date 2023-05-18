import axios from "axios";
import store from "@/scripts/store";

const instance = axios.create({
    baseURL: process.env.BASE_URL
})

instance.interceptors.request.use(
    function (config) {
        if (store.getters.USER_TOKEN_STATE) {
            config.headers.Authorization = "Bearer " + store.getters.USER_TOKEN_STATE;
        }

        return config;
    }
)

export default instance;