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
        v-model="loginForm.userString"
        type="text"
        label="Username"
        placeholder="Enter Username"
        autocomplete="userString"
        validate-on="lazy submit"
        autofocus
        :rules="[requiredRule]"></v-text-field>

        <v-text-field
        v-model="loginForm.password"
        type="password"
        label="Password"
        placeholder="Enter Password"
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
import { ref, unref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router';

// Services
import AlertService from '@/utils/AlertService'


export default {
  name: "Login",
  setup() {
    const router = useRouter()
    const store = useStore()

    const form = ref(null)
    const loginForm = ref({
      userString: '',
      password: ''
    })

    const loginUser = async function() {
      const formValidated = await form.value.validate()
      if (formValidated.valid) {
        try {
          const reqData = {
            authType: 'login',
            formData: {...unref(loginForm)}
          }
          const response = await store.dispatch('authUser', reqData)

          if (response.status === 202 && store.getters.authSession) {
            const username = store.getters.authUser.username
            const alert = {
              title: 'Login successful. Welcome, ' + username + '!'
            }

            AlertService.redirectToWithAlert(router, '/', alert)
          } else {
           throw new Error(response.message)
          }
        } catch(err) {
          console.error(err)
        }
      }
    }

    return {
      form,
      loginForm,
      loginUser
    }
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
  },
};
</script>