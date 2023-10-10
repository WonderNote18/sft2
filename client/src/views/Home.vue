<template>
  <v-alert
    color="primary"
    icon="mdi-information"
    variant="tonal"
    :title="pushMessage"
    v-if="showAlert"></v-alert>
  <div>
    <h1 class="text-center">Welcome to the Starfinder Tracker!</h1>
  </div>
</template>

<script>
import { ref, onMounted, onUpdated } from 'vue'
import { useRoute, useRouter } from 'vue-router'
export default {
  name: "Home",
  setup() {
    const route = useRoute()
    const router = useRouter()

    const showAlert = ref(false)
    const pushMessage = ref(null)

    const verifyAlert = function() {
      var queryMessage = route.query.pushMessage
      console.log(queryMessage)
      if (queryMessage) {
        showAlert.value = true
        pushMessage.value = queryMessage
      }
    }

    const verifyAndDeleteAlert = function() {
      verifyAlert()
      router.replace({query: {}})
    }

    onMounted(verifyAlert)
    onUpdated(verifyAndDeleteAlert)
    return {
      showAlert,
      pushMessage
    }
  }
}
</script>