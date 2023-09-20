<template>
  <v-card
  width="640"
  location="center"
  position="absolute"
  density="compact"
  variant="tonal">
    <v-card-title>
      <h2>Register</h2>
    </v-card-title>
    <v-form @submit.prevent="registerUser">
      <v-container>
        <v-text-field
        v-model="formData.firstName"
        type="text"
        label="First Name"></v-text-field>
        <v-text-field
        v-model="formData.lastName"
        type="text"
        label="Last Name"></v-text-field>
        <v-text-field
        v-model="formData.username"
        type="text"
        label="Username"></v-text-field>
        <v-text-field
        v-model="formData.emailAddress"
        type="email"
        label="Email"></v-text-field>
        <v-text-field
        v-model="formData.password"
        type="password"
        label="Enter Password"></v-text-field>
        <v-text-field
        v-model="formData.passwordConfirmation"
        type="password"
        label="Confirm Password"></v-text-field>
      <v-btn type="submit" color="success">Register</v-btn>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
import HomepageController from '@/controllers/homepageController'
import Modal from '@/components/Modal.vue'

export default {
  name: "Register",
  components: {
    Modal,
  },
  data() {
    return {
      formData: {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        passwordConfirmation: '',
      },
    };
  },
  methods: {
    async registerUser() {
      HomepageController.setApiURL(this.$apiURL)

      const registerResponse = await HomepageController.register(this.$formData)
      console.log(registerResponse)
      // Optionally, you can handle the registration success or failure here
    },
  },
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>