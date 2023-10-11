<template>
  <v-app>
    <AlertPush :key="$route.fullPath" :alert="$route.query"></AlertPush>
    <v-main>
      <HomeHeader :key="$route.fullPath"></HomeHeader>
      <v-container>
        <router-view/>
        <HomeFooter></HomeFooter>
      </v-container>
    </v-main>

  </v-app>
</template>

<script>
import AlertPush from '@/components/AlertPush'
import HomeHeader from '@/components/home/HomeHeader'
import HomeFooter from '@/components/home/HomeFooter'

export default {
  name: 'HomeLayout',
  components: {
    AlertPush,
    HomeHeader,
    HomeFooter,
  },
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