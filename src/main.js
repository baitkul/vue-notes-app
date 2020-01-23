import Vue from 'vue'
import App from './App.vue'
import i18n from './plugins/i18n'

import './plugins'
import './assets/styles/index.css'
import './assets/styles/index.scss'

Vue.config.productionTip = false

new Vue({
  i18n,
  render: h => h(App)
}).$mount('#app')
