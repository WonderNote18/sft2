import Cookies from 'js-cookie';
import post from '@/api';
import { HttpStatusCode } from 'axios';

const auth = {
  state: {
    authSession: false,
    username: null,
    user: null,
    token: null,
  },
  getters: {
    authUser(state) {
      return state.username;
    },
    authSession(state) {
      return state.authSession;
    },
  },
  mutations: {
    authLogin(state, { loginResponse }) {
      const username = loginResponse.username;
      const user = loginResponse.user;
      const token = loginResponse.token;

      state.authSession = true;
      state.username = username;
      state.user = user;
      state.token = token;

      Cookies.set('token', token, {
        httpOnly: true
      });
    },
    authLogout(state) {
      state.authSession = false;
      state.username = null;
      state.user = null;
      state.token = null;

      Cookies.remove('token');
    }
  },
  actions: {
    async authUser(state, { authType, formData } ) {
      const apiURL = store.getters.getApiKey + '/auth/api/' + authType;
      var response = await post(apiURL, formData);
      if (response.status === 200 && response.data) {
        commit('authLogin', response.data);
      }
      return response;
    },
    async logoutUser(state) {
      const apiURL = store.getters.getApiKey + '/auth/api/logout';
      var response = await post(apiURL, formData);
      commit('authLogout', response.data);
      return response;
    }
  }
}

export default auth;