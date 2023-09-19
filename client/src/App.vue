<template>
  <v-app>
    <v-hover>
      <template v-slot:default="{ isHovering, props }">
        <router-link to="/">
          <v-app-bar
          class="homeHeader"
          :color="changeAppBarColor(isHovering)"
          app
          dark
          v-bind="props">
            <v-app-bar-title>SFT2</v-app-bar-title>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>

            <v-btn-group style="padding-right: 1rem;">
              <v-btn v-if="authSession" text @mouseover="isHovered = true" @mouseleave="isHovered = false" color="secondary" to="/overview">
                Dashboard
              </v-btn>

              <v-btn v-if="authSession" text @mouseover="isHovered = true" @mouseleave="isHovered = false" @click="logout">
                Logout
              </v-btn>

              <v-btn v-if="!authSession" text @mouseover="isHovered = true" @mouseleave="isHovered = false" to="/login">
                Login
              </v-btn>

              <v-btn v-if="!authSession" text @mouseover="isHovered = true" @mouseleave="isHovered = false" to="/register">
                Register
              </v-btn>

              <v-btn text @mouseover="isHovered = true" @mouseleave="isHovered = false" to="/about">
                About
              </v-btn>
            </v-btn-group>
          </v-app-bar>
        </router-link>
      </template>
    </v-hover>

    <v-main>
      <v-container class="py-8">
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
      isHovered: false,
    }
  },
  methods: {
    changeAppBarColor(isHovering) {
      return (isHovering && !this.isHovered) ? 'blue-grey-lighten-3' : 'blue-grey-darken-2'
    }
  },
  computed: {
    authSession() {}
  },
};
</script>

<style scoped>
.homeHeader {
  transition: background-color 300ms;
  border-bottom: 4px dashed #4B5563 !important;
}
</style>