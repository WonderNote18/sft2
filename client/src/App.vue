<template>
  <v-app>
    <HomeHeader></HomeHeader>

    <v-main>
      <v-container>
        <router-view/>
        <HomeFooter></HomeFooter>
      </v-container>
    </v-main>

  </v-app>
</template>

<script>
import { computed, provide } from 'vue'
import { useStore } from 'vuex'
import HomeHeader from '@/components/home/HomeHeader'
import HomeFooter from '@/components/home/HomeFooter'

export default {
  name: "App",
  components: {
    HomeHeader,
    HomeFooter
  },
  setup(props) {
    const store = useStore()
    const apiURL = process.env.VUE_APP_API_ADDRESS + ':' + process.env.VUE_APP_API_PORT;
    store.commit('setApiKey', apiURL)

    provide('isAuth', computed(() => store.getters.authSession))
    provide('username', computed(() => store.getters.authUser))
    provide('authUser', computed((authType, formData) => store.dispatch('authUser', { authType, formData} )))
    provide('logoutUser', computed(() => store.dispatch('logoutUser')))
  }
}
</script>

<style>
.v-main {
  background-color: var(--color-bgd3);
}
.form-buttons {
  width: 100%;
  height: 100%;
  margin-top: 0.5rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>