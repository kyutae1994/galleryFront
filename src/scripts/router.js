import Home from "@/pages/Home.vue";
import Login from "@/pages/login.vue";
import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {path:'/', component: Home},  // component를 Home으로 연결을 해라
    {path:'/login', component: Login}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;