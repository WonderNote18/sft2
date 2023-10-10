import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

// Persistent state storage
const vuexLocal = new VuexPersistence({
  key: process.env.API_COOKIE_ID,
  storage: window.localStorage
});

// Modules
import authModule from './authModule';

const AppStore = Vuex.createStore({
  modules: [
    authModule
  ],
  plugins: [
    vuexLocal.plugin
  ]
});

export default AppStore;