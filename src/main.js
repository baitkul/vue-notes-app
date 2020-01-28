import Vue from 'vue'
import App from './App.vue'
import i18n from './plugins/i18n'
import router from './router'
import store from './store'

import './plugins'
import './assets/styles/index.css'

Vue.config.productionTip = false

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
