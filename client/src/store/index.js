import Vuex from 'vuex';

// Modules
import auth from './authModule';

const AppStore = Vuex.createStore({
  state: {
    apiKey: null,
  },
  getters: {
    getApiKey(state) {
      return state.apiKey;
    }
  },
  mutations: {
    setApiKey(state, { apiURL }) {
      state.apiKey = apiURL;
    }
  },
  modules: [
    auth
  ]
});

export default AppStore;