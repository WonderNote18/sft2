<template>
  <v-app>
    <router-link to="/">
      <v-app-bar extended extension-height="64" app>
        <v-container class="ma-0 pa-0 h-100 w-100" fluid>
          <v-layout row>
            <div class="app-bar-header text-center"
            @mouseenter="changeAppBarColor($event, true)"
            @mouseleave="changeAppBarColor($event, false)">
              <h1 class="font-weight-black">Starfinder Tracker</h1>
              <h3>Welcome to the Starfinder Tracker</h3>
            </div>
          </v-layout>
          <v-layout row>
            <div class="app-bar-buttons">
              <v-btn-group>
                <v-btn v-if="authSession" text color="secondary" class="mr-1" to="/overview">
                  Dashboard
                </v-btn>

                <v-btn v-if="authSession" text class="mr-1" @click="logout">
                  Logout
                </v-btn>

                <v-btn v-if="!authSession" text class="mr-1" to="/login">
                  Login
                </v-btn>

                <v-btn v-if="!authSession" text class="mr-1" to="/register">
                  Register
                </v-btn>

                <v-btn text class="mr-1" to="/about">
                  About
                </v-btn>
              </v-btn-group>
            </div>
          </v-layout>
        </v-container>
      </v-app-bar>
    </router-link>

    <v-main>
      <v-container>
        <router-view></router-view>
        <v-footer app border color="blue-grey-darken-4">&copy; 2023 SFT2</v-footer>
      </v-container>
    </v-main>

  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      authSession: false,
    }
  },
  methods: {
    changeAppBarColor($e, vHover) {
      console.log($e)
      if (vHover) {
        $e.srcElement.classList.add('hover')
      } else {
        $e.srcElement.classList.remove('hover')
      }
      // 'blue-grey-lighten-3' : 'blue-grey-darken-2'
    }
  },
  computed: {
    authSession() {}
  },
};
</script>

<style scoped>
/* Custom styling for the entire app bar */
.app-bar-header {
  background-color: var(--color-bgd2);
  color: var(--color-greyd3);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-shadow: -1px 1px 1px #ccc,
    1px 1px 1px #ccc,
    1px -1px 0 #ccc,
    -1px -1px 0 #ccc;
  transition: all 300ms;
}
.app-bar-header.hover {
  background-color: var(--color-bgl2);
  color: var(--color-bgl4);
  text-shadow: -1px 1px 1px #222,
    1px 1px 1px #222,
    1px 1px 0 #222,
    -1px -1px 0 #222;
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

.v-main {
  background-color: var(--color-bgd3);
}
</style>