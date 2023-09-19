<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title>
        {{ title }}
        <v-spacer></v-spacer>
        <v-btn icon @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-subtitle v-if="subtitle">{{ subtitle }}</v-card-subtitle>
      <v-card-text>{{ text }}</v-card-text>
      <v-card-actions>
        <v-btn
          v-for="(button, index) in buttons"
          :key="index"
          :color="button.buttonType"
          @click="handleButtonClick(button.buttonAction)"
        >
          {{ button.buttonText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: String,
    text: {
      type: String,
      required: true,
    },
    buttons: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    closeDialog() {
      this.dialog = false;
    },
    handleButtonClick(action) {
      if (action === 'close') {
        this.closeDialog();
      } else {
        // Handle button actions here

      }
    },
  },
};
</script>

<style scoped>
  /* .modal {
    width: 400px;
    padding: 20px;
    margin: 100px auto;
    background: white;
    border-radius: 10px;
  }
  .backdrop {
    top:0;
    position: fixed;
    background: rgba(0,0,0,0.5);
    width: 100%;
    height: 100%;
  }
  h1 {
    color: #03cfb4;
    border: none;
    padding: 0;
  } */
</style>