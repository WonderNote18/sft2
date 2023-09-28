import {createApp } from 'vue';
import App from '@/App.vue';
import AppVuetify from '@/vuetify';
import AppRouter from '@/router';
import AppStore from '@/store';

const app = createApp(App);

app.use(AppVuetify);
app.use(AppRouter);
app.use(AppStore);
app.mount('#app');

export default app;