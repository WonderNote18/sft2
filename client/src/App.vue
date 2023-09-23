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
import HomeHeader from '@/components/home/HomeHeader'
import HomeFooter from '@/components/home/HomeFooter'

export default {
  name: "App",
  components: {
    HomeHeader,
    HomeFooter
  },
  data() {
    return {
      authSession: false,
    }
  },
  methods: {},
  computed: {
    authSession() {}
  },
};
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