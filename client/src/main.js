import {createApp } from 'vue';
import App from '@/App.vue';
import vuetify from '@/vuetify';
import store from '@/store';
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';

const app = createApp(App);

// API Ref
const apiURL = process.env.VUE_APP_API_ADDRESS + ':' + process.env.VUE_APP_API_PORT;
app.config.globalProperties.$apiURL = apiURL;

const routes = [
  {path: '/', component: Home},
  {path: '/about', component: About},
  {path: '/login', component: Login},
  {path: '/register', component: Register},
];

const router = createRouter({
  routes,
  mode: 'history',
  history: createWebHistory(),
});

app.use(router);
app.use(store);
app.use(vuetify);

app.mount('#app');