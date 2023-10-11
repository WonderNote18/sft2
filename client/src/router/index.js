import { createRouter, createWebHistory } from 'vue-router';
import Cookies from 'js-cookie';
import checkAuth from '@/router/middleware'

// Sub-route Layouts
import HomeLayout from '@/components/home/HomeLayout'

// Views
import Home from '@/views/Home';
import About from '@/views/About';
import Login from '@/views/Login';
import Register from '@/views/Register';

const routes = [
  {
    path: '/',
    component: HomeLayout,
    props: true,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home
      },
      {
        path: 'about',
        name: 'About',
        component: About
      },
      {
        path: 'login',
        name: 'Login',
        component: Login
      },
      {
        path: 'register',
        name: 'Register',
        component: Register
      },
    ]
  },
  {
    path: '/overview',
    // component: OverviewLayout,
    beforeEnter: checkAuth,
    children: [
      {
        path: '',
        name: 'Overview',
        // component: Overview,
        component: Home,
      },
      {
        path: '/is-auth',
        name: 'IsAuth',
        component: Home,
      },
    ],
  },
];

const AppRouter = createRouter({
  routes,
  mode: 'history',
  history: createWebHistory(process.env.BASE_URL),
});

export default AppRouter;