import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Cart from "@/views/Cart.vue";
import Order from "@/views/Order";
import {createRouter, createWebHistory} from "vue-router";
import Orders from "@/views/Orders.vue";
import Register from "@/views/Register.vue";

const routes = [
    {path: '/', component: Home},  // ex) 루트 경로로 들어오면 component를 Home으로 연결을 해라
    {path: '/login', component: Login},
    {path: '/cart', component: Cart},
    {path: '/order', component: Order},
    {path: '/orders', component: Orders},
    {path: '/register', component: Register},
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;