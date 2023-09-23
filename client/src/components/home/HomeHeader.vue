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
      <v-layout row>
        <div class="app-bar-buttons">
          <v-btn-group>
            <v-btn
            v-if="authSession"
            text
            color="secondary"
            class="mr-1"
            to="/overview">
              Dashboard
            </v-btn>

            <v-btn
            v-if="authSession"
            text
            class="mr-1"
            @click="logout">
              Logout
            </v-btn>

            <v-btn
            v-if="!authSession"
            text
            class="mr-1"
            :to="{ name: 'Login' }">
              Login
            </v-btn>

            <v-btn
            v-if="!authSession"
            text
            class="mr-1"
            :to="{ name: 'Register' }">
              Register
            </v-btn>

            <v-btn
            text class="mr-1"
            :to="{ name: 'About' }">
              About
            </v-btn>
          </v-btn-group>
        </div>
      </v-layout>
    </v-container>
  </v-app-bar>
</template>

<script>
import { ref } from 'vue'

export default {
  name: "HomeHeader",
  data() {
    return {
      authSession: ref(null),
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
.app-bar-buttons {
  background-color: var(--color-bgl1);
  width: 100%;
  height: 80%;
  padding: 2px 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>