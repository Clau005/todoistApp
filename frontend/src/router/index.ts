import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'
import Register from "../views/Register.vue"
import AuthLayout from "../components/AuthLayout.vue"


const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Dashboard',
        component: Dashboard
    },   
    {
    path: "/login",
    name: "Login",
    component: Login,
    },
    {
    path: "/register",
    name: "Register",
    component: Register,
    },

   

]


const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !store.state.user.token) {
      next({ name: "Login" });
    } else if (store.state.user.token && to.meta.isGuest) {
      next({ name: "Dashboard" });
    } else {
      next();
    }
  });

export default router