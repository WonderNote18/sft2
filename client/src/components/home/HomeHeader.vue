<template>
  <v-app-bar extended extension-height="64" app>
    <v-container class="ma-0 pa-0 h-100 w-100" fluid>
      <router-link
      custom
      v-slot="{ href, navigate }"
      :to="{ name: 'Home'}">
        <v-layout row :href="href" @click="navigate">
          <div class="app-bar-header text-center"
          @mouseenter="changeAppBarColor($event, true)"
          @mouseleave="changeAppBarColor($event, false)">
            <h1 class="font-weight-black">Starfinder Tracker</h1>
            <h3>Welcome to the Starfinder Tracker</h3>
          </div>
        </v-layout>
      </router-link>
      <v-layout row class="app-bar-bottom">
        <div class="bottom-bar-title">
          <span class="text-h5" v-if="!isAuth">Login or Register</span>
          <span class="text-h5 welcomeUser" v-if="isAuth">Welcome,
            <b>{{ userInfo.username }}</b>
          </span>
        </div>
        <div class="bottom-bar-buttons">
          <v-btn-group>
            <v-btn
            text
            color="secondary"
            class="mr-1"
            :to="{ name: 'About' }">
              About
            </v-btn>

            <v-btn
            v-if="isAuth"
            text
            color="background"
            class="mr-1"
            to="/overview">
              Dashboard
            </v-btn>

            <v-btn
            v-if="isAuth"
            text
            @click="logout">
              Logout
            </v-btn>

            <v-btn
            v-if="!isAuth"
            text
            class="mr-1"
            color="background"
            :to="{ name: 'Login' }">
              Login
            </v-btn>

            <v-btn
            v-if="!isAuth"
            text
            :to="{ name: 'Register' }">
              Register
            </v-btn>
          </v-btn-group>
        </div>
      </v-layout>
    </v-container>
  </v-app-bar>
</template>

<script>
import { ref, onBeforeUpdate } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router';

// Services
import AlertService from '@/utils/AlertService'

export default {
  name: "HomeHeader",
  setup() {
    const store = useStore()
    const router = useRouter()

    const isAuth = ref(store.getters.authSession)
    const userInfo = ref(store.getters.authUser)

    const logout = async function() {
      const logoutResponse = await store.dispatch('logoutUser')
      if (logoutResponse) {
        const alert = {
          title: 'Successfully logged out!'
        }
        AlertService.redirectToWithAlert(router, '/', alert)
      }
    }

    onBeforeUpdate(function() {
      isAuth.value = store.getters.authSession
      userInfo.value = store.getters.authUser
    })

    return {
      isAuth,
      userInfo,
      logout
    }
  },
  methods: {
    changeAppBarColor($e, vHover) {
      if (vHover) {
        $e.srcElement.classList.add('hover')
      } else {
        $e.srcElement.classList.remove('hover')
      }
    }
  },
}
</script>

<style scoped>
.app-bar-header {
  cursor: pointer;
  background-color: var(--color-bgd2);
  color: var(--color-bgl4);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-shadow: -1px 1px 1px #22222288,
    1px 1px 1px #22222288,
    1px -1px 0 #22222288,
    -1px -1px 0 #22222288;
  transition: all 300ms;
}
.app-bar-header.hover {
  background-color: var(--color-bgl2);
  color: var(--color-bgd3);
  text-shadow: -1px 1px 1px #efefef33,
    1px 1px 1px #efefef33,
    1px -1px 0 #efefef33,
    -1px -1px 0 #efefef33;
}

/* Lighter shaded bottom portion */
.app-bar-bottom {
  background-color: var(--color-bgl1);
}
.app-bar-bottom > div {
  height: 80%;
  padding: 2px 0;
  margin: auto;
  display: flex;
  align-items: center;
  flex-basis: content;
}
.bottom-bar-title {
  justify-content: flex-start;
  margin-left: 0.5rem !important;
}
.bottom-bar-buttons {
  justify-content: flex-end;
  margin-right: 0.5rem !important;
}
.welcomeUser {
  color: var(--color-bgl4);
}
</style>