import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';

const routes = [
  {path: '/', component: Home},
  {path: '/about', component: About},
  {path: '/login', component: Login},
  {path: '/register', component: Register},
];

const router = createRouter({
  routes,
  mode: 'history',
  history: createWebHistory(process.env.BASE_URL),
});

export default router;