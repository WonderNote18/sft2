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
    <v-form ref="form" @submit.prevent="registerUser">
      <v-container>
        <v-text-field
        v-model="registerForm.firstName"
        type="text"
        label="First Name"
        placeholder="Enter your first name"
        autocomplete="given-name"
        validate-on="lazy submit"
        autofocus
        :rules="[requiredRule]"></v-text-field>

        <v-text-field
        v-model="registerForm.lastName"
        type="text"
        label="Last Name"
        placeholder="Enter your last name"
        autocomplete="family-name"
        validate-on="lazy submit"
        :rules="[requiredRule]"></v-text-field>

        <v-text-field
        v-model="registerForm.username"
        type="text"
        label="Username"
        placeholder="Up to 32 characters, letters and numbers only"
        autocomplete="username"
        validate-on="lazy submit"
        :rules="[requiredRule, usernameRule]"></v-text-field>

        <v-text-field
        v-model="registerForm.emailAddress"
        type="email"
        label="Email"
        placeholder="Enter a valid email address"
        autocomplete="email"
        validate-on="lazy submit"
        :rules="[requiredRule, emailRule]"></v-text-field>

        <v-text-field
        v-model="registerForm.password"
        type="password"
        label="Enter Password"
        placeholder="8+ characters (uppercase, lowercase, number, symbol)"
        validate-on="lazy submit"
        :rules="[requiredRule, passwordRule]"></v-text-field>

        <v-text-field
        v-model="registerForm.passwordConfirmation"
        type="password"
        label="Confirm Password"
        placeholder="Confirm password"
        validate-on="lazy input"
        :rules="[requiredRule, passwordRule, confirmPasswordRule]"></v-text-field>

        <v-layout row>
          <div class="form-buttons">
            <v-btn-group>
              <v-btn class="mr-2" type="submit" color="success">Register</v-btn>
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

export default {
  name: "Register",
  setup() {
    const form = ref(null)
    var registerForm = ref({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        passwordConfirmation: "",
      });

    return {
      form,
      registerForm
    }
  },
  computed: {
    requiredRule() {
      return value => !!value || "Field is required"
    },
    usernameRule() {
      return value => {
        const usernameTest = /^[a-zA-Z0-9-_.]{1,32}$/.test(value)
        return usernameTest ||
        "Username must contain up to 32 characters, using letters and numbers only"
      }
    },
    emailRule() {
      return value => {
        const emailTest = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$/.test(value)
        return emailTest ||
        "Email must be a valid address (ex. 'myEmail@gmail.com')"
      }
    },
    passwordRule() {
      return value => {
        const valueTest = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(value)
        return valueTest ||
        "Password must contain 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"
      }
    },
    confirmPasswordRule() {
      return value => value === this.registerForm.password ||"Passwords do not match"
    }
  },
  methods: {
    resetForm() {
      return this.$refs.form.reset()
    },
    async registerUser() {
      const formValidated = await this.$refs.form.validate()

      if (formValidated.valid === true) {
        try {
          // const registerResponse = await HomepageController.register(this.$registerForm)
          if (registerResponse.status === 200) {
            this.$router.push('/')
          } else {
            throw new Error(registerResponse)
          }
        } catch (err) {
          console.error('Registration failed')
        }
      }
    },
  },
}
</script>