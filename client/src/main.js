import {createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import vuetify from '@/vuetify';

const app = createApp(App);

const apiURL = process.env.VUE_APP_API_ADDRESS + ':' + process.env.VUE_APP_API_PORT;

app.use(router);
app.use(store);
app.use(vuetify);

app.config.globalProperties.$apiURL = apiURL;

app.mount('#app');