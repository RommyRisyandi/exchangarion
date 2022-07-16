import { createWebHistory, createRouter } from "vue-router";

import Home from "../pages/Home.vue";
import About from "../pages/About.vue";
import Faq from "../pages/Faq.vue";
import Profile from "../pages/Profile.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import ExchangeCreate from "../pages/ExchangeCreate.vue";
import ExchangeDetail from "../pages/ExchangeDetail.vue";

import { getAuth } from "firebase/auth";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home 
    },
    
    {
        path: "/about",
        name: "About",
        component: About 
    },
    
    {
        path: "/faq",
        name: "Faq",
        component: Faq 
    },
    {
        path: "/profile",
        name: "Profile",
        component: Profile,
        meta: { onlyAuthUser: true } 
    },
    {
        path: "/exchanges/new",
        name: "ExchangeCreate",
        component: ExchangeCreate,
        meta: { onlyAuthUser: true } 
    },
    {
        path: "/exchanges/:slug",
        name: "ExchangeDetail",
        component: ExchangeDetail,
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
        meta: { onlyGuestUser: true } 
    },
    
    {
        path: "/register",
        name: "Register",
        component: Register,
        meta: { onlyGuestUser: true }  
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, _, next) => {
    const isAuth = !!getAuth().currentUser;

 if (to.meta.onlyAuthUser) {
    if (isAuth) {
        next();
    } else {
        next({name: "Login"});
    }
} else if (to.meta.onlyGuestUser) {
    if (isAuth) {
        next({name: "Home"});
    } else {
        next();
    }
 } else {
    next();
 }
})
export default router;