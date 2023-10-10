import { useStore } from 'vuex';
import Cookies from 'js-cookie';

function checkAuth(to, from, next) {
  const authPath = '/dashboard/'
  if (to.path.contains(authPath) == false) { next(); }

  const store = useStore();

  const authSession = store.getters.authSession;
  const authUser = store.getters.authUser;
  const authCookie = Cookies.get(store.getters.cookieID);
  const cookieExpired = authCookie.expired;

  const isAuth = Boolean(
    authSession &&
    authUser &&
    authCookie &&
    cookieExpired
  )
  if (isAuth) {
    next();
  } else {
    next('/login');
  }
}

export default checkAuth;