<template>
  <v-card
  width="640"
  location="center"
  position="absolute"
  density="compact"
  variant="tonal">
    <v-card-title>
      <h2>Login</h2>
    </v-card-title>
    <v-form ref="form" @submit.prevent="loginUser">
      <v-container>
        <v-text-field
        v-model="loginForm.username"
        type="text"
        label="Username"
        placeholder="Enter Username"
        autocomplete="username"
        validate-on="lazy submit"
        autofocus
        :rules="[requiredRule]"></v-text-field>

        <v-text-field
        v-model="loginForm.password"
        type="password"
        label="Password"
        placeholder="Enter Password"
        autocomplete="username"
        validate-on="lazy submit"
        :rules="[requiredRule]"></v-text-field>

        <v-layout row>
          <div class="form-buttons">
            <v-btn-group>
              <v-btn class="mr-2" type="submit" color="success">Login</v-btn>
              <v-btn color="secondary" @click="resetForm">Clear</v-btn>
            </v-btn-group>
          </div>
        </v-layout>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
import { ref } from 'vue'
import HomepageController from '@/controllers/homepageController';
import Cookies from 'js-cookie';

export default {
  name: "Login",
  setup() {
    const form = ref(null)

    return {
      form,
      validate() {
        form.value.validate()
      }
    }
  },
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
    };
  },
  computed: {
    requiredRule() {
      return value => !!value || "Field is required"
    },
  },
  methods: {
    resetForm() {
      return this.$refs.form.reset()
    },
    async loginUser() {
      const formValidated = await this.$refs.form.validate()

      if (formValidated.valid === true) {
        try {
          HomepageController.setApiURL(this.$apiURL)

          const loginResponse = await HomepageController.login(this.$loginForm)
          if (loginResponse.status === 200 && Cookies.get('userId') !== undefined) {
            this.$router.push(`/`)
          } else {
           throw new Error(loginResponse)
          }
        } catch(err) {
          console.error('Login failed')
        }
      }
    },
  },
};
</script>