import Cookies from 'js-cookie';
import APIController from '@/api';

const authModule = {
  state: {
    user: null,
    cookieId: process.env.API_COOKIE_ID,
  },
  getters: {
    authUser(state) {
      return state.user;
    },
    authSession(state) {
      return Boolean(state.user);
    },
    cookieId(state) {
      return state.cookieId;
    }
  },
  mutations: {
    authLogin(state, loginUser) {
      const user = loginUser;
      state.user = user;
    },
    authLogout(state) {
      state.user = null;
    }
  },
  actions: {
    async authUser({commit, state, rootGetters}, {authType, formData}) {
      const apiURL = '/auth/api/' + authType;
      var response = await APIController.POST(apiURL, formData);
      console.log('api Response\n', response);

      if ((response.status === 200 || response.status === 202)
      && response.data.user) {
        commit('authLogin', response.data.user);
      }
      return response;
    },
    async logoutUser({commit, state, rootGetters}) {
      const apiURL = '/auth/api/logout';
      var response = await APIController.POST(apiURL, {});
      commit('authLogout');
      return response;
    }
  }
}

export default authModule;