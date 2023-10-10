const { defineConfig } = require('@vue/cli-service')
module.exports = {
  transpileDependencies: ['vuex-persist'],
  devServer: {
    proxy: process.env.VUE_APP_API_ADDRESS + ':' + process.env.VUE_APP_API_PORT + '/'
  }
}
