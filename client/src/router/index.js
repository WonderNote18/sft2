import { createRouter, createWebHistory } from 'vue-router';
import Cookies from 'js-cookie';
import checkAuth from '@/router/middleware'
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/is-auth',
    name: 'IsAuth',
    component: Home,
    beforeEnter: checkAuth
  },
];

const AppRouter = createRouter({
  routes,
  mode: 'history',
  history: createWebHistory(process.env.BASE_URL),
});

export default AppRouter;