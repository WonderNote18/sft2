<template>
  <v-form @submit.prevent="loginUser">
    <v-card
    width="640"
    location="center"
    position="absolute"
    density="compact"
    variant="tonal">
      <v-card-title>
        <h2>Login</h2>
      </v-card-title>
      <v-container>
        <v-text-field
        v-model="loginForm.username"
        type="text"
        label="Username"></v-text-field>
        <v-text-field
        v-model="loginForm.password"
        type="password"
        label="Password"></v-text-field>
        <v-btn type="submit" color="success">Login</v-btn>
      </v-container>
    </v-card>
  </v-form>
</template>

<script>
import HomepageController from '@/controllers/homepageController';
import Cookies from 'js-cookie';

export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async loginUser() {
      HomepageController.setApiURL(this.$apiURL)

      const loginResponse = await HomepageController.login(this.loginForm)
      if (Cookies.get('userId')) {
        this.$router.push(`/`)
      } else {
        console.log(loginResponse);
      }
    },
  },
};
</script>