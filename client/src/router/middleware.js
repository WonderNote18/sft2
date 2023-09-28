import { useStore } from 'vuex';
import Cookies from 'js-cookie';

function checkAuth(to, from, next) {
  const store = useStore();

  const isAuth = store.getters.authSession;
  const userId = store.getters.authUser;
  const cookie = Cookies.get('token');

  if (
    !isAuth ||
    !userId ||
    !cookie ||
    cookie.expired
  ) {
    next('/login');
  } else {
    next();
  }
}

export default checkAuth;