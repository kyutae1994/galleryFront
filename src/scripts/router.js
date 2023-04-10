import Home from "@/pages/Home.vue";
import Login from "@/pages/Login.vue";
import Cart from "@/pages/Cart.vue";
import Order from "@/pages/Order";
import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {path: '/', component: Home},  // 루트 경로로 들어오면 component를 Home으로 연결을 해라
    {path: '/login', component: Login},
    {path: '/cart', component: Cart},
    {path: '/order', component: Order}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;