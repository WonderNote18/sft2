<template>
  <v-alert
    elevation="3"
    :color="alert.color"
    :icon="alert.icon"
    :title="alert.title"
    :text="alert.subtitle"
    closable
    v-if="alert.showAlert"></v-alert>
</template>

<script>
import { ref, toRef, unref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
export default {
  name: "AlertPush",
  props: {
    alert: {
      type: Object,
      required: false
    }
  },
  setup(props) {
    const route = useRoute()

    const alert = ref({
        showAlert: false,
        color: "info",
        icon: "mdi-information",
        title: "",
        subtitle: "",
      })

    const pushAlert = function() {
      try {
        var queryAlert = JSON.parse(route.query.alert)

        if (Object.keys(queryAlert).length > 0) {
          alert.value.showAlert = true
          var tmpAlertData = {...alert.value}

          Object.entries(queryAlert).map(function(alertParam) {
            const key = alertParam[0]
            const value = alertParam[1]
            tmpAlertData[key] = value
          })
          alert.value = tmpAlertData
        }
      } catch {
        alert.value.showAlert = false
      }
    }
    onBeforeMount(pushAlert)
    return {
      alert
    }

  }
}
</script>

<style>
.v-alert {
  position: absolute;
  width: fit-content;
  max-width: 50vw;
  margin: 0 auto;
  padding: 16px 24px;
  left: 0;
  right: 0;
  top: 8%;
  opacity: 93%;
  z-index: 10000;
}
</style>