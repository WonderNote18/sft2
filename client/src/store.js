import { createStore } from "vuex";

const store = createStore({
  state: {
    authSession: false,
  },
  mutations: {
    setAuthSession(state, isAuthenticated) {
      state.authSession = isAuthenticated;
    },
  },
  actions: {
    login({ commit }) {
      // Insert login logic
      commit('setAuthSession', true);
    },
  },
  getters: {
    isAuthenticated: (state) => state.authSession,
  },
});

export default store;